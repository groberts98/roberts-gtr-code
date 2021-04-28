<?php
    // retrieves stressors from database
    require("../dbConnect.php");

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    if ($_GET) {
        http_response_code(200);

        $id = $_GET['id'];
        $filter = $_GET['filter'];

        if (!$id) { //no id means we are not retrieving a specific stressor
            if ($filter == "future") { //check the filter paramteter to verify which stressors we want
                $sql = "SELECT * FROM stressors WHERE `date` > CURDATE() ORDER BY `date` ASC";
                if ($result = mysqli_query($db, $sql)) {
                    if(mysqli_num_rows($result) > 0){
                        while($row = mysqli_fetch_assoc($result))
                            $data[] = $row; //build array of data
                        echo json_encode($data);
                    } else {}
                } else {
                    echo "ERROR: Could not execute $sql. " . mysqli_error($link);
                }
            } elseif ($filter == "past") {
                $sql = "SELECT * FROM stressors WHERE `date` <= CURDATE() ORDER BY `date` DESC";
                if ($result = mysqli_query($db, $sql)) {
                    if(mysqli_num_rows($result) > 0){
                        while($row = mysqli_fetch_assoc($result))
                            $data[] = $row; 
                        echo json_encode($data);
                    } else {}
                } else {
                    echo "ERROR: Could not execute $sql. " . mysqli_error($link);
                }
            } elseif ($filter == "current") { //get next non hidden stressor
                $sql = "SELECT * FROM stressors WHERE `date` >= CURDATE() AND `hidden` = 0 ORDER BY `date` ASC LIMIT 1";
                if ($result = mysqli_query($db, $sql)) {
                    if(mysqli_num_rows($result) > 0){
                        while($row = mysqli_fetch_assoc($result))
                            $data[] = $row; 
                        echo json_encode($data);
                    } else {}
                } else {
                    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
                }
            } elseif (!$filter) { //if no filter, get all stressors
                $sql = "SELECT * FROM stressors ORDER BY `date` DESC";
                if ($result = mysqli_query($db, $sql)) {
                    if(mysqli_num_rows($result) > 0){
                        while($row = mysqli_fetch_assoc($result))
                            $data[] = $row; 
                        echo json_encode($data);
                    } else {}
                } else {
                    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
                }
            }
        } else { //otherwise get specific stressor 
            $sql = "SELECT * FROM stressors WHERE id = $id";
            if ($result = mysqli_query($db, $sql)) {
                 if(mysqli_num_rows($result) > 0){
                    while($row = mysqli_fetch_assoc($result))
                        $data[] = $row; 
                    echo json_encode($data);
                } else {}
            } else {
                echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
            }
        }
    } else {
      echo json_encode(["sent" => false, "message" => "Something went wrong"]);
    }
?>
