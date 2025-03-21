/**
 * Slide 6 - Horizontal Flowchart
 */

// HTML content for the slide
export const html = `
  <h2>Horizontal Flowchart</h2>
  <p>Left-to-right flow with arrows connecting from node edges</p>
  
  <div id="flowchart-container" style="width: 85%; height: 300px; margin: 20px auto; position: relative; background-color: #fff; border: 2px solid #ddd; border-radius: 8px;"></div>
  
  <svg width="0" height="0" style="position: absolute;">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4285f4" />
      </marker>
    </defs>
  </svg>

  <aside class="notes">
    This slide demonstrates a dynamic flowchart created with JavaScript. Point out how the chart automatically adjusts to the window size and how the nodes are connected with directional arrows. This is a good example of how JavaScript can create interactive diagrams that would be difficult to implement with static HTML. The flowchart shows a simple process flow with branching paths that converge back to a single path.
  </aside>
`;

// Initialize function
export function initialize() {
  console.log('Slide 6 initialized - Flowchart');
  initFlowchart();
  
  // Add resize event listener
  window.addEventListener('resize', debounce(() => {
    initFlowchart();
  }, 250));
}

// Debounce function for resize
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize flowchart
function initFlowchart() {
  const container = document.getElementById('flowchart-container');
  if (!container) {
    console.error('Cannot find flowchart container element');
    return;
  }
  
  // Clear container
  container.innerHTML = '';
  
  // Get container dimensions
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  
  // Define nodes - reduced width and height
  const nodes = [
    { id: 'start', text: 'Start Process', x: 60, y: containerHeight / 2, width: 100, height: 40, color: '#e8f5e9', border: '#2e7d32', textColor: '#1b5e20' },
    { id: 'process1', text: 'Processing Step', x: containerWidth * 0.33, y: containerHeight * 0.3, width: 110, height: 40, color: '#e3f2fd', border: '#1565c0', textColor: '#0d47a1' },
    { id: 'process2', text: 'Alternative Step', x: containerWidth * 0.33, y: containerHeight * 0.7, width: 110, height: 40, color: '#e3f2fd', border: '#1565c0', textColor: '#0d47a1' },
    { id: 'analysis', text: 'Data Analysis', x: containerWidth * 0.66, y: containerHeight / 2, width: 100, height: 40, color: '#fff3e0', border: '#e65100', textColor: '#bf360c' },
    { id: 'presentation', text: 'Data Presentation', x: containerWidth - 80, y: containerHeight / 2, width: 110, height: 40, color: '#f3e5f5', border: '#6a1b9a', textColor: '#4a148c' }
  ];
  
  // Define connections (from node ID, to node ID)
  const connections = [
    { from: 'start', to: 'process1', label: 'Path A' },
    { from: 'start', to: 'process2', label: 'Path B' },
    { from: 'process1', to: 'analysis', label: '' },
    { from: 'process2', to: 'analysis', label: '' },
    { from: 'analysis', to: 'presentation', label: 'Results' }
  ];
  
  // Create nodes
  const nodeElements = createNodes(container, nodes);
  
  // Create connections
  setTimeout(() => {
    createConnections(container, nodes, nodeElements, connections);
  }, 50);
}

// Create node elements
function createNodes(container, nodes) {
  const nodeElements = {};
  
  nodes.forEach(node => {
    const nodeEl = document.createElement('div');
    nodeEl.className = 'flowchart-node';
    nodeEl.textContent = node.text;
    nodeEl.id = `node-${node.id}`;
    nodeEl.dataset.id = node.id;
    
    // Position node (centered on its coordinates)
    nodeEl.style.left = `${node.x - (node.width / 2)}px`;
    nodeEl.style.top = `${node.y - (node.height / 2)}px`;
    nodeEl.style.width = `${node.width}px`;
    nodeEl.style.height = `${node.height}px`;
    
    // Style node
    nodeEl.style.backgroundColor = node.color;
    nodeEl.style.borderColor = node.border;
    nodeEl.style.color = node.textColor;
    nodeEl.style.fontSize = '12px'; // Reduced font size for nodes
    nodeEl.style.padding = '6px'; // Add less padding to make nodes more compact
    nodeEl.style.boxSizing = 'border-box'; // Ensure padding doesn't increase size
    
    container.appendChild(nodeEl);
    nodeElements[node.id] = nodeEl;
  });
  
  return nodeElements;
}

// Create connections between nodes
function createConnections(container, nodes, nodeElements, connections) {
  // Create SVG overlay for the connections
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '1';
  container.appendChild(svg);
  
  // Create each connection
  connections.forEach(conn => {
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);
    
    if (!fromNode || !toNode) {
      console.error(`Connection error: cannot find nodes for ${conn.from} -> ${conn.to}`);
      return;
    }
    
    // Get the node elements
    const fromEl = nodeElements[fromNode.id];
    const toEl = nodeElements[toNode.id];
    
    if (!fromEl || !toEl) {
      console.error(`Connection error: elements not found for ${conn.from} -> ${conn.to}`);
      return;
    }
    
    // Calculate the centers of the nodes
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Convert to container coordinates
    const fromCenter = {
      x: fromNode.x,
      y: fromNode.y
    };
    
    const toCenter = {
      x: toNode.x,
      y: toNode.y
    };
    
    // Calculate connection points on node edges
    const points = calculateConnectionPoints(fromNode, toNode);
    
    // Create the path for the connection
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Set path attributes
    let pathData;
    
    // If nodes are at roughly the same height, use a straight line
    if (Math.abs(points.from.y - points.to.y) < 20) {
      pathData = `M ${points.from.x},${points.from.y} L ${points.to.x},${points.to.y}`;
    } else {
      // Otherwise use curved path
      const midX = (points.from.x + points.to.x) / 2;
      pathData = `M ${points.from.x},${points.from.y} 
                  C ${midX},${points.from.y} 
                    ${midX},${points.to.y} 
                    ${points.to.x},${points.to.y}`;
    }
    
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#4285f4');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('marker-end', 'url(#arrowhead)');
    svg.appendChild(path);
    
    // Add label if provided
    if (conn.label) {
      const midX = (points.from.x + points.to.x) / 2;
      const midY = (points.from.y + points.to.y) / 2;
      
      const labelEl = document.createElement('div');
      labelEl.className = 'flowchart-label';
      labelEl.textContent = conn.label;
      labelEl.style.position = 'absolute';
      labelEl.style.left = `${midX - 20}px`; // Smaller offset for smaller label
      labelEl.style.top = `${midY - 8}px`; // Smaller offset for smaller label
      labelEl.style.backgroundColor = 'white';
      labelEl.style.padding = '1px 4px'; // Smaller padding for label
      labelEl.style.borderRadius = '3px';
      labelEl.style.fontSize = '10px'; // Reduced font size for labels
      labelEl.style.border = '1px solid #ddd';
      labelEl.style.zIndex = '2';
      container.appendChild(labelEl);
    }
  });
}

// Calculate connection points on node edges
function calculateConnectionPoints(fromNode, toNode) {
  const fromHalfWidth = fromNode.width / 2;
  const fromHalfHeight = fromNode.height / 2;
  const toHalfWidth = toNode.width / 2;
  const toHalfHeight = toNode.height / 2;
  
  let fromPoint = { x: 0, y: 0 };
  let toPoint = { x: 0, y: 0 };
  
  // Determine edge points based on relative positions
  // For horizontal layout, prefer left/right edges
  
  if (fromNode.x < toNode.x) {
    // From is to the left of To
    fromPoint.x = fromNode.x + fromHalfWidth;  // Right edge of From
    fromPoint.y = fromNode.y;
    
    toPoint.x = toNode.x - toHalfWidth;  // Left edge of To
    toPoint.y = toNode.y;
  } else if (fromNode.x > toNode.x) {
    // From is to the right of To
    fromPoint.x = fromNode.x - fromHalfWidth;  // Left edge of From
    fromPoint.y = fromNode.y;
    
    toPoint.x = toNode.x + toHalfWidth;  // Right edge of To
    toPoint.y = toNode.y;
  }
  
  // If nodes are roughly aligned horizontally, use top/bottom edges instead
  if (Math.abs(fromNode.x - toNode.x) < Math.abs(fromNode.y - toNode.y)) {
    if (fromNode.y < toNode.y) {
      // From is above To
      fromPoint.x = fromNode.x;
      fromPoint.y = fromNode.y + fromHalfHeight;  // Bottom edge of From
      
      toPoint.x = toNode.x;
      toPoint.y = toNode.y - toHalfHeight;  // Top edge of To
    } else {
      // From is below To
      fromPoint.x = fromNode.x;
      fromPoint.y = fromNode.y - fromHalfHeight;  // Top edge of From
      
      toPoint.x = toNode.x;
      toPoint.y = toNode.y + toHalfHeight;  // Bottom edge of To
    }
  }
  
  return { from: fromPoint, to: toPoint };
}

// Cleanup function
export function cleanup() {
  console.log('Slide 6 cleaned up');
  
  // Remove resize event listener
  window.removeEventListener('resize', debounce(() => {}, 250));
} 