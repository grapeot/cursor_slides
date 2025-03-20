/**
 * 幻灯片3 - 带有渐进展示的内容
 */

// 幻灯片的HTML内容
export const html = `
  <h2>Third Slide with Progressive Reveal</h2>
  <ul>
    <li class="fragment">This item appears on click</li>
    <li class="fragment">This item appears second</li>
    <li class="fragment">This item appears third</li>
  </ul>
  
  <div class="fragment" style="margin-top: 20px; padding: 10px; background-color: #f0f0f0; border-radius: 4px;">
    <p>This is a bonus content block that appears at the end!</p>
  </div>
`;

// 初始化函数
export function initialize() {
  console.log('Slide 3 initialized');
}

// 清理函数
export function cleanup() {
  console.log('Slide 3 cleaned up');
} 