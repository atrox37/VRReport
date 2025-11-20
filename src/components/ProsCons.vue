<template>
	<div class="grid cols-2">
		<div class="pc pc-pro">
			<h4 class="pc-title">优点</h4>
			<ul class="pc-list">
				<li v-for="(p, i) in pros" :key="i">{{ p }}</li>
			</ul>
		</div>
		<div class="pc pc-con">
			<h4 class="pc-title">缺点</h4>
			<ul class="pc-list">
				<li v-for="(c, i) in cons" :key="i">{{ c }}</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{ pros: string[]; cons: string[] }>()
</script>

<style scoped>
.pc {
	border: 1px solid var(--panel-border);
	border-radius: 12px;
	padding: 12px;
}
.pc-pro {
	background: #f0fdf4; /* 绿：优 */
	border-color: #bbf7d0;
}
.pc-con {
	background: #fef2f2; /* 红：缺 */
	border-color: #fecaca;
}
.pc-title { margin: 0 0 8px; }
.pc-list {
	margin: 0;
	padding-left: 18px;
}
</style>


