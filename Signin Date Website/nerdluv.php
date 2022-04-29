<?php
//header("Content-type: application/json");
/* This web service should handle two types of requests:
	1) a GET request with a name parameter 
	2) a POST request with the following parameters:
		- name
		- gender
		- age
		- ptype
		- os
		- minAge
		- maxAge
	You do not need to do validation checking on the values of the parameters.
	For this lab, we'll assume the values are all valid (no weird OS spellings, etc.)
	
	There are no results from the POST request. However, if a failure occurs, your
	page should return an HTTP error code of 400.
	
	The results of the GET request should be a json object named data with the set
	of matches as an array. For example:
	{"data":[{"name":"Dana Scully",
			  "gender":"F",
			  "age":"41",
			  "ptype":"ISTJ",
			  "os":"Mac OS X",
			  "minAge":"36",
			  "maxAge":"54"},
	         {"name":"Jadzia Dax",
			  "gender":"F",
			  "age":"46",
			  "ptype":"ENFJ",
			  "os":"Mac OS X",
			  "minAge":"18",
			  "maxAge":"32"}
			 ]
	}
	
	If no matches are found, return an empty data array (as follows):
	{"data":[]
	}
	If a failure occurs, your page should return an HTTP error code of 400.*/

	//checks to see if nerdluv.php is getting a get or post request.
	if($_SERVER["REQUEST_METHOD"] == "GET"){
		$name = $_GET["name"];
	}
	else if($_SERVER["REQUEST_METHOD"] == "POST"){
		$name = $_POST["name"];
		$gender = $_POST["gender"];
		$age = $_POST["age"]; 
		$ptype = $_POST["ptype"];
		$os = $_POST["os"];
		$minAge = $_POST["minAge"];
		$maxAge = $_POST["maxAge"];
	} 
	
	
/* Your db.txt file should contain two variable initializations:
	$username (probably "admin", your db username)
	$login (the password for your db login) */
include("/var/db.php");




/* You should put logic here to handle the POST request to add a new 
user and the GET request to get matches for a user */
header("Content-type: application/json");
$dbconn = getConnection($username, $login);

//if nerdluv.php is getting get request find matches 
if($_SERVER["REQUEST_METHOD"] == "GET"){
	$user_arr = getUser($dbconn, $name);
	$basicMatchArr = getBasicMatches($dbconn, $user_arr);
	$matchesArr = getMatches($user_arr[3], $basicMatchArr);
	$data['data'] = $matchesArr;
	if($data['data'] == null){
		$data['data'] = [];
	}
	print json_encode($data);
	
	
}
//if getting post request add user to database 
else if($_SERVER["REQUEST_METHOD"] == "POST"){
	addUser($dbconn, $name, $gender, $age, $ptype, $os, $minAge, $maxAge);
}

/* This function should take in the $username and $login that were initialized
	in the db.txt file and it should use PDO to connect to the database.
	The database connection should be returned. */	
function getConnection($username, $login) {
	$dbconn = new PDO("mysql:dbname=nerdluv", $username, $login);
	$dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	return $dbconn;
}
	

/* This function takes in a PDO object that should already be connected to 
	the database and a variable $name that contains the user name. $name is the
	user for whom we want to find matches. This function should do a query (using 
	a prepared statement) and get the row that matches the $name as a *numerically
	indexed* array. This array should be returned. */
function getUser($dbconn, $name) {
	try{
		$user_statement = $dbconn->prepare("SELECT * FROM users WHERE name = :name");
		$parameters = array(":name" => $name);
		$user_statement->execute($parameters);
		$rows = $user_statement ->fetchAll();
		
		$idx = 0;
		foreach ($rows as $row){
			foreach($row as $col){
				$user_arr[$idx] = $row[$idx];
				$idx++;
			}
			
		}
	}
	catch(PDOException $ex){
		?>
		<h1>Couldn't Look Up users</h1>
		<?php
	}
	return $user_arr;
	
}



/* Given a PDO object (already connected to DB) and a numerically indexed array of data
	representing the row in the db for a user, return a result set of data that has
	1) the opposite gender from $user, 2) matching os, 3) an age between the minage of $user
	and maxage of $user and where the age of $user is between the minage and maxage of the
    record. (Ignore the personality type for now). Getting these results should be
	done by a prepared statement with parameters. Return the rows in a multi-dimensional 
	*associative* array (unless there are no results) */
function getBasicMatches($dbconn, $user) {
	
	$basicMatches_statement = $dbconn->prepare("SELECT * FROM users WHERE gender != :gender 
	AND os = :os AND minAge <= :age AND maxAge >= :age 
		AND :minAge <= age AND :maxAge >= age");

	$parameters = array(":gender" => $user[1], 
			":age" => $user[2], ":os" => $user[4], 
			":minAge" => $user[5], ":maxAge" => $user[6]);

	$basicMatches_statement->execute($parameters);
	$rows = $basicMatches_statement ->fetchAll();	
		
	$idx = 0;
	foreach($rows as $row){
		$match = array("name" => $row["name"], 
			"gender" => $row["gender"],
			"age" => $row["age"],
			"ptype" => $row["ptype"],
			"os" => $row["os"],
			"minAge" => $row["minAge"],
			"maxAge" => $row["maxAge"]);
		$matchesArr[$idx] = $match;
		$idx++;
	}
	return $matchesArr; 
}


/* Given the string representing the user's personality type and the result set from
	getting the user's basic matches (getBasicMatches), return an array containing only those
	matches that have at least one personality type letter in common with $usertype The $matches
	should be multi-dimensional associative array when passed in, and the return value should
	also be a multi-dimensional associative array (unless there are no results) */


function getMatches($usertype, $matches) {
	$usertypeArr = str_split($usertype);
	$idx = 0;
	foreach($matches as $match){
		$matchType = $match["ptype"];
		foreach($usertypeArr as $index => $char){
			if($char == $matchType[$index]){
				$newMatches[$idx] = $match;
				
				$idx++;
			break;
			}		
		}
	}
	return $newMatches; 
}



/* Given a PDO object (already connected to DB) and all of the information necessary for
	a new user, this function should add the new user to the database. Return value should be
	true or false */
function addUser($dbconn, $name, $gender, $age, $type, $os, $minage, $maxage) {
		$insert_statement = $dbconn -> prepare("INSERT INTO users
			VALUES (:name, :gender, :age , :ptype, :os, :minAge, :maxAge)");
		
		$parameters = array( ":name" => $name,
							":gender" => $gender,
							":age" => $age,
							":ptype" => $type,	
							":os" => $os,	
							":minAge" => $minage,
							":maxAge" => $maxage
							);
		$result = $insert_statement -> execute($parameters);
		return $result;
}

?>
