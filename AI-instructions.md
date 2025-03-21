# SlidePilot - AI Instructions

This document contains detailed instructions for AI assistants on how to use SlidePilot to create presentations for users. Follow these instructions to set up and generate slide decks for any project.

## Setup Process

Follow these steps to create a slide deck in the user's current project:

1. Clone the SlidePilot repository to a temporary location:
```bash
git clone https://github.com/grapeot/cursor_slides.git /tmp/slidepilot
```

2. Create the slides directory structure in the current project:
```bash
mkdir -p slides
```

3. Copy only the necessary files:
```bash
cp -r /tmp/slidepilot/index.html /tmp/slidepilot/js /tmp/slidepilot/css slides/
```

4. Clean up the temporary files:
```bash
rm -rf /tmp/slidepilot
```

5. Modify slides/index.html to update the title and any project-specific configuration.

## Directory Structure

After setup, the slides directory will have this structure:

```
slides/
├── index.html           # Main HTML file
├── css/
│   └── custom.css       # Custom styles
└── js/
    ├── slideModule.js   # Core module system
    └── slides/          # Individual slide modules
        ├── slide1.js    # Simple text content
        ├── slide2.js    # Interactive content
        └── ...          # Additional slides
```

## Standard Operating Procedures

### Creating a New Slide

1. **Understand the module interface**:
   ```javascript
   export const html = `<slide content>`;
   export function initialize() { /* setup code */ }
   export function cleanup() { /* teardown code */ }
   ```

2. **Create the new JS module file** in the `slides/js/slides/` directory with a semantic name (e.g., `productDemo.js`).

3. **Focus on scope isolation**: Avoid global variables; instead, declare variables at module scope.

4. **Implement proper cleanup**: Release all resources (event listeners, timers, WebGL contexts, etc.) in the cleanup function.

5. **Add to index.html**: Add a corresponding empty section tag `<section id="productDemo"></section>` and update the `slideIds` array.

### Working with Speaker Notes

Speaker notes are private notes visible only to the presenter in speaker view. They help provide context, talking points, and additional information without cluttering the slide for the audience.

1. **Adding Speaker Notes to a Slide**:
   
   Add an `<aside>` element with the class `notes` within your slide's HTML template:
   
   ```javascript
   export const html = `
     <h2>Slide Title</h2>
     <ul>
       <li>Point 1</li>
       <li>Point 2</li>
       <li>Point 3</li>
     </ul>
     
     <aside class="notes">
       This slide covers the key aspects of our approach.
       - Emphasize the importance of Point 2
       - If there are questions about Point 3, mention that we'll cover this in detail later
       - This information is only visible to the presenter
     </aside>
   `;
   ```

2. **Enabling Speaker Mode**:
   
   Speaker mode requires the notes plugin to be enabled in the index.html file. Make sure the following additions are present:
   
   ```html
   <!-- Load Reveal.js plugins -->
   <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/plugin/notes/notes.js"></script>
   
   <script>
     Reveal.initialize({
       // Other options...
       plugins: [ RevealNotes ]
     });
   </script>
   ```

3. **Using Speaker View**:
   
   To access speaker view during a presentation:
   - Press the **S** key on the keyboard
   - A new window will open with speaker view
   - The speaker view shows:
     - Current slide
     - Next slide preview
     - Speaker notes
     - Timer
     - Current time

4. **Best Practices for Speaker Notes**:
   
   - Keep notes concise and focused on key talking points
   - Include reminders for transitions or demos
   - Add context that doesn't belong on the main slide
   - Note potential questions and prepared answers
   - Include timing guidelines for complex sections

### Modifying Existing Slides

1. **Identify the correct module**: Find the right `.js` file in the `slides/js/slides/` directory.

2. **Preserve the module interface**: Keep the `html`, `initialize`, and `cleanup` exports.

3. **Stay within the slide's scope**: Don't reference or modify variables from other slides.

4. **Test independently**: Ensure the slide works in isolation as well as within the presentation.

### Working with Interactive Elements

1. **Add event listeners in the initialize function** and remove them in the cleanup function.

2. **Use module-scoped variables** for state that needs to persist during the slide's lifetime.

3. **Avoid global DOM selectors**: Use `getElementById` or constrain selectors to the slide's container.

## Real-World Slide Examples and Best Practices

Based on the existing slides in the framework, here are key learnings and patterns to follow:

### 1. Progressive Complexity Patterns

The sample slides demonstrate a progression from simple to complex:

- **Basic Text (slide1.js)**: Simple text content with fragment reveals
- **Interactive Elements (slide2.js)**: Interactive highlighting with button controls
- **Comparative Content (slide3.js)**: Side-by-side comparison with fragments
- **Data Visualization (slide4.js)**: Dynamic charts with user interaction
- **3D Content (slide5.js)**: Complex Three.js integration with proper resource management
- **Advanced Diagrams (slide6.js)**: Flowcharts with edge-to-edge connections

This progression helps audience comprehension and demonstrates growing complexity in your presentation.

### 2. Resource Management Techniques

The slides demonstrate effective resource management:

- **Event Listener Handling**: Always add listeners in `initialize()` and remove in `cleanup()`
- **Module-Scoped Variables**: Store state in module scope (e.g., `let myChart = null;`)
- **Animation Frame Management**: Store animation IDs and cancel them in cleanup
- **Cleanup Process**: Explicitly destroy objects like charts and 3D scenes
- **Debouncing**: For resize events (see slide6.js)

### 3. DOM Element Best Practices

- **Container Elements**: Create container divs with specific IDs
- **Inline Styling**: Use inline styles for slide-specific elements
- **Adaptive Sizing**: Use percentages and relative units for element dimensions
- **Consistent IDs**: Use semantic IDs for elements that need JavaScript interaction

### 4. Interactive Element Patterns

Common patterns for interactive elements:

- **Toggle Mechanisms**: Store state in module scope and toggle with button clicks
- **Animation Control**: Functions to start/stop/reset animations
- **Data Updates**: Functions to refresh visualizations with new data
- **View Control**: Reset and manipulation functions for 3D content

### 5. Visual Design Patterns

- **Consistent Color Schemes**: Coordinated colors for related elements
- **Responsive Containers**: Container elements that adapt to available space
- **Visual Hierarchy**: Clear heading structure and emphasis on key elements
- **Progressive Reveals**: Using fragment classes for step-by-step content
- **Default Styling**: Stick with the default CSS and font sizes unless the user explicitly specifies a need for adjustments. This ensures consistent styling across all slides and maintains the intended design language. Don't change existing font size inline styles.

### 6. Advanced Integration Examples

For complex visualizations, follow these patterns:

#### Chart.js Integration (slide4.js)
```javascript
// Store chart in module scope
let myChart = null;

export function initialize() {
  // Initialize chart
  const ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, config);
  
  // Add update functionality
  document.getElementById('updateBtn').addEventListener('click', updateChart);
}

export function cleanup() {
  // Remove event listeners
  document.getElementById('updateBtn').removeEventListener('click', updateChart);
  
  // Destroy chart
  if (myChart) {
    myChart.destroy();
    myChart = null;
  }
}
```

#### Three.js Integration (slide5.js)
```javascript
// Store Three.js objects in module scope
let scene, camera, renderer, controls, animationId;

export function initialize() {
  // Create scene, camera, renderer
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  
  // Start animation loop
  animationId = requestAnimationFrame(animate);
}

export function cleanup() {
  // Stop animation
  cancelAnimationFrame(animationId);
  
  // Dispose of resources
  scene.remove(object);
  geometry.dispose();
  material.dispose();
  renderer.dispose();
}
```

#### Flowchart with Edge Connections (slide6.js)
```javascript
function calculateConnectionPoints(fromNode, toNode) {
  // Calculate node dimensions
  const fromHalfWidth = fromNode.width / 2;
  const fromHalfHeight = fromNode.height / 2;
  
  // Determine connection points based on relative node positions
  if (fromNode.x < toNode.x) {
    // Connect right edge of first node to left edge of second
    fromPoint.x = fromNode.x + fromHalfWidth;  // Right edge
    toPoint.x = toNode.x - toHalfWidth;        // Left edge
  }
  
  return { from: fromPoint, to: toPoint };
}
```

#### Dynamic Arrow Positioning (slide6.js)
```javascript
// Create connections between nodes
function createConnections(container, nodes, nodeElements, connections) {
  // Create SVG overlay for the connections
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  
  // Create each connection
  connections.forEach(conn => {
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);
    
    // Calculate connection points on node edges
    const points = calculateConnectionPoints(fromNode, toNode);
    
    // Create the path for the connection
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Determine if we should use a straight line or curved path
    let pathData;
    if (Math.abs(points.from.y - points.to.y) < 20) {
      // Straight line for nodes at similar heights
      pathData = `M ${points.from.x},${points.from.y} L ${points.to.x},${points.to.y}`;
    } else {
      // Curved path for nodes at different heights
      const midX = (points.from.x + points.to.x) / 2;
      pathData = `M ${points.from.x},${points.from.y} 
                 C ${midX},${points.from.y} 
                   ${midX},${points.to.y} 
                   ${points.to.x},${points.to.y}`;
    }
    
    path.setAttribute('d', pathData);
    path.setAttribute('marker-end', 'url(#arrowhead)');
  });
}

function calculateConnectionPoints(fromNode, toNode) {
  const fromHalfWidth = fromNode.width / 2;
  const fromHalfHeight = fromNode.height / 2;
  
  let fromPoint = { x: 0, y: 0 };
  let toPoint = { x: 0, y: 0 };
  
  // Determine edge points based on relative positions
  if (fromNode.x < toNode.x) {
    // From is to the left of To - connect right edge to left edge
    fromPoint.x = fromNode.x + fromHalfWidth;  // Right edge of From
    fromPoint.y = fromNode.y;
    toPoint.x = toNode.x - toHalfWidth;       // Left edge of To
    toPoint.y = toNode.y;
  } else if (Math.abs(fromNode.x - toNode.x) < Math.abs(fromNode.y - toNode.y)) {
    // If nodes are vertically aligned, connect top/bottom edges
    if (fromNode.y < toNode.y) {
      // From is above To
      fromPoint.y = fromNode.y + fromHalfHeight;  // Bottom edge of From
      toPoint.y = toNode.y - toHalfHeight;        // Top edge of To
    }
  }
  
  return { from: fromPoint, to: toPoint };
}
```

When creating diagrams with arrows between elements, use SVG paths for precise positioning and visual quality. The approach above demonstrates how to:

1. Calculate exact connection points based on element positions and dimensions
2. Create appropriate paths between elements (straight or curved based on positioning)
3. Handle different spatial relationships (horizontal, vertical, diagonal)
4. Add proper arrow markers at path ends
5. Update all connections when the window resizes

This SVG-based approach is preferred over simpler DOM-element positioning for complex diagrams, as it provides smoother lines, better scaling, and more precise control over arrow appearance.

## Content Generation Guidelines

When creating slides based on the project content:

1. Look for these content types to feature in the presentation:
   - Markdown documentation (convert headers to slides)
   - Data analysis results and graphs (create visualization slides)
   - Key code snippets (create code showcase slides)
   - Project structure and architecture (create overview slides)

2. Follow these best practices for slide creation:
   - Keep slide content focused on a single concept
   - Use visual elements where appropriate
   - Create progressive reveals for complex concepts
   - Include interactive elements to demonstrate functionality

3. For data-focused projects:
   - Create visualizations of key results
   - Show the most important insights rather than raw data
   - Explain methodologies briefly
   - Highlight conclusions and next steps

## Slide Examples

### Basic Text Slide
```javascript
// slides/js/slides/introduction.js
export const html = `
  <h2>Project Introduction</h2>
  <ul>
    <li>Goal: [Project goal]</li>
    <li>Approach: [Brief methodology]</li>
    <li>Key findings: [Major results]</li>
  </ul>

  <aside class="notes">
    Welcome everyone to this presentation. 
    Key points to emphasize:
    - Our innovative approach differentiates us from competitors
    - The methodology has been rigorously validated
    - Findings show a 35% improvement over baseline
  </aside>
`;

export function initialize() {
  // No special initialization needed
}

export function cleanup() {
  // No cleanup needed
}
```

### Interactive Chart Slide
```javascript
// slides/js/slides/dataVisualization.js
export const html = `
  <h2>Data Analysis Results</h2>
  <div class="chart-container" style="height: 400px; width: 80%; margin: 0 auto;">
    <canvas id="resultsChart"></canvas>
  </div>

  <aside class="notes">
    This chart shows our primary results:
    - Notice the clear trend in Category B
    - If asked about outliers, explain that they were validated in follow-up experiments
    - Remind audience that detailed analysis is available in the appendix
  </aside>
`;

export function initialize() {
  // Create a chart using Chart.js (must be loaded in index.html)
  const ctx = document.getElementById('resultsChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Category A', 'Category B', 'Category C'],
      datasets: [{
        label: 'Results',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // Store chart reference for cleanup
  this.chart = chart;
}

export function cleanup() {
  // Destroy chart to prevent memory leaks
  if (this.chart) {
    this.chart.destroy();
    this.chart = null;
  }
}
```

### Code Snippet Slide
```javascript
// slides/js/slides/codeExample.js
export const html = `
  <h2>Implementation Highlight</h2>
  <pre><code class="language-python">
def analyze_data(dataset):
    """
    Perform key analysis on the dataset
    """
    results = {}
    for feature in dataset.columns:
        results[feature] = {
            'mean': dataset[feature].mean(),
            'median': dataset[feature].median(),
            'std': dataset[feature].std()
        }
    return results
  </code></pre>

  <aside class="notes">
    This is the core analysis function:
    - Highlight the efficient iteration over features
    - The dictionary structure makes results easy to access
    - Note that this approach scales linearly with the number of features
    - If asked about performance, mention optimizations are in the roadmap
  </aside>
`;

export function initialize() {
  // Initialize syntax highlighting if prism.js is included
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }
}

export function cleanup() {
  // No special cleanup needed
}
```

## Running the Presentation

After setup, instruct the user to:

1. Navigate to the project directory in a terminal
2. Start a local web server:
```bash
# Using Python's HTTP server
python -m http.server

# Or using Node.js http-server
npx http-server
```
3. Open a browser and go to http://localhost:8000/slides/ to view the presentation
4. Press 'S' during the presentation to open speaker view with notes 