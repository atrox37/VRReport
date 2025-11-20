<template>
	<div class="right-nav-wrapper" @mouseenter="open = true" @mouseleave="open = false">
		<div class="edge-hotspot"></div>
		<aside class="right-nav-panel" :class="{ open }">
			<h4 class="panel-title">导航</h4>
			<ul class="nav-list">
				<li
					v-for="s in sections"
					:key="s.id"
					class="nav-link"
					:class="{ active: s.id === activeId }"
					@click="$emit('navigate', s.id)"
				>
					<span class="dot"></span>
					<span class="label">{{ s.label }}</span>
				</li>
			</ul>
		</aside>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
	sections: { id: string; label: string }[]
	activeId: string
}>()

defineEmits<{
	(e: 'navigate', id: string): void
}>()

const open = ref(false)
</script>

<style scoped>
.right-nav-wrapper {
	position: fixed;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	z-index: 101;
}

/* 热区，保证靠右时可触发 */
.edge-hotspot {
	position: absolute;
	right: 0;
	top: 0;
	width: 8px;
	height: 100%;
	cursor: ew-resize;
}

.right-nav-panel {
	position: relative;
	transform: translateX(100%);
	transition: transform 0.3s ease;
	background: rgba(20, 20, 20, 0.92);
	backdrop-filter: blur(10px);
	border-left: 1px solid rgba(245, 158, 11, 0.3);
	padding: 14px 16px;
	min-width: 160px;
	color: #f0f0f0;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
}

.right-nav-panel.open {
	transform: translateX(0);
}

.panel-title {
	margin: 0 0 10px;
	font-size: 0.95rem;
	color: #f59e0b;
}

.nav-list {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.nav-link {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 10px;
	border-radius: 8px;
	cursor: pointer;
	transition: background 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
	background: rgba(255, 255, 255, 0.06);
}

.nav-link.active {
	background: rgba(245, 158, 11, 0.12);
	color: #fbbf24;
	border: 1px solid rgba(245, 158, 11, 0.3);
}

.dot {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: #f59e0b;
	box-shadow: 0 0 6px rgba(245, 158, 11, 0.8);
	flex-shrink: 0;
}

.label {
	white-space: nowrap;
}

@media (max-width: 768px) {
	.right-nav-wrapper {
		display: none;
	}
}
</style>


