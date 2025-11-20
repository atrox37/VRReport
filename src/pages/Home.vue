<template>
  <div class="home-container">
    <!-- <aside class="sidebar card">
				<h3 class="s-title">sidebar</h3>
				<nav class="s-links">
					<router-link to="/goals">背景与目标</router-link>
					<router-link to="/stack">技术体系</router-link>
					<router-link to="/solutions/unity">解决方案</router-link>
					<router-link to="/compare">比较</router-link>
					<router-link to="/recommend">总结</router-link>
				</nav>
			</aside> -->
    <section class="main card">
      <div class="m-main">
        <p class="m-title">VR技术调研</p>
        <p class="m-sub">基于 OpenXR / WebXR 的多技术路线比较与选型建议</p>
        <button class="enter-btn" ref="button" @click="$router.push('/goals')">
          <span class="btn-text">开始阅读</span>
          <span class="btn-highlight" ref="highlight"></span>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
gsap.registerPlugin(CSSPlugin);
const button = ref<HTMLButtonElement | null>(null);
const highlight = ref<HTMLSpanElement | null>(null);
gsap.registerPlugin(CSSPlugin);
onMounted(() => {
  // 创建时间线并暂停
  const buttonTl = gsap.timeline({ paused: true });

  // 定义动画序列：悬浮3D效果和流光划过
  buttonTl
    .to(button.value, {
      duration: 0.3,
      rotationX: 10,
      rotationY: -5,
      scale: 1.05,
      ease: "power2.out",
    })
    .to(
      highlight.value,
      {
        duration: 0.8,
        x: "200%",
        ease: "power2.inOut",
      },
      "-=0.3"
    ) // 与上一个动画重叠0.3秒
    .to(
      button.value,
      {
        duration: 0.4,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        ease: "elastic.out(1.2, 0.5)",
      },
      "-=0.2"
    ); // 与上一个动画重叠0.2秒

  // 事件绑定：鼠标悬停时播放动画
  button.value?.addEventListener("mouseenter", () => {
    // 重置高光位置
    gsap.set(highlight.value, { x: "-100%" });
    buttonTl.restart();
  });

  // 可选：鼠标离开时的小幅复位动画
  button.value?.addEventListener("mouseleave", () => {
    if (!buttonTl.isActive()) {
      // 如果主动画不在进行中
      gsap.to(button, {
        duration: 0.3,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        ease: "power2.out",
      });
    }
  });
});
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.layout {
  align-items: start;
}
.sidebar {
  position: sticky;
  top: 84px;
  width: 240px;
}
.s-title {
  margin: 0 0 8px;
  font-size: 16px;
  color: #7c2d12;
}
.s-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.s-links a {
  color: var(--text);
}
.s-links a:hover {
  color: var(--accent);
}
.main {
  width: 100%;
  height: 100%;
  background-image: url("@/images/home.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.m-main {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.enter-btn {
  position: relative;
  padding: 18px 40px;
  font-size: 1.2rem;
  color: white;
  background: linear-gradient(45deg, orange, #ff7700);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  transform-style: preserve-3d; /* 重要：为3D变换做准备 */
  perspective: 1000px; /* 重要：为3D变换做准备 */
  transition: filter 0.3s ease;
}

.enter-btn:hover {
  filter: brightness(1.1);
}

.btn-text {
  display: block;
  position: relative;
  z-index: 2;
}

.btn-highlight {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  z-index: 1;
}
.m-title {
  font-size: 36px;
  font-weight: 700;
  color: orange;
}
.m-sub {
  font-size: 24px;
  margin: 0 0 400px;
  color: orange;
  opacity: 0.8;
}
.btn-start {
  font-size: 32px;
  display: inline-block;
  background: var(--accent);
  color: #7c2d12;
  border-radius: 12px;
  padding: 16px 32px;
  font-weight: 700;
}
@media (max-width: 960px) {
  .sidebar {
    position: static;
    width: auto;
  }
}
</style>
