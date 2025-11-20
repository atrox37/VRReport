<template>
	<section class="stack">
		<div v-for="(layer, i) in layers" :key="layer.id" class="layer card" :ref="setLayerRef">
			<h3 class="layer-title">{{ i + 1 }}. {{ layer.title }}</h3>
			<ul class="layer-bullets">
				<li v-for="(b, j) in layer.bullets" :key="j">{{ b }}</li>
			</ul>
			<div v-if="details?.[layer.id]" class="layer-details">
				<div v-if="details?.[layer.id]?.paragraphs?.length">
					<p v-for="(p, idx) in details?.[layer.id]?.paragraphs" :key="idx">{{ p }}</p>
				</div>
				<div class="images" v-if="details?.[layer.id]?.images?.length">
					<figure v-for="(img, k) in details?.[layer.id]?.images" :key="k" class="fig">
						<img :src="img.url" :alt="img.alt || 'image'" loading="lazy" @error="onErr" />
						<figcaption v-if="img.source">来源：{{ img.source }}</figcaption>
					</figure>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { StackLayer } from '@/types/content'
gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{ layers: StackLayer[]; details?: Record<string, any> }>()
const layerEls = ref<HTMLElement[]>([])
function setLayerRef(el: HTMLElement | null) {
	if (el) layerEls.value.push(el)
}
function onErr(e: Event) {
	const el = e.target as HTMLImageElement
	el.style.display = 'none'
}

onMounted(() => {
	layerEls.value.forEach((el, idx) => {
		gsap.fromTo(
			el,
			{ y: 30, opacity: 0 },
			{
				y: 0,
				opacity: 1,
				duration: 0.6,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: el,
					start: 'top 85%',
					toggleActions: 'play none none reverse'
				}
			}
		)
		// bullet stagger
		const bullets = el.querySelectorAll('.layer-bullets li')
		gsap.fromTo(
			bullets,
			{ x: -10, opacity: 0 },
			{
				x: 0,
				opacity: 1,
				stagger: 0.08,
				delay: 0.05,
				duration: 0.4,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: el,
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				}
			}
		)
	})
})

onBeforeUnmount(() => {
	ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 16px; }
.layer {
	padding: 16px;
}
.layer-title {
	margin: 0 0 8px;
}
.layer-bullets {
	margin: 0;
	padding-left: 18px;
}
.layer-details {
	margin-top: 10px;
}
.images { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; }
.fig {
	margin: 0;
}
.fig figcaption {
	color: var(--muted);
	font-size: 12px;
}
</style>


