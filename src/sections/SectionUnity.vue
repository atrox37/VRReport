<template>
	<section id="unity" class="report-section unity-section" ref="unityRoot">
		<SolutionsUnity />
	</section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import SolutionsUnity from '@/pages/Solutions/Unity.vue'

const unityRoot = ref<HTMLElement | null>(null)
let unityCleanup: (() => void) | null = null

onMounted(() => {
	const root = unityRoot.value
	if (!root) return
	const items = root.querySelectorAll('.engine-navigation .nav-engine')
	const handler = (e: Event) => {
		const section = document.getElementById('unity')
		if (section) {
			const rect = section.getBoundingClientRect()
			const y = rect.top + window.pageYOffset - 100
			window.scrollTo({ top: y, left: 0, behavior: 'smooth' })
		}
	}
	items.forEach(node => node.addEventListener('click', handler))
	unityCleanup = () => items.forEach(node => node.removeEventListener('click', handler))
})

onBeforeUnmount(() => {
	if (unityCleanup) unityCleanup()
})
</script>

<style scoped>
.unity-section { position: relative; }
/* 将 Unity 页的左侧导航限制在本模块内出现（sticky 代替 fixed） */
:deep(.vr-engines-comparison) {
	display: flex !important;
	align-items: flex-start !important;
	gap: 0 !important;
	overflow: visible !important; /* 避免 sticky/nav 被裁剪 */
}
:deep(.engine-navigation) {
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
	/* 覆盖原文件的 margin-left 以实现真正居中 */
	margin-left: 100px !important;
}
</style>


