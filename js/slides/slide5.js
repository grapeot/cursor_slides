/**
 * 幻灯片5 - 带有Three.js 3D内容的幻灯片
 */

// 幻灯片的HTML内容
export const html = `
  <h2>3D Content</h2>
  <p>Interactive 3D visualization with Three.js</p>
  
  <div id="canvas-container" style="width: 100%; height: 350px; border-radius: 8px; overflow: hidden; border: 2px solid #ddd; background-color: #f9f9f9;"></div>
  
  <div style="text-align: center; margin-top: 20px;">
    <button id="resetCubeBtn" style="padding: 8px 16px; background: #5D8AA8; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
      Reset View
    </button>
    <button id="toggleRotationBtn" style="padding: 8px 16px; background: #5D8AA8; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Toggle Rotation
    </button>
  </div>
`;

// Three.js变量
let scene, camera, renderer, cube, controls;
let animationId = null;
let isRotating = true;

// 初始化函数
export function initialize() {
  console.log('Slide 5 initialized - Three.js');
  
  // 初始化3D场景
  initThreeJS();
  
  // 为按钮添加事件监听器
  const resetButton = document.getElementById('resetCubeBtn');
  if (resetButton) {
    resetButton.addEventListener('click', resetCube);
  }
  
  const toggleButton = document.getElementById('toggleRotationBtn');
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleRotation);
  }
  
  // 处理窗口大小变化
  window.addEventListener('resize', onWindowResize);
}

// 初始化Three.js
function initThreeJS() {
  // 获取容器
  const container = document.getElementById('canvas-container');
  if (!container) {
    console.error('Cannot find canvas container');
    return;
  }
  
  try {
    // 清空容器
    container.innerHTML = '';
    
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    
    // 获取容器尺寸
    const containerWidth = container.offsetWidth || 500;
    const containerHeight = container.offsetHeight || 350;
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerWidth, containerHeight);
    container.appendChild(renderer.domElement);
    
    // 添加控制
    if (typeof THREE.OrbitControls !== 'undefined') {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
    } else {
      console.warn('OrbitControls not found, using simple controls');
      controls = {
        update: function() {},
        reset: function() {}
      };
    }
    
    // 创建立方体
    createCube();
    
    // 开始动画循环
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    animate();
    
    console.log('Three.js scene initialized successfully');
  } catch (e) {
    console.error('Three.js initialization error:', e);
  }
}

// 创建立方体
function createCube() {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  
  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // 红色
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // 绿色
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // 蓝色
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), // 黄色
    new THREE.MeshBasicMaterial({ color: 0xff00ff }), // 品红
    new THREE.MeshBasicMaterial({ color: 0x00ffff })  // 青色
  ];
  
  cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);
}

// 动画循环
function animate() {
  animationId = requestAnimationFrame(animate);
  
  if (cube && isRotating) {
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
  }
  
  if (controls && controls.update) controls.update();
  
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// 处理窗口大小变化
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

// 重置立方体视图
function resetCube() {
  if (!cube) return;
  
  cube.rotation.x = 0;
  cube.rotation.y = 0;
  
  if (camera) {
    camera.position.z = 5;
    camera.position.x = 0;
    camera.position.y = 0;
  }
  
  if (controls && controls.reset) {
    controls.reset();
  }
  
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// 切换立方体旋转
function toggleRotation() {
  isRotating = !isRotating;
  console.log(`Rotation ${isRotating ? 'enabled' : 'disabled'}`);
}

// 清理函数
export function cleanup() {
  console.log('Slide 5 cleaned up');
  
  // 移除事件监听器
  const resetButton = document.getElementById('resetCubeBtn');
  if (resetButton) {
    resetButton.removeEventListener('click', resetCube);
  }
  
  const toggleButton = document.getElementById('toggleRotationBtn');
  if (toggleButton) {
    toggleButton.removeEventListener('click', toggleRotation);
  }
  
  window.removeEventListener('resize', onWindowResize);
  
  // 停止动画循环
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  
  // 清理Three.js对象
  if (cube) {
    scene.remove(cube);
    cube.geometry.dispose();
    cube.material.forEach(material => material.dispose());
  }
  
  if (renderer) {
    renderer.dispose();
  }
} 