<?php
    require("api/dbConnect.php");
    // Check connection
    if ($db->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully";
?>