<template>
	<section id="compare" class="report-section compare-section">
		<main class="content">
			<header class="header">
				<h1 class="title">技术比较</h1>
			</header>

			<!-- 交互能力 -->
			<div class="table-card">
				<h3 class="card-title">交互能力</h3>
				<table class="table" ref="tableInteraction">
					<thead>
						<tr>
							<th>技术</th>
							<th>交互能力等级</th>
							<th>交互特点</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in interactionData" :key="index">
							<td class="tech">{{ item.tech }}</td>
							<td>
								<div class="stars">
									<span v-for="n in 5" :key="n" class="star">{{ n <= item.stars ? '★' : '☆' }}</span>
								</div>
							</td>
							<td class="desc">{{ item.feature }}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- 开发方式对比 -->
			<div class="table-card">
				<h3 class="card-title">开发方式对比</h3>
				<table class="table" ref="tableDev">
					<thead>
						<tr>
							<th>技术</th>
							<th>开发方式</th>
							<th>难度</th>
							<th>适合团队</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in devMethodData" :key="index">
							<td class="tech">{{ item.tech }}</td>
							<td class="type">{{ item.method }}</td>
							<td class="type">{{ item.difficulty }}</td>
							<td class="desc">{{ item.team }}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="table-card">
				<h3 class="card-title">技术定位对比</h3>
				<table class="table" ref="table1">
					<thead>
						<tr>
							<th>技术</th>
							<th>技术类型</th>
							<th>核心定位</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in techPositioningData" :key="index">
							<td class="tech">{{ item.tech }}</td>
							<td class="type">{{ item.type }}</td>
							<td class="desc">{{ item.position }}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="table-card">
				<h3 class="card-title">渲染能力对比</h3>
				<table class="table" ref="table2">
					<thead>
						<tr>
							<th>技术</th>
							<th>渲染能力</th>
							<th>特点总结</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in renderingCapabilityData" :key="index">
							<td class="tech">{{ item.tech }}</td>
							<td>
								<div class="stars">
									<span v-for="n in 5" :key="n" class="star">{{ n <= item.stars ? '★' : '☆' }}</span>
								</div>
							</td>
							<td class="desc">{{ item.characteristic }}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="table-card">
				<h3 class="card-title">性能对比</h3>
				<table class="table" ref="table3">
					<thead>
						<tr>
							<th>技术</th>
							<th>性能表现</th>
							<th>说明</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in performanceData" :key="index">
							<td class="tech">{{ item.tech }}</td>
							<td>
								<div class="stars">
									<span v-for="n in 5" :key="n" class="star">{{ n <= item.stars ? '★' : '☆' }}</span>
								</div>
							</td>
							<td class="desc">{{ item.explanation }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			</main>
	</section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

defineProps<{}>()

const interactionData = ref([
	{ tech: 'Unity XR + OpenXR', stars: 5, feature: 'XR Interaction Toolkit 提供完善工业级抓取、射线、UI 操作' },
	{ tech: 'UE XR + OpenXR', stars: 4, feature: '物理、动画更真实，但工具链复杂；适合高级仿真' },
	{ tech: 'Babylon.js + WebXR', stars: 4, feature: '射线、控制器交互内置；中度交互可行' },
	{ tech: 'Three.js + WebXR', stars: 3, feature: '基础交互自己写；轻度交互 OK，复杂交互困难' }
])

const devMethodData = ref([
	{ tech: 'Unity XR', method: 'C# + Unity Editor + XRI', difficulty: '中等', team: '前端/全栈团队能适应' },
	{ tech: 'UE XR', method: '蓝图 + C++ + UE Editor', difficulty: '较高', team: '需要专业 3D 团队' },
	{ tech: 'Babylon.js', method: 'JS/TS + WebXR Helper + GUI Editor', difficulty: '中等偏低', team: 'Web 团队最佳' },
	{ tech: 'Three.js', method: 'JS/TS 纯代码', difficulty: '低（简单）~中（复杂）', team: 'Web 团队、快速原型' }
])

const techPositioningData = ref([
	{ tech: 'Unity XR + OpenXR', type: '原生3D 引擎', position: '工程级、跨平台 VR 开发框架' },
	{ tech: 'Unreal XR + OpenXR', type: '原生3D 引擎', position: '写实级、仿真级 VR 引擎（行业最强）' },
	{ tech: 'Three.js + WebXR', type: 'Web 3D 库', position: '轻量级 Web VR 可视化' },
	{ tech: 'Babylon.js + WebXR', type: 'Web 3D 引擎', position: '较完整的 WebVR 引擎，适合中型项目' }
])

const renderingCapabilityData = ref([
	{ tech: 'UE XR + OpenXR', stars: 5, characteristic: 'Nanite + Lumen = 电影级写实效果，适合大型站点、机房还原' },
	{ tech: 'Unity XR + OpenXR', stars: 4, characteristic: '性能好，画面较好，可达工业级，但不及 UE 写实' },
	{ tech: 'Babylon.js + WebXR', stars: 4, characteristic: 'WebGPU 提升明显，但仍受限于浏览器' },
	{ tech: 'Three.js + WebXR', stars: 3, characteristic: 'WebGL 基础，画质普通，适用于中小型可视化' }
])

const performanceData = ref([
	{ tech: 'UE XR', stars: 5, explanation: '最能处理大型、高模场景' },
	{ tech: 'Unity XR', stars: 4, explanation: '表现优秀，但大场景优化量较大' },
	{ tech: 'Babylon.js', stars: 3, explanation: 'WebGPU 加持下中型场景可运行；大型场景困难' },
	{ tech: 'Three.js', stars: 3, explanation: '适合轻场景；无法处理庞大模型或复杂特效' }
])

const table1 = ref<HTMLTableElement | null>(null)
const table2 = ref<HTMLTableElement | null>(null)
const table3 = ref<HTMLTableElement | null>(null)
const tableInteraction = ref<HTMLTableElement | null>(null)
const tableDev = ref<HTMLTableElement | null>(null)

const animateTable = (tableRef: typeof table1) => {
	if (!tableRef.value) return
	const rows = tableRef.value.querySelectorAll('tbody tr')
	gsap.fromTo(rows, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)', stagger: 0.12 })
}

onMounted(() => {
	gsap.from('.title', { y: -30, opacity: 0, duration: 0.7, ease: 'power3.out' })
	setTimeout(() => animateTable(tableInteraction), 100)
	setTimeout(() => animateTable(tableDev), 350)
	setTimeout(() => animateTable(table1), 600)
	setTimeout(() => animateTable(table2), 850)
	setTimeout(() => animateTable(table3), 1100)
})
</script>

<style scoped>
.compare-section { position: relative; }
.content {
	max-width: 1100px;
	margin: 0 auto;
	padding: 40px;
	width: 100%;
	flex: 1 1 auto;
}
.header { text-align: center; margin-bottom: 10px; }
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
.table-card {
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	padding: 16px;
	margin-top: 16px;
	margin-bottom: 8px;
}
.table-card + .table-card { margin-top: 24px; }
.card-title { color: #f59e0b; margin: 0 0 10px; }
.table {
	width: 100%;
	border-collapse: collapse;
	background: rgba(0,0,0,0.25);
	border-radius: 8px;
	overflow: hidden;
}
.table thead th {
	background: #262626;
	color: #f0f0f0;
	padding: 12px;
	text-align: left;
}
.table tbody td {
	padding: 12px;
	border-bottom: 1px solid rgba(255,255,255,0.06);
}
.table tbody tr:hover {
	background: rgba(255,255,255,0.04);
}
.stars { color: #ffc107; display: flex; }
.star { margin-right: 2px; }
.tech { font-weight: 600; color: #fbbf24; }
.type { color: #f59e0b; font-weight: 600; }
.desc { color: #d0d0d0; }

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
	.table thead th, .table tbody td { padding: 10px; }
}
</style>


