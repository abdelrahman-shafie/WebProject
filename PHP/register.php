<?php
include("../db/db_connect.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (empty($_POST['email']) || empty($_POST['username']) || empty($_POST['password']) || 
        empty($_POST['confirmpassword']) || empty($_POST['phone_number']) || 
        empty($_POST['age']) || empty($_POST['national_ID'])) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $confirmPassword = trim($_POST['confirmpassword']);
    $phone_number = trim($_POST['phone_number']);
    $age = trim($_POST['age']);
    $national_ID = trim($_POST['national_ID']);

    // Validate inputs
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email address."]);
        exit();
    }

    if (empty($username) || strlen($username) < 3) {
        echo json_encode(["status" => "error", "message" => "Username must be at least 3 characters long."]);
        exit();
    }

    if (empty($password) || strlen($password) < 8) {
        echo json_encode(["status" => "error", "message" => "Password must be at least 8 characters long."]);
        exit();
    }

    if ($password !== $confirmPassword) {
        echo json_encode(["status" => "error", "message" => "Passwords do not match."]);
        exit();
    }

    if (!is_numeric($phone_number) || strlen($phone_number) < 8 || strlen($phone_number) > 15) {
        echo json_encode(["status" => "error", "message" => "Invalid phone number."]);
        exit();
    }

    if (!is_numeric($age) || $age < 18 || $age > 80) {
        echo json_encode(["status" => "error", "message" => "Age must be a number between 18 and 80."]);
        exit();
    }

    if (strlen($national_ID) < 5) {
        echo json_encode(["status" => "error", "message" => "National ID must be at least 5 characters long."]);
        exit();
    }

    // Hash the password with MD5
    $hashedPassword = md5($password);

    // Check if user already exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? OR username = ? OR national_ID = ?");
    $stmt->bind_param("sss", $email, $username, $national_ID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "User already exists."]);
    } else {
        // Insert new user with hashed password
        $stmt = $conn->prepare("INSERT INTO users (email, username, password, phone_number, age, national_ID) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $email, $username, $hashedPassword, $phone_number, $age, $national_ID);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "User registered successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Registration failed."]);
        }
    }
}
?>
