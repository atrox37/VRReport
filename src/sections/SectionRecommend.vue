<template>
	<section id="recommend" class="report-section recommend-section">
		<main class="content">
			<header class="header">
				<h1 class="title">总结</h1>
				<!-- <p class="subtitle">按照 场景/技术 两种视图切换，卡片化展示理由</p> -->
			</header>

			<!-- 总论述 -->
			<div class="summary-block">
				<p>
					综上，现在主要的 VR 技术还是分为两大路线：
					<span class="pill">原生引擎（Unity / Unreal）</span>
					与
					<span class="pill">WebXR（Three.js / Babylon.js）</span>。
					原生引擎适合 <b>高强度交互 + 系统化训练</b>；WebXR 适合 <b>快速访问 + 数据呈现 + 展示型 VR</b>。
				</p>
			</div>

			<!-- 卡片，两列展示 -->
			<div class="cards-grid two-col">
				<div class="card" v-for="(item, i) in scenarioItems" :key="i">
					<div class="card-header">
						<h3 class="scene">{{ item.scene }}</h3>
						<div class="badge">{{ item.tech }}</div>
					</div>
					<ul class="reasons">
						<li v-for="(r, k) in item.reasons" :key="k">{{ r }}</li>
					</ul>
				</div>
			</div>
		</main>
	</section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

type ScenarioCard = {
	scene: string
	tech: string
	reasons: string[]
}

const scenarioItems: ScenarioCard[] = [
	{
		scene: '高逼真VR演练 / 故障模拟 / 安全培训',
		tech: 'Unreal Engine XR + OpenXR',
		reasons: ['写实度最强', '最适合电弧、烟雾、火灾等故障仿真', '场景规模大、光影表现真实', '军工 / 航空 / 电力行业标配']
	},
	{
		scene: '工控VR操作 / 设备交互 / 协同培训',
		tech: 'Unity XR + OpenXR',
		reasons: ['XRI 专为工程交互设计', '流程/SOP/按钮/开关/旋钮交互成熟', '性能好、跨平台稳定', '工业 VR 领域“性价比最高”']
	},
	{
		scene: 'Web端轻量数字孪生 / 数据看板 / VR 可视化',
		tech: 'Babylon.js + WebXR',
		reasons: ['原生 WebXR 完整', 'WebGPU 性能更强', '场景系统完善，适合中型可视化', '浏览器打开即可体验（无需安装 App）']
	},
	{
		scene: '超轻量Web VR演示 / 3D 场景查看 / 快速访问 VR',
		tech: 'Three.js + WebXR',
		reasons: ['最轻量', '最容易嵌入页面', '适合静态场景、简单漫游、原型演示', '无需复杂架构与交互']
	}
]

onMounted(() => {
	// 标题进入时淡入，避免初始丢失
	gsap.fromTo('.recommend-section .title',
		{ y: -20, autoAlpha: 0 },
		{ y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out', immediateRender: false,
		  scrollTrigger: { trigger: '#recommend', start: 'top 80%', toggleActions: 'play none none none' } }
	)
	// 总论述块与卡片分批进入
	gsap.fromTo('.recommend-section .summary-block',
		{ y: 16, autoAlpha: 0 },
		{ y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out', immediateRender: false,
		  scrollTrigger: { trigger: '.recommend-section .summary-block', start: 'top 85%', toggleActions: 'play none none reverse' } }
	)
	gsap.utils.toArray<HTMLElement>('.recommend-section .card').forEach((el, i) => {
		gsap.fromTo(el, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out', delay: i * 0.05, immediateRender: false,
			scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } })
	})
})
</script>

<style scoped>
.recommend-section { position: relative; }
.content {
	max-width: 1100px;
	margin: 0 auto;
	padding: 40px;
}
.header { text-align: center; margin-bottom: 12px; }
.title {
	font-size: 2.2rem;
	margin-bottom: 6px;
	background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
	background-size: 200% auto;
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	animation: gradient-shift 3s linear infinite;
}
.subtitle { opacity: 0.9; }

.summary-block {
	background: rgba(255,255,255,0.05);
	border: 1px solid rgba(255,255,255,0.1);
	border-radius: 12px;
	padding: 16px;
	margin: 16px 0;
}
.pill {
	background: rgba(245,158,11,0.12);
	border: 1px solid rgba(245,158,11,0.3);
	color: #fbbf24;
	padding: 2px 8px;
	border-radius: 999px;
}

.cards-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 16px;
	margin-top: 16px;
}
.recommend-section .cards-grid.two-col {
	grid-template-columns: repeat(2, 1fr);
}
.card {
	background: rgba(255,255,255,0.05);
	border: 1px solid rgba(255,255,255,0.1);
	border-radius: 12px;
	padding: 16px;
}
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}
.scene { color: #f59e0b; margin: 0; font-size: 1.2rem; }
.badge {
	background: linear-gradient(45deg, #f59e0b, #fbbf24);
	color: #1c1c1c;
	padding: 4px 10px;
	border-radius: 12px;
	font-weight: 700;
	font-size: 0.85rem;
	white-space: nowrap;
}
.badge.alt {
	background: rgba(245,158,11,0.16);
	color: #fbbf24;
	border: 1px solid rgba(245,158,11,0.3);
}
.reasons {
	list-style: none;
	padding: 0;
	margin: 0;
}
.reasons li {
	padding: 8px 0 8px 18px;
	border-bottom: 1px solid rgba(255,255,255,0.08);
	position: relative;
}
.reasons li::before {
	content: '•';
	position: absolute;
	left: 4px;
	color: #f59e0b;
}

@keyframes gradient-shift {
	0% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
	100% { background-position: 0% 50%; }
}

@media (max-width: 1024px) {
	.content { padding: 30px; }
}
@media (max-width: 768px) {
	.content { padding: 20px; }
	.title { font-size: 1.9rem; }
	.cards-grid.two-col { grid-template-columns: 1fr; }
}
</style>


