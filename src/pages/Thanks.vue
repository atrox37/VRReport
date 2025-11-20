<template>
	<section class="thanks">
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
.thanks {
	min-height: calc(100vh - 64px);
	display: grid;
	place-items: center;
	background: radial-gradient(600px 240px at 50% 30%, #fff7ed, transparent);
}
.words {
	display: flex;
	gap: 16px;
	font-size: 72px;
	font-weight: 800;
	color: #7c2d12;
}
@media (max-width: 960px) {
	.words { font-size: 48px; }
}
</style>




