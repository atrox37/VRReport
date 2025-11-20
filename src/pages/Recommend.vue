<template>
	<div class="container">
		<section class="card">
			<h2 class="title">场景 → 技术推荐</h2>
			<div class="grid cols-2">
				<div v-for="(r, i) in recommend" :key="i" class="card" style="padding:14px">
					<div style="font-weight:600; margin-bottom:6px">{{ r.scenario }}</div>
					<div style="color: var(--accent)">{{ r.tech }}</div>
				</div>
			</div>
			<section class="summary">
				<h3 style="margin:0 0 8px">总结</h3>
				<p v-for="(s, i) in summary" :key="i">{{ s }}</p>
			</section>
		</section>
	</div>
</template>

<script setup lang="ts">
import content from '@/content/vr.json'
import type { VrContent } from '@/types/content'
const { recommend, summary } = content as VrContent
</script>

<style scoped>
.summary {
	margin-top: 16px;
	border: 1px solid var(--panel-border);
	border-radius: 14px;
	background: #fff7ed; /* 暖色背景 */
	padding: 14px;
}
.summary :deep(h2), .summary :deep(h3) {
	font-size: 22px;
}
.summary :deep(p) {
	font-size: 16px;
}
</style>


