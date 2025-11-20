import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('@/pages/Home.vue')
const Report = () => import('@/pages/Report.vue')
const Goals = () => import('@/pages/Goals.vue')
const Stack = () => import('@/pages/Stack.vue')
const Solutions = () => import('@/pages/Solutions/Index.vue')
const Unity = () => import('@/pages/Solutions/Unity.vue')
const Unreal = () => import('@/pages/Solutions/Unreal.vue')
const Three = () => import('@/pages/Solutions/Three.vue')
const Babylon = () => import('@/pages/Solutions/Babylon.vue')
const Compare = () => import('@/pages/Compare.vue')
const Recommend = () => import('@/pages/Recommend.vue')
const References = () => import('@/pages/References.vue')
const Thanks = () => import('@/pages/Thanks.vue')

const router = createRouter({
	history: createWebHashHistory(),
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) return savedPosition
		if (to.hash) {
			return { el: to.hash, behavior: 'smooth' }
		}
		return { top: 0, behavior: 'smooth' }
	},
	routes: [
		// 新入口：Report 单页
		{ path: '/', name: 'report', component: Report },
		// 保留原入口作为备份
		{ path: '/home', name: 'home', component: Home },
		{ path: '/goals', name: 'goals', component: Goals },
		{ path: '/stack', name: 'stack', component: Stack },
		{
			path: '/solutions',
			component: Solutions,
			children: [
				{ path: '', redirect: { name: 'unity' } },
				{ path: 'unity', name: 'unity', component: Unity },
				{ path: 'unreal', name: 'unreal', component: Unreal },
				{ path: 'three', name: 'three', component: Three },
				{ path: 'babylon', name: 'babylon', component: Babylon }
			]
		},
		{ path: '/compare', name: 'compare', component: Compare },
		{ path: '/recommend', name: 'recommend', component: Recommend },
		{ path: '/references', name: 'references', component: References },
		{ path: '/thanks', name: 'thanks', component: Thanks },
		{ path: '/:pathMatch(.*)*', redirect: '/' }
	]
})

export default router


