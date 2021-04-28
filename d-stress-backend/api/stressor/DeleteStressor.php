<?php
    // handles deletion of stressors from the database 
    require("../dbConnect.php");

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);

    if (empty($_POST['id'])) die();

    if ($_POST) {
        http_response_code(200);

        $id = $_POST['id'];
        
        $sql = "DELETE FROM stressors WHERE id = ?";

        $stmt = $db->prepare($sql);
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $stmt->close();
    } else {
        echo json_encode(["sent" => false, "message" => "Something went wrong"]);
    }
?>
