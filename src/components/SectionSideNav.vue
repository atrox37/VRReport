<template>
	<nav
		v-if="visible"
		class="section-sidenav"
		role="navigation"
		aria-label="Section side navigation"
	>
		<div
			v-for="(item, index) in items"
			:key="item.id"
			class="nav-item"
			:class="{ 'nav-active': activeId === item.id }"
			@click="$emit('select', item.id)"
		>
			<div class="nav-number">{{ (index + 1).toString().padStart(2, '0') }}</div>
			<div class="nav-text">
				<div class="nav-title">{{ item.label }}</div>
				<div class="nav-subtitle" v-if="item.subtitle">{{ item.subtitle }}</div>
			</div>
			<div class="active-indicator"></div>
		</div>
	</nav>
	</template>

<script setup lang="ts">
type NavItem = {
	id: string
	label: string
	subtitle?: string
}

defineProps<{
	items: NavItem[]
	activeId: string
	visible: boolean
}>()

defineEmits<{
	(e: 'select', id: string): void
}>()
</script>

<style scoped>
.section-sidenav {
	position: sticky;
	top: 0;
	width: 280px;
	height: auto;
	background: rgba(20, 20, 20, 0.95);
	backdrop-filter: blur(10px);
	border-right: 1px solid rgba(245, 158, 11, 0.3);
	padding: 20px 0;
	overflow-y: auto;
	z-index: 10;
}

.nav-item {
	display: flex;
	align-items: center;
	padding: 15px 20px;
	margin: 0 10px 10px;
	border-radius: 10px;
	cursor: pointer;
	transition: all 0.3s ease;
	border: 1px solid transparent;
	color: #f0f0f0;
}

.nav-item:hover {
	background: rgba(255, 255, 255, 0.05);
	border-color: rgba(245, 158, 11, 0.3);
}

.nav-active {
	background: rgba(245, 158, 11, 0.1);
	border-color: #f59e0b;
	box-shadow: 0 5px 15px rgba(245, 158, 11, 0.2);
}

.nav-number {
	font-size: 1.1rem;
	font-weight: 800;
	color: #f59e0b;
	margin-right: 15px;
	min-width: 36px;
	text-align: center;
}

.nav-title {
	font-size: 1.05rem;
	font-weight: 600;
	margin-bottom: 4px;
}

.nav-active .nav-title {
	color: #f59e0b;
}

.nav-subtitle {
	font-size: 0.85rem;
	color: #aaa;
	line-height: 1.3;
}

.active-indicator {
	width: 8px;
	height: 8px;
	background: #f59e0b;
	border-radius: 50%;
	opacity: 0;
	transition: opacity 0.3s ease;
	margin-left: auto;
}

.nav-active .active-indicator {
	opacity: 1;
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0%, 100% { opacity: 0.5; transform: scale(1); }
	50% { opacity: 1; transform: scale(1.2); }
}

@media (max-width: 1024px) {
	.section-sidenav { width: 240px; }
}

@media (max-width: 768px) {
	.section-sidenav {
		position: static;
		width: 100%;
		height: auto;
		max-height: 200px;
		overflow-x: auto;
		display: flex;
		padding: 15px;
	}
	.nav-item {
		flex-direction: column;
		text-align: center;
		min-width: 140px;
		margin: 0 6px;
	}
	.nav-number { margin-right: 0; margin-bottom: 8px; }
}
</style>


