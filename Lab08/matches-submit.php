
    <?php
          include("top.html");
        // Sends username from matches to nerdluv as get request and receives a json object. 
        $username = $_GET["name"];
        $username = str_replace(" ", "+", $username);
        $url = "http://".$_SERVER['HTTP_HOST']."/Lab8/nerdluv.php?name=".$username;
        $output = file_get_contents($url);
        $data = json_decode($output);
    
        // prints the users matches 
        $test = $data -> data;
        foreach($test as $match){
        ?>
                <div class = "match">
                                <p>
                                    <img src = "user.jpg" alt = "Valid HTML"/>
                                    <?=$match -> name?>
                                </p>
                                
                                <ul>
                                    <li>
                                        <strong>gender:</strong>
                                        <?=$match -> gender?>
                                    </li>
                                    <li>
                                        <strong>age:</strong>
                                        <?=$match -> age?>
                                    </li>
                                    <li>
                                        <strong>type:</strong>
                                        <?=$match -> ptype?>
                                    </li>
                                    <li>
                                        <strong>OS:</strong>
                                        <?=$match -> os?>
                                    </li>
                                </ul>
                            </div>
            <?php
        }

        include("bottom.html");
    ?>

    



