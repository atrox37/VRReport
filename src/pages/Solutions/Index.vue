<template>
	<div class="container">
		<CrossNav :links="links" />
		<div class="grid cols-2" style="margin-top: 12px;">
			<SideToc :items="toc" />
			<div>
				<router-view />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import SideToc from '@/components/SideToc.vue'
import CrossNav from '@/components/CrossNav.vue'
const links = [
	{ label: 'Unity', to: '/solutions/unity' },
	{ label: 'Unreal', to: '/solutions/unreal' },
	{ label: 'Three.js', to: '/solutions/three' },
	{ label: 'Babylon.js', to: '/solutions/babylon' }
]
const toc = [
	{ label: '简介', href: '#top' },
	{ label: '架构流向', href: '#top' },
	{ label: '核心能力', href: '#top' },
	{ label: '优缺点', href: '#top' },
	{ label: '产品/解决方案', href: '#top' },
	{ label: '适用/不适用', href: '#top' }
]
</script>


