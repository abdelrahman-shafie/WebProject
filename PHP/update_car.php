<?php
// update_car.php
header("Content-Type: application/json");

// Include database connection
include("../db/db_connect.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve data from the AJAX request
    $carId = intval($_POST["car_id"]);
    $carName = trim($_POST["car_name"]);
    $carPrice = trim($_POST["price_per_day"]);

    // Validate inputs
    if (empty($carId) || empty($carName) || empty($carPrice)) {
        echo json_encode(["status" => "error", "message" => "Invalid input values."]);
        exit;
    }

    try {
        // Prepare and execute the UPDATE query
        $stmt = $conn->prepare("UPDATE cars SET car_name = ?, price_per_day = ? WHERE car_id = ?");
        $stmt->bind_param("ssi", $carName, $carPrice, $carId);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Car updated successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update car in the database."]);
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
