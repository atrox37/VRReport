<template>
	<div class="grid cols-3">
		<div v-for="(t, i) in items" :key="i" class="card kt">
			<div class="kt-index">0{{ i + 1 }}</div>
			<div class="kt-text">{{ t }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<style scoped>
.kt {
	padding: 16px;
	min-height: 100px;
	display: grid;
	grid-template-columns: 56px 1fr;
	gap: 12px;
	align-items: center;
}
.kt-index {
	width: 48px;
	height: 48px;
	border-radius: 10px;
	display: grid;
	place-items: center;
	background: #0b0e15;
	border: 1px solid #1f2430;
	color: var(--accent);
	font-weight: 700;
}
.kt-text { line-height: 1.5; }
</style>




