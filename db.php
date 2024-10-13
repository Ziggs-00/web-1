<?php
$host = 'localhost';
$db = 'clinic_appointments';  // Replace if you used a different name
$user = 'root';               // Default MySQL user
$pass = '';                   // Default password (leave empty)

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
