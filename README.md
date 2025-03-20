# HTML Slide Framework

This is an HTML slide framework based on [Reveal.js](https://revealjs.com/) that supports dynamically loading standalone HTML files as slides while maintaining a unified style.

## Directory Structure

```
slide-deck/
├── index.html      # Main HTML file
├── css/
│   └── custom.css  # Custom styles
└── slides/         # Standalone slide HTML files
    ├── slide1.html
    ├── slide2.html
    └── slide3.html
```

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

1. Create a new HTML file in the `slides/` directory (e.g., `slide4.html`)
2. Add a corresponding reference in the main `index.html` file by:
   - Adding a new section element with an ID: `<section id="slide4"></section>`
   - Adding a call to load the HTML in the script: `loadHTML('slides/slide4.html', 'slide4');`

### Slide Content Format

Slides use HTML format with full control over layout and styling:

```html
<h2>Slide Title</h2>
<p>Slide content</p>
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

### Custom Styling

1. Modify the style variables and rules in the `css/custom.css` file:

```css
:root {
  --main-color: #your-color;
  /* Other variables... */
}
```

### Exporting to PDF

There are two ways to export your presentation to PDF:

1. **Using Browser Print Function (Recommended)**:
   - Add `?print-pdf` to the URL (e.g., `http://localhost:8000?print-pdf`)
   - This will format your slides for PDF export
   - Use Chrome/Edge browser's Print function (Ctrl+P / Cmd+P)
   - Change destination to "Save as PDF"
   - Make sure to set:
     - Layout: Landscape
     - Margins: None
     - Background graphics: Enabled
   - Click "Save" to export

2. **Using PDF Export Plugin**:
   - For more options, you can add the PDF export plugin to index.html:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/reveal.js@4.3.1/plugin/pdf-export/pdf-export.js"></script>
   ```
   - Update Reveal.initialize to include the plugin:
   ```javascript
   Reveal.initialize({
     // ... other options
     plugins: [ RevealPdfExport ]
   });
   ```

## Technical Notes

### MIME Type Issue Solution

This framework uses a custom AJAX loading method instead of Reveal.js plugins to avoid MIME type issues that commonly occur with CDNs. Many solutions were tried:

1. **Problem**: Using `data-external-replace` with the external plugin results in error:
   ```
   The resource was blocked due to MIME type ("text/plain") mismatch (X-Content-Type-Options: nosniff)
   ```

2. **Solution**: We implemented a custom slide loading mechanism using XMLHttpRequest instead of relying on plugins:
   ```javascript
   function loadHTML(url, targetId) {
     var xhr = new XMLHttpRequest();
     xhr.open('GET', url, true);
     xhr.onreadystatechange = function() {
       if (xhr.readyState === 4 && xhr.status === 200) {
         document.getElementById(targetId).innerHTML = xhr.responseText;
       }
     };
     xhr.send();
   }
   ```
   
3. **Alternative Solutions**:
   - Self-host all plugin files (more complex setup)
   - Use iframe-based inclusion (less optimal integration)
   - Inline all slide content (loses modularity)

## Advanced Features

Check out the [Reveal.js documentation](https://revealjs.com/documentation/) to learn about more features, such as:

- Slide transition animations
- Vertical slides
- Slide backgrounds
- Speaker notes
- PDF export 