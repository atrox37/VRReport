<template>
	<div class="vr-architecture-system">
	  <!-- 固定导航栏 -->
	  <nav class="layer-navigation" ref="navigationRef">
		<div 
		  v-for="(layer, index) in architectureLayers" 
		  :key="layer.id"
		  class="nav-item"
		  :class="{ 'nav-active': activeLayer === layer.id }"
		  @click="switchLayer(layer.id)"
		>
		  <div class="nav-number">{{ index + 1 }}</div>
		  <div class="nav-text">
			<div class="nav-title">{{ layer.title }}</div>
			<div class="nav-subtitle">{{ layer.subtitle }}</div>
		  </div>
		</div>
	  </nav>
  
	  <!-- 主内容区域 -->
	  <main class="main-content">
		<!-- 主标题 -->
		<header class="main-header">
		  <h1 class="main-title">VR技术体系架构</h1>
		  <p class="main-subtitle">Virtual Reality 不是单一技术，而是由多个层次构成的生态系统</p>
		</header>
  
		<!-- 当前层详细信息 -->
		<div class="current-layer-details" ref="contentRef">
		  <div class="layer-header">
			<h2 class="layer-title">{{ currentLayer.title }}</h2>
			<p class="layer-subtitle">{{ currentLayer.subtitle }}</p>
		  </div>
  
		  <div class="layer-content">
			<!-- 硬件层特殊内容 -->
			<div v-if="activeLayer === 'hardware'" class="hardware-special">
			  <div class="devices-showcase">
				<h3>常见设备展示</h3>
				<div class="devices-grid">
				  <div 
					v-for="device in vrDevices" 
					:key="device.id"
					class="device-card"
				  >
					<div class="device-image-container">
					  <img :src="device.image" :alt="device.name" />
					</div>
					<div class="device-info">
					  <h4>{{ device.name }}</h4>
					  <p>{{ device.type }}</p>
					  <div class="device-tags">
						<span v-for="tag in device.tags" :key="tag" class="tag">{{ tag }}</span>
					  </div>
					</div>
				  </div>
				</div>
			  </div>
			</div>
  
			<!-- 通用内容 -->
			<div class="layer-description">
			  <p>{{ currentLayer.description }}</p>
			</div>
  
			<div class="responsibilities">
			  <h4>主要职责</h4>
			  <ul class="responsibilities-list">
				<li v-for="(item, idx) in currentLayer.responsibilities" :key="idx">{{ item }}</li>
			  </ul>
			</div>
  
			<div class="simple-explanation">
			  <h4>简单理解</h4>
			  <p class="explanation-text">{{ currentLayer.simpleExplanation }}</p>
			</div>
  
			<!-- 硬件层额外内容 -->
			<div v-if="activeLayer === 'hardware'" class="hardware-details">
			  <div class="hardware-categories">
				<div class="category">
				  <h5>VR 头显 (HMD)</h5>
				  <p>Meta Quest 系列、Pico 系列、Steam Frame、HTC Vive 系列、Valve Index、Varjo XR 系列（工业高端）等</p>
				</div>
				<div class="category">
				  <h5>输入设备</h5>
				  <p>VR 控制器、手势追踪（Quest 和 Pico 都支持）、Vive Tracker（用于追身体部位）等</p>
				</div>
				<div class="category">
				  <h5>空间定位系统</h5>
				  <p>Inside-out Tracking（头显自带摄像头追踪）、Lighthouse（Valve 的外置激光定位）、AR 设备的 SLAM（空间扫描）等</p>
				</div>
			  </div>
			</div>
  
			<!-- 标准层特殊内容 -->
			<div v-if="activeLayer === 'standards'" class="standards-special">
			  <div class="standards-comparison">
				<div class="standard-card openxr">
				  <h4>OpenXR</h4>
				  <ul>
					<li>由 Khronos（OpenGL、Vulkan 组织）制定</li>
					<li>统一了各设备的动作、姿态、输入、渲染接口</li>
					<li>被 Unity / Unreal / SteamVR / Quest / Pico 全面采用</li>
				  </ul>
				  <div class="standard-impact">
					<strong>作用：</strong>
					<p>让 VR 开发者只写一份代码，就能跑所有 VR 设备。</p>
				  </div>
				</div>
				
				<div class="standard-card webxr">
				  <h4>WebXR</h4>
				  <ul>
					<li>让浏览器可以通过 JS 调用 VR/AR 设备</li>
					<li>支持 VR 模式、AR 模式</li>
					<li>Three.js / Babylon.js 可以借此进入 VR</li>
				  </ul>
				  <div class="standard-impact">
					<strong>作用：</strong>
					<p>让 Web 应用也能做真正 VR，不再是"全景看房"。</p>
				  </div>
				</div>
			  </div>
  
			  <div class="webxr-notes">
				<h5>注意：</h5>
				<ol>
				  <li>WebXR 是浏览器层的 XR API，浏览器内部再去调用更底层的系统 XR API（可能是 OpenXR，也可能是厂商自己的 API）。我们在浏览器中只能使用webXR。</li>
				  <li>webXR需要以依赖于浏览器，他只可以在Windows + Meta Quest（最强支持）+ 部分 Android XR + 支持 WebXR 的专用 XR 浏览器上面进行使用。</li>
				  <li>大多XR设备中有自己的系统，有自己浏览器来支持webXR，少部分PCVR设备（Index、Varjo）是没有独立系统的，他们一般需要依赖windows PC。</li>
				</ol>
			  </div>
			</div>
  
			<!-- 运行时层特殊内容 -->
			<div v-if="activeLayer === 'runtime'" class="runtime-special">
			  <div class="runtime-examples">
				<h4>常见运行时示例</h4>
				<div class="examples-grid">
				  <div class="example-item">SteamVR</div>
				  <div class="example-item">Meta XR Runtime</div>
				  <div class="example-item">Pico XR Runtime</div>
				  <div class="example-item">Windows Mixed Reality</div>
				</div>
			  </div>
			</div>
  
			<!-- 引擎层特殊内容 -->
			<div v-if="activeLayer === 'engines'" class="engines-special">
			  <div class="engines-comparison">
				<div class="engine-card">
				  <h5>Unity XR</h5>
				  <p class="engine-tag">最通用、最主流</p>
				  <p>完整的XR开发框架，丰富的资产商店，广泛的应用场景支持</p>
				</div>
				<div class="engine-card">
				  <h5>Unreal XR</h5>
				  <p class="engine-tag">画质最强</p>
				  <p>高端图形渲染能力，电影级视觉效果，适合高质量VR体验</p>
				</div>
				<div class="engine-card">
				  <h5>WebXR + Three.js / Babylon.js</h5>
				  <p class="engine-tag">轻量级 VR</p>
				  <p>基于Web技术，无需安装，跨平台访问，适合轻量级应用</p>
				</div>
			  </div>
			</div>
  
			<!-- 应用层特殊内容 -->
			<div v-if="activeLayer === 'applications'" class="applications-special">
			  <div class="application-examples">
				<h5>应用场景示例</h5>
				<div class="examples-grid">
				  <div class="example-item">VR 电站巡检</div>
				  <div class="example-item">VR 微电网数字孪生</div>
				  <div class="example-item">VR 控制台操作</div>
				  <div class="example-item">VR 故障模拟培训</div>
				  <div class="example-item">VR 设备查看与远程运维</div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </main>
	</div>
  </template>
  
  <script>
  import { ref, computed, onMounted, nextTick } from 'vue'
  import { gsap } from 'gsap'
  import quest4 from '@/images/quest3.jpeg'
  import pico4 from '@/images/pico2.jpeg'
  import steamframe from '@/images/steam.jpg'
  export default {
	name: 'VRArchitectureSystem',
	setup() {
	  const activeLayer = ref('hardware')
	  const navigationRef = ref(null)
	  const contentRef = ref(null)
	  
	  // VR设备数据
	  const vrDevices = ref([
		{
		  id: 1,
		  name: 'Meta Quest 系列',
		  type: 'VR 头显 (HMD)',
		  image: quest4,
		  tags: ['Inside-out Tracking', '手势追踪', '无线']
		},
		{
		  id: 2,
		  name: 'Pico 系列',
		  type: 'VR 头显 (HMD)',
		  image: pico4,
		  tags: ['企业级', '高分辨率', '舒适佩戴']
		},
		{
		  id: 3,
		  name: 'Steam Frame',
		  type: 'VR 头显 (HMD)',
		  image: steamframe,
		  tags: ['PC VR', '高刷新率', '精确追踪']
		}
	  ])
	  
	  // 架构层数据
	  const architectureLayers = ref([
		{
		  id: 'hardware',
		  title: '硬件层',
		  subtitle: '负责"感知现实 & 输出虚拟"',
		  description: '这一层是所有 VR 的物理基础，主要负责显示虚拟画面、感知用户运动、检测手部动作和理解空间环境。',
		  responsibilities: [
			'显示虚拟画面（头显屏幕）',
			'感知用户运动（头部位置、方向）',
			'检测手部动作（控制器、手势）',
			'理解空间环境（定位摄像头 / SLAM）'
		  ],
		  simpleExplanation: '硬件层负责"你在现实世界里怎么移动、怎么操作"。'
		},
		{
		  id: 'runtime',
		  title: '运行时层',
		  subtitle: '负责"让应用和硬件正常工作"',
		  description: '运行时（如 SteamVR、Meta XR Runtime、Pico XR Runtime）的作用是管理硬件设备和提供统一的接口。',
		  responsibilities: [
			'管理头显、控制器、空间定位',
			'建立 VR 系统环境（系统菜单、边界）',
			'负责帧同步和渲染调度',
			'把复杂硬件能力封装成统一接口'
		  ],
		  simpleExplanation: '运行时是 VR 的"操作系统"，负责和硬件打交道。应用不会直接和硬件沟通，而是通过它。'
		},
		{
		  id: 'standards',
		  title: '标准层',
		  subtitle: '负责"统一规则，让跨平台变简单"',
		  description: '这一层的任务是定义 VR/AR 的通用接口标准，让不同设备用同一套 API，减少碎片化。',
		  responsibilities: [
			'定义 VR/AR 的通用接口标准',
			'让不同设备用同一套 API',
			'减少碎片化，让开发者写一份代码跑多平台'
		  ],
		  simpleExplanation: '标准层负责"制定交通规则"，让所有设备说同一种语言。'
		},
		{
		  id: 'engines',
		  title: '开发引擎层',
		  subtitle: '负责"帮助你开发 VR 应用"',
		  description: '这一层提供3D场景管理、物体、光照、材质、动画、交互逻辑和UI系统，屏蔽了复杂的底层细节。',
		  responsibilities: [
			'3D 场景管理',
			'物体、光照、材质、动画',
			'交互逻辑（抓取、射线、碰撞）',
			'UI 系统',
			'渲染管线'
		  ],
		  simpleExplanation: '引擎层是"开发工具"，是你真正编写 VR 功能的地方。开发者不会直接与 Runtime 或设备通信，而是使用"引擎"。'
		},
		{
		  id: 'applications',
		  title: '应用层',
		  subtitle: '负责"实现业务价值"',
		  description: '这是最终呈现给用户的内容，把技术变成实际场景和业务价值。',
		  responsibilities: [
			'实现具体业务场景',
			'提供用户交互界面',
			'处理业务逻辑和数据'
		  ],
		  simpleExplanation: '应用层负责"把技术变成实际场景和业务价值"。这一层主要需要处理"业务逻辑"，虽然不属于底层，但是依赖底层。'
		}
	  ])
  
	  // 计算当前层
	  const currentLayer = computed(() => {
		return architectureLayers.value.find(layer => layer.id === activeLayer.value) || architectureLayers.value[0]
	  })
  
	  // 切换层级
	  const switchLayer = async (layerId) => {
		// 确保DOM已经更新
		await nextTick()
		
		// 添加切换动画
		const tl = gsap.timeline()
		
		tl.to(contentRef.value, {
		  opacity: 0,
		  y: 20,
		  duration: 0.3,
		  ease: 'power2.in'
		})
		
		tl.add(() => {
		  activeLayer.value = layerId
		})
		
		tl.to(contentRef.value, {
		  opacity: 1,
		  y: 0,
		  duration: 0.5,
		  ease: 'back.out(1.2)'
		})
	  }
  
	  // 初始化动画 - 修复侧边栏动画问题
	  const initAnimations = () => {
		// 确保导航栏始终可见
		gsap.set(navigationRef.value, {
		  opacity: 1,
		  x: 0
		})
		
		// 主标题动画
		gsap.from('.main-title', {
		  y: -50,
		  opacity: 0,
		  duration: 1,
		  ease: 'power3.out'
		})
		
		gsap.from('.main-subtitle', {
		  y: 30,
		  opacity: 0,
		  duration: 1,
		  delay: 0.3,
		  ease: 'power2.out'
		})
  
		// 不对左侧导航项做任何动画，确保稳定可见
  
		// 内容区域动画
		gsap.from(contentRef.value, {
		  y: 30,
		  opacity: 0,
		  duration: 0.8,
		  delay: 0.8,
		  ease: 'power2.out'
		})
	  }
  
	  onMounted(() => {
		// 确保DOM完全加载后再初始化动画
		setTimeout(() => {
		  initAnimations()
		}, 100)
	  })
  
	  return {
		architectureLayers,
		vrDevices,
		activeLayer,
		currentLayer,
		switchLayer,
		navigationRef,
		contentRef
	  }
	}
  }
  </script>
  
  <style scoped>
  .vr-architecture-system {
	min-height: 100vh;
	background: linear-gradient(135deg, #1c1c1c 0%, #2a2a2a 100%);
	color: #f0f0f0;
	display: flex;
	position: relative;
  }
  
  /* 固定导航栏 - 修复动画问题 */
  .layer-navigation {
	position: fixed;
	left: 0;
	top: 0;
	width: 280px;
	height: 100vh;
	background: rgba(20, 20, 20, 0.95);
	backdrop-filter: blur(10px);
	border-right: 1px solid rgba(245, 158, 11, 0.3);
	padding: 20px 0;
	overflow-y: auto;
	z-index: 100;
	/* 确保导航栏始终可见 */
	opacity: 1 !important;
	transform: translateX(0) !important;
  }
  
  .nav-item {
	display: flex;
	align-items: center;
	padding: 15px 20px;
	margin: 0 10px 10px;
	border-radius: 10px;
	cursor: pointer;
	transition: all 0.3s ease;
	border: 1px solid transparent;
	/* 确保导航项始终可见 */
	opacity: 1 !important;
	transform: translateX(0) !important;
  }
  
  .nav-item:hover {
	background: rgba(255, 255, 255, 0.05);
	border-color: rgba(245, 158, 11, 0.3);
  }
  
  .nav-active {
	background: rgba(245, 158, 11, 0.1);
	border-color: #f59e0b;
	box-shadow: 0 5px 15px rgba(245, 158, 11, 0.2);
  }
  
  .nav-number {
	width: 36px;
	height: 36px;
	background: linear-gradient(45deg, #f59e0b, #fbbf24);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	color: #1c1c1c;
	margin-right: 15px;
	flex-shrink: 0;
  }
  
  .nav-title {
	font-size: 1.1rem;
	font-weight: bold;
	color: #f0f0f0;
	margin-bottom: 4px;
  }
  
  .nav-active .nav-title {
	color: #f59e0b;
  }
  
  .nav-subtitle {
	font-size: 0.85rem;
	color: #aaa;
	line-height: 1.3;
  }
  
  /* 主内容区域 */
  .main-content {
	flex: 1;
	margin-left: 280px;
	padding: 40px;
	max-width: calc(100% - 280px);
  }
  
  .main-header {
	text-align: center;
	margin-bottom: 60px;
  }
  
  .main-title {
	font-size: 3rem;
	margin-bottom: 1rem;
	background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
	background-size: 200% auto;
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	animation: gradient-shift 3s linear infinite;
  }
  
  .main-subtitle {
	font-size: 1.3rem;
	opacity: 0.9;
	max-width: 600px;
	margin: 0 auto;
	line-height: 1.6;
  }
  
  /* 当前层详细信息 */
  .current-layer-details {
	max-width: 1000px;
	margin: 0 auto;
  }
  
  .layer-header {
	margin-bottom: 40px;
	border-bottom: 2px solid #f59e0b;
	padding-bottom: 20px;
  }
  
  .layer-title {
	font-size: 2.5rem;
	color: #f59e0b;
	margin-bottom: 10px;
  }
  
  .layer-subtitle {
	font-size: 1.3rem;
	color: #fbbf24;
  }
  
  .layer-content {
	display: grid;
	gap: 30px;
  }
  
  .layer-description {
	font-size: 1.1rem;
	line-height: 1.7;
	background: rgba(245, 158, 11, 0.05);
	padding: 20px;
	border-radius: 10px;
	border-left: 4px solid #f59e0b;
  }
  
  .responsibilities h4,
  .simple-explanation h4 {
	color: #f59e0b;
	margin-bottom: 15px;
	font-size: 1.3rem;
  }
  
  .responsibilities-list {
	list-style: none;
	padding: 0;
  }
  
  .responsibilities-list li {
	padding: 10px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	position: relative;
	padding-left: 25px;
  }
  
  .responsibilities-list li::before {
	content: '▶';
	position: absolute;
	left: 0;
	color: #f59e0b;
  }
  
  .explanation-text {
	font-style: italic;
	background: rgba(245, 158, 11, 0.1);
	padding: 15px;
	border-radius: 8px;
	border-left: 4px solid #fbbf24;
  }
  
  /* 硬件层特殊样式 */
  .hardware-categories {
	display: grid;
	gap: 20px;
	margin-top: 20px;
  }
  
  .category {
	background: rgba(255, 255, 255, 0.05);
	padding: 20px;
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .category h5 {
	color: #f59e0b;
	margin-bottom: 10px;
	font-size: 1.1rem;
  }
  
  .devices-showcase {
	margin-top: 30px;
  }
  
  .devices-showcase h3 {
	color: #f59e0b;
	margin-bottom: 20px;
	font-size: 1.5rem;
  }
  
  .devices-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 20px;
	margin-bottom: 30px;
  }
  
  .device-card {
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	overflow: hidden;
	transition: all 0.3s ease;
	border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .device-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 25px rgba(245, 158, 11, 0.2);
	border-color: #f59e0b;
  }
  
  .device-image-container {
	height: 160px;
	overflow: hidden;
	background: rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
	img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
  }
  
  .device-placeholder {
	color: #f59e0b;
	font-weight: bold;
	text-align: center;
	padding: 20px;
  }
  
  .device-info {
	padding: 15px;
  }
  
  .device-info h4 {
	color: #f59e0b;
	margin-bottom: 5px;
  }
  
  .device-info p {
	color: #aaa;
	font-size: 0.9rem;
	margin-bottom: 10px;
  }
  
  .device-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
  }
  
  .tag {
	background: rgba(245, 158, 11, 0.2);
	color: #fbbf24;
	padding: 3px 8px;
	border-radius: 12px;
	font-size: 0.8rem;
	border: 1px solid rgba(245, 158, 11, 0.3);
  }
  
  /* 标准层特殊样式 */
  .standards-comparison {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 30px;
	margin: 30px 0;
  }
  
  .standard-card {
	background: rgba(255, 255, 255, 0.05);
	padding: 25px;
	border-radius: 15px;
	border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .standard-card h4 {
	color: #f59e0b;
	margin-bottom: 15px;
	font-size: 1.3rem;
  }
  
  .standard-card ul {
	list-style: none;
	padding: 0;
	margin-bottom: 20px;
  }
  
  .standard-card li {
	padding: 8px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	position: relative;
	padding-left: 20px;
  }
  
  .standard-card li::before {
	content: '✓';
	position: absolute;
	left: 0;
	color: #f59e0b;
  }
  
  .standard-impact {
	background: rgba(245, 158, 11, 0.1);
	padding: 15px;
	border-radius: 8px;
	border-left: 4px solid #f59e0b;
  }
  
  .webxr-notes {
	background: rgba(255, 255, 255, 0.05);
	padding: 25px;
	border-radius: 15px;
	margin-top: 30px;
  }
  
  .webxr-notes h5 {
	color: #f59e0b;
	margin-bottom: 15px;
  }
  
  .webxr-notes ol {
	padding-left: 20px;
  }
  
  .webxr-notes li {
	margin-bottom: 10px;
	line-height: 1.6;
  }
  
  /* 运行时层特殊样式 */
  .runtime-examples {
	margin-top: 30px;
  }
  
  .runtime-examples h4 {
	color: #f59e0b;
	margin-bottom: 15px;
  }
  
  /* 引擎层特殊样式 */
  .engines-comparison {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 20px;
	margin: 30px 0;
  }
  
  .engine-card {
	background: rgba(255, 255, 255, 0.05);
	padding: 20px;
	border-radius: 12px;
	text-align: center;
	border: 1px solid rgba(255, 255, 255, 0.1);
	transition: all 0.3s ease;
  }
  
  .engine-card:hover {
	transform: translateY(-5px);
	border-color: #f59e0b;
	box-shadow: 0 10px 25px rgba(245, 158, 11, 0.2);
  }
  
  .engine-card h5 {
	color: #f59e0b;
	margin-bottom: 10px;
	font-size: 1.2rem;
  }
  
  .engine-tag {
	background: linear-gradient(45deg, #f59e0b, #fbbf24);
	color: #1c1c1c;
	padding: 3px 10px;
	border-radius: 15px;
	font-size: 0.8rem;
	font-weight: bold;
	display: inline-block;
	margin-bottom: 15px;
  }
  
  /* 应用层特殊样式 */
  .examples-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 15px;
	margin-top: 20px;
  }
  
  .example-item {
	background: rgba(245, 158, 11, 0.1);
	padding: 15px;
	border-radius: 8px;
	text-align: center;
	border: 1px solid rgba(245, 158, 11, 0.3);
	transition: all 0.3s ease;
  }
  
  .example-item:hover {
	background: rgba(245, 158, 11, 0.2);
	transform: translateY(-3px);
  }
  
  /* 动画 */
  @keyframes gradient-shift {
	0% {
	  background-position: 0% 50%;
	}
	50% {
	  background-position: 100% 50%;
	}
	100% {
	  background-position: 0% 50%;
	}
  }
  
  /* 响应式设计 */
  @media (max-width: 1024px) {
	.layer-navigation {
	  width: 240px;
	}
	
	.main-content {
	  margin-left: 240px;
	  max-width: calc(100% - 240px);
	  padding: 30px;
	}
  }
  
  @media (max-width: 768px) {
	.vr-architecture-system {
	  flex-direction: column;
	}
	
	.layer-navigation {
	  position: static;
	  width: 100%;
	  height: auto;
	  max-height: 200px;
	  overflow-x: auto;
	  display: flex;
	  padding: 15px;
	}
	
	.nav-item {
	  flex-direction: column;
	  text-align: center;
	  min-width: 120px;
	  margin: 0 5px;
	}
	
	.nav-number {
	  margin-right: 0;
	  margin-bottom: 8px;
	}
	
	.main-content {
	  margin-left: 0;
	  max-width: 100%;
	  padding: 20px;
	}
	
	.main-title {
	  font-size: 2.2rem;
	}
	
	.standards-comparison {
	  grid-template-columns: 1fr;
	}
	
	.devices-grid {
	  grid-template-columns: 1fr;
	}
	
	.engines-comparison {
	  grid-template-columns: 1fr;
	}
  }
  
  @media (max-width: 480px) {
	.main-title {
	  font-size: 1.8rem;
	}
	
	.layer-title {
	  font-size: 2rem;
	}
	
	.main-content {
	  padding: 15px;
	}
  }
  </style>