/**
 * 幻灯片6 - 带有流程图的幻灯片
 */

// 幻灯片的HTML内容
export const html = `
  <h2>Professional Flowcharts</h2>
  <p>Elegant diagrams with custom styling and shadows</p>
  
  <div id="flowchart-container" style="position: relative; width: 90%; height: 400px; margin: 0 auto; overflow: hidden; border: 2px solid #ddd; background-color: #f9f9f9;"></div>
`;

// 初始化函数
export function initialize() {
  console.log('Slide 6 initialized - Flowchart');
  initFlowchart();
  
  // 添加窗口大小变化事件监听器
  window.addEventListener('resize', debounce(() => {
    initFlowchart(); // 重新绘制流程图以适应新的容器大小
  }, 200));
}

// 初始化流程图
function initFlowchart() {
  const container = document.getElementById('flowchart-container');
  if (!container) {
    console.error('Cannot find flowchart container');
    return;
  }
  
  // 清空容器
  container.innerHTML = '';
  
  try {
    // 获取容器尺寸
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // 节点数据
    const nodes = [
      { id: 'start', text: 'Start Process', type: 'process-node', x: containerWidth * 0.5, y: 30 },
      { id: 'decision', text: 'Decision Point', type: 'decision-node', x: containerWidth * 0.5, y: 120 },
      { id: 'process1', text: 'Processing Step', type: 'process-node', x: containerWidth * 0.25, y: 230 },
      { id: 'process2', text: 'Alternative Step', type: 'process-node', x: containerWidth * 0.75, y: 230 },
      { id: 'analysis', text: 'Data Analysis', type: 'process-node', x: containerWidth * 0.5, y: 320 },
      { id: 'report', text: 'Generate Report', type: 'process-node', x: containerWidth * 0.5, y: 390 },
      { id: 'end', text: 'End Process', type: 'end-node', x: containerWidth * 0.5, y: 460 }
    ];
    
    // 连接数据
    const connections = [
      ['start', 'decision', ''],
      ['decision', 'process1', 'Option 1'],
      ['decision', 'process2', 'Option 2'],
      ['process1', 'analysis', ''],
      ['process2', 'analysis', ''],
      ['analysis', 'report', ''],
      ['report', 'end', '']
    ];
    
    // 创建CSS样式
    const style = document.createElement('style');
    style.textContent = `
      .node {
        position: absolute;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.15);
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        transition: all 0.3s ease;
        cursor: pointer;
        min-width: 120px;
        z-index: 10;
      }
      
      .node:hover {
        transform: translateY(-5px);
        box-shadow: 5px 8px 15px rgba(0, 0, 0, 0.2);
      }
      
      .process-node {
        background-color: #e8f5e9;
        border: 2px solid #2e7d32;
        color: #1b5e20;
      }
      
      .decision-node {
        background-color: #e1f5fe;
        border: 2px solid #01579b;
        color: #01579b;
        border-radius: 4px;
        transform: rotate(45deg);
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .decision-node span {
        transform: rotate(-45deg);
        display: inline-block;
        width: 120px;
        font-size: 14px;
      }
      
      .end-node {
        background-color: #f3e5f5;
        border: 2px solid #6a1b9a;
        color: #6a1b9a;
      }
      
      .arrow {
        position: absolute;
        border-top: 2px solid #5D8AA8;
        z-index: 5;
      }
      
      .label {
        position: absolute;
        background-color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 12px;
        color: #5D8AA8;
        white-space: nowrap;
        z-index: 15;
      }
    `;
    container.appendChild(style);
    
    // 创建节点
    const nodeElements = {};
    const nodeData = {};
    
    for (const node of nodes) {
      const nodeEl = document.createElement('div');
      nodeEl.className = `node ${node.type}`;
      
      // 特殊处理决策节点
      if (node.type === 'decision-node') {
        nodeEl.innerHTML = `<span>${node.text}</span>`;
      } else {
        nodeEl.textContent = node.text;
      }
      
      // 计算中心位置
      const centerX = node.x;
      let width = 140; // 默认宽度估计
      
      // 定位节点（居中）
      if (node.type === 'decision-node') {
        // 对于菱形（决策节点）
        nodeEl.style.left = `${centerX - 50}px`; // 50是宽度的一半
      } else {
        // 对于矩形节点
        nodeEl.style.left = `${centerX - (width/2)}px`;
      }
      
      nodeEl.style.top = `${node.y}px`;
      
      // 存储节点元素及其中心坐标
      nodeEl.dataset.id = node.id;
      nodeElements[node.id] = nodeEl;
      nodeData[node.id] = {
        centerX: centerX,
        centerY: node.y + (node.type === 'decision-node' ? 50 : 25), // 近似中心Y
        type: node.type
      };
      
      container.appendChild(nodeEl);
    }
    
    // 创建连接，稍微延迟确保节点已渲染
    setTimeout(() => {
      drawConnections(container, nodeElements, nodeData, connections);
    }, 50);
    
    console.log('Flowchart initialized successfully');
  } catch (e) {
    console.error('Flowchart initialization error:', e);
  }
}

// 绘制连接
function drawConnections(container, nodeElements, nodeData, connections) {
  for (const conn of connections) {
    const [fromId, toId, label] = conn;
    
    // 获取节点数据
    const fromNode = nodeData[fromId];
    const toNode = nodeData[toId];
    
    if (!fromNode || !toNode) {
      console.error(`Connection error: cannot find nodes for ${fromId} -> ${toId}`);
      continue;
    }
    
    // 获取计算的中心点
    const fromX = fromNode.centerX;
    const fromY = fromNode.centerY;
    const toX = toNode.centerX;
    const toY = toNode.type === 'decision-node' ? toNode.centerY - 50 : toNode.centerY - 25; // 目标节点的顶部
    
    // 根据位置创建连接
    if (Math.abs(fromX - toX) < 10) {
      createVerticalArrow(container, fromX, fromY, toY, label);
    } else {
      createPathWithSegments(container, fromX, fromY, toX, toY, label);
    }
  }
}

// 创建垂直箭头
function createVerticalArrow(container, x, fromY, toY, label) {
  const arrow = document.createElement('div');
  arrow.className = 'arrow';
  arrow.style.left = `${x}px`;
  arrow.style.top = `${fromY}px`;
  arrow.style.height = `${toY - fromY}px`;
  arrow.style.width = '0';
  
  // 添加箭头头部
  const arrowHead = document.createElement('div');
  arrowHead.style.position = 'absolute';
  arrowHead.style.bottom = '0';
  arrowHead.style.left = '-4px';
  arrowHead.style.width = '0';
  arrowHead.style.height = '0';
  arrowHead.style.borderLeft = '5px solid transparent';
  arrowHead.style.borderRight = '5px solid transparent';
  arrowHead.style.borderTop = '10px solid #5D8AA8';
  arrow.appendChild(arrowHead);
  
  container.appendChild(arrow);
  
  // 添加标签（如果存在）
  if (label) {
    const labelEl = document.createElement('div');
    labelEl.className = 'label';
    labelEl.textContent = label;
    labelEl.style.left = `${x + 10}px`;
    labelEl.style.top = `${(fromY + toY) / 2 - 10}px`;
    container.appendChild(labelEl);
  }
}

// 创建带段的路径
function createPathWithSegments(container, fromX, fromY, toX, toY, label) {
  // 计算中点
  const midY = (fromY + toY) / 2;
  
  // 第一垂直段
  const line1 = document.createElement('div');
  line1.className = 'arrow';
  line1.style.left = `${fromX}px`;
  line1.style.top = `${fromY}px`;
  line1.style.height = `${midY - fromY}px`;
  line1.style.width = '0';
  container.appendChild(line1);
  
  // 水平段
  const line2 = document.createElement('div');
  line2.className = 'arrow';
  
  if (fromX > toX) {
    // 从右到左
    line2.style.left = `${toX}px`;
    line2.style.width = `${fromX - toX}px`;
    
    // 给左箭头添加箭头头部
    const arrowHead = document.createElement('div');
    arrowHead.style.position = 'absolute';
    arrowHead.style.top = '-4px';
    arrowHead.style.left = '0';
    arrowHead.style.width = '0';
    arrowHead.style.height = '0';
    arrowHead.style.borderTop = '5px solid transparent';
    arrowHead.style.borderBottom = '5px solid transparent';
    arrowHead.style.borderRight = '10px solid #5D8AA8';
    line2.appendChild(arrowHead);
  } else {
    // 从左到右
    line2.style.left = `${fromX}px`;
    line2.style.width = `${toX - fromX}px`;
    
    // 给右箭头添加箭头头部
    const arrowHead = document.createElement('div');
    arrowHead.style.position = 'absolute';
    arrowHead.style.top = '-4px';
    arrowHead.style.right = '0';
    arrowHead.style.width = '0';
    arrowHead.style.height = '0';
    arrowHead.style.borderTop = '5px solid transparent';
    arrowHead.style.borderBottom = '5px solid transparent';
    arrowHead.style.borderLeft = '10px solid #5D8AA8';
    line2.appendChild(arrowHead);
  }
  
  line2.style.top = `${midY}px`;
  line2.style.height = '0';
  container.appendChild(line2);
  
  // 最后一个垂直段
  const line3 = document.createElement('div');
  line3.className = 'arrow';
  line3.style.left = `${toX}px`;
  line3.style.top = `${midY}px`;
  line3.style.height = `${toY - midY}px`;
  line3.style.width = '0';
  container.appendChild(line3);
  
  // 添加标签到水平段
  if (label) {
    const labelEl = document.createElement('div');
    labelEl.className = 'label';
    labelEl.textContent = label;
    labelEl.style.left = `${(fromX + toX) / 2 - 25}px`;
    labelEl.style.top = `${midY - 20}px`;
    container.appendChild(labelEl);
  }
}

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// 清理函数
export function cleanup() {
  console.log('Slide 6 cleaned up');
  
  // 移除窗口大小变化事件监听器
  window.removeEventListener('resize', debounce(() => {
    initFlowchart();
  }, 200));
} 