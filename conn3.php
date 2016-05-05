<?php
$servername = "127.0.0.1";
$username = "root";
// $password = "courage00";
$password = "1";
$dbname = "movie";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// catch the var http send to here
$id = $_POST["id"];

$outp = "";
        
$sql = "SELECT r1, r2, r3
    FROM data_merged
    WHERE imdbID = '" . $id . "'";

$result = $conn->query($sql);
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"r1":"' . $rs["r1"]        . '",';
    $outp .= '"r2":"'  . $rs["r2"]        . '",';
    $outp .= '"r3":"'  . $rs["r3"]        . '"}';
}
        
$outp ='['.$outp.']';
$conn->close();
echo($outp);


?>
