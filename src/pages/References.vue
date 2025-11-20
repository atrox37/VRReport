<template>
	<div class="container">
		<section class="card">
			<h2 class="title">参考与扩展阅读</h2>
			<ul>
				<li v-for="(ref, i) in references" :key="i">
					<a v-if="ref.url" :href="ref.url" target="_blank" rel="noreferrer">{{ ref.title }}</a>
					<span v-else>{{ ref.title }}</span>
					<span v-if="ref.note" style="color:var(--muted)"> — {{ ref.note }}</span>
				</li>
			</ul>
		</section>
	</div>
</template>

<script setup lang="ts">
import content from '@/content/vr.json'
import type { VrContent } from '@/types/content'
const { references } = content as VrContent
</script>


