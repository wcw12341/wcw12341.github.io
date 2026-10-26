// 當點擊工具卡片時，顯示詳細信息
document.querySelectorAll('.tool-card').forEach((card) => {
  card.addEventListener('click', () => {
    const name = card.querySelector('p').textContent;
    const imgSrc = card.querySelector('img').src;
    const description = card.getAttribute('data-description'); // 從 data-description 屬性獲取描述
    const link = card.getAttribute('data-link'); // 從 data-link 屬性獲取鏈接
    showDetail(name, description, imgSrc, link); // 呼叫 showDetail 函數顯示詳情
  });
});

function showDetail(name, description, imgSrc, link) {
  const detailPopup = document.getElementById('toolDetail');
  const detailImage = document.getElementById('detailImage');
  const detailName = document.getElementById('detailName');
  const detailDescription = document.getElementById('detailDescription');
  const detailLink = document.getElementById('detailLink');

  // 填充詳細信息
  detailImage.src = imgSrc;
  detailName.textContent = name;
  detailDescription.textContent = description;
  detailLink.href = link;
  detailLink.textContent = "前往網站"; 

  // 顯示彈窗，添加 show 類
  detailPopup.classList.add('show');
}

// 關閉彈窗
function closeDetail() {
  const detailPopup = document.getElementById('toolDetail');
  // 隱藏彈窗，移除 show 類
  detailPopup.classList.remove('show');
}


// 篩選工具卡片的函數
function filterCategory(category) {
  const allSections = document.querySelectorAll('.category-section');
  const allCards = document.querySelectorAll('.tool-card');
  const categoryButtons = document.querySelectorAll('.category-buttons button');
  
  // 更新分類標籤
  const categoryLabel = document.getElementById('categoryLabel');
  const categoryNames = {
    'all': '所有工具',
    'general-assistance': '通用助手',
    'get-work-done': '效率工具',
    'build-an-audience': '內容創作工具',
    'build-a-product': '產品開發工具',
    'get-creative': '創意工具',
    'learn-or-grow': '學習與成長工具',
    'have-fun': '娛樂工具'
  };
  categoryLabel.textContent = `當前分類: ${categoryNames[category] || '所有工具'}`;

  if (category === 'all') {
    allSections.forEach(section => section.style.display = 'block');
    allCards.forEach(card => card.style.display = 'block');
  } else {
    allSections.forEach(section => {
      section.style.display = section.id === `${category}-section` ? 'block' : 'none';
    });
    allCards.forEach(card => {
      card.style.display = card.getAttribute('data-category') === category ? 'block' : 'none';
    });
  }

  // 更新按鈕樣式
  categoryButtons.forEach(button => button.classList.remove('active'));
  const currentButton = Array.from(categoryButtons).find(button => button.textContent === categoryNames[category]);
  if (currentButton) {
    currentButton.classList.add('active');
  }
}



document.getElementById('recommend-btn').addEventListener('click', function() {
  const recommendSection = document.getElementById('recommend-section');
  // 切換顯示狀態
  if (recommendSection.style.display === 'none') {
    recommendSection.style.display = 'block';
  } else {
    recommendSection.style.display = 'none';
  }
});

// 使用 fetch 提交表單數據
document.getElementById("recommend-form").addEventListener("submit", function(event) {
  event.preventDefault(); // 阻止表單默認提交行為

  // 獲取表單數據
  const formData = new FormData(this);

  // 使用 fetch 發送 POST 請求
  fetch('submit_recommendation.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text()) // 讀取返回的響應
  .then(data => {
    alert(data); // 顯示 PHP 返回的結果
    // 清空表單
    document.getElementById("recommend-form").reset();
    // 隱藏表單區域
    document.getElementById('recommend-section').style.display = 'none';
  })
  .catch(error => {
    console.error('錯誤:', error);
    alert('提交失敗，請稍後再試。');
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");

  // 初始化主題
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  // 切換按鈕事件監聽
  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // 更新 LocalStorage 中的主題狀態
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
});

// 當點擊「查看他人推薦」按鈕時，載入推薦工具
// 點擊「查看他人推薦」按鈕時加載推薦工具
document.getElementById('view-recommendations').addEventListener('click', function () {
  fetch('fetch_recommendations.php')
      .then(response => response.json())
      .then(data => {
          displayRecommendations(data);
      })
      .catch(error => {
          console.error('Error fetching recommendations:', error);
      });
});

function displayRecommendations(data) {
  const mainContent = document.querySelector('main.tools-container');
  mainContent.innerHTML = ''; // 清空當前內容

  data.forEach(tool => {
      const toolCard = document.createElement('div');
      toolCard.className = 'tool-card';
      toolCard.innerHTML = `
          <h3>${tool.tool_name}</h3>
          <p>${tool.tool_description}</p>
          <p><strong>分類：</strong>${tool.tool_category}</p>
          <a href="${tool.tool_url}" target="_blank" class="visit-btn">造訪網站</a>
      `;
      mainContent.appendChild(toolCard);
  });
}
// 搜尋功能
function filterTools() {
  const input = document.getElementById('search-input').value.toLowerCase(); // 取得使用者輸入並轉小寫
  const toolCards = document.querySelectorAll('.tool-card'); // 獲取所有工具卡

  toolCards.forEach(card => {
    const description = card.getAttribute('data-description').toLowerCase(); // 取得 data-description 屬性
    const name = card.querySelector('p').textContent.toLowerCase(); // 取得工具名稱
    if (description.includes(input) || name.includes(input)) {
      card.style.display = 'block'; // 符合條件則顯示
    } else {
      card.style.display = 'none'; // 不符合條件則隱藏
    }
  });
}


