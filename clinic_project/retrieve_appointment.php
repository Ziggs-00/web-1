<?php
include 'db.php';

$email = $_POST['email'];

$stmt = $conn->prepare("SELECT * FROM appointments WHERE email = ?");
$stmt->execute([$email]);
$appointment = $stmt->fetch(PDO::FETCH_ASSOC);

if ($appointment) {
    echo json_encode($appointment);
} else {
    echo "No appointment found.";
}
?>
