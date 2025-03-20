/**
 * 幻灯片4 - 带有Chart.js图表的内容
 */

// 幻灯片的HTML内容
export const html = `
  <h2>Dynamic Charts</h2>
  <p>Interactive data visualization with Chart.js</p>
  
  <div style="width: 80%; height: 300px; margin: 0 auto; position: relative; border: 2px solid #ddd; background-color: #f9f9f9; padding: 10px; border-radius: 8px;">
    <canvas id="myChart"></canvas>
  </div>
  
  <div style="text-align: center; margin-top: 20px;">
    <button id="updateChartBtn" style="padding: 8px 16px; background: #5D8AA8; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Update Data
    </button>
  </div>
`;

// 图表实例
let chartInstance = null;

// 初始化函数
export function initialize() {
  console.log('Slide 4 initialized - Chart.js');
  initializeChart();
  
  // 添加更新按钮的事件监听器
  const updateButton = document.getElementById('updateChartBtn');
  if (updateButton) {
    updateButton.addEventListener('click', updateChartData);
  }
}

// 初始化图表
function initializeChart() {
  const ctx = document.getElementById('myChart');
  if (!ctx) {
    console.error('Cannot find chart canvas element');
    return;
  }
  
  // 如果已存在图表实例，先销毁它
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  try {
    // 生成随机数据
    const data1 = Array.from({length: 6}, () => Math.floor(Math.random() * 30));
    const data2 = Array.from({length: 6}, () => Math.floor(Math.random() * 30));
    
    // 创建新图表
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales 2023',
          data: data1,
          borderWidth: 3,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3
        }, {
          label: 'Sales 2024',
          data: data2,
          borderWidth: 3,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.3
        }]
      },
      options: {
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        },
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        }
      }
    });
    
    console.log('Chart initialized successfully');
  } catch (e) {
    console.error('Chart initialization error:', e);
  }
}

// 更新图表数据
function updateChartData() {
  if (!chartInstance) {
    console.warn('No chart instance to update, initializing new chart');
    initializeChart();
    return;
  }
  
  try {
    // 生成新的随机数据
    chartInstance.data.datasets[0].data = Array.from({length: 6}, () => Math.floor(Math.random() * 30));
    chartInstance.data.datasets[1].data = Array.from({length: 6}, () => Math.floor(Math.random() * 30));
    
    // 更新图表
    chartInstance.update();
    console.log('Chart data updated');
  } catch (e) {
    console.error('Error updating chart:', e);
  }
}

// 清理函数
export function cleanup() {
  console.log('Slide 4 cleaned up');
  
  // 移除更新按钮的事件监听器
  const updateButton = document.getElementById('updateChartBtn');
  if (updateButton) {
    updateButton.removeEventListener('click', updateChartData);
  }
  
  // 销毁图表
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
} 