<?php
    //handles editting of stressors in database
    require("../dbConnect.php");

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);

    if (
        empty($_POST['id']) &&
        empty($_POST['title']) &&
        empty($_POST['date']) &&
        empty($_POST['description']) &&
        empty($_POST['copingPlan'])  &&
        empty($_POST['cpExecuted']) &&
        empty($_POST['anticipatedSL']) &&
        empty($_POST['actualSL']) &&
        empty($_POST['uncertainty']) &&
        empty($_POST['uncontrollability']) &&
        empty($_POST['hidden'])
    ) die();

    if ($_POST) {
        http_response_code(200);

        $id = $_POST['id'];
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

        $sql = "UPDATE stressors
                SET
                    `title` = ?,
                    `date` = ?,
                    `description` = ?,
                    `coping-plan` = ?,
                    `cp-executed` = ?,
                    `anticipated-SL` = ?,
                    `actual-SL` = ?,
                    `uncertainty` = ?,
                    `uncontrollability` = ?,
                    `hidden` = ?
                WHERE `id` = ?";

        $stmt = $db->prepare($sql);
        $stmt->bind_param("sssssssssss", $title, $date, $description, $copingPlan, $cpExecuted, $anticipatedSL, $actualSL, $uncertainty, $uncontrollability, $hidden, $id);
        $stmt->execute();
        $stmt->close();
    } else {
        echo json_encode(["sent" => false, "message" => "Something went wrong"]);
    }
?>
