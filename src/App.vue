<template>
	<div class="app-root" :class="{ focus: ui.isFocusMode }">
		<!-- <header class="app-header">
			<div class="header-row">
				<router-link class="brand" to="/">VR 技术调研 · 展示站</router-link>
				<nav class="module-nav">
					<router-link to="/goals">背景与目标</router-link>
					<router-link to="/stack">技术体系</router-link>
					<router-link to="/solutions/unity">解决方案</router-link>
					<router-link to="/compare">比较</router-link>
					<router-link to="/recommend">总结</router-link>
				</nav>
			</div>
			<div v-if="ui.isPresentationMode" class="progress">
				<div class="bar" :style="{ width: progressPct }"></div>
		
			</div>
		</header> -->
		<main class="app-main">
			<router-view />
		</main>
		<!-- <footer class="app-footer">
			<span>© 2025 VR Research</span>
		</footer> -->
	</div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUiStore } from '@/stores/useUiStore'

const router = useRouter()
const route = useRoute()
const ui = useUiStore()

const slidePaths = [
	'/', '/goals', '/stack',
	'/solutions/unity', '/solutions/unreal', '/solutions/three', '/solutions/babylon',
	'/compare', '/recommend', '/thanks'
]

function handleKey(e: KeyboardEvent) {
	if (!ui.isPresentationMode) return
	const idx = slidePaths.indexOf(route.path)
	if (e.key === 'ArrowRight' || e.key === ' ') {
		const next = slidePaths[Math.min(idx + 1, slidePaths.length - 1)]
		if (next && next !== route.path) router.push(next)
	}
	if (e.key === 'ArrowLeft') {
		const prev = slidePaths[Math.max(idx - 1, 0)]
		if (prev && prev !== route.path) router.push(prev)
	}
}

function globalKey(e: KeyboardEvent) {
	// 默认已开启演讲/专注，不再提供快捷切换；如需可扩展其他键位
}

onMounted(() => {
	window.addEventListener('keydown', handleKey)
	window.addEventListener('keydown', globalKey)
})
onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKey)
	window.removeEventListener('keydown', globalKey)
})

const isHome = computed(() => route.path === '/')
const totalSlides = slidePaths.length
const currentIndex = computed(() => Math.max(0, slidePaths.indexOf(route.path)))
const progressPct = computed(() => `${Math.round(((currentIndex.value + 1) / totalSlides) * 100)}%`)
</script>

<style>
:root {
	/* 明亮暖色主题 */
	--bg: #fffdf8;
	--panel: #ffffff;
	--panel-border: #ebebeb;
	--text: #2a2a2a;
	--muted: #6b7280;
	--accent: #f59e0b; /* 琥珀橙 */
	--accent-weak: #fde68a;
	--success: #16a34a;
	--danger: #dc2626;
}
* { box-sizing: border-box; }
html, body, #app { height: 100%; }
body {
	margin: 0;
	background: var(--bg);
	color: var(--text);
	font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif;
}
.app-root {
	height: 100%;
	display: flex;
	flex-direction: column;
}
.app-root.focus .app-footer { display: none; }
.app-header {
	position: sticky;
	top: 0;
	z-index: 10;
	backdrop-filter: saturate(140%) blur(6px);
	background: rgba(255,255,255,0.8);
	border-bottom: 1px solid var(--panel-border);
}
.header-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.brand {
	margin: 0;
	padding: 14px 20px;
	font-size: 18px;
	font-weight: 600;
	letter-spacing: .2px;
}
.brand:hover { text-decoration: underline; }
.module-nav {
	display: flex;
	gap: 12px;
	align-items: center;
	padding-right: 12px;
}
.progress {
	position: relative;
	height: 4px;
	background: #fef3c7;
}
.bar {
	height: 100%;
	background: var(--accent);
	transition: width .25s ease;
}
.progress .meta {
	position: absolute;
	top: -18px;
	right: 10px;
	color: var(--muted);
	font-size: 12px;
}
.app-main {
	height: 100%;
    width: 100%;
}
.app-footer {
	padding: 16px 20px;
	border-top: 1px solid var(--panel-border);
	color: var(--muted);
	font-size: 12px;
}
.container {
	width: 90%;
	margin: 0 auto;
	padding: 24px 20px;
}
.card {
	background: var(--panel);
	border: 1px solid var(--panel-border);
	border-radius: 14px;
	padding: 16px;
	box-shadow: 0 1px 2px rgba(17, 24, 39, 0.04);
}
.title {
	font-size: 30px;
	margin: 0 0 8px;
}
.subtitle {
	margin: 0;
	color: var(--muted);
}
a {
	color: var(--accent);
	text-decoration: none;
}
a:hover { text-decoration: underline; }
</style>


