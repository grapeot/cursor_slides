# HTML Slide Framework

This is an HTML slide framework based on [Reveal.js](https://revealjs.com/) that supports a modular approach to slide development with ES modules.

## Directory Structure

```
slide-deck/
├── index.html           # Main HTML file
├── css/
│   └── custom.css       # Custom styles
├── js/
│   ├── slideModule.js   # Slide module system core
│   └── slides/          # Individual slide modules
│       ├── slide1.js    # Simple text content
│       ├── slide2.js    # Interactive content
│       ├── slide3.js    # Progressive content
│       ├── slide4.js    # Chart.js visualization
│       ├── slide5.js    # Three.js 3D content
│       └── slide6.js    # Interactive flowchart
└── slides/              # Legacy static HTML files (for reference)
```

## Key Features

### ES Modules for Slides

Each slide is now a JavaScript ES module with:

1. **HTML Content** - Module exports HTML content as a string
2. **Initialization Logic** - Module exports functions to initialize interactive elements
3. **Cleanup Logic** - Module exports functions to clean up resources when navigating away

### Benefits of the Module System

1. **Isolation** - Each slide has its own scope, avoiding global variable conflicts
2. **Maintainability** - Slides can be developed and edited independently
3. **Simplified Context** - AI editors can work on one slide at a time with limited context
4. **Better Error Handling** - Errors in one slide won't break the entire presentation

## Usage Instructions

### Running the Slides

1. Use any HTTP server to host this directory, for example:

```bash
# Using Python's HTTP server
python -m http.server

# Or using Node.js's http-server
npx http-server
```

2. Open `http://localhost:8000` (or appropriate port) in your browser

### Adding New Slides

1. Create a new JavaScript module in the `js/slides/` directory (e.g., `slide7.js`)
2. Implement the module interface:

```javascript
// HTML content for the slide
export const html = `
  <h2>Your Slide Title</h2>
  <p>Your slide content</p>
`;

// Initialize function - called when slide becomes active
export function initialize() {
  console.log('Slide initialized');
  // Your initialization code here
}

// Cleanup function - called when navigating away from slide
export function cleanup() {
  console.log('Slide cleaned up');
  // Your cleanup code here
}
```

3. Add the slide ID to the `slideIds` array in `index.html`
4. Add a corresponding section in the `index.html` file:
   ```html
   <section id="slide7"></section>
   ```

### Slide Types

The framework includes example implementations for different types of slides:

#### Basic Text Content (slide1.js)

Simple static HTML content with text, lists, etc.

#### Interactive Elements (slide2.js)

Includes interactive elements with event listeners:
- Click events to change colors
- State management within the module

#### Progressive Reveal (slide3.js)

Uses Reveal.js fragments to progressively reveal content on clicks.

#### Dynamic Charts (slide4.js)

Utilizes Chart.js to create responsive, animated data visualizations:
- Line charts with animations
- Real-time data updates with button clicks
- Proper cleanup of chart resources

#### 3D Content (slide5.js)

Integrates Three.js for interactive 3D elements:
- Rotating 3D objects with custom materials
- User-controlled camera with orbit controls
- Efficient animation and resource management

#### Custom Flowcharts (slide6.js)

Creates elegant diagrams with custom styling:
- Custom-built flowchart system with DOM manipulation
- Professional aesthetics with drop shadows and hover effects
- Responsive layout that adapts to window resizing

## Advanced Features

### Module Loading System

The slide module system handles:

1. **Dynamic Module Loading** - ES modules are loaded asynchronously when needed
2. **Content Rendering** - HTML content is rendered to the DOM
3. **Lifecycle Management** - Initialize/cleanup functions are called at appropriate times
4. **Error Handling** - Errors in one module won't crash the entire presentation

### Exporting to PDF

To export your presentation to PDF:

1. Add `?print-pdf` to the URL (e.g., `http://localhost:8000?print-pdf`)
2. Use Chrome/Edge browser's Print function (Ctrl+P / Cmd+P)
3. Change destination to "Save as PDF"
4. Make sure to set:
   - Layout: Landscape
   - Margins: None
   - Background graphics: Enabled
5. Click "Save" to export

## Lessons Learned

### Working with Dynamic Content in Reveal.js

When incorporating interactive elements like charts, 3D content, and dynamic diagrams in Reveal.js presentations, we encountered several challenges and developed these solutions:

1. **Script Loading Order**:
   - **Problem**: Libraries like Chart.js and Three.js weren't available when slides initialized.
   - **Solution**: Load all external libraries in the `<head>` section before any other script execution.

2. **Initialization Timing**:
   - **Problem**: Dynamic content wasn't displaying because it initialized before the slide was visible.
   - **Solution**: Use Reveal.js events (`slidechanged`, `ready`) to trigger initialization when a slide becomes active.

3. **JavaScript Scope Issues**:
   - **Problem**: Variables from different slides were conflicting in the global scope.
   - **Solution**: Use ES modules to create isolated scope for each slide's code.

4. **Resource Management**:
   - **Problem**: Resources not being properly cleaned up when navigating away from slides.
   - **Solution**: Implement cleanup functions in each module to dispose of resources.

5. **Independent Development**:
   - **Problem**: Difficult to develop and edit slides independently.
   - **Solution**: Modular system where each slide is a separate file with standardized interface.

## Technical Notes

Our ES module approach solves many common issues with Reveal.js presentations:

1. **Independent Files**: Each slide is a separate module that can be edited independently
2. **Scope Isolation**: Prevents naming conflicts and unexpected interactions
3. **Clean Lifecycle**: Initialization and cleanup happen at appropriate times
4. **Error Containment**: Problems in one slide won't break the entire presentation
5. **Context Limitation**: Makes it easier for AI assistance to work on slides with manageable context 