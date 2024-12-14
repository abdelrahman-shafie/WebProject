<?php
include("../db/db_connect.php");

if (isset($_GET['car_id'])) {
    $car_id = intval($_GET['car_id']);

    // Fetch car details
    $stmt = $conn->prepare("SELECT car_image, car_logo, car_name, price_per_day, brand, model FROM cars WHERE car_id = ?");
    $stmt->bind_param("i", $car_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $car = $result->fetch_assoc();
        echo json_encode(["status" => "success", "car" => $car]);
    } else {
        echo json_encode(["status" => "error", "message" => "Car not found."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No car ID provided."]);
}
?>
