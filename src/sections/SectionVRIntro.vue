<template>
	<section id="vr" class="report-section vr-intro-section">
		<div class="container">
			<h2 class="section-title">VR 是什么</h2>
			<div class="content-block">
				<p>虚拟现实（Virtual Reality, VR）是一种利用计算机技术生成沉浸式三维环境的交互式模拟系统，使用户以视觉、听觉及动作反馈等方式获得对虚拟空间的“存在感（Presence）”体验。</p>
				<p>在 VR 系统中，用户通过头戴显示设备（Head-Mounted Display, HMD）被完全隔离于现实视觉环境之外，进入由数字内容构建的虚拟空间，并可通过交互设备（如控制器、手势追踪或定位系统）对虚拟环境进行实时操控。</p>
			</div>

			<div class="feature-grid">
				<div class="feature-card">
					<div class="feature-header">
						<div class="feature-icon">🕶️</div>
						<h3 class="feature-title">沉浸性（Immersion）</h3>
					</div>
					<p class="feature-desc">通过大视场（FOV）、立体显示、空间音频等技术，使用户产生“身临其境”的感知。</p>
				</div>
				<div class="feature-card">
					<div class="feature-header">
						<div class="feature-icon">🎛️</div>
						<h3 class="feature-title">交互性（Interactivity）</h3>
					</div>
					<p class="feature-desc">系统能够实时响应用户动作，包括头部姿态、手部操作、行走移动等。</p>
				</div>
				<div class="feature-card">
					<div class="feature-header">
						<div class="feature-icon">📡</div>
						<h3 class="feature-title">追踪与定位（Tracking）</h3>
					</div>
					<p class="feature-desc">利用 IMU、SLAM 或外部定位系统，实现高精度的六自由度（6DoF）追踪。</p>
				</div>
				<div class="feature-card">
					<div class="feature-header">
						<div class="feature-icon">📍</div>
						<h3 class="feature-title">存在感（Presence）</h3>
					</div>
					<p class="feature-desc">用户在心理与感知层面感受到“在虚拟环境中的真实存在”，这是 VR 系统评估的重要指标。</p>
				</div>
			</div>

			<!-- VR 使用场景（每项预留两张图片位） -->
			<div class="scenarios-block">
				<h3 class="sub-title">VR 使用场景</h3>
				<div class="scenario-list">
					<div class="scenario-card" v-for="(sc, i) in scenarios" :key="i">
						<div class="scenario-header">
							<div class="scenario-icon">📌</div>
							<h4 class="scenario-title">{{ sc.title }}</h4>
						</div>
						<div class="scenario-images">
							<div class="img-slot" v-for="(img, idx) in sc.images" :key="idx">
								<img v-if="img" :src="img" alt="" />
								<div v-else class="image-placeholder">待添加</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

type Scenario = { title: string; images: (string | null)[] }
const scenarios: Scenario[] = [
	{ title: '预设工业/制造训练环境', images: ['https://tse3.mm.bing.net/th/id/OIP.YuWc0AWOwVpV8wf1SeeFvgHaHa?w=474&h=379&c=7&p=0', 'https://tse4.mm.bing.net/th/id/OIP.bgm7o5VWrUgZnyvgPNlUVQHaEK?w=474&h=379&c=7&p=0'] },
	{ title: '医疗/手术模拟环境', images: ['https://tse4.mm.bing.net/th/id/OIP.0NR46mArT9wphWkepIZlKgHaEK?w=474&h=379&c=7&p=0', 'https://tse4.mm.bing.net/th/id/OIP.5Ugk6FXfoPtvOr7EQTxs7wHaEK?w=474&h=379&c=7&p=0'] },
	{ title: '建筑/设计可视化环境', images: ['https://tse3.mm.bing.net/th/id/OIP.hHk99n-GQSpN2FkGLFSYQAHaE9?w=474&h=379&c=7&p=0', 'https://tse3.mm.bing.net/th/id/OIP.fZG8DbqOOpICRM_NL8vFkAHaD1?w=474&h=379&c=7&p=0'] },
	{ title: '游戏娱乐', images: ['https://tse4.mm.bing.net/th/id/OIP.d9nlNTaAK-QAqAMI1DXLPQHaHa?pid=Api', 'https://cdn.autonomous.ai/production/ecm/230811/build-the-best-vr-gaming-setup3-6d20ff18-921d-437d-9d15-9731b97998bc.webp'] },
	{ title: '教育与课堂教学', images: ['https://tse2.mm.bing.net/th/id/OIP.3ub28OGC2Jsk7sZ3Gx25agHaGW?w=474&h=379&c=7&p=0', 'https://tse4.mm.bing.net/th/id/OIP.q3L9MbTql65RlZVPhYnbWQHaE8?w=474&h=379&c=7&p=0'] },
	{ title: '零售与电商', images: ['https://tse3.mm.bing.net/th/id/OIP.306cxK-wFfC9zK_AoHRxOgHaE7?w=474&h=379&c=7&p=0', 'https://tse3.mm.bing.net/th/id/OIP.leL3HKNdMLe8DpmsjkmYvQHaEK?w=474&h=379&c=7&p=0'] },
]

onMounted(() => {
	// 卡片入场
	gsap.utils.toArray('.feature-card').forEach((el: any) => {
		gsap.from(el, {
			scrollTrigger: {
				trigger: el,
				start: 'top 80%',
				toggleActions: 'play none none reverse'
			},
			y: 24,
			opacity: 0,
			duration: 0.6,
			ease: 'power2.out'
		})
	})
	// 场景卡片入场
	gsap.utils.toArray('.scenario-card').forEach((el: any) => {
		gsap.from(el, {
			scrollTrigger: {
				trigger: el,
				start: 'top 85%',
				toggleActions: 'play none none reverse'
			},
			y: 20,
			opacity: 0,
			duration: 0.5,
			ease: 'power2.out'
		})
	})
})
</script>

<style scoped>
.vr-intro-section {
	position: relative;
}
.container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
}
.section-title {
	font-size: 2.2rem;
	margin-bottom: 16px;
	text-align: center;
	background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
	background-size: 200% auto;
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	animation: gradient-shift 3s linear infinite;
}
.content-block {
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	border-radius: 15px;
	padding: 24px;
	margin-bottom: 18px;
	border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 特性卡片（Flex） */
.feature-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	margin-top: 8px;
}
.feature-card {
	flex: 1 1 calc(50% - 10px);
	max-width: calc(50% - 10px);
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	padding: 24px;
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
	font-size: 1.25rem;
	margin: 0;
}
.feature-desc {
	color: #e0e0e0;
	font-size: 1.05rem;
	line-height: 1.6;
}

/* 使用场景 */
.scenarios-block { margin-top: 20px; }
.sub-title {
	text-align: center;
	margin: 6px 0 10px;
	color: #f59e0b;
	font-size: 1.3rem;
}
.scenario-list {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
}
.scenario-card {
	flex: 1 1 calc(50% - 8px);
	max-width: calc(50% - 8px);
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	padding: 20px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.scenario-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 10px 24px rgba(245, 158, 11, 0.15);
	border-color: rgba(245, 158, 11, 0.3);
}
.scenario-header {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 10px;
}
.scenario-icon {
	width: 32px;
	height: 32px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(245, 158, 11, 0.12);
	border: 1px solid rgba(245, 158, 11, 0.3);
}
.scenario-title { color: #f59e0b; margin: 0; font-size: 1.05rem; }
.scenario-images {
	display: flex;
	gap: 10px;
}
.img-slot {
	flex: 1 1 0;
	height: 170px;
	border-radius: 10px;
	overflow: hidden;
	position: relative;
	background: rgba(0,0,0,0.25);
	border: 1px dashed rgba(245, 158, 11, 0.35);
	display: flex;
	align-items: center;
	justify-content: center;
}
.img-slot img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.image-placeholder {
	color: #fbbf24;
	font-size: 0.95rem;
	opacity: 0.9;
}

/* 响应式：小屏改为单列 */
@media (max-width: 768px) {
	.feature-card {
		flex: 1 1 100%;
		max-width: 100%;
	}
	.scenario-card {
		flex: 1 1 100%;
		max-width: 100%;
	}
	.img-slot { height: 140px; }
}

@keyframes gradient-shift {
	0% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
	100% { background-position: 0% 50%; }
}
</style>

