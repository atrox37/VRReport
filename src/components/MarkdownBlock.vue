<template>
	<div class="md" v-html="safeHtml"></div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'
import { computed } from 'vue'
const props = defineProps<{ content: string }>()
const md = new MarkdownIt({ html: false, linkify: true, typographer: true, breaks: true })
const rendered = computed(() => md.render(props.content || ''))
const safeHtml = computed(() => DOMPurify.sanitize(rendered.value))
</script>

<style scoped>
.md :deep(h1) { font-size: 28px; margin: 18px 0 8px; }
.md :deep(h2) { font-size: 22px; margin: 16px 0 6px; }
.md :deep(h3) { font-size: 18px; margin: 14px 0 6px; }
.md :deep(p) { margin: 6px 0; line-height: 1.7; }
.md :deep(ul), .md :deep(ol) { padding-left: 20px; margin: 8px 0; }
.md :deep(code) { background: #fff7ed; padding: 2px 6px; border-radius: 6px; }
.md :deep(a) { color: var(--accent); }
.md :deep(img) { max-width: 100%; border-radius: 10px; border: 1px solid var(--panel-border); }
</style>




