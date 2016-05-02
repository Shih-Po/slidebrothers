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

$outp = "";

if ($genres == null) {
    echo('[]');
}
else if ($year[0] == 0 && $year[1] == 0 && $year[2] == 0) {
    echo('[]'); 
}
else {
        if ($year[0] == 1) {
            $sql = "SELECT imdbID, Title, Year, genres, imdbVotes, imdbRating
                FROM data_merged
                WHERE ";
            $sql .= "(Year <= 1980) AND ";
            // concat the SQL query
            $sql .= "(";
            foreach($genres as $genre) {
                $sql .= "genres LIKE '%" . $genre . "%' OR ";
            }
            $sql .= "0)";
            $sql .= "ORDER BY RAND() 
                LIMIT 200";
            $result = $conn->query($sql);
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"imdbId":"' . $rs["imdbID"]        . '",';
                $outp .= '"title":"'   . $rs["Title"]         . '",';
                $outp .= '"Year":"'    . $rs["Year"]          . '",';
                $outp .= '"genres":"'  . $rs["genres"]        . '",';
                $outp .= '"count":"'   . $rs["imdbVotes"]     . '",';
                $outp .= '"avg":"'     . $rs["imdbRating"]    . '"}'; 
            }
        }
        if ($year[1] == 1) {
            $sql = "SELECT imdbID, Title, Year, genres, imdbVotes, imdbRating
                FROM data_merged
                WHERE ";
            $sql .= "(Year >= 1981 AND Year <= 2000) AND ";
            // concat the SQL query
            $sql .= "(";
            foreach($genres as $genre) {
                $sql .= "genres LIKE '%" . $genre . "%' OR ";
            }
            $sql .= "0)";
            $sql .= "ORDER BY RAND() 
                LIMIT 200";
            $result = $conn->query($sql);
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"imdbId":"' . $rs["imdbID"]        . '",';
                $outp .= '"title":"'   . $rs["Title"]         . '",';
                $outp .= '"Year":"'    . $rs["Year"]          . '",';
                $outp .= '"genres":"'  . $rs["genres"]        . '",';
                $outp .= '"count":"'   . $rs["imdbVotes"]     . '",';
                $outp .= '"avg":"'     . $rs["imdbRating"]    . '"}'; 
            }
        }
        if ($year[2] == 1) {
            $sql = "SELECT imdbID, Title, Year, genres, imdbVotes, imdbRating
                FROM data_merged
                WHERE ";
            $sql .= "(Year >= 2001) AND ";
            $sql .= "(";
            foreach($genres as $genre) {
                $sql .= "genres LIKE '%" . $genre . "%' OR ";
            }
            $sql .= "0)";
            $sql .= "ORDER BY RAND() 
                LIMIT 200";
            $result = $conn->query($sql);
            while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"imdbId":"' . $rs["imdbID"]        . '",';
                $outp .= '"title":"'   . $rs["Title"]         . '",';
                $outp .= '"Year":"'    . $rs["Year"]          . '",';
                $outp .= '"genres":"'  . $rs["genres"]        . '",';
                $outp .= '"count":"'   . $rs["imdbVotes"]     . '",';
                $outp .= '"avg":"'     . $rs["imdbRating"]    . '"}'; 
            }
    }
    $outp ='['.$outp.']';
    $conn->close();
    echo($outp);

}

?>
