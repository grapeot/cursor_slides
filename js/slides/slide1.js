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
`;

// Initialization function - no special initialization needed for this simple slide
export function initialize() {
  console.log('Slide 1 initialized');
}

// Cleanup function - no special cleanup needed for this simple slide
export function cleanup() {
  console.log('Slide 1 cleaned up');
} 