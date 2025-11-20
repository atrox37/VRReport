<template>
	<div class="report">
		<!-- 右侧悬停导航 -->
		<RightHoverNav
			:sections="sectionList"
			:active-id="activeSectionId"
			@navigate="scrollToSection"
		/>

		<!-- 1. Goals -->
		<SectionGoals class="report-section" />

		<!-- 2. VR Intro -->
		<SectionVRIntro class="report-section" />

		<!-- 3. Stack（左侧目录仅在本段显示） -->
		<SectionStack class="report-section" :show-side-nav="activeSectionId === 'stack'" />

		<!-- 4. Unity（左侧目录仅在本段显示） -->
		<SectionUnity class="report-section" :show-side-nav="activeSectionId === 'unity'" />

		<!-- 5. Compare（左侧目录仅在本段显示） -->
		<SectionCompare class="report-section" :show-side-nav="activeSectionId === 'compare'" />

		<!-- 6. Recommend -->
		<SectionRecommend class="report-section" />

		<!-- 7. Thanks -->
		<SectionThanks class="report-section" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import SectionGoals from '@/sections/SectionGoals.vue'
import SectionStack from '@/sections/SectionStack.vue'
import SectionVRIntro from '../sections/SectionVRIntro.vue'
import SectionUnity from '@/sections/SectionUnity.vue'
import SectionCompare from '@/sections/SectionCompare.vue'
import SectionRecommend from '@/sections/SectionRecommend.vue'
import SectionThanks from '@/sections/SectionThanks.vue'
import RightHoverNav from '@/components/RightHoverNav.vue'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const activeSectionId = ref('goals')
const sectionList = [
	{ id: 'goals', label: '背景与目标' },
	{ id: 'vr', label: 'VR 是什么' },
	{ id: 'stack', label: '技术体系' },
	{ id: 'unity', label: '解决方案' },
	{ id: 'compare', label: '方案比较' },
	{ id: 'recommend', label: '总结' },
	{ id: 'thanks', label: '结束' }
]

const scrollToSection = (id: string) => {
	const el = document.getElementById(id)
	if (!el) return
	gsap.to(window, {
		duration: 0.7,
		ease: 'power2.inOut',
		scrollTo: { y: el, offsetY: 0, autoKill: true }
	})
}

onMounted(() => {
	// 禁用浏览器的滚动恢复，并强制回到顶点
	if ('scrollRestoration' in history) {
		// @ts-ignore
		history.scrollRestoration = 'manual'
	}
	window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

	const sections = gsap.utils.toArray<HTMLElement>('.report-section')
	// 给每个段落设置 id（按顺序与 sectionList 对齐）
	sections.forEach((el, idx) => {
		if (!el.id) el.id = sectionList[idx]?.id || `section-${idx}`
	})

	// 取消自动吸附，保持用户滚动的自然流畅性

	// 监听进入，更新当前激活段
	sections.forEach((el) => {
		ScrollTrigger.create({
			trigger: el,
			start: 'top 60%',
			onEnter: () => (activeSectionId.value = el.id),
			onEnterBack: () => (activeSectionId.value = el.id),
		})
	})

	// 离开当前模块时，标题与内容一并淡出；进入时一并淡入
	sections.forEach((el) => {
		// 不对 Unity 模块做整体淡入淡出，以免标题被动画影响
		if (el.id === 'unity') return
		gsap.set(el, { autoAlpha: 1 })
		ScrollTrigger.create({
			trigger: el,
			start: 'top 60%',
			end: 'bottom 40%',
			onEnter: () => gsap.to(el, { autoAlpha: 1, duration: 0.25, ease: 'power1.out' }),
			onEnterBack: () => gsap.to(el, { autoAlpha: 1, duration: 0.25, ease: 'power1.out' }),
			onLeave: () => gsap.to(el, { autoAlpha: 0, duration: 0.25, ease: 'power1.in' }),
			onLeaveBack: () => gsap.to(el, { autoAlpha: 0, duration: 0.25, ease: 'power1.in' })
		})
	})

	// 通用入场动画（限制范围，避免与 Goals/Stack/Unity 内部动画冲突；不处理标题，防止标题丢失）
	const animateIn = (container: Element) => {
		const targets = (container as HTMLElement).querySelectorAll('.card, .panel, .table-card, .objective-card, .case-card, .capability-card, .method-card, .comparison-grid, .applicability-matrix, .cards-grid .card')
		gsap.from(targets, {
			scrollTrigger: {
				trigger: container,
				start: 'top 70%',
				toggleActions: 'play none none reverse'
			},
			y: 24,
			opacity: 0,
			duration: 0.6,
			stagger: 0.06,
			ease: 'power2.out'
		})
	}
	;['compare','recommend','thanks'].forEach(id => {
		const el = document.getElementById(id)
		if (el) animateIn(el)
	})
})
</script>

<style scoped>
.report {
	min-height: 100vh;
	background: linear-gradient(135deg, #1c1c1c 0%, #2a2a2a 100%);
	color: #f0f0f0;
	position: relative;
}
.report-section {
	min-height: 100vh;
	display: block;
	/* padding-top: 64px;
	padding-bottom: 64px; */
}

/* 减少与左侧目录的重叠内容区域，可在节内部自行设置宽度 */
</style>


