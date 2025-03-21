/**
 * Slide 1 - AI-First Design Philosophy
 */

// HTML content of the slide
export const html = `
  <h2>Design Philosophy</h2>
  <div>
    <h3>Inverting Traditional Presentation Design</h3>
    <p>Our approach optimizes for AI-assisted generation rather than human authoring</p>
    <ul class="fragment" style="margin-top: -10px;">
      <li>Focus on technical rigor and predictability</li>
      <li>Each slide is a self-contained component</li>
      <li>Modular architecture for better AI context management</li>
    </ul>
  </div>

  <div class="fragment fade-up" style="margin-top: 30px; display: inline-block; background-color: rgba(66, 133, 244, 0.1); border-left: 4px solid var(--highlight-color); padding: 8px 15px; border-radius: 0 4px 4px 0; animation: pulse 2s infinite;">
    <p style="margin: 0; font-size: 0.8em;">💡 Press <kbd style="background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 3px; padding: 2px 5px; font-family: monospace;">S</kbd> to open speaker view</p>
  </div>

  <aside class="notes">
    This opening slide introduces our core design philosophy. Emphasize how we've flipped traditional presentation design on its head by making AI-generation the primary use case rather than human authoring. Point out that while this approach requires more technical knowledge, it results in more predictable and maintainable presentations. The modular architecture is especially valuable when working with AI tools that benefit from well-defined context boundaries.
  </aside>
`;

// Initialization function - no special initialization needed for this simple slide
export function initialize() {
  console.log('Slide 1 initialized');
  
  // Add keyframe animation for pulsing effect
  const style = document.createElement('style');
  style.id = 'slide1-animation-style';
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}

// Cleanup function - no special cleanup needed for this simple slide
export function cleanup() {
  console.log('Slide 1 cleaned up');
  
  // Remove the added style element
  const styleElement = document.getElementById('slide1-animation-style');
  if (styleElement) {
    styleElement.remove();
  }
} 