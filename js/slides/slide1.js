/**
 * 幻灯片1 - 简单文本内容
 */

// 幻灯片的HTML内容
export const html = `
  <h2>First Slide</h2>
  <p>This is a standalone module file as first slide content</p>
  <ul>
    <li>Point 1</li>
    <li>Point 2</li>
    <li>Point 3</li>
  </ul>
`;

// 初始化函数 - 这个简单幻灯片不需要特殊初始化
export function initialize() {
  console.log('Slide 1 initialized');
}

// 清理函数 - 这个简单幻灯片不需要特殊清理
export function cleanup() {
  console.log('Slide 1 cleaned up');
} 