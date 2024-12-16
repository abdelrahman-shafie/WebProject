<?php
// add_car.php
header("Content-Type: application/json");

// Include database connection
include("../db/db_connect.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve data from the AJAX request
    $fullCarName = trim($_POST["name"]); // Full car name
    $pricePerDay = trim($_POST["daily_price"]); // Price per day
    $carImage = trim($_POST["image"]); // Car image URL

    // Validate inputs
    if (empty($fullCarName) || empty($pricePerDay) || empty($carImage)) {
        echo json_encode(["status" => "error", "message" => "Invalid input values."]);
        exit;
    }

    // Parse full car name into brand and model
    $nameParts = explode(" ", $fullCarName); // Split the full name into words
    $brand = $nameParts[0]; // First word is the brand
    $model = implode(" ", array_slice($nameParts, 1)); // Remainder is the model
    $carLogo = "../Images/" . $brand . ".png"; // Path to car logo based on brand

    // Validate the parsed values
    if (empty($brand) || empty($model)) {
        echo json_encode(["status" => "error", "message" => "Could not parse brand or model."]);
        exit;
    }

    try {
        // Prepare and execute the INSERT query
        $stmt = $conn->prepare("
            INSERT INTO cars (car_name, price_per_day, car_image, brand, model, car_logo) 
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $stmt->bind_param("ssssss", $fullCarName, $pricePerDay, $carImage, $brand, $model, $carLogo);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Car added successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to insert car into database."]);
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
