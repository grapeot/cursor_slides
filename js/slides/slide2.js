/**
 * Slide 2 - AI-Optimized Architecture
 */

// HTML content of the slide
export const html = `
  <h2>AI-Optimized Architecture</h2>
  
  <ul>
    <li class="highlight-item" style="color: #333; transition: color 0.3s;">Independent modules with proper scope isolation</li>
    <li class="highlight-item" style="color: #333; transition: color 0.3s;">Explicit lifecycle management (initialize & cleanup)</li>
    <li class="highlight-item" style="color: #333; transition: color 0.3s;">Technical rigor over authoring simplicity</li>
    <li class="highlight-item" style="color: #333; transition: color 0.3s;">Predictable interfaces for AI-generated content</li>
  </ul>
  
  <div style="margin-top: 30px;">
    <button id="highlightButton" style="padding: 10px 20px; background: #4a86e8; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Highlight Key Points
    </button>
  </div>

  <aside class="notes">
    This slide demonstrates the interactive highlight feature while explaining our architectural principles. When presenting, click the button to cycle through the key points. Each point represents a core architectural decision that makes this framework AI-optimized. The independent modules provide scope isolation, preventing variables from bleeding across slides. The explicit lifecycle hooks ensure proper resource management. The technical approach prioritizes predictability and consistency over simplicity, which is critical for AI-generated content.
  </aside>
`;

// Current highlight index
let highlightIndex = -1;

// Color constants
const HIGHLIGHT_COLOR = '#4a86e8';
const DEFAULT_COLOR = '#333';

// Initialization function - setup button click event
export function initialize() {
  console.log('Slide 2 initialized');
  
  // Get button and add event listener
  const button = document.getElementById('highlightButton');
  if (button) {
    button.addEventListener('click', highlightNextItem);
  }
}

// Highlight the next item
function highlightNextItem() {
  // Get all items that can be highlighted
  const items = document.querySelectorAll('.highlight-item');
  
  // Reset the previous highlighted item to default color
  if (highlightIndex >= 0 && highlightIndex < items.length) {
    items[highlightIndex].style.color = DEFAULT_COLOR;
  }
  
  // Update index and loop
  highlightIndex = (highlightIndex + 1) % items.length;
  
  // Highlight current item
  if (highlightIndex < items.length) {
    items[highlightIndex].style.color = HIGHLIGHT_COLOR;
  }
}

// Cleanup function - remove event listener
export function cleanup() {
  console.log('Slide 2 cleaned up');
  
  // Remove event listener
  const button = document.getElementById('highlightButton');
  if (button) {
    button.removeEventListener('click', highlightNextItem);
  }
  
  // Reset all highlights
  const items = document.querySelectorAll('.highlight-item');
  items.forEach(item => {
    item.style.color = DEFAULT_COLOR;
  });
  
  // Reset index
  highlightIndex = -1;
} 