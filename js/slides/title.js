/**
 * Title Slide - SlidePilot Overview
 */

// Static HTML content for the title slide
export const html = `
  <h1>SlidePilot</h1>
  <p>Using Reveal.js with ES Modules</p>
  <p style="margin-top: 30px;">
    <a href="https://github.com/grapeot/cursor_slides" target="_blank">https://github.com/grapeot/cursor_slides</a>
  </p>
`;

// No-op initialize hook keeps lifecycle consistent with other slides
export function initialize() {
  console.log('Title slide initialized');
}

// No-op cleanup hook keeps lifecycle consistent with other slides
export function cleanup() {
  console.log('Title slide cleaned up');
}
