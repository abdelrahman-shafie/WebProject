<?php
session_start();
include("../db/db_connect.php");

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

// Read the JSON input
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid data received']);
    exit;
}

// Extract and sanitize the input
$username = isset($data['username']) ? trim($data['username']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$national_ID = isset($data['national_ID']) ? trim($data['national_ID']) : '';
$phone_number = isset($data['phone_number']) ? trim($data['phone_number']) : '';
$age = isset($data['age']) ? (int)$data['age'] : 0;

// Update the user's data in the database
$stmt = $conn->prepare("UPDATE users SET username = ?, email = ?, national_ID = ?, phone_number = ?, age = ? WHERE id = ?");
$stmt->bind_param("ssssii", $username, $email, $national_ID, $phone_number, $age, $user_id);
$success = $stmt->execute();
$stmt->close();

if ($success) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Database update failed']);
}
