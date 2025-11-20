<template>
	<aside class="toc">
		<h4 class="toc-title">目录</h4>
		<nav class="toc-nav">
			<a v-for="(i, idx) in items" :key="idx" :href="i.href">{{ i.label }}</a>
		</nav>
	</aside>
</template>

<script setup lang="ts">
defineProps<{ items: { label: string; href: string }[] }>()
</script>

<style scoped>
.toc {
	position: sticky;
	top: 64px;
	align-self: start;
	border: 1px solid var(--panel-border);
	border-radius: 12px;
	padding: 12px;
	background: var(--panel);
}
.toc-title { margin: 0 0 8px; font-size: 14px; color: var(--muted); }
.toc-nav { display: flex; flex-direction: column; gap: 6px; }
.toc-nav a { color: var(--text); }
.toc-nav a:hover { color: var(--accent); }
</style>


