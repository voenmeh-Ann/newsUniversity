<?php
header('Content-Type: application/json');

ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "o738b21e_news";
$password = "news_Univer"; // Пустой пароль для пользователя root
$dbname = "o738b21e_news";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Ошибка подключения к базе данных'])); 
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Нет данных для обработки']);
    exit();
}

$email = $data['dynamicInput0'] ?? '';
$password = $data['dynamicInput1'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Email и пароль обязательны']);
    exit();
}

// Проверка на наличие пользователя с таким email и паролем
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
$stmt->bind_param("ss", $email, $password);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Пользователь найден, успешный вход
    echo json_encode([
        'success' => true, 
        'message' => 'Добро пожаловать!',
        'redirect' => 'account.php'  // Указываем URL для редиректа
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Неверный email или пароль']);
}

$stmt->close();
$conn->close();
?>
