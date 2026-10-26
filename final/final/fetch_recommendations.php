<?php
// 設置錯誤報告
ini_set('display_errors', 1);
error_reporting(E_ALL);

// 連接到資料庫


$conn = new mysqli("localhost", "CS380B", "YZUCS380B", "CS380B");

if ($conn->connect_error) {
    die("連接失敗: " . $conn->connect_error);
}

// 查詢推薦的工具
$sql = "SELECT tool_name, tool_description, tool_category, tool_url FROM s1133305_recommendations";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $recommendations = [];
    while ($row = $result->fetch_assoc()) {
        $recommendations[] = $row;
    }
    echo json_encode($recommendations);
} else {
    echo json_encode([]);
}

$conn->close();
?>
