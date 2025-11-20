<template>
	<nav class="cross card">
		<a v-for="(l, i) in links" :key="i" :href="l.to" @click.prevent="$router.push(l.to)">{{ l.label }}</a>
	</nav>
</template>

<script setup lang="ts">
defineProps<{ links: { label: string; to: string }[] }>()
</script>

<style scoped>
.cross {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	padding: 10px;
}
.cross a { color: var(--accent); }
</style>




