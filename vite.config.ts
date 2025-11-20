import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
	plugins: [vue()],
	// Set base for GitHub Pages project site deployment
	// When hosted at: https://atrox37.github.io/VRReport/
	base: '/VRReport/',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	server: {
		port: 5173
	}
})




