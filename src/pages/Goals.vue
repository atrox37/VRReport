<template>
	<div class="vr-presentation">
	  <header class="goals-header">
		<div class="vr-headset"></div>
		<h1>VR技术调研展示</h1>
		<p class="subtitle">探索前端呈现的未来路径与VR技术的融合可能</p>
		<div class="scroll-indicator">
		  <span>向下滚动</span>
		  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		  </svg>
		</div>
	  </header>
	  
	  <div class="floating-elements">
		<div class="floating-element"></div>
		<div class="floating-element"></div>
		<div class="floating-element"></div>
		<div class="floating-element"></div>
		<div class="floating-element"></div>
	  </div>
	  
	  <section id="background">
		<div class="container">
		  <h2 class="section-title">背景与目标</h2>
		  <div class="content-block">
			<p>科技快速发展的今天，前端呈现的方式多种多样，传统的网页展示、移动端页面、大屏可视化已经无法完全满足对<span class="highlight">沉浸式交互与空间化场景</span>的需求。随着 <span class="highlight">VR（虚拟现实）技术</span>、WebXR 标准以及各类 XR 设备的不断成熟，越来越多行业开始探索"空间化呈现""沉浸式操作"以及"虚拟与现实融合"的应用形态。在能源管理、物联网设备监控及微电网系统等场景中，VR 所具备的<span class="highlight">可视化优势与交互能力</span>，正在展现出新的价值。</p>
			<p>之前对于前端跨平台技术的调研，也启发我们在VR的研发中寻找可以支持我们<span class="highlight">跨平台作业的解决方案</span>，从而减少我们的开发成本、提高开发效率。</p>
			<p>除此之外，在如今 <span class="highlight llm-highlight" @click="toggleLLMExplain">LLM 技术</span>迅速发展的背景下，其与 XR（扩展现实）技术的融合正逐渐形成新的智能交互模式。LLM 提供强大的语言理解、推理与决策能力，而 XR 则提供沉浸式、空间化的可视化与操作界面。当两者结合时，能够让 AI 不仅“能说会想”，更“能看会操作”，从而形成具备空间认知能力的智能体。</p>
			<div v-if="showLLMExplain" class="llm-explain" ref="llmExplainRef">
				<p>
					<b>LLM 的核心价值：</b>把系统里庞杂的规则、数据和文档转成用户当下听得懂、用得上的信息。它从海量信息中提取当前必须知道的部分（过滤与提炼），并根据对象用合适的方式表达——新人需要解释和背景，老手只要关键步骤，VR 场景则呈现场景化指引。同时，LLM 会根据用户行动实时调整，不只判断对错，还解释原因、指出冲突规则并提供替代方案。整体上，它与底层实时监控、中层业务逻辑协作，成为最终的“智能解释层”，也是人与系统之间的教练、向导和理解者。
				</p>
			</div>
			<p>在这一趋势下，流行文化中的<span class="highlight">“贾维斯（JARVIS）”</span>成为理想的参照模型。贾维斯具备对环境的感知、对信息的推理解释，以及通过空间界面与现实设备的交互执行能力。用现代技术视角来看，这正是 LLM 负责解释世界、XR 负责展示世界、传感系统负责感知世界 的融合体现。</p>
			<div class="llm-xr-image-row">
			  <img :src="imgWebp1" alt="LLM XR Illustration 1" class="llm-xr-img" />
			  <img :src="imgWebp2" alt="LLM XR Illustration 2" class="llm-xr-img" />
			  <img :src="imgWebp3" alt="LLM XR Illustration 3" class="llm-xr-img" />
			</div>
		  </div>
		</div>
	  </section>
	  
	  
	  <section id="objectives">
		<div class="container">
		  <h2 class="section-title">调研目标</h2>
		  <div class="objectives-grid">
			<div class="objective-card" v-for="(objective, index) in objectives" :key="index">
			  <h3>{{ objective.title }}</h3>
			  <p>{{ objective.description }}</p>
			</div>
		  </div>
		</div>
	  </section>
	  
	  <section id="outcomes">
		<div class="container">
		  <h2 class="section-title">预期成果</h2>
		  <div class="content-block">
			<p>通过本次调研，希望能够：</p>
			<ul class="outcomes-list">
			  <li v-for="(outcome, index) in outcomes" :key="index">{{ outcome }}</li>
			</ul>
		  </div>
		</div>
	  </section>
	  
	  <!-- <footer>
		<div class="container">
		  <p>VR技术调研展示页面 &copy; 2023</p>
		</div>
	  </footer> -->
	</div>
  </template>
  
  <script>
  import { onMounted, nextTick, ref } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import imgWebp1 from '@/images/1.webp'
  import imgWebp2 from '@/images/2.webp'
  import imgWebp3 from '@/images/3.webp'
  
  export default {
	name: 'VRPresentation',
	setup() {
	  // 注册GSAP插件
	  gsap.registerPlugin(ScrollTrigger)
	  
	  const objectives = [
		{
		  title: '探索未来前端呈现方式的延伸路径',
		  description: '研究 VR技术在现代前端体系中的角色与能力，明确"浏览器 3D → VR 沉浸式场景"的演进可能。'
		},
		{
		  title: '评估 VR 在 EMS/IoT/微电网领域的适用性',
		  description: '分析 VR 是否能够在能量管理、设备巡检、数字孪生监控等业务场景中带来更直观、更高效的操作体验。'
		},
		{
		  title: '寻求VR中可能存在的跨平台方案',
		  description: '对当前的VR技术进行整合分析，寻求可以实现跨平台VR研发的解决方案。'
		},
		{
		  title: '为未来的 VR 工具化应用奠定基础',
		  description: '探索如何将 VR 用作“操作工具”，联系大语言模型，实现VR+AI的结合，如 VR 控制台、VR 现场巡检、VR 故障模拟培训，而不只是 3D 可视化的延伸。'
		},
		{
		  title: '规划 VR 与现有系统的融合方式',
		  description: '包括与现有 EMS 系统、IoT 数据链路、数字孪生场景（Three.js）以及前端框架（Vue）进行技术整合的可能路线。'
		}
	  ]
	  
	  const outcomes = [
		'明确 VR 技术在业务中的真实价值与可落地性',
		'探索未来可替代或补充现有前端形式的"空间化工作界面"',
		'为后续构建 VR 数字孪生、VR 设备操作、VR 培训与演练系统奠定可行的技术基础',
		'为未来的前端架构升级提供方向性参考'
	  ]
	  
	  // LLM 说明展开/收起
	  const showLLMExplain = ref(false)
	  const llmExplainRef = ref(null)
	  const toggleLLMExplain = async () => {
		showLLMExplain.value = !showLLMExplain.value
		await nextTick()
		if (showLLMExplain.value && llmExplainRef.value) {
		  gsap.fromTo(llmExplainRef.value, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
		}
	  }
	  
	  const initAnimations = () => {
		// 页面加载时的动画
		const tl = gsap.timeline()
		
		// 标题和副标题动画
		tl.from('h1', {
		  duration: 1.5,
		  y: 100,
		  opacity: 0,
		  ease: "power3.out"
		})
		.from('.subtitle', {
		  duration: 1,
		  y: 50,
		  opacity: 0,
		  ease: "power2.out"
		}, "-=0.5")
		.from('.vr-headset', {
		  duration: 1.5,
		  scale: 0.5,
		  rotationY: 180,
		  opacity: 0,
		  ease: "back.out(1.7)"
		}, "-=1")
		.from('.scroll-indicator', {
		  duration: 0.8,
		  y: 20,
		  opacity: 0,
		  ease: "power2.out"
		})
		
		// 浮动元素动画
		gsap.to('.floating-element', {
		  y: 30,
		  rotation: 360,
		  duration: 8,
		  repeat: -1,
		  yoyo: true,
		  stagger: 0.2,
		  ease: "sine.inOut"
		})
		
		// VR头盔悬浮动画
		gsap.to('.vr-headset', {
		  y: 20,
		  duration: 3,
		  repeat: -1,
		  yoyo: true,
		  ease: "sine.inOut"
		})
		
		// 内容块滚动动画
		gsap.utils.toArray('.content-block, .objective-card, .feature-card').forEach(element => {
		  gsap.from(element, {
			scrollTrigger: {
			  trigger: element,
			  start: "top 80%",
			  end: "bottom 20%",
			  toggleActions: "play none none reverse"
			},
			y: 50,
			opacity: 0,
			duration: 1,
			ease: "power2.out"
		  })
		})
		
		// 列表项滚动动画
		gsap.utils.toArray('.outcomes-list li').forEach((item, i) => {
		  gsap.from(item, {
			scrollTrigger: {
			  trigger: item,
			  start: "top 90%",
			  toggleActions: "play none none reverse"
			},
			x: -50,
			opacity: 0,
			duration: 0.8,
			delay: i * 0.1,
			ease: "power2.out"
		  })
		})
		
		// 章节标题动画
		gsap.utils.toArray('.section-title').forEach(title => {
		  gsap.from(title, {
			scrollTrigger: {
			  trigger: title,
			  start: "top 85%",
			  toggleActions: "play none none reverse"
			},
			scale: 0.8,
			opacity: 0,
			duration: 1,
			ease: "back.out(1.7)"
		  })
		})
		
		// 高亮文本动画
		gsap.utils.toArray('.highlight').forEach(highlight => {
		  gsap.to(highlight, {
			scrollTrigger: {
			  trigger: highlight,
			  start: "top 90%",
			  toggleActions: "play none none reverse"
			},
			color: "#fbbf24",
			duration: 0.5,
			ease: "power2.inOut"
		  })
		})
	  }
	  
	  onMounted(() => {
		initAnimations()
	  })
	  
	  return {
		objectives,
		outcomes,
		showLLMExplain,
		llmExplainRef,
		toggleLLMExplain,
		imgWebp1,
		imgWebp2,
		imgWebp3
	  }
	}
  }
  </script>
  
  <style scoped>
  * {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  }
  
  .vr-presentation {
	min-height: 100vh;
	background: linear-gradient(135deg, #1c1c1c 0%, #2a2a2a 100%);
	color: #f0f0f0;
	overflow-x: hidden;
	line-height: 1.6;
  }
  
  .container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
  }
  
  header {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	position: relative;
	overflow: hidden;
  }

  .goals-header {
	/* display: flex;
	 */
	 background-image: url('@/images/home.png');
	 background-size: cover;
	 background-position: center;
	 background-repeat: no-repeat;
  }
  .vr-headset {
	position: absolute;
	width: 300px;
	height: 200px;
	background: linear-gradient(45deg, #f59e0b 0%, #fbbf24 100%);
	border-radius: 30px;
	transform: perspective(1000px) rotateX(15deg);
	box-shadow: 0 20px 50px rgba(245, 158, 11, 0.5);
	z-index: -1;
  }
  
  .vr-headset::before, .vr-headset::after {
	content: '';
	position: absolute;
	width: 80px;
	height: 120px;
	background: #1c1c1c;
	border-radius: 10px;
	top: 40px;
  }
  
  .vr-headset::before {
	left: 30px;
  }
  
  .vr-headset::after {
	right: 30px;
  }
  
  h1 {
	font-size: 4rem;
	margin-bottom: 1rem;
	background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
	background-size: 200% auto;
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	animation: gradient-shift 3s linear infinite;
  }
  
  .subtitle {
	font-size: 1.5rem;
	max-width: 800px;
	margin-bottom: 2rem;
	opacity: 0.9;
	color: #f0f0f0;
  }
  
  .scroll-indicator {
	position: absolute;
	bottom: 30px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #f59e0b;
	font-weight: bold;
	animation: bounce 2s infinite;
  }
  
  section {
	padding: 100px 0;
	position: relative;
  }
  
  .section-title {
	font-size: 2.5rem;
	margin-bottom: 3rem;
	text-align: center;
	position: relative;
	display: inline-block;
	left: 50%;
	transform: translateX(-50%);
  }
  
  .section-title::after {
	content: '';
	position: absolute;
	bottom: -10px;
	left: 0;
	width: 100%;
	height: 4px;
	background: linear-gradient(90deg, #f59e0b, #fbbf24);
	border-radius: 2px;
  }
  
  .content-block {
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	border-radius: 15px;
	padding: 30px;
	margin-bottom: 40px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	border: 1px solid rgba(255, 255, 255, 0.1);
	position: relative;
	overflow: hidden;
  }
  
  .content-block::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 5px;
	background: linear-gradient(90deg, #f59e0b, #fbbf24);
  }
  
  /* LLM + XR 三图并排展示 */
  .llm-xr-image-row {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	justify-content: center;
	align-items: center;
	margin-top: 16px;
  }
  .llm-xr-img {
	width: 100%;
	max-width: 300px;
	height: auto;
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	background: rgba(0, 0, 0, 0.2);
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
	object-fit: cover;
  }
  
  .highlight {
	color: #f59e0b;
	font-weight: bold;
	text-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
  }
  .llm-highlight {
	cursor: pointer;
	text-decoration: underline dotted;
  }
  .llm-highlight:hover {
	color: #fbbf24;
  }
  .llm-explain {
	background: rgba(255, 255, 255, 0.05);
	border: 1px solid rgba(245, 158, 11, 0.2);
	border-left: 4px solid #f59e0b;
	border-radius: 10px;
	padding: 14px;
	margin-top: 12px;
	color: #eaeaea;
  }
  
  .objectives-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 30px;
	margin-top: 50px;
  }
  
  .objective-card {
	background: rgba(255, 255, 255, 0.05);
	border-radius: 15px;
	padding: 25px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	border: 1px solid rgba(255, 255, 255, 0.1);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	position: relative;
	overflow: hidden;
  }
  
  .objective-card:hover {
	transform: translateY(-10px);
	box-shadow: 0 15px 35px rgba(245, 158, 11, 0.3);
  }
  
  .objective-card::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.1));
	z-index: -1;
  }
  
  .objective-card h3 {
	font-size: 1.5rem;
	margin-bottom: 15px;
	color: #f59e0b;
  }
  
  /* VR 是什么 - 特性卡片（Flex） */
  .feature-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	margin-top: 16px;
  }
  .feature-card {
	flex: 1 1 260px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	padding: 20px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .feature-card:hover {
	transform: translateY(-6px);
	box-shadow: 0 12px 28px rgba(245, 158, 11, 0.15);
	border-color: rgba(245, 158, 11, 0.3);
  }
  .feature-header {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-bottom: 10px;
  }
  .feature-icon {
	width: 40px;
	height: 40px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(245, 158, 11, 0.12);
	border: 1px solid rgba(245, 158, 11, 0.3);
  }
  .feature-title {
	color: #f59e0b;
	font-size: 1.15rem;
	margin: 0;
  }
  .feature-desc {
	color: #e0e0e0;
	font-size: 0.98rem;
	line-height: 1.6;
  }
  
  .floating-elements {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: -1;
	pointer-events: none;
  }
  
  .floating-element {
	position: absolute;
	width: 50px;
	height: 50px;
	background: rgba(245, 158, 11, 0.2);
	border-radius: 10px;
	transform: rotate(45deg);
  }
  
  .floating-element:nth-child(2) {
	width: 30px;
	height: 30px;
	background: rgba(251, 191, 36, 0.2);
	top: 20%;
	left: 80%;
  }
  
  .floating-element:nth-child(3) {
	width: 40px;
	height: 40px;
	background: rgba(245, 158, 11, 0.15);
	top: 70%;
	left: 10%;
  }
  
  .floating-element:nth-child(4) {
	width: 60px;
	height: 60px;
	background: rgba(251, 191, 36, 0.1);
	top: 40%;
	left: 90%;
  }
  
  .floating-element:nth-child(5) {
	width: 25px;
	height: 25px;
	background: rgba(245, 158, 11, 0.2);
	top: 80%;
	left: 70%;
  }
  
  .outcomes-list {
	list-style-type: none;
	margin-top: 30px;
  }
  
  .outcomes-list li {
	padding: 15px;
	margin-bottom: 15px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 10px;
	border-left: 4px solid #f59e0b;
	transition: transform 0.3s ease, background 0.3s ease;
  }
  
  .outcomes-list li:hover {
	transform: translateX(10px);
	background: rgba(255, 255, 255, 0.1);
  }
  
  footer {
	text-align: center;
	padding: 30px 0;
	margin-top: 50px;
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	color: rgba(255, 255, 255, 0.6);
  }
  
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
  
  @keyframes bounce {
	0%, 20%, 50%, 80%, 100% {
	  transform: translateY(0) translateX(-50%);
	}
	40% {
	  transform: translateY(-10px) translateX(-50%);
	}
	60% {
	  transform: translateY(-5px) translateX(-50%);
	}
  }
  
  @media (max-width: 768px) {
	h1 {
	  font-size: 2.5rem;
	}
	
	.subtitle {
	  font-size: 1.2rem;
	}
	
	.section-title {
	  font-size: 2rem;
	}
	
	.objectives-grid {
	  grid-template-columns: 1fr;
	}
  }
  </style>