<?php
    //handles saving stressors to database
    require("../dbConnect.php");

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);

    if (
        empty($_POST['title']) &&
        empty($_POST['date']) &&
        empty($_POST['description']) &&
        empty($_POST['copingPlan'])  &&
        empty($_POST['cpExecuted'])  &&
        empty($_POST['anticipatedSL']) &&
        empty($_POST['actualSL']) &&
        empty($_POST['uncertainty']) &&
        empty($_POST['uncontrollability']) &&
        empty($_POST['hidden'])
    ) die();

    if ($_POST) {
        http_response_code(200);

        $title = $_POST['title'];
        $date = $_POST['date'];
        $description = $_POST['description'];
        $copingPlan = $_POST['copingPlan'];
        $cpExecuted = $_POST['cpExecuted'];
        $anticipatedSL = $_POST['anticipatedSL'];
        $actualSL = $_POST['actualSL'];
        $uncertainty = $_POST['uncertainty'];
        $uncontrollability = $_POST['uncontrollability'];
        $hidden = $_POST['hidden'];

        $sql = "INSERT INTO stressors (`title`, `date`, `description`, `coping-plan`, `cp-executed`, `anticipated-SL`, `actual-SL`, `uncertainty`, `uncontrollability`, `hidden`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      
        $stmt = $db->prepare($sql);
        $stmt->bind_param("ssssssssss", $title, $date, $description, $copingPlan, $cpExecuted, $anticipatedSL, $actualSL, $uncertainty, $uncontrollability, $hidden);
        $stmt->execute();
        $stmt->close();
    } else {
        echo json_encode(["sent" => false, "message" => "Something went wrong"]);
    }
?>
