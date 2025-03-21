/**
 * Slide 3 - Why JavaScript Modules
 */

// HTML content of the slide
export const html = `
  <h2>Why JavaScript Modules?</h2>
  
  <div style="display: flex; justify-content: space-between; margin-top: 30px;">
    <div style="flex: 1; margin-right: 20px;">
      <h3 class="fragment" style="color: #4a86e8;">Problem with HTML files</h3>
      <ul>
        <li class="fragment">Global scope leads to variable collisions</li>
        <li class="fragment">No clear lifecycle management</li>
        <li class="fragment">Difficult for AI to manage large context</li>
        <li class="fragment">Errors in one slide can break everything</li>
      </ul>
    </div>
    
    <div style="flex: 1;">
      <h3 class="fragment" style="color: #4a86e8;">Solution with JS modules</h3>
      <ul>
        <li class="fragment">Each slide has proper scope isolation</li>
        <li class="fragment">Explicit initialize() and cleanup() hooks</li>
        <li class="fragment">Each module is an isolated unit for AI</li>
        <li class="fragment">Errors are contained within individual modules</li>
      </ul>
    </div>
  </div>
  
  <div class="fragment" style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #4a86e8;">
    <p>Experience this framework and contribute at: <a href="https://github.com/grapeot/cursor_slides" target="_blank">https://github.com/grapeot/cursor_slides</a></p>
  </div>

  <aside class="notes">
    This slide explains the key benefits of using JavaScript modules over traditional HTML files for presentations. Emphasize the isolation benefits - both for human developers and AI assistants. The modular approach allows for better error containment and more manageable code. When discussing, highlight how the initialize() and cleanup() hooks provide clean lifecycle management.
  </aside>
`;

// Initialization function
export function initialize() {
  console.log('Slide 3 initialized');
}

// Cleanup function
export function cleanup() {
  console.log('Slide 3 cleaned up');
} 