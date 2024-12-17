<?php
session_start();  // Start the session
include("../db/db_connect.php");  // Include your database connection

// Check if the user is logged in (for AJAX requests)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['check_login'])) {
    if (isset($_SESSION['user_id'])) {  // Check if the user_id is set in the session
        // Optionally, check if the user exists in the database
        $user_id = $_SESSION['user_id'];
        $stmt = $conn->prepare("SELECT user_id FROM users WHERE user_id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // User exists in the database and is logged in
            echo json_encode(["loggedIn" => true]);  // Send response as true
        } else {
            // User session is not valid (user doesn't exist in DB)
            session_unset();  // Unset session data
            session_destroy();  // Destroy session
            echo json_encode(["loggedIn" => false]);  // Send response as false
        }
    } else {
        // No session or user_id found
        echo json_encode(["loggedIn" => false]);
    }
    exit();  // Stop further script execution
}

// Handle login request for POST method (user login)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = md5(trim($_POST['password'])); // Hash the password with MD5

    // Query to validate username and password
    $stmt = $conn->prepare("SELECT user_id, email, role FROM users WHERE email = ? AND password = ?");
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Store user data in session
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['role'] = $user['role']; // Role is either 'admin' or 'customer'

        // Redirect based on role
        if ($user['role'] === 'admin') {
            header("Location: ../HTML/cardisplay_admin.html"); // Redirect to admin dashboard
        } elseif ($user['role'] === 'customer') {
            header("Location: ../HTML/homepage.html"); // Redirect to customer dashboard
        }
        
        exit();
    } else {
        // If invalid credentials
        echo "<script>alert('Invalid email or password.'); window.location.href = '../HTML/loginpage.html';</script>";
    }
}
?>
