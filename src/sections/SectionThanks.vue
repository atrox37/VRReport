<template>
	<section id="thanks" class="report-section thanks-section">
		<div class="words">
			<span v-for="(c, i) in chars" :key="i" class="char" ref="charRefs">{{ c }}</span>
		</div>
	</section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
const chars = ['感', '谢', '倾', '听']
const charRefs = ref<HTMLElement[]>([])
onMounted(() => {
	gsap.from(charRefs.value, {
		y: 40,
		opacity: 0,
		stagger: 0.2,
		duration: 0.8,
		ease: 'back.out(1.7)'
	})
	gsap.to(charRefs.value, {
		yoyo: true,
		repeat: -1,
		duration: 1.6,
		y: -6,
		stagger: { each: 0.2, from: 'center' },
		ease: 'sine.inOut',
		delay: 1.2
	})
})
</script>

<style scoped>
.thanks-section {
	display: grid;
	place-items: center;
}
.words {
	display: flex;
	gap: 16px;
	font-size: 64px;
	font-weight: 800;
	color: #fbbf24;
	text-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
}
@media (max-width: 960px) {
	.words { font-size: 42px; }
}
</style>


