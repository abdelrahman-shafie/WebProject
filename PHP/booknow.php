<?php
include("../DB/db_connect.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve and sanitize inputs
    $startDate = trim($_POST['start_date']);
    $endDate = trim($_POST['end_date']);
    $carId = intval($_POST['car_id']);

    // Check if car is already booked for the selected dates
    $checkQuery = "SELECT * FROM reservations WHERE car_id = ? AND (start_date BETWEEN ? AND ? OR end_date BETWEEN ? AND ?)";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("issss", $carId, $startDate, $endDate, $startDate, $endDate);
    $stmt->execute();
    $result = $stmt->get_result();

    // If there is a conflicting reservation, return "not_available"
    if ($result->num_rows > 0) {
        echo json_encode(["status" => "not_available"]);
    } else {
        // Fetch the car's price per day
        $carQuery = "SELECT price_per_day FROM cars WHERE car_id = ?";
        $stmt = $conn->prepare($carQuery);
        $stmt->bind_param("i", $carId);
        $stmt->execute();
        $carResult = $stmt->get_result();
        $car = $carResult->fetch_assoc();

        // If the car exists, calculate the total price
        if ($car) {
            // Extract numeric value from price_per_day (remove non-numeric characters)
            $pricePerDay = preg_replace('/[^0-9.]+/', '', $car['price_per_day']); // Remove currency symbols, spaces, etc.
            
        // Convert to float to ensure it's a numeric value
        $pricePerDay = floatval($pricePerDay);
                
                // Calculate the number of days between the start and end dates
$start = new DateTime($startDate);
$end = new DateTime($endDate);
$interval = $start->diff($end);
$numOfDays = $interval->days;

// Add 1 day to the total number of days
$numOfDays += 1;  // Increase the number of days by 1

$totalPrice = $numOfDays * $pricePerDay;  // Calculate the total price


           

            // Insert the reservation into the reservations table
            $insertQuery = "INSERT INTO reservations (car_id, start_date, end_date, num_of_days, total_price) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($insertQuery);
            $stmt->bind_param("issii", $carId, $startDate, $endDate, $numOfDays, $totalPrice);
            $stmt->execute();

            // Check if the reservation was successfully inserted
            if ($stmt->affected_rows > 0) {
                echo json_encode([
                    "status" => "success",
                    "num_of_days" => $numOfDays ,
                    "total_price" => $totalPrice
                ]);
            } else {
                echo json_encode(["status" => "error"]);
            }
        } else {
            echo json_encode(["status" => "error"]);
        }
    }

    $stmt->close();
    $conn->close();
}
?>
