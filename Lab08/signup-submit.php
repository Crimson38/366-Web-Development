        <?php
            include("top.html");
            //sends a post request to nerdluv using submission info from signup.php.
            $input = http_build_query(
                array(
                    'name' => $_POST["name"],
                    'gender' => $_POST["gender"],
                    'age' => $_POST["age"],
                    'ptype' => $_POST["ptype"],
                    'os' => $_POST["os"],
                    'minAge' => $_POST["minAge"],
                    'maxAge' => $_POST["maxAge"]
                )   
            );
            $arr = array(
                'http' => array(    
                    'method' => 'POST',
                    'content' => $input    
            ));
            
            $arr = stream_context_create($arr);
            $url = "http://".$_SERVER['HTTP_HOST']."/Lab8/nerdluv.php";
            $data = file_get_contents($url, false, $arr);
        
        ?>
        
        <strong>Thank you!</strong>
        </br>
        <p>Welcome to NerdLuv, <?=$_POST["name"]?>!</p>
        <p>Now <a href = "matches.php"> log in to see your matches!</a></p>      
        
       

<?php
    include("bottom.html");
?>