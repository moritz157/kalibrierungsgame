<?php
    include('mysqlCredentials.php');

    $pdo = new PDO('mysql:host='.$mysql_host.';dbname='.$mysql_db, $mysql_user, $mysql_pass);

    $statement = $pdo->prepare("SELECT * FROM `kalibrierung_games`");
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    echo(json_encode($result));
    /*foreach($pdo->query($statement) as $row) {
        echo $row['id'];
    }*/

?>