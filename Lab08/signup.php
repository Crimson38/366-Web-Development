<?php
      include("top.html");
?>

    <!-- Nerdluv signup form -->
    <!-- form information is sent to signup-submit.php as post request -->
    <form action = "signup-submit.php" method = "post">  
        <fieldset>
            <legend>New User Signup:</legend> 
                <ul>
                    <li>
                        <strong>Name:</strong>
                        <input type = "text" name = "name" size = "16" />
                    </li>
                    <li>
                        <strong>Gender:</strong>
                        <label>
                            <input type = "radio" name = "gender" value = "M" />Male
                        </label>
                        <label>
                            <input type = "radio" name = "gender" value = "F" checked = "checked" />Female
                        </label>
                    </li>
                    <li>
                        <strong>Age:</strong>
                        <input type = "text" name = "age" size = "6" maxlength = "2" /> 
                    </li>
                    <li>
                        <strong>Personality type:</strong>
                        <input type ="text" name = "ptype" size = "6" maxlength = "4"/>
                        (<a href = "http://www.humanmetrics.com/cgi-win/jtypes2.asp">Don't know your type?</a>)
                    </li>
                    <li>
                        <strong>Favorite OS:</strong>
                        <select name = "os">
                            <option selected = "selected">Windows</option>
                            <option>Mac OS X</option>
                            <option>Linux</option>
                        </select>
                    </li>
                    <li>
                        <strong>Seeking age:</strong>
                        <input type = "text" name = "minAge" size = "6" maxlength = "2" value = "min"/> to
                        <input type = "text" name = "maxAge" size = "6" maxlength = "2" value = "max"/>
                    </li>
                </ul>    
                    <input type = "submit" value = "Sign Up" />
        </fieldset>
    </form>
    <!-- end of nerdluv signup form -->

<?php
      include("bottom.html");
?>