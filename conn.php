<?php
$servername = "127.0.0.1";
$username = "root";
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
$sql = "SELECT imdbId, title, genres, count, avg
        FROM data
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
    $outp .= '{"imdbId":"' . $rs["imdbId"] . '",';
    $outp .= '"title":"'   . $rs["title"]  . '",';
    $outp .= '"genres":"'  . $rs["genres"] . '",';
    $outp .= '"count":"'   . $rs["count"]  . '",';
    $outp .= '"avg":"'     . $rs["avg"]    . '"}'; 
}
$outp ='['.$outp.']';
$conn->close();

echo($outp);
}
?>
