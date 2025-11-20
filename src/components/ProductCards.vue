<template>
	<div class="grid cols-2">
		<article v-for="(p, i) in products" :key="i" class="card prod">
			<div class="media" v-if="p.image?.url">
				<img :src="p.image.url" :alt="p.image.alt || p.title" loading="lazy" @error="onErr" />
			</div>
			<div class="body">
				<h4 class="name">{{ p.title }}</h4>
				<p class="intro">{{ p.intro }}</p>
				<ul class="highlights">
					<li v-for="(h, j) in p.highlights" :key="j">• {{ h }}</li>
				</ul>
				<p v-if="p.details" class="details">{{ p.details }}</p>
				<div class="meta">
					<a v-if="p.link" :href="p.link" target="_blank" rel="noreferrer">查看详情 →</a>
					<span v-if="p.image?.source" class="source">图片：{{ p.image.source }}</span>
				</div>
			</div>
		</article>
	</div>
</template>

<script setup lang="ts">
defineProps<{ products: any[] }>()
function onErr(e: Event) {
	;(e.target as HTMLImageElement).style.display = 'none'
}
</script>

<style scoped>
.prod { padding: 0; overflow: hidden; }
.media img {
	display: block;
	width: 100%;
	height: 160px;
	object-fit: cover;
	border-bottom: 1px solid var(--panel-border);
}
.body { padding: 12px 14px; }
.name { margin: 0 0 6px; font-size: 18px; }
.intro { margin: 0 0 6px; color: var(--muted); }
.highlights { margin: 6px 0; padding-left: 18px; }
.details { margin: 6px 0; line-height: 1.6; }
.meta { display: flex; gap: 10px; align-items: center; margin-top: 6px; }
.source { color: var(--muted); font-size: 12px; }
</style>


