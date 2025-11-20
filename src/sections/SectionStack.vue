<template>
	<section id="stack" class="report-section stack-section" ref="rootRef">
		<StackPage />
	</section>
	</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import StackPage from '@/pages/Stack.vue'

const rootRef = ref<HTMLElement | null>(null)
let cleanup: (() => void) | null = null

onMounted(() => {
	// 点击左侧层级导航时，回到本模块起点，确保大标题可见
	const el = rootRef.value
	if (!el) return
	const items = el.querySelectorAll('.layer-navigation .nav-item')
	const handler = (e: Event) => {
		const section = document.getElementById('stack')
		if (section) {
			const rect = section.getBoundingClientRect()
			const y = rect.top + window.pageYOffset - 100
			window.scrollTo({ top: y, left: 0, behavior: 'smooth' })
		}
	}
	items.forEach(node => node.addEventListener('click', handler))
	cleanup = () => items.forEach(node => node.removeEventListener('click', handler))
})

onBeforeUnmount(() => {
	if (cleanup) cleanup()
})
</script>

<style scoped>
.stack-section { position: relative; }
/* 将 Stack 页左侧目录限制在本模块内（sticky 代替 fixed） */
:deep(.vr-architecture-system) {
	display: flex !important;
	align-items: flex-start !important;
	gap: 0 !important;
	overflow: visible !important; /* 避免 sticky/nav 被裁剪 */
}
:deep(.layer-navigation) {
	position: sticky !important;
	top: 100px !important; /* 更稳定的粘性顶部偏移 */
	left: auto !important;
	width: 280px !important;
	z-index: 100 !important;
	height: auto !important;
	flex: 0 0 280px !important;
	align-self: flex-start !important;
}

/* 正文居中显示，左侧预留导航区域 */
:deep(.main-content) {
	flex: 1 1 auto !important;
	max-width: 1160px !important;
	width: 100% !important;
	/* margin: 0 auto !important; */
	padding: 40px !important;
	/* 覆盖原文件的 margin-left */
	margin-left: 100px !important;
}
</style>


