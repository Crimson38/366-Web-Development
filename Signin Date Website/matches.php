<?php
	  include("top.html");
?>

	<!-- form for user to enter their name -->
	<!-- sends information to matches-submit.php as get request -->
    <form action = "matches-submit.php" method = "get">
        <fieldset>
            <legend>Returning User:</legend>
            <ul>
                <li>
                    <strong>Name:</strong>
                    <input type = "text" name = "name" size = "16"/>
                </li>
            </ul>
            <input type = "submit" value = "View My Matches" />
        </fieldset>
    </form>

<?php
	  include("bottom.html");
?>