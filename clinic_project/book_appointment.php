<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $service = $_POST['service'];
    $date = $_POST['date'];
    $time = $_POST['time'];

    // Insert data into the database
    $stmt = $conn->prepare("INSERT INTO appointments (name, email, service, appointment_date, appointment_time) VALUES (?, ?, ?, ?, ?)");
    if ($stmt->execute([$name, $email, $service, $date, $time])) {
        echo "Appointment booked successfully!";
    } else {
        echo "Failed to book appointment.";
    }
} else {
    echo "Invalid request method.";
}
?>
