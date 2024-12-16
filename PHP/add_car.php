<?php
// add_car.php
header("Content-Type: application/json");

// Include database connection
include("../db/db_connect.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve data from the AJAX request
    $carName = trim($_POST["name"]);
    $carPrice = trim($_POST["daily_price"]);
    $carImage = trim($_POST["image"]);

    // Validate inputs
    if (empty($carName) || empty($carPrice) || empty($carImage)) {
        echo json_encode(["status" => "error", "message" => "Invalid input values."]);
        exit;
    }

    try {
        // Corrected column names in INSERT query
        $stmt = $conn->prepare("INSERT INTO cars (car_name, price_per_day, car_image) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $carName, $carPrice, $carImage);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Car added successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to insert car into database."]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }

    // Close the connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
