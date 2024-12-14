<?php
session_start();
include("../db/db_connect.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = md5(trim($_POST['password'])); // Hash the password with MD5

    // Query to validate username and password
    $stmt = $conn->prepare("SELECT id, username, role FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Store user data in session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role']; // Role is either 'admin' or 'customer'

        // Redirect based on role
        if ($user['role'] === 'admin') {
            header("Location: ../HTML/cardisplay.html"); // Redirect to admin dashboard
        } elseif ($user['role'] === 'customer') {
            header("Location: ../HTML/profile.html"); // Redirect to customer dashboard
        }
        exit();
    } else {
        // If invalid credentials
        echo "<script>alert('Invalid username or password.'); window.location.href = '../HTML/loginpage.html';</script>";
    }
}
?>
