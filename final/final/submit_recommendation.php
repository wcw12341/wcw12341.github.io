<?php
// 設置錯誤報告
ini_set('display_errors', 1);
error_reporting(E_ALL);




// 建立連接
$conn = new mysqli("localhost", "CS380B", "YZUCS380B", "CS380B");

// 檢查連接是否成功
if ($conn->connect_error) {
    die("連接失敗: " . $conn->connect_error);
}

// 檢查是否為 POST 請求
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // 獲取表單數據
    $tool_name = isset($_POST['tool-name']) ? trim($_POST['tool-name']) : '';
    $tool_description = isset($_POST['tool-description']) ? trim($_POST['tool-description']) : '';
    $tool_category = isset($_POST['tool-category']) ? trim($_POST['tool-category']) : '';
    $tool_url = isset($_POST['tool-url']) ? trim($_POST['tool-url']) : '';

    // 基本的表單驗證
    if (empty($tool_name) || empty($tool_description) || empty($tool_category) || empty($tool_url)) {
        echo '所有欄位都需要填寫！';
        exit;
    }

    // 如果網址格式不正確，顯示錯誤信息
    if (!filter_var($tool_url, FILTER_VALIDATE_URL)) {
        echo '請輸入有效的工具網址';
        exit;
    }

    // 確保 tool_category 來自已定義的分類
    $valid_categories = ['通用助手', '效率工具', '內容創作工具', '產品開發工具', '創意工具', '學習與成長工具', '娛樂工具'];

    // 準備 SQL 查詢
    $stmt = $conn->prepare("INSERT INTO s1133305_recommendations (tool_name, tool_description, tool_category, tool_url) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $tool_name, $tool_description, $tool_category, $tool_url);

    // 執行 SQL 查詢並檢查是否成功
    if ($stmt->execute()) {
        echo '感謝您的推薦！';
    } else {
        echo '提交失敗';
    }

    // 關閉預處理語句和資料庫連接
    $stmt->close();
    $conn->close();
} else {
    echo '無效的請求方式。';
}
?>
