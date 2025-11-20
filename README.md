# VR 技术调研 · 前端展示站（Vue 3 + TS + Vite + GSAP）

本项目将 `vr.md` 的核心结构转化为一个可交互、可演讲的网页展示站，支持滚动叙事、章节跳转与移动端降级。

## 功能与结构
- 信息架构按章节路由化：
  - `/` 首页（Hero + 导航 + 演讲模式切换）
  - `/goals` 背景与目标（要点卡片）
  - `/stack` VR 技术体系五层（GSAP/ScrollTrigger 入场动效）
  - `/solutions/*` 四条技术路线（Unity/Unreal/Three/Babylon）
  - `/compare` 综合比较表
  - `/recommend` 场景→技术推荐矩阵
  - `/references` 参考与扩展
- 动效：GSAP + ScrollTrigger，滚动进入淡入/位移与条目级渐显
- 演讲模式：按 `P` 切换，`←/→/Space` 快速跳转章节

## 运行
```bash
npm i
npm run dev
```
构建与预览：
```bash
npm run build
npm run preview
```

## 内容来源与数据建模
`src/content/vr.json` 承载从 `vr.md` 提取的要点，组件以强类型消费：
- 类型定义：`src/types/content.ts`
- 主要字段：
  - `goals`: 背景目标要点
  - `stack`: 五层架构列表（id/title/bullets）
  - `solutions`: 四方案（intro/architecture/capabilities/pros/cons/use/notUse）
  - `compare`: columns + rows
  - `recommend`: 场景与推荐技术
  - `references`: 参考链接

更新内容时建议仅编辑 `src/content/vr.json`，无需改动组件逻辑。

## 组件一览
- `HeroSection` 首页首屏
- `KeyTakeaways` 金句要点栅格
- `StackLayers` 五层体系滚动入场（GSAP）
- `ArchFlow` 方案架构流向小组件
- `ProsCons` 优缺点对列

## 动效规范
- 入场：淡入 + 位移 ≤ 800ms，`ease: power2.out`
- 列表：`stagger 0.06~0.1s`
- 卸载：组件 `onBeforeUnmount` 中 `ScrollTrigger.getAll().forEach(t => t.kill())`
- 移动端降级：避免 pinned 复杂场景，保持基础淡入与表格滚动

## 技术栈
Vue 3 + TypeScript + Vite + Vue Router + Pinia + GSAP(ScrollTrigger)

## 项目结构
```
src/
  components/        复用组件
  pages/             路由页面
  router/            路由配置
  stores/            Pinia store
  content/vr.json    内容数据
  types/content.ts   类型定义
```

## 后续扩展建议
- 为 `/stack` 增加层间连线描边与固定滚动（pin）叙事
- 引入 `SectionNav` 进度电梯与锚点跳转
- 增加图表（ECharts/Chart.js）可视化对比
- 引入 Three.js 作为首页背景粒子 WebGL（桌面端）




