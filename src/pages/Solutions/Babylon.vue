<template>
	<div class="container">
		<section class="card" style="margin-top:16px">
			<h2 class="title">Babylon.js + WebXR</h2>
			<p class="subtitle">{{ s.intro }}</p>
		</section>
		<ArchFlow :nodes="s.architecture" :descriptions="s.architectureDesc" />
		<section class="card" style="margin-top:12px">
			<h3 style="margin:0 0 8px">核心能力</h3>
			<ul style="margin:0; padding-left:18px">
				<li v-for="(c, i) in s.capabilities" :key="i" :title="typeof c === 'string' ? '' : c.tip">
					{{ typeof c === 'string' ? c : c.text }}
				</li>
			</ul>
		</section>
		<ProsCons :pros="s.pros" :cons="s.cons" />
		<section class="card" style="margin-top:12px">
			<h3 style="margin:0 0 8px">产品 / 解决方案</h3>
			<ProductCards v-if="s.products?.length" :products="s.products || []" />
		</section>
		<div class="grid cols-2" style="margin-top:12px">
			<div class="card">
				<h4 style="margin:0 0 8px">适用</h4>
				<ul style="margin:0; padding-left:18px">
					<li v-for="(u, i) in s.use" :key="i">{{ u }}</li>
				</ul>
			</div>
			<div class="card">
				<h4 style="margin:0 0 8px">不适用</h4>
				<ul style="margin:0; padding-left:18px">
					<li v-for="(n, i) in s.notUse" :key="i">{{ n }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import content from '@/content/vr.json'
import type { VrContent } from '@/types/content'
import ArchFlow from '@/components/ArchFlow.vue'
import ProsCons from '@/components/ProsCons.vue'
import ProductCards from '@/components/ProductCards.vue'
const { solutions } = content as VrContent
const s = solutions.babylon
</script>


