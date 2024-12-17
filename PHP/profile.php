<?php
include("../db/db_connect.php");

session_start();

// Assuming the user ID is stored in session after login
// Adjust according to your login logic
if (!isset($_SESSION['user_id'])) {
    header('Content-Type: appliation/json');
    echo json_encode([]);
    exit();
}

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("SELECT username, email, national_ID, age, phone_number FROM users WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$userData = [];
if ($row = $result->fetch_assoc()) {
    $userData = [
        'username' => $row['username'],
        'email' => $row['email'],
        'national_ID' => $row['national_ID'],
        'age' => $row['age'],
        'phone_number' => $row['phone_number']
    ];
}

$stmt->close();

header('Content-Type: application/json');
echo json_encode($userData);
