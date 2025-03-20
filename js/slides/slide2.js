/**
 * 幻灯片2 - 带有简单交互的内容
 */

// 幻灯片的HTML内容
export const html = `
  <h2>Second Slide</h2>
  <p>Content for the second slide with interactive elements</p>
  
  <div style="color: blue; margin-bottom: 20px">Click the button below to change this text color</div>
  
  <button id="colorButton" style="padding: 8px 16px; background: #5D8AA8; color: white; border: none; border-radius: 4px; cursor: pointer;">
    Change Color
  </button>
`;

// 当前颜色索引
let colorIndex = 0;

// 颜色数组
const colors = ['blue', 'red', 'green', 'purple', 'orange'];

// 初始化函数 - 设置按钮点击事件
export function initialize() {
  console.log('Slide 2 initialized');
  
  // 获取按钮并添加事件监听器
  const button = document.getElementById('colorButton');
  if (button) {
    button.addEventListener('click', changeColor);
  }
}

// 颜色变化处理函数
function changeColor() {
  // 更新颜色索引
  colorIndex = (colorIndex + 1) % colors.length;
  
  // 获取文本元素并更改颜色
  const textElement = document.querySelector('div[style*="color"]');
  if (textElement) {
    textElement.style.color = colors[colorIndex];
  }
}

// 清理函数 - 移除事件监听器
export function cleanup() {
  console.log('Slide 2 cleaned up');
  
  // 移除事件监听器
  const button = document.getElementById('colorButton');
  if (button) {
    button.removeEventListener('click', changeColor);
  }
} 