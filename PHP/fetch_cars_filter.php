<?php
include("../db/db_connect.php");

if (isset($_GET['brand'])) {
    $brand = $_GET['brand'];

    // Query to fetch cars of the selected brand
    $stmt = $conn->prepare("SELECT car_id, car_image, car_name, price_per_day FROM cars WHERE brand = ?");
    $stmt->bind_param("s", $brand);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $cars = [];

        while ($row = $result->fetch_assoc()) {
            $cars[] = $row;
        }

        echo json_encode(["status" => "success", "cars" => $cars]);
    } else {
        echo json_encode(["status" => "error", "message" => "No cars available for the selected brand."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No brand specified."]);
}
?>
