# AI-Friendly Slide Framework

A modern approach to presentation slides using ES Modules and Reveal.js, specifically designed for AI-assisted development.

For a live demo, check out [this page](https://yage.ai/slides/).

## Designed for AI, Not Humans

This framework represents a fundamental shift in presentation design philosophy. Unlike traditional slide frameworks that prioritize human-authored content, our architecture is specifically optimized for AI-generated presentations.

### AI-First Design Philosophy

Most presentation frameworks are designed with human developers in mind, prioritizing simplicity of authoring over technical rigor. Our approach inverts this paradigm:

1. **AI-Optimized Architecture**: Each slide is an independent module, allowing AI systems to generate, modify, or enhance individual slides without needing to understand the entire presentation context.

2. **Technical Rigor Over Authoring Simplicity**: While JavaScript modules might be more complex than Markdown for humans, they provide the structure and predictability that AI assistants need to generate robust, interactive content.

3. **Evolution of Approach**: We initially experimented with a pure Markdown-based system, but encountered fundamental limitations with scope isolation and lifecycle management that prevented reliable AI-generated interactive elements.

4. **Modularity for AI Context Management**: AI assistants operate more effectively when working within constrained context windows. Our one-slide-per-file approach ensures AI can focus on a single component at a time.

5. **Standardized Interfaces**: The consistent export pattern (`html`, `initialize`, `cleanup`) creates a contract that AI systems can reliably implement, reducing errors and inconsistencies.

In essence, this framework treats AI as the primary author, with humans serving as reviewers and integrators. This inversion of the traditional development workflow enables far more powerful and complex presentations to be created with minimal human intervention.

## Why JavaScript Modules Instead of HTML?

This framework takes a fundamental departure from traditional Reveal.js presentations by using JavaScript ES modules (.js files) instead of standalone HTML files for slides. Here's why this approach is superior:

### 1. Encapsulation and Scope Isolation

**Problem with HTML files**: When loading HTML fragments into a presentation, all JavaScript runs in the global scope, leading to variable name collisions, unexpected interactions, and hard-to-debug issues.

**Solution with JS modules**: Each slide is contained in its own module with proper scope isolation. Variables and functions defined in one slide module cannot interfere with those in another, eliminating an entire class of bugs.

### 2. Lifecycle Management

**Problem with HTML files**: No clear way to initialize resources when a slide becomes active or clean them up when navigating away, often resulting in memory leaks, performance degradation, and visual artifacts.

**Solution with JS modules**: Our module system provides explicit lifecycle hooks (`initialize` and `cleanup`), ensuring that each slide properly manages its own resources throughout the presentation.

### 3. Simplified AI Development

**Problem with HTML files**: When working with AI assistants, the context required to understand a large HTML presentation with embedded scripts becomes unwieldy and overwhelming.

**Solution with JS modules**: Each module represents an isolated unit of functionality, making it much easier for AI assistants to work with individual slides without needing the entire context of the application.

### 4. Error Containment

**Problem with HTML files**: Errors in one slide's JavaScript can break the entire presentation, often in ways that are difficult to trace.

**Solution with JS modules**: Errors are contained within individual modules, preventing a problem in one slide from crashing the entire presentation.

### 5. Standardized Interface

**Problem with HTML files**: Each slide might implement functionality in different ways with no consistency.

**Solution with JS modules**: All slides follow the same interface pattern, making the codebase more maintainable and enabling automated tooling.

## Directory Structure

```
slide-deck/
├── index.html           # Main HTML file
├── css/
│   └── custom.css       # Custom styles
├── js/
│   ├── slideModule.js   # Core module system
│   └── slides/          # Individual slide modules
│       ├── slide1.js    # Simple text content
│       ├── slide2.js    # Interactive content
│       ├── slide3.js    # Progressive content
│       ├── slide4.js    # Chart.js visualization
│       ├── slide5.js    # Three.js 3D content
│       └── slide6.js    # Horizontal flowchart
└── slides/              # Legacy static HTML (for reference)
```

## Standard Operating Procedures for AI

When working with this modular slide framework, AI assistants should follow these guidelines:

### Creating a New Slide

1. **Understand the module interface**:
   ```javascript
   export const html = `<slide content>`;
   export function initialize() { /* setup code */ }
   export function cleanup() { /* teardown code */ }
   ```

2. **Create the new JS module file** in the `js/slides/` directory with a semantic name (e.g., `productDemo.js`).

3. **Focus on scope isolation**: Avoid global variables; instead, declare variables at module scope.

4. **Implement proper cleanup**: Release all resources (event listeners, timers, WebGL contexts, etc.) in the cleanup function.

5. **Add to index.html**: Add a corresponding empty section tag `<section id="productDemo"></section>` and update the `slideIds` array.

### Modifying Existing Slides

1. **Identify the correct module**: Find the right `.js` file in the `js/slides/` directory.

2. **Preserve the module interface**: Keep the `html`, `initialize`, and `cleanup` exports.

3. **Stay within the slide's scope**: Don't reference or modify variables from other slides.

4. **Test independently**: Ensure the slide works in isolation as well as within the presentation.

### Working with Interactive Elements

1. **Add event listeners in the initialize function** and remove them in the cleanup function.

2. **Use module-scoped variables** for state that needs to persist during the slide's lifetime.

3. **Avoid global DOM selectors**: Use `getElementById` or constrain selectors to the slide's container.

## Special Feature: Edge-to-Edge Flowchart Connections

The flowchart in slide6.js demonstrates a key design principle: connecting arrows between nodes should start and end at the edges of elements rather than their centers.

### Why Edge Connections Matter

1. **Visual clarity**: Edge-to-edge connections look more professional and clearer than center-to-center connections.

2. **Realistic representation**: Real flowcharts connect boxes at their edges, not their centers.

3. **Better space utilization**: Edge connections allow for more compact layouts without visual overlap.

### How Edge Connections Work

In `slide6.js`, the `calculateConnectionPoints` function determines the optimal edge points for connections:

```javascript
function calculateConnectionPoints(fromNode, toNode) {
  // Calculate half dimensions
  const fromHalfWidth = fromNode.width / 2;
  const fromHalfHeight = fromNode.height / 2;
  // ...
  
  // Determine which edges to use based on relative positioning
  if (fromNode.x < toNode.x) {
    // From is to the left of To
    fromPoint.x = fromNode.x + fromHalfWidth;  // Right edge of From
    toPoint.x = toNode.x - toHalfWidth;  // Left edge of To
  }
  // ...
}
```

This approach:
1. Calculates node center positions based on their dimensions
2. Determines the optimal exit and entry points based on relative node positions
3. Creates connection paths that intelligently adjust based on layout
4. Maintains clean visuals even when the presentation is resized

## Usage Instructions

### Running the Slides

1. Use any HTTP server to host this directory:

```bash
# Using Python's HTTP server
python -m http.server

# Using Node.js http-server
npx http-server
```

2. Open the presentation in a browser (e.g., `http://localhost:8000`)

### Adding a New Slide

1. Create a new module file in `js/slides/`:

```javascript
// js/slides/newSlide.js
export const html = `
  <h2>My New Slide</h2>
  <p>This is my new slide content.</p>
`;

export function initialize() {
  console.log('New slide initialized');
}

export function cleanup() {
  console.log('New slide cleaned up');
}
```

2. Update `index.html`:
   - Add a new section: `<section id="newSlide"></section>`
   - Add the ID to the slideIds array: `const slideIds = [..., 'newSlide'];`

## Lessons Learned

The development of this framework taught us several important lessons:

1. **JavaScript scope matters**: Scope isolation is critical for complex presentations.

2. **Lifecycle management is essential**: Proper initialization and cleanup prevent memory leaks and visual glitches.

3. **Edge-to-edge connections** create more professional-looking diagrams than center-to-center connections.

4. **Modular design simplifies maintenance**: Individual slides can be developed, tested, and modified independently.

5. **Standardized interfaces improve workflow**: Having a consistent pattern for all slides makes development more predictable.