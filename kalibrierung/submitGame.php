<?php
include('mysqlCredentials.php');

if(isset($_POST['click_1']) and isset($_POST['click_2']) and 
    isset($_POST['click_3']) and 
    isset($_POST['click_4']) and 
    isset($_POST['click_5']) and 
    isset($_POST['click_6']) and 
    isset($_POST['click_7']) and 
    isset($_POST['click_8']) and 
    isset($_POST['click_9']) and 
    isset($_POST['time']) and 
    isset($_POST['user'])){

    $pdo = new PDO('mysql:host='.$mysql_host.';dbname='.$mysql_db, $mysql_user, $mysql_pass);

    $statement = $pdo->prepare("INSERT INTO `kalibrierung_games` (click_1, click_2, click_3, click_4, click_5, click_6, click_7, click_8, click_9, time, user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $statement->execute(array($_POST['click_1'], $_POST['click_2'], $_POST['click_3'], $_POST['click_4'], $_POST['click_5'], $_POST['click_6'], $_POST['click_7'], $_POST['click_8'], $_POST['click_9'], $_POST['time'], $_POST['user']));   

    echo("ok");
} else {
    echo("Bad request");
}
?>