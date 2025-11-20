<template>
	<section class="hero">
		<div class="hero-bg"></div>
		<div class="hero-content">
			<h2>VR 技术调研</h2>
			<p>基于 OpenXR / WebXR 的多技术路线比较与选型建议</p>
			<div class="hero-actions">
				<router-link class="btn" to="/goals">开始阅读</router-link>
				<button class="btn outline" @click="$emit('togglePresentation')">切换演讲模式 (P)</button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero {
	position: relative;
	overflow: hidden;
	border-radius: 16px;
	border: 1px solid #1f2430;
	background: radial-gradient(1200px 400px at 20% -10%, rgba(103,232,249,0.15), transparent 60%),
		radial-gradient(1000px 600px at 120% 20%, rgba(99,102,241,0.15), transparent 60%),
		#0f1115;
	min-height: 240px;
	display: grid;
	place-items: center;
}
.hero-content {
	text-align: center;
	padding: 32px 20px;
}
.hero h2 {
	margin: 0 0 8px;
	font-size: 36px;
	letter-spacing: .2px;
}
.hero p {
	margin: 0 0 16px;
	color: var(--muted);
}
.hero-actions {
	display: flex;
	justify-content: center;
	gap: 10px;
}
.btn {
	background: var(--accent);
	color: #002b36;
	border: none;
	border-radius: 10px;
	padding: 8px 12px;
	font-weight: 600;
	cursor: pointer;
}
.btn.outline {
	background: transparent;
	color: var(--accent);
	border: 1px solid var(--accent);
}
.btn:hover { opacity: .9; }
</style>




