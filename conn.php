<?php
$servername = "127.0.0.1";
$username = "root";
// $password = "courage00";
$password = "courage00";
$dbname = "movie";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$genres = $_POST["genres"];
if ($genres == null) {
    echo('[]');
}
else {
$sql = "SELECT imdbID, Title, genres, lensCount, lensAvg
        FROM data_merged
        WHERE ";
foreach($genres as $genre){
    $sql .= "genres LIKE '%" . $genre . "%' OR ";
}
$sql .= "0 
        ORDER BY RAND()
        LIMIT 1000";
$result = $conn->query($sql);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"imdbId":"' . $rs["imdbID"]     . '",';
    $outp .= '"title":"'   . $rs["Title"]      . '",';
    $outp .= '"genres":"'  . $rs["genres"]     . '",';
    $outp .= '"count":"'   . $rs["lensCount"]  . '",';
    $outp .= '"avg":"'     . $rs["lensAvg"]    . '"}'; 
}
$outp ='['.$outp.']';
$conn->close();

echo($outp);
}
?>
