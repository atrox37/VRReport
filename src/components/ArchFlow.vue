<template>
	<div class="flow card">
		<div v-for="(n, i) in nodes" :key="i" class="flow-node" :title="descriptions?.[i] || ''">
			<div class="step">{{ i + 1 }}</div>
			<div class="label">{{ n }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{ nodes: string[]; descriptions?: string[] }>()
</script>

<style scoped>
.flow { padding: 12px; display: flex; flex-direction: column; gap: 8px; }
.flow-node {
	display: flex;
	align-items: center;
	gap: 8px;
	border: 1px solid var(--panel-border);
	border-radius: 10px;
	background: #fffdf5;
	padding: 8px 10px;
}
.step {
	width: 28px; height: 28px;
	border-radius: 50%;
	display: grid; place-items: center;
	background: var(--accent-weak);
	color: #7c2d12;
	font-weight: 700;
}
.label {
	font-weight: 600;
}
</style>


