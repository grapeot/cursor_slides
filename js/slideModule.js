/**
 * 幻灯片模块系统
 * 用于集中管理幻灯片模块的加载和初始化
 */

// 存储已加载的幻灯片模块
const loadedSlides = {};

/**
 * 加载幻灯片模块
 * @param {string} slideId - 幻灯片ID (e.g., 'slide1')
 * @returns {Promise} - 加载完成的Promise
 */
export async function loadSlideModule(slideId) {
  try {
    // 动态导入幻灯片模块
    const module = await import(`./slides/${slideId}.js`);
    
    // 存储加载的模块
    loadedSlides[slideId] = module;
    console.log(`模块加载成功: ${slideId}`);
    
    return module;
  } catch (error) {
    console.error(`加载模块 ${slideId} 失败:`, error);
    return null;
  }
}

/**
 * 渲染幻灯片内容
 * @param {string} slideId - 幻灯片ID
 * @param {Element} container - 容器元素
 */
export function renderSlide(slideId, container) {
  if (!loadedSlides[slideId]) {
    console.error(`模块 ${slideId} 尚未加载`);
    return;
  }
  
  // 渲染HTML内容
  if (loadedSlides[slideId].html) {
    container.innerHTML = loadedSlides[slideId].html;
  }
  
  console.log(`渲染幻灯片: ${slideId}`);
}

/**
 * 初始化幻灯片
 * @param {string} slideId - 幻灯片ID
 */
export function initializeSlide(slideId) {
  if (!loadedSlides[slideId]) {
    console.error(`模块 ${slideId} 尚未加载，无法初始化`);
    return;
  }
  
  // 调用模块的初始化函数
  if (typeof loadedSlides[slideId].initialize === 'function') {
    try {
      loadedSlides[slideId].initialize();
      console.log(`初始化幻灯片: ${slideId}`);
    } catch (error) {
      console.error(`初始化模块 ${slideId} 时出错:`, error);
    }
  } else {
    console.log(`模块 ${slideId} 没有初始化函数`);
  }
}

/**
 * 卸载幻灯片
 * @param {string} slideId - 幻灯片ID
 */
export function cleanupSlide(slideId) {
  if (!loadedSlides[slideId]) {
    return;
  }
  
  // 调用模块的清理函数
  if (typeof loadedSlides[slideId].cleanup === 'function') {
    try {
      loadedSlides[slideId].cleanup();
      console.log(`清理幻灯片: ${slideId}`);
    } catch (error) {
      console.error(`清理模块 ${slideId} 时出错:`, error);
    }
  }
}

/**
 * 预加载所有幻灯片
 * @param {Array} slideIds - 幻灯片ID数组
 * @returns {Promise} - 所有幻灯片加载完成的Promise
 */
export async function preloadAllSlides(slideIds) {
  const loadPromises = slideIds.map(id => loadSlideModule(id));
  return Promise.all(loadPromises);
} 