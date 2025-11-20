<template>
	<div class="vr-engines-comparison">
	  <!-- 动态背景 -->
	  <div class="dynamic-background">
		<div class="floating-orbs">
		  <div class="orb orb-1"></div>
		  <div class="orb orb-2"></div>
		  <div class="orb orb-3"></div>
		</div>
	  </div>
  
	  <!-- 固定导航栏 -->
	  <nav class="engine-navigation">
		<div 
		  v-for="(engine, index) in engines" 
		  :key="engine.id"
		  class="nav-engine"
		  :class="{ 'engine-active': activeEngine === engine.id }"
		  @click="switchEngine(engine.id)"
		>
		  <div class="engine-number">0{{ index + 1 }}</div>
		  <div class="engine-info">
			<div class="engine-name">{{ engine.name }}</div>
			<div class="engine-type">{{ engine.type }}</div>
		  </div>
		  <div class="active-indicator"></div>
		</div>
	  </nav>
  
	  <!-- 主内容区域 -->
	  <main class="main-content">
		<!-- 引擎标题区域 -->
		<header class="engine-header">
		  <div class="title-section">
			<h1 class="engine-title">{{ currentEngine.name }}</h1>
			<div class="engine-badge">{{ currentEngine.type }}</div>
		  </div>
		  <div class="description-section">
			<p class="engine-description">{{ currentEngine.description }}</p>
			<a :href="currentEngine.website" class="website-link" target="_blank">
			  <span>官网地址</span>
			  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
				<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" 
					  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			  </svg>
			</a>
		  </div>
		</header>
  
		<!-- 技术架构 -->
		<section class="tech-architecture">
		  <h2 class="section-title">
			技术架构
		  </h2>
			<div class="architecture-flow">
				<div 
					class="architecture-row" 
					v-for="(row, rowIndex) in architectureRows" 
					:key="rowIndex"
				>
					<div 
						class="architecture-layer"
						v-for="(layer, idx) in row"
						:key="`${rowIndex}-${idx}`"
						@mouseenter="showLayerTooltip(layer, $event)"
						@mouseleave="hideLayerTooltip"
					>
						<div class="layer-card">
							<div class="layer-icon">{{ layer.icon }}</div>
							<div class="layer-content">
								<h4>{{ layer.title }}</h4>
								<p>{{ layer.description }}</p>
							</div>
						</div>
						<div class="layer-connector" >
							<div v-if="idx < architectureRows.length - 1&&idx % 3 !== 0" class="connector-arrow">{{ (rowIndex % 2) === 1 ? '←' : '→' }}</div>
							<!-- <div v-else-if="rowIndex % 3 === 0" class="connector-arrow">{{ '↑' }}</div>
							<div v-else class="connector-arrow">{{ '↓' }}</div> -->
						</div>
					</div>
				</div>
			</div>
		  
		  <!-- 架构层提示框 -->
		  <div 
			v-if="activeTooltip" 
			class="layer-tooltip" 
			:style="tooltipStyle"
		  >
			<h4>{{ activeTooltip.title }}</h4>
			<p>{{ activeTooltip.description }}</p>
			<div class="tooltip-arrow"></div>
		  </div>
		</section>
  
		<!-- 核心能力 -->
		<section class="core-capabilities">
		  <h2 class="section-title">
			<!-- <span class="title-icon">⚡</span> -->
			核心能力
		  </h2>
		  <div class="capabilities-grid">
			<div 
			  v-for="(capability, index) in currentEngine.capabilities" 
			  :key="index"
			  class="capability-card"
			>
			  <div class="capability-icon">{{ capability.icon }}</div>
			  <div class="capability-content">
				<h4>{{ capability.title }}</h4>
				<p>{{ capability.description }}</p>
			  </div>
			</div>
		  </div>
		</section>
  
		<!-- 开发方式 -->
		<section class="development-method">
		  <h2 class="section-title">
			<!-- <span class="title-icon">🛠️</span> -->
			开发方式
		  </h2>
		  <div class="method-cards">
			<div class="method-card" v-for="(method, index) in currentEngine.development" :key="index">
			  <div class="method-header">
				<div class="method-icon">{{ method.icon }}</div>
				<h4>{{ method.category }}</h4>
			  </div>
			  <ul class="method-list">
				<li v-for="(item, idx) in method.items" :key="idx">{{ item }}</li>
			  </ul>
			</div>
		  </div>
		</section>
  
		<!-- 优缺点对比 -->
		<section class="pros-cons">
		  <h2 class="section-title">
			<!-- <span class="title-icon">⚖️</span> -->
			优势与局限
		  </h2>
		  <div class="comparison-grid">
			<div class="pros-section">
			  <div class="section-header">
				<div class="section-icon">✅</div>
				<h3>核心优势</h3>
			  </div>
			  <div class="advantages-list">
				<div 
				  v-for="(advantage, index) in currentEngine.advantages" 
				  :key="index"
				  class="advantage-item"
				>
				  <div class="advantage-bullet"></div>
				  <span>{{ advantage }}</span>
				</div>
			  </div>
			</div>
			
			<div class="cons-section">
			  <div class="section-header">
				<div class="section-icon">⚠️</div>
				<h3>局限性</h3>
			  </div>
			  <div class="limitations-list">
				<div 
				  v-for="(limitation, index) in currentEngine.limitations" 
				  :key="index"
				  class="limitation-item"
				>
				  <div class="limitation-bullet"></div>
				  <span>{{ limitation }}</span>
				</div>
			  </div>
			</div>
		  </div>
		</section>
  
		<!-- 案例展示 -->
		<section class="case-studies">
		  <h2 class="section-title">
			<!-- <span class="title-icon">📁</span> -->
			解决方案与案例
		  </h2>
		  <div class="cases-grid">
			<div 
			  v-for="(caseStudy, index) in currentEngine.caseStudies" 
			  :key="index"
			  class="case-card"
			>
			  <div class="case-image" @click="openCaseLink(caseStudy.externalLink)">
				<div class="image-placeholder" v-if="!caseStudy.image">
				  {{ caseStudy.title }}
				</div>
				<img v-else :src="caseStudy.image" :alt="caseStudy.title" class="case-img">
				<div class="image-overlay">
				  <span class="view-link">查看详情</span>
				</div>
			  </div>
			  <div class="case-content">
				<div class="case-header">
				  <h4>{{ caseStudy.title }}</h4>
				  <div class="case-badge">案例</div>
				</div>
				<p class="case-description">{{ caseStudy.description }}</p>
				<div class="case-highlights">
				  <div 
					v-for="(highlight, idx) in caseStudy.highlights" 
					:key="idx"
					class="highlight-tag"
				  >
					{{ highlight }}
				  </div>
				</div>
				<a 
				  v-if="caseStudy.externalLink" 
				  :href="caseStudy.externalLink" 
				  class="external-link"
				  target="_blank"
				>
				  查看完整案例 →
				</a>
			  </div>
			</div>
		  </div>
		</section>
  
		<!-- 适用性评估 -->
		<section class="applicability">
		  <h2 class="section-title">
			<!-- <span class="title-icon">🎯</span> -->
			微电网/EMS适用性评价
		  </h2>
		  <div class="applicability-matrix">
			<div class="suitable-scenarios">
			  <div class="scenario-header">
				<div class="scenario-icon">✅</div>
				<h4>适用场景</h4>
			  </div>
			  <div class="scenarios-list">
				<div 
				  v-for="(scenario, index) in currentEngine.suitableScenarios" 
				  :key="index"
				  class="scenario-item"
				>
				  {{ scenario }}
				</div>
			  </div>
			</div>
			
			<div class="unsuitable-scenarios">
			  <div class="scenario-header">
				<div class="scenario-icon">❌</div>
				<h4>不适用场景</h4>
			  </div>
			  <div class="scenarios-list">
				<div 
				  v-for="(scenario, index) in currentEngine.unsuitableScenarios" 
				  :key="index"
				  class="scenario-item"
				>
				  {{ scenario }}
				</div>
			  </div>
			</div>
		  </div>
		</section>
	  </main>
  
	  <!-- 引擎指示器 -->
	  <!-- <div class="engine-indicator" :class="`indicator-${activeEngine}`">
		<div class="indicator-glow"></div>
		<div class="indicator-text">当前引擎: {{ currentEngine.name }}</div>
	  </div> -->
	</div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue'
  import { gsap } from 'gsap'
  import u1 from '@/images/u1.jpg'
  import u2 from '@/images/u2.jpg'
  import ue1 from '@/images/ue1.jpg'
  import ue2 from '@/images/ue2.jpg'
  import t1 from '@/images/t1.jpg'
  import t2 from '@/images/t2.jpg'
  import b1 from '@/images/b1.jpg'
  export default {
	name: 'VREnginesComparison',
	setup() {
	  const activeEngine = ref('unity')
	  const activeTooltip = ref(null)
	  const tooltipStyle = ref({})
  
	  // 引擎数据
	  const engines = ref([
		{
		  id: 'unity',
		  name: 'Unity XR + OpenXR',
		  type: '跨平台VR开发框架',
		  description: 'Unity XR 是 Unity 提供的一套跨平台的 VR/AR（XR）开发框架，通过 OpenXR 标准让你的 VR 应用可以在不同头显上统一运行。',
		  website: 'https://unity.cn/',
		  architecture: [
			{ 
			  icon: '🔧', 
			  title: '硬件设备', 
			  description: 'Quest / Pico / Vive / Varjo',
			  detailed: '支持所有主流VR头显设备，包括Meta Quest系列、Pico系列、HTC Vive系列等'
			},
			{ 
			  icon: '⚡', 
			  title: 'OpenXR Runtime', 
			  description: '统一硬件标准',
			  detailed: '基于OpenXR开放标准，提供统一的硬件接口，确保跨设备兼容性'
			},
			{ 
			  icon: '🔌', 
			  title: 'XR Plug-in Management', 
			  description: 'Runtime功能集成',
			  detailed: '管理和集成不同XR运行时的功能，提供统一的开发接口'
			},
			{ 
			  icon: '🛠️', 
			  title: 'Unity XR SDK', 
			  description: '渲染、追踪、控制器等基础能力',
			  detailed: '提供完整的XR开发工具包，包括头部追踪、手势识别、控制器输入等核心功能'
			},
			{ 
			  icon: '👆', 
			  title: 'XR Interaction Toolkit', 
			  description: '交互系统封装',
			  detailed: '高级交互框架，封装了常见的VR交互模式，如抓取、射线交互、UI操作等'
			},
			{ 
			  icon: '🎮', 
			  title: '应用层', 
			  description: '场景/UI/操作逻辑',
			  detailed: '开发者在此层实现具体的业务逻辑和用户界面，构建完整的VR应用'
			}
		  ],
		  capabilities: [
			{ icon: '🎯', title: '6DoF 追踪', description: '头部、左右手、控制器位置/方向' },
			{ icon: '🎮', title: 'VR 控制器交互', description: 'Trigger、Grip、Thumbstick、按钮、震动反馈' },
			{ icon: '👐', title: '手势追踪', description: '无需控制器，支持手部骨骼模型' },
			{ icon: '🖥️', title: 'VR UI 系统', description: 'World Space UI + XRI 的 UIInteractionModule' },
			{ icon: '🔦', title: '射线 & 近场交互', description: '远距离射线/近距离抓取' },
			{ icon: '🚀', title: 'VR 运动方式', description: 'Teleport / Smooth Move / Smooth Rotate' },
			{ icon: '🌐', title: '多平台适配', description: 'Quest / Pico / Vive / SteamVR / Varjo / Windows MR' },
			{ icon: '🎨', title: '模型、物理、动画', description: '适合做工业级仿真' }
		  ],
		  development: [
			{
			  category: '开发语言',
			  icon: '💻',
			  items: ['C#', 'Unity Engine', 'Unity Editor', 'XR Plug-in Manager', 'XR Interaction Toolkit']
			},
			{
			  category: '调试方式',
			  icon: '🐛',
			  items: ['Play Mode', 'XR Device Simulator', '无头显可调试']
			},
			{
			  category: '开发模式',
			  icon: '🛠️',
			  items: ['脚本化开发', '可视化组件开发']
			}
		  ],
		  advantages: [
			'跨平台能力非常强（OpenXR 标准）',
			'提供完整的 VR 交互系统',
			'可处理复杂工业场景',
			'性能强大，支持高画质',
			'生态资源巨大',
			'开发体验成熟、调试工具强大'
		  ],
		  limitations: [
			'开发成本比 WebXR 高',
			'部署复杂（不像 Web 可直接访问）',
			'对硬件要求高',
			'多人协作 / 网络同步难度大'
		  ],
		  caseStudies: [
			{
			  title: 'ForgeFX 培训解决方案',
			  description: '使用 Unity XR Interaction Toolkit 的沉浸式培训解决方案',
			  highlights: ['XR Interaction Toolkit', '通用交互组件', '设备行为模拟', '物理计算'],
			  externalLink: 'https://unity.com/cn/blog/forgefx-industry-xr-immersive-training?utm_source=chatgpt.com',
			  image: u1
			},
			{
			  title: '工业设备操作培训',
			  description: '基于Unity XR的工业设备操作与维护培训系统',
			  highlights: ['设备操作模拟', '故障诊断', '安全培训', '多场景适配'],
			  externalLink: 'https://unity.com/cn/resources/xr-applications-for-industry?utm_source=chatgpt.com',
			  image: u2
			},
			// {
			//   title: '电力设备VR巡检',
			//   description: '变电站设备VR巡检与维护培训平台',
			//   highlights: ['设备识别', '操作流程', '安全规范', '数据记录'],
			//   imageUrl: '/images/unity-power-inspection.jpg'
			// }
		  ],
		  suitableScenarios: [
			'VR 逆变器/配电柜操作培训',
			'VR 故障模拟（跳闸、过热、电弧）',
			'VR 巡检模拟路线',
			'VR 安全作业培训',
			'真实的设备交互',
			'大型微电网数字孪生场景'
		  ],
		  unsuitableScenarios: [
			'Web EMS 系统（需要浏览器）',
			'VR 快速查看场景（太"重"）'
		  ]
		},
		{
		  id: 'unreal',
		  name: 'Unreal Engine',
		  type: '顶级实时3D引擎',
		  description: 'Unreal Engine 是目前全球最先进的实时 3D 引擎之一，拥有行业领先的渲染、物理和仿真能力。',
		  website: 'https://www.unrealengine.com/',
		  architecture: [
			{ 
			  icon: '🔧', 
			  title: '硬件头显', 
			  description: 'Vive / Varjo / Quest / Pico',
			  detailed: '支持高端VR设备，特别适合需要高保真视觉效果的工业应用'
			},
			{ 
			  icon: '⚡', 
			  title: 'OpenXR Runtime', 
			  description: '统一底层能力',
			  detailed: '基于OpenXR标准，提供跨设备统一的底层XR能力访问'
			},
			{ 
			  icon: '🛠️', 
			  title: 'Unreal XR Framework', 
			  description: 'XR核心系统',
			  detailed: 'Unreal引擎专用的XR框架，管理设备追踪、渲染管线等核心功能'
			},
			{ 
			  icon: '🎮', 
			  title: 'Enhanced Input', 
			  description: '高可定制性控制器',
			  detailed: '高度可定制的输入系统，支持复杂的控制器映射和手势识别'
			},
			{ 
			  icon: '📐', 
			  title: 'Blueprint / C++', 
			  description: '可视化脚本系统',
			  detailed: '蓝图可视化编程与C++代码开发相结合，满足不同复杂度需求'
			},
			{ 
			  icon: '🌟', 
			  title: '场景渲染层', 
			  description: 'Nanite + Lumen',
			  detailed: '基于Nanite虚拟几何体和Lumen全局光照的顶级渲染系统'
			},
			{ 
			  icon: '🎯', 
			  title: '应用层', 
			  description: '仿真/培训/数字孪生',
			  detailed: '构建高保真工业仿真、培训系统和数字孪生应用'
			}
		  ],
		  capabilities: [
			{ icon: '🌈', title: '最强实时渲染', description: '电影级视觉效果' },
			{ icon: '🎯', title: '6DoF VR 支持', description: '完整VR追踪能力' },
			{ icon: '👆', title: '完整VR交互', description: '全面的交互系统' },
			{ icon: '⚡', title: '复杂物理仿真', description: 'Chaos物理引擎' },
			{ icon: '💫', title: 'Niagara粒子系统', description: '工业仿真专用' },
			{ icon: '🏞️', title: '大场景渲染', description: 'World Partition' }
		  ],
		  development: [
			{
			  category: '开发语言',
			  icon: '💻',
			  items: ['C++（为主）', 'Blueprint可视化脚本', 'Unreal Engine']
			},
			{
			  category: '主要工具',
			  icon: '🛠️',
			  items: ['Unreal Editor', 'Blueprint系统', 'Niagara VFX', 'Animation Blueprint']
			},
			{
			  category: '调试方式',
			  icon: '🐛',
			  items: ['Play in Editor', '蓝图可视化调试', 'C++断点调试']
			}
		  ],
		  advantages: [
			'行业最强的实时渲染',
			'超大场景处理能力最强',
			'兼容性强',
			'工业仿真能力强',
			'蓝图可视化开发',
			'工业模型支持好'
		  ],
		  limitations: [
			'上手难度高',
			'对硬件要求高',
			'部署成本高',
			'不支持Web',
			'开发与运维成本高'
		  ],
		  caseStudies: [
			{
			  title: '校园能源数据VR可视化',
			  description: '使用Unreal Engine 5.3构建的能源数据VR可视化应用',
			  highlights: ['IoT数据集成', '实时能源数据', 'VR环境交互', '培训展厅监控'],
			  externalLink: 'https://arxiv.org/html/2408.12428?utm_source=chatgpt.com',
			  image: ue1
			},
			{
			  title: '工业数字孪生平台',
			  description: '基于UE5的高精度工业数字孪生与仿真平台',
			  highlights: ['高精度建模', '实时数据驱动', '物理仿真', '多用户协作'],
			  externalLink: 'https://www.mdpi.com/2079-9292/14/10/1964?utm_source=chatgpt.com',
			  image: ue2
			},
			
		  ],
		  suitableScenarios: [
			'VR故障演练（电弧/烟雾/火灾）',
			'VR安全培训',
			'高端数字孪生展示',
			'1:1还原配电房/电站',
			'大场景巡检模拟',
			'写实设备模型展示'
		  ],
		  unsuitableScenarios: [
			'Web端VR（无WebXR）',
			'轻量工具型VR',
			'低成本VR项目',
			'Quest/Pico写实场景',
			'快速开发的小需求'
		  ]
		},
		{
		  id: 'threejs',
		  name: 'Three.js + WebXR',
		  type: '轻量Web VR方案',
		  description: '基于浏览器的轻量 XR 方案，用于在 Web 环境中直接构建 VR/AR 体验，无需安装 App。',
		  website: 'https://threejs.org/',
		  architecture: [
			{ 
			  icon: '🔧', 
			  title: '硬件头显', 
			  description: 'Quest / Pico / Vive',
			  detailed: '支持所有具备WebXR功能的VR设备，通过浏览器直接访问'
			},
			{ 
			  icon: '🌐', 
			  title: 'XR浏览器', 
			  description: '支持WebXR',
			  detailed: '现代浏览器如Chrome、Firefox等，需支持WebXR Device API'
			},
			{ 
			  icon: '⚡', 
			  title: 'WebXR API', 
			  description: '头显追踪、控制器、渲染',
			  detailed: 'W3C标准的WebXR API，提供设备追踪、控制器输入和渲染管理'
			},
			{ 
			  icon: '🎨', 
			  title: 'Three.js', 
			  description: '渲染、场景、模型',
			  detailed: '基于WebGL的3D渲染库，负责场景管理、模型加载和视觉效果'
			},
			{ 
			  icon: '🚀', 
			  title: '应用代码', 
			  description: '交互、UI、逻辑',
			  detailed: 'JavaScript/TypeScript编写的应用逻辑，实现用户交互和业务功能'
			}
		  ],
		  capabilities: [
			{ icon: '🎯', title: 'VR 6DoF', description: '头显位置/朝向追踪' },
			{ icon: '🎮', title: 'VR控制器输入', description: '扳机、摇杆、按钮' },
			{ icon: '🔦', title: '射线交互', description: 'VR场景UI/物体操作' },
			{ icon: '📦', title: '3D模型加载', description: 'GLTF/FBX数字孪生' },
			{ icon: '✨', title: '简单动画', description: '位移、旋转、缩放' },
			{ icon: '📱', title: '多平台兼容', description: 'Quest、Pico、PC浏览器' }
		  ],
		  development: [
			{
			  category: '开发语言',
			  icon: '💻',
			  items: ['JavaScript / TypeScript', 'Three.js', 'WebXR Polyfill']
			},
			{
			  category: '调试方式',
			  icon: '🐛',
			  items: ['浏览器调试', 'WebXR模拟器']
			}
		  ],
		  advantages: [
			'无需安装App',
			'跨平台性极强',
			'前端团队可直接开发',
			'适合可视化VR',
			'部署更新极其方便'
		  ],
		  limitations: [
			'性能有限',
			'缺少工业级交互能力',
			'无法支持高逼真渲染',
			'不适合培训/操作/仿真',
			'依赖浏览器性能'
		  ],
		  caseStudies: [
			{
			  title: '微电网数字孪生框架',
			  description: '基于WebXR的微电网数字孪生构建框架研究',
			  highlights: ['实时数据流', '可视化反馈', '模型驱动', 'VR/AR整合'],
			  externalLink: 'https://www.sciencedirect.com/science/article/pii/S2352484723006169?utm_source=chatgpt.com',
			  image: t1
			},
			{
			  title: 'Three.js WebXR 多平台互动／教学方案',
			  description: '基于Three.js的基于 WebXR 的多用户 VR/AR 教育平台',
			  highlights: ['浏览器访问', '多人协作', '远程访问'],
			  externalLink: 'https://threejs.org/examples/?q=webxr',
			  image: t2
			},
		  ],
		  suitableScenarios: [
			'轻量VR可视化',
			'微电网架构展示',
			'元件布局',
			'场景漫游',
			'数据看板',
			'IoT数据可视化'
		  ],
		  unsuitableScenarios: [
			'微电网VR培训',
			'真实操作仿真',
			'故障模拟',
			'大型写实场景',
			'工控流程演练'
		  ]
		},
		{
		  id: 'babylon',
		  name: 'Babylon.js + WebXR',
		  type: '完整Web 3D引擎',
		  description: '基于浏览器的完整 3D + XR 引擎方案，是 Web 端最成熟、最标准化的 XR 引擎。',
		  website: 'https://www.babylonjs.com/',
		  architecture: [
			{ 
			  icon: '🔧', 
			  title: '硬件VR头显', 
			  description: 'Quest / Pico / Vive',
			  detailed: '支持所有主流VR设备，通过WebXR标准实现跨设备兼容'
			},
			{ 
			  icon: '🌐', 
			  title: 'WebXR Runtime', 
			  description: '浏览器层',
			  detailed: '浏览器提供的WebXR运行时环境，管理设备连接和基础XR功能'
			},
			{ 
			  icon: '⚡', 
			  title: 'WebXR API', 
			  description: '追踪、控制器、Session',
			  detailed: '标准WebXR API，处理设备追踪、控制器输入和XR会话管理'
			},
			{ 
			  icon: '🛠️', 
			  title: 'WebXR ExperienceHelper', 
			  description: '完整XR支持',
			  detailed: 'Babylon.js内置的WebXR辅助工具，简化XR应用开发流程'
			},
			{ 
			  icon: '🎨', 
			  title: 'Babylon.js引擎', 
			  description: '场景、渲染、模型、物理',
			  detailed: '完整的Web 3D引擎，提供场景图、渲染管线、模型加载和物理引擎'
			},
			{ 
			  icon: '🚀', 
			  title: '应用逻辑层', 
			  description: 'UI、交互、数据',
			  detailed: '应用业务逻辑层，实现用户界面、交互逻辑和数据集成'
			}
		  ],
		  capabilities: [
			{ icon: '🔧', title: 'WebXR完整支持', description: '内建VR会话管理' },
			{ icon: '🎨', title: '高级材质渲染', description: '高质量视觉效果' },
			{ icon: '🏗️', title: '成熟交互系统', description: '场景管理和GUI' },
			{ icon: '⚡', title: 'WebGPU支持', description: '性能优于WebGL' },
			{ icon: '🔬', title: '内置物理引擎', description: '轻量级物理效果' }
		  ],
		  development: [
			{
			  category: '开发语言',
			  icon: '💻',
			  items: ['JavaScript / TypeScript', 'Babylon.js', 'Babylon Editor']
			},
			{
			  category: '调试方式',
			  icon: '🐛',
			  items: ['浏览器调试', 'WebXR模拟器']
			},
			{
			  category: '开发模式',
			  icon: '🛠️',
			  items: ['脚本化开发', '可视化组件']
			}
		  ],
		  advantages: [
			'完整内建WebXR支持',
			'引擎化开发',
			'可视化工具丰富',
			'WebGPU性能领先',
			'无需安装、跨平台'
		  ],
		  limitations: [
			'不适合重交互VR',
			'无高逼真特效能力',
			'学习成本稍高',
			'场景规模受限制'
		  ],
		  caseStudies: [
			{
			  title: 'Digital Twins & IoT',
			  description: 'Babylon.js官方数字孪生和物联网解决方案',
			  highlights: ['实体系统监控', '能源管理', 'WebXR嵌入', '多端访问'],
			  externalLink: 'https://www.babylonjs.com/digitalTwinIot/?utm_source=chatgpt.com',
			  image:'blob:https://ecn4djxrwqwr.feishu.cn/93957dcf-6bf4-4178-9b31-ed73c7fa5e24'
			},
		  ],
		  suitableScenarios: [
			'微电网结构展示',
			'EMS数据可视化',
			'VR浏览器快速访问',
			'轻度3D漫游',
			'多端访问'
		  ],
		  unsuitableScenarios: [
			'VR培训与演练',
			'故障模拟',
			'高交互设备操作',
			'大型站点复刻',
			'写实高保真场景'
		  ]
		}
	  ])
  
	  // 计算当前引擎
	  const currentEngine = computed(() => {
		return engines.value.find(engine => engine.id === activeEngine.value) || engines.value[0]
	  })
 
	  // 蛇形（三列）排列：1 2 3 / 6 5 4 / 7 8 9 ...
	  const architectureRows = computed(() => {
		const items = currentEngine.value?.architecture || []
		const rows = []
		for (let i = 0; i < items.length; i += 3) {
		  const slice = items.slice(i, i + 3)
		  // 奇偶行交替反转：第二行(索引1)、第四行(索引3)...
		  if ((rows.length % 2) === 1) slice.reverse()
		  rows.push(slice)
		}
		return rows
	  })
  
	  // 显示架构层提示
	  const showLayerTooltip = (layer, event) => {
		activeTooltip.value = {
		  title: layer.title,
		  description: layer.detailed || layer.description
		}
		
		const rect = event.currentTarget.getBoundingClientRect()
		const desiredLeft = rect.left + rect.width / 2
		const margin = 12
		// 避免贴边溢出：将 left 钳制在视口范围
		const clampedLeft = Math.min(window.innerWidth - margin, Math.max(margin, desiredLeft))
		tooltipStyle.value = {
		  left: `${clampedLeft}px`,
		  top: `${rect.bottom + 4}px` // 更贴近卡片
		}
	  }
  
	  // 隐藏架构层提示
	  const hideLayerTooltip = () => {
		activeTooltip.value = null
	  }
  
	  // 打开案例链接
	  const openCaseLink = (url) => {
		if (url) {
		  window.open(url, '_blank')
		}
	  }
  
	  // 切换引擎
	  const switchEngine = (engineId) => {
		activeEngine.value = engineId
		activeTooltip.value = null
	  }
  
	  // 初始化动画（不对左侧侧边栏做任何动画）
	  const initAnimations = () => {
		// 浮动球体动画
		gsap.to('.orb-1', {
		  y: 20,
		  duration: 4,
		  repeat: -1,
		  yoyo: true,
		  ease: "sine.inOut"
		})
		
		gsap.to('.orb-2', {
		  y: -15,
		  duration: 3,
		  repeat: -1,
		  yoyo: true,
		  ease: "sine.inOut",
		  delay: 0.5
		})
		
		gsap.to('.orb-3', {
		  y: 25,
		  duration: 5,
		  repeat: -1,
		  yoyo: true,
		  ease: "sine.inOut",
		  delay: 1
		})
  
		// 脉冲动画
		gsap.to('.capability-icon', {
		  scale: 1.1,
		  duration: 2,
		  repeat: -1,
		  yoyo: true,
		  stagger: 0.3
		})
	  }
  
	  onMounted(() => {
		setTimeout(() => {
		  initAnimations()
		}, 100)
	  })
  
	  return {
		engines,
		activeEngine,
		currentEngine,
		architectureRows,
		activeTooltip,
		tooltipStyle,
		switchEngine,
		showLayerTooltip,
		hideLayerTooltip,
		openCaseLink
	  }
	}
  }
  </script>
  
  <style scoped>
  .vr-engines-comparison {
	min-height: 100vh;
	background: linear-gradient(135deg, #1c1c1c 0%, #2a2a2a 100%);
	color: #f0f0f0;
	display: flex;
	position: relative;
	overflow-x: hidden;
  }
  
  /* 动态背景 */
  .dynamic-background {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	overflow: hidden;
  }
  
  .floating-orbs {
	position: absolute;
	width: 100%;
	height: 100%;
  }
  
  .orb {
	position: absolute;
	border-radius: 50%;
	filter: blur(40px);
	opacity: 0.1;
  }
  
  .orb-1 {
	width: 300px;
	height: 300px;
	background: radial-gradient(circle, #f59e0b, transparent);
	top: 10%;
	left: 10%;
  }
  
  .orb-2 {
	width: 200px;
	height: 200px;
	background: radial-gradient(circle, #fbbf24, transparent);
	top: 60%;
	right: 15%;
  }
  
  .orb-3 {
	width: 250px;
	height: 250px;
	background: radial-gradient(circle, #f59e0b, transparent);
	bottom: 20%;
	left: 20%;
  }
  
  /* 导航栏样式 */
  .engine-navigation {
	position: fixed;
	left: 0;
	top: 0;
	width: 280px;
	height: 100vh;
	background: rgba(20, 20, 20, 0.95);
	backdrop-filter: blur(10px);
	border-right: 1px solid rgba(245, 158, 11, 0.3);
	padding: 30px 0;
	z-index: 100;
	overflow-y: auto;
  }
  
  .nav-engine {
	display: flex;
	align-items: center;
	padding: 15px 25px;
	margin: 0 10px 8px;
	border-radius: 12px;
	cursor: pointer;
	transition: all 0.3s ease;
	border: 1px solid transparent;
	position: relative;
  }
  
  .nav-engine:hover {
	background: rgba(255, 255, 255, 0.05);
	border-color: rgba(245, 158, 11, 0.3);
  }
  
  .engine-active {
	background: rgba(245, 158, 11, 0.1);
	border-color: #f59e0b;
	box-shadow: 0 5px 15px rgba(245, 158, 11, 0.2);
  }
  
  .engine-number {
	font-size: 1.8rem;
	font-weight: 800;
	color: #f59e0b;
	margin-right: 15px;
	min-width: 40px;
  }
  
  .engine-info {
	flex: 1;
  }
  
  .engine-name {
	font-size: 1.1rem;
	font-weight: 600;
	margin-bottom: 4px;
	color: #f0f0f0;
  }
  
  .engine-active .engine-name {
	color: #f59e0b;
  }
  
  .engine-type {
	font-size: 0.85rem;
	color: #aaa;
	line-height: 1.3;
  }
  
  .active-indicator {
	width: 8px;
	height: 8px;
	background: #f59e0b;
	border-radius: 50%;
	opacity: 0;
	transition: opacity 0.3s ease;
  }
  
  .engine-active .active-indicator {
	opacity: 1;
	animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
	0%, 100% { opacity: 0.5; transform: scale(1); }
	50% { opacity: 1; transform: scale(1.2); }
  }
  
  /* 主内容区域 */
  .main-content {
	flex: 1;
	margin-left: 280px;
	padding: 40px;
	max-width: calc(100% - 280px);
  }
  
  /* 引擎标题区域 */
  .engine-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 50px;
	padding: 30px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 16px;
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.1);
	position: relative;
	overflow: hidden;
  }
  
  .engine-header::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 4px;
	background: linear-gradient(90deg, #f59e0b, #fbbf24);
  }
  
  .title-section {
	flex: 1;
  }
  
  .engine-title {
	font-size: 2.8rem;
	margin-bottom: 10px;
	background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
	background-size: 200% auto;
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	animation: gradient-shift 3s linear infinite;
  }
  
  .engine-badge {
	display: inline-block;
	background: linear-gradient(45deg, #f59e0b, #fbbf24);
	color: #1c1c1c;
	padding: 6px 16px;
	border-radius: 20px;
	font-size: 0.9rem;
	font-weight: 600;
  }
  
  .description-section {
	flex: 1;
	max-width: 500px;
  }
  
  .engine-description {
	font-size: 1.1rem;
	line-height: 1.6;
	margin-bottom: 20px;
	color: #e0e0e0;
  }
  
  .website-link {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	color: #f59e0b;
	text-decoration: none;
	font-weight: 500;
	transition: color 0.3s ease;
  }
  
  .website-link:hover {
	color: #fbbf24;
  }
  
  /* 章节标题 */
  .section-title {
	font-size: 1.8rem;
	margin-bottom: 30px;
	display: flex;
	align-items: center;
	gap: 12px;
	color: #f59e0b;
  }
  
  .title-icon {
	font-size: 1.5rem;
  }
  
  /* 技术架构 - 使用 Flex（最多三列换行） */
  .tech-architecture {
	position: relative;
	margin-bottom: 50px;
  }
  
  .architecture-flow {
	display: flex;
	flex-direction: column;
	gap: 16px;
	align-items: stretch;
	justify-content: center;
  }
  .architecture-row {
	display: flex;
	flex-wrap: nowrap;
	gap: 16px;
	align-items: stretch;
	justify-content: center;
  }
  
  .architecture-layer {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	position: relative;
	cursor: pointer;
	flex: 1 1 calc(33.333% - 32px);
	max-width: calc(33.333% - 32px);
  }
  
  .layer-card {
	display: flex;
	align-items: center;
	gap: 15px;
	padding: 15px; /* 减少内边距 */
	background: rgba(255, 255, 255, 0.05);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	width: 100%; /* 减小宽度 */
	transition: all 0.3s ease;
	position: relative;
  }
  
  .layer-card:hover {
	transform: translateY(-3px) scale(1.02);
	box-shadow: 0 8px 20px rgba(245, 158, 11, 0.15);
	border-color: rgba(245, 158, 11, 0.5);
	background: rgba(245, 158, 11, 0.05);
  }
  .layer-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  
  .layer-icon {
	font-size: 1.8rem;
	background: rgba(245, 158, 11, 0.1);
	width: 50px; /* 减小尺寸 */
	height: 50px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
  }
  
  .layer-content h4 {
	font-size: 1.1rem;
	margin-bottom: 6px;
	color: #f59e0b;
  }
  
  .layer-content p {
	color: #aaa;
	font-size: 0.9rem;
  }
  
  .layer-connector {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 6px;
  }
  
  .connector-line {
	width: 28px;
	height: 2px;
	background: linear-gradient(to right, #f59e0b, transparent);
	border-radius: 1px;
  }
  
  .connector-arrow {
	color: #f59e0b;
	font-size: 1.1rem;
  }
  
  @keyframes bounce {
	0%, 20%, 50%, 80%, 100% {
	  transform: translateY(0);
	}
	40% {
	  transform: translateY(-5px);
	}
	60% {
	  transform: translateY(-3px);
	}
  }
  
  /* 架构层提示框 */
  .layer-tooltip {
	position: fixed;
	background: rgba(20, 20, 20, 0.95);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(245, 158, 11, 0.3);
	border-radius: 10px;
	padding: 15px;
	max-width: 300px;
	z-index: 1000;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
	transform: translateX(-50%);
  }
  
  .layer-tooltip h4 {
	color: #f59e0b;
	margin-bottom: 8px;
	font-size: 1.1rem;
  }
  
  .layer-tooltip p {
	color: #e0e0e0;
	font-size: 0.9rem;
	line-height: 1.4;
  }
  
  .tooltip-arrow {
	position: absolute;
	top: -6px;
	left: 50%;
	transform: translateX(-50%);
	width: 0;
	height: 0;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-bottom: 6px solid rgba(245, 158, 11, 0.3);
  }
  
  /* 核心能力 */
  .capabilities-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 20px;
	margin-bottom: 50px;
  }
  
  .capability-card {
	display: flex;
	align-items: flex-start;
	gap: 15px;
	padding: 20px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	transition: all 0.3s ease;
  }
  
  .capability-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 25px rgba(245, 158, 11, 0.1);
	border-color: rgba(245, 158, 11, 0.3);
  }
  
  .capability-icon {
	font-size: 1.8rem;
	background: rgba(245, 158, 11, 0.1);
	width: 50px;
	height: 50px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
  }
  
  .capability-content h4 {
	font-size: 1.1rem;
	margin-bottom: 8px;
	color: #f59e0b;
  }
  
  .capability-content p {
	color: #aaa;
	font-size: 0.9rem;
	line-height: 1.5;
  }
  
  /* 开发方式 */
  .method-cards {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 20px;
	margin-bottom: 50px;
  }
  
  .method-card {
	padding: 25px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	transition: all 0.3s ease;
  }
  
  .method-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 25px rgba(245, 158, 11, 0.1);
	border-color: rgba(245, 158, 11, 0.3);
  }
  
  .method-header {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 15px;
  }
  
  .method-icon {
	font-size: 1.5rem;
  }
  
  .method-header h4 {
	font-size: 1.2rem;
	color: #f59e0b;
  }
  
  .method-list {
	list-style: none;
	padding: 0;
  }
  
  .method-list li {
	padding: 8px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	position: relative;
	padding-left: 15px;
  }
  
  .method-list li::before {
	content: '•';
	position: absolute;
	left: 0;
	color: #f59e0b;
  }
  
  /* 优缺点对比 */
  .comparison-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 30px;
	margin-bottom: 50px;
  }
  
  .pros-section,
  .cons-section {
	padding: 25px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .pros-section {
	border-left: 4px solid #10b981;
  }
  
  .cons-section {
	border-left: 4px solid #ef4444;
  }
  
  .section-header {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;
  }
  
  .section-icon {
	font-size: 1.5rem;
  }
  
  .section-header h3 {
	font-size: 1.3rem;
	color: #f0f0f0;
  }
  
  .advantages-list,
  .limitations-list {
	display: flex;
	flex-direction: column;
	gap: 12px;
  }
  
  .advantage-item,
  .limitation-item {
	display: flex;
	align-items: flex-start;
	gap: 10px;
  }
  
  .advantage-bullet {
	width: 8px;
	height: 8px;
	background: #10b981;
	border-radius: 50%;
	margin-top: 8px;
	flex-shrink: 0;
  }
  
  .limitation-bullet {
	width: 8px;
	height: 8px;
	background: #ef4444;
	border-radius: 50%;
	margin-top: 8px;
	flex-shrink: 0;
  }
  
  /* 案例展示 */
  .cases-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 25px;
	margin-bottom: 50px;
  }
  
  .case-card {
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	transition: all 0.3s ease;
	overflow: hidden;
	width: calc(50% - 25px);
  }
  
  .case-card:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 25px rgba(245, 158, 11, 0.1);
	border-color: rgba(245, 158, 11, 0.3);
  }
  
  .case-image {
	height: 180px;
	background: rgba(0, 0, 0, 0.3);
	position: relative;
	overflow: hidden;
	cursor: pointer;
  }
  
  .image-placeholder {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #f59e0b;
	font-weight: bold;
	font-size: 1.1rem;
	background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.1));
  }
  
  .case-img {
	width: 100%;
	height: 100%;
	object-fit: contain;
  }
  
  .image-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.3s ease;
  }
  
  .case-image:hover .image-overlay {
	opacity: 1;
  }
  
  .view-link {
	color: #f59e0b;
	font-weight: 600;
	font-size: 1.1rem;
  }
  
  .case-content {
	padding: 20px;
  }
  
  .case-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 15px;
  }
  
  .case-header h4 {
	font-size: 1.2rem;
	color: #f59e0b;
	margin: 0;
	flex: 1;
  }
  
  .case-badge {
	background: rgba(245, 158, 11, 0.2);
	color: #fbbf24;
	padding: 4px 10px;
	border-radius: 12px;
	font-size: 0.8rem;
	border: 1px solid rgba(245, 158, 11, 0.3);
  }
  
  .case-description {
	color: #aaa;
	line-height: 1.6;
	margin-bottom: 20px;
  }
  
  .case-highlights {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-bottom: 15px;
  }
  
  .highlight-tag {
	background: rgba(245, 158, 11, 0.1);
	color: #fbbf24;
	padding: 4px 10px;
	border-radius: 12px;
	font-size: 0.8rem;
	border: 1px solid rgba(245, 158, 11, 0.3);
  }
  
  .external-link {
	display: inline-flex;
	align-items: center;
	gap: 5px;
	color: #f59e0b;
	text-decoration: none;
	font-weight: 500;
	transition: color 0.3s ease;
  }
  
  .external-link:hover {
	color: #fbbf24;
  }
  
  /* 适用性评估 */
  .applicability-matrix {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 30px;
	margin-bottom: 50px;
  }
  
  .suitable-scenarios,
  .unsuitable-scenarios {
	padding: 25px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .suitable-scenarios {
	border-left: 4px solid #10b981;
  }
  
  .unsuitable-scenarios {
	border-left: 4px solid #ef4444;
  }
  
  .scenario-header {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;
  }
  
  .scenario-icon {
	font-size: 1.3rem;
  }
  
  .scenario-header h4 {
	font-size: 1.2rem;
	color: #f0f0f0;
	margin: 0;
  }
  
  .scenarios-list {
	display: flex;
	flex-direction: column;
	gap: 12px;
  }
  
  .scenario-item {
	padding: 12px;
	background: rgba(255, 255, 255, 0.03);
	border-radius: 8px;
	border: 1px solid rgba(255, 255, 255, 0.05);
	font-size: 0.95rem;
	line-height: 1.4;
  }
  
  /* 引擎指示器 */
  .engine-indicator {
	position: fixed;
	bottom: 20px;
	right: 20px;
	padding: 12px 20px;
	background: rgba(20, 20, 20, 0.9);
	backdrop-filter: blur(10px);
	border-radius: 25px;
	border: 1px solid rgba(245, 158, 11, 0.3);
	display: flex;
	align-items: center;
	gap: 10px;
	z-index: 50;
  }
  
  .indicator-glow {
	width: 8px;
	height: 8px;
	background: #f59e0b;
	border-radius: 50%;
	animation: glow 2s infinite;
  }
  
  @keyframes glow {
	0%, 100% { opacity: 0.5; box-shadow: 0 0 5px #f59e0b; }
	50% { opacity: 1; box-shadow: 0 0 15px #f59e0b; }
  }
  
  .indicator-text {
	font-size: 0.9rem;
	color: #f0f0f0;
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
	.engine-navigation {
	  width: 240px;
	}
	
	.main-content {
	  margin-left: 240px;
	  max-width: calc(100% - 240px);
	  padding: 30px;
	}
  }
  
  @media (max-width: 768px) {
	.vr-engines-comparison {
	  flex-direction: column;
	}
	
	.engine-navigation {
	  position: static;
	  width: 100%;
	  height: auto;
	  max-height: 200px;
	  overflow-x: auto;
	  display: flex;
	  padding: 20px;
	}
	
	.nav-engine {
	  flex-direction: column;
	  text-align: center;
	  min-width: 140px;
	  margin: 0 8px;
	}
	
	.engine-number {
	  margin-right: 0;
	  margin-bottom: 8px;
	}
	
	.main-content {
	  margin-left: 0;
	  max-width: 100%;
	  padding: 20px;
	}
	
	.engine-header {
	  flex-direction: column;
	  gap: 20px;
	}
	
	.comparison-grid,
	.applicability-matrix {
	  grid-template-columns: 1fr;
	}
	
	.engine-indicator {
	  display: none;
	}
	
	.architecture-flow { gap: 10px; }
	.architecture-layer {
	  flex: 1 1 calc(50% - 10px);
	  max-width: calc(50% - 10px);
	}
	
	.layer-card {
	  min-width: auto;
	  width: 100%;
	}
  }
  
  @media (max-width: 480px) {
	.architecture-layer {
	  flex: 1 1 100%;
	  max-width: 100%;
	}
	.main-content {
	  padding: 15px;
	}
	
	.engine-title {
	  font-size: 2.2rem;
	}
	
	.capabilities-grid,
	.cases-grid {
	  grid-template-columns: 1fr;
	}
	
	.layer-card {
	  flex-direction: column;
	  text-align: center;
	  gap: 10px;
	}
	
	.layer-tooltip {
	  max-width: 250px;
	}
  }
  </style>