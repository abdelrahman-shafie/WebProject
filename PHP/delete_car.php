<?php
// delete_car.php
header("Content-Type: application/json");

// Include database connection
include("../db/db_connect.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve car_id from AJAX request
    $carId = intval($_POST["car_id"]); // Ensure it's an integer for safety

    // Validate car_id
    if (empty($carId)) {
        echo json_encode(["status" => "error", "message" => "Invalid car ID."]);
        exit;
    }

    try {
        // Prepare and execute the DELETE query
        $stmt = $conn->prepare("DELETE FROM cars WHERE car_id = ?");
        $stmt->bind_param("i", $carId);

        if ($stmt->execute() && $stmt->affected_rows > 0) {
            echo json_encode(["status" => "success", "message" => "Car deleted successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Car not found or already deleted."]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
