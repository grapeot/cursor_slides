/**
 * Slide 5 - Three.js 3D visualization
 */

// Import Three.js modules
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// HTML content for the slide
export const html = `
  <h2>3D Content</h2>
  <p>Interactive 3D visualization with Three.js</p>
  
  <div id="canvas-container" style="width: 80%; height: 350px; margin: 20px auto; border-radius: 8px; overflow: hidden; background: #f9f9f9; border: 2px solid #ddd;"></div>
  
  <div style="text-align: center; margin-top: 20px;">
    <button id="resetCubeBtn" style="padding: 8px 16px; background: #5D8AA8; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
      Reset View
    </button>
    <button id="toggleRotationBtn" style="padding: 8px 16px; background: #5D8AA8; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Toggle Rotation
    </button>
  </div>

  <aside class="notes">
    This slide demonstrates integrating advanced 3D graphics using Three.js. The cube has different colored faces and rotates automatically. During the presentation, interact with the 3D cube by dragging to rotate the view with your mouse. Use the "Reset View" button to return to the original camera position, and the "Toggle Rotation" button to pause or resume the cube's rotation. This example shows how our modular framework can handle complex WebGL content while properly managing resources and event listeners. Note the comprehensive cleanup function that prevents memory leaks.
  </aside>
`;

// Three.js components
let scene, camera, renderer, cube, controls;
let animationId = null;
let isRotating = true;

// Initialize function
export function initialize() {
  console.log('Slide 5 initialized - Three.js');
  
  // Initialize Three.js
  initThreeJS();
  
  // Add event listeners for buttons
  const resetButton = document.getElementById('resetCubeBtn');
  if (resetButton) {
    resetButton.addEventListener('click', resetCube);
  }
  
  const toggleButton = document.getElementById('toggleRotationBtn');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleRotation);
  }
  
  // Handle window resize
  window.addEventListener('resize', onWindowResize);
}

// Initialize Three.js scene
function initThreeJS() {
  // Get container
  const container = document.getElementById('canvas-container');
  if (!container) {
    console.error('Cannot find canvas container element');
    return;
  }
  
  try {
    // Clear container
    container.innerHTML = '';
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    
    // Get container dimensions
    const containerWidth = container.offsetWidth || 500;
    const containerHeight = container.offsetHeight || 350;
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerWidth, containerHeight);
    container.appendChild(renderer.domElement);
    
    // Add orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Create cube
    createCube();
    
    // Start animation loop
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    animate();
    
    console.log('Three.js scene initialized successfully');
  } catch (e) {
    console.error('Three.js initialization error:', e);
  }
}

// Create a cube with different colored faces
function createCube() {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  
  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
    new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Magenta
    new THREE.MeshBasicMaterial({ color: 0x00ffff })  // Cyan
  ];
  
  cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);
}

// Animation loop
function animate() {
  animationId = requestAnimationFrame(animate);
  
  if (cube && isRotating) {
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
  }
  
  if (controls) {
    controls.update();
  }
  
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// Handle window resize
function onWindowResize() {
  if (!camera || !renderer) return;
  
  const container = document.getElementById('canvas-container');
  if (!container) return;
  
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// Reset cube position and rotation
function resetCube() {
  if (!cube) return;
  
  cube.rotation.x = 0;
  cube.rotation.y = 0;
  
  if (camera) {
    camera.position.z = 5;
    camera.position.x = 0;
    camera.position.y = 0;
  }
  
  if (controls) {
    controls.reset();
  }
}

// Toggle cube rotation
function toggleRotation() {
  isRotating = !isRotating;
}

// Cleanup function
export function cleanup() {
  console.log('Slide 5 cleaned up');
  
  // Stop animation loop
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  
  // Remove event listeners
  window.removeEventListener('resize', onWindowResize);
  
  const resetButton = document.getElementById('resetCubeBtn');
  if (resetButton) {
    resetButton.removeEventListener('click', resetCube);
  }
  
  const toggleButton = document.getElementById('toggleRotationBtn');
  if (toggleButton) {
    toggleButton.removeEventListener('click', toggleRotation);
  }
  
  // Dispose of Three.js resources
  if (cube) {
    scene.remove(cube);
    cube.geometry.dispose();
    if (Array.isArray(cube.material)) {
      cube.material.forEach(material => material.dispose());
    } else if (cube.material) {
      cube.material.dispose();
    }
  }
  
  if (renderer) {
    renderer.dispose();
  }
} 