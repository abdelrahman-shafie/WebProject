<?php
include("../db/db_connect.php");

$sql = "SELECT car_id, car_image, car_name, price_per_day, brand, model FROM cars";
$result = $conn->query($sql);

$cars = array();

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $cars[] = array(
            "car_id" => $row["car_id"],
            "image" => $row["car_image"],
            "name" => $row["car_name"],
            "daily_price" => $row["price_per_day"]
        );
    }
}

header('Content-Type: application/json');
echo json_encode($cars);
