// recommendations.js

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('main.tools-container');
  
    // Fetch recommendations from the server
    fetch('fetch_recommendations.php')
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          mainContent.innerHTML = '<p>目前沒有推薦的工具。</p>';
          return;
        }
  
        mainContent.innerHTML = ''; // 清空載入訊息
  
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
      })
      .catch(error => {
        console.error('Error fetching recommendations:', error);
        mainContent.innerHTML = '<p>載入失敗，請稍後再試。</p>';
      });
  });

  