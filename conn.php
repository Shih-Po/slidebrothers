<!-- 因為 PHP 連 SQL 時，下交集連集太多的 SQL 指令，可能讓效能變差，所以廢棄 conn.php -->
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
$genres = $_POST["genres"];
$year = $_POST["year"];

if ($genres == null) {
    echo('[]');
}
else if ($year[0] == 0 && $year[1] == 0 && $year[2] == 0) {
    echo('[]'); 
}
else {
    // 1. query start
    $sql = "SELECT imdbID, Title, Year, genres, imdbVotes, imdbRating
        FROM data_merged
        WHERE ";
    // 2. concat by Year ok
    // $sql .= "(Year >= 1981 AND Year <= 2000) AND ";
    // select year range by $_POST["year"]
    if ($year[0] == 1 && $year[1] == 1 && $year[2] == 1) {
        // do not thing
    } 
    else {
        if ($year[0] == 1) {
            $sql .= "(Year <= 1980)";
            // concat the SQL query
            if ($year[1] == 1 || $year[2] == 1) {
                $sql .= " OR ";
            }
        }
        if ($year[1] == 1) {
            $sql .= "(Year >= 1981 AND Year <= 2000)";
            // concat the SQL query
            if ($year[2] == 1) {
                $sql .= " OR ";
            }
        }
        if ($year[2] == 1) {
            $sql .= "(Year >= 2001)";
        }
        $sql .= " AND ";
    }

    // 3. concat by genres ok
    // $sql .= "genres like '%Children%' ";
    // select genres movie by $_POST["genres"]
    $sql .= "(";
    foreach($genres as $genre) {
        $sql .= "genres LIKE '%" . $genre . "%' OR ";
    }
    $sql .= "0)";
    
    // 4. concat by random, limit 500 ok
    $sql .= "ORDER BY RAND() 
    LIMIT 500";

    $result = $conn->query($sql);
    $outp = "";
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        if ($outp != "") {$outp .= ",";}
        $outp .= '{"imdbId":"' . $rs["imdbID"]        . '",';
        $outp .= '"title":"'   . $rs["Title"]         . '",';
        $outp .= '"Year":"'    . $rs["Year"]          . '",';
        $outp .= '"genres":"'  . $rs["genres"]        . '",';
        $outp .= '"count":"'   . $rs["imdbVotes"]     . '",';
        $outp .= '"avg":"'     . $rs["imdbRating"]    . '"}'; 
    }
    $outp ='['.$outp.']';
    $conn->close();
    echo($outp);

}

?>
