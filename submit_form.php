<?php
// Устанавливаем заголовки для работы с JSON
header('Content-Type: application/json');

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Подключаемся к базе данных
$servername = "localhost";
$username = "o738b21e_news";
$password = "news_Univer"; // Пустой пароль для пользователя root
$dbname = "o738b21e_news";

$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем подключение
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Ошибка подключения к базе данных']));
}

// Получаем данные из POST-запроса
$data = json_decode(file_get_contents("php://input"), true);

// Проверяем, что данные получены
if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Нет данных для обработки']);
    exit();
}

// Извлекаем данные из объекта (в зависимости от полей формы)
$name = $data['dynamicInput0'] ?? '';
$surname = $data['dynamicInput1'] ?? '';
$birthdate = $data['dynamicInput2'] ?? '';
$email = $data['dynamicInput3'] ?? '';
$password = $data['dynamicInput4'] ?? '';

// Проверяем, что все обязательные поля заполнены
if (empty($name) || empty($surname) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Все поля должны быть заполнены']);
    exit();
}

// Подготавливаем запрос для вставки данных в таблицу users
$stmt = $conn->prepare("INSERT INTO users (name, surname, birthdate, email, password) VALUES (?, ?, ?, ?, ?)");
if ($stmt === false) 
{
    die(json_encode(['success' => false, 'message' => 'Ошибка в SQL запросе: ' . $conn->error]));
}


$stmt->bind_param("sssss", $name, $surname, $birthdate, $email, $password); // Привязываем параметры (строки)

if ($stmt->execute()) 
{
    echo json_encode(['success' => true, 'message' => 'Данные успешно добавлены']);
} 
else 
{
    // Выводим более подробную информацию об ошибке
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка при сохранении данных',
        'error' => $stmt->error,  // Даем подробности ошибки
        'query' => "INSERT INTO users (name, surname, birthdate, email, password) VALUES ('$name', '$surname', '$birthdate', '$email', '$password')" // Показываем полный SQL запрос
    ]);
}

$stmt->close();
$conn->close();
?>