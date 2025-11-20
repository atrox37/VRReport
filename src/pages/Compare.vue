
<template>
  <div class="container">
    <!-- 应用头部 -->
    <div class="header">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>
    
    <!-- 控制面板 -->
    <div class="control-panel">
      <button class="btn" @click="animateAllTables">播放动画</button>
      <button class="btn btn-reset" @click="resetAllTables">重置动画</button>
    </div>
    
    <!-- 技术定位对比表格 -->
    <div class="comparison-section">
      <h2 class="section-title">技术定位对比</h2>
      <table class="comparison-table" ref="table1">
        <thead>
          <tr>
            <th>技术</th>
            <th>技术类型</th>
            <th>核心定位</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in techPositioningData" :key="item.tech" :data-index="index">
            <td class="tech-name">{{ item.tech }}</td>
            <td class="tech-type">{{ item.type }}</td>
            <td class="core-position">{{ item.position }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 渲染能力对比表格 -->
    <div class="comparison-section">
      <h2 class="section-title">渲染能力对比</h2>
      <table class="comparison-table" ref="table2">
        <thead>
          <tr>
            <th>技术</th>
            <th>渲染能力</th>
            <th>特点总结</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in renderingCapabilityData" :key="item.tech" :data-index="index">
            <td class="tech-name">{{ item.tech }}</td>
            <td>
              <div class="stars">
                <span v-for="n in 5" :key="n" class="star">
                  {{ n <= item.stars ? '★' : '☆' }}
                </span>
              </div>
            </td>
            <td class="characteristic">{{ item.characteristic }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 性能对比表格 -->
    <div class="comparison-section">
      <h2 class="section-title">性能对比</h2>
      <table class="comparison-table" ref="table3">
        <thead>
          <tr>
            <th>技术</th>
            <th>性能表现</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in performanceData" :key="item.tech" :data-index="index">
            <td class="tech-name">{{ item.tech }}</td>
            <td>
              <div class="stars">
                <span v-for="n in 5" :key="n" class="star">
                  {{ n <= item.stars ? '★' : '☆' }}
                </span>
              </div>
            </td>
            <td class="explanation">{{ item.explanation }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'ComparisonApp',
  setup() {
    // 响应式数据
    const title = ref('VR/AR 开发技术综合比较')
    const subtitle = ref('Unity XR, Unreal XR, Three.js 与 Babylon.js 全方位对比')
    
    // 表格引用
    const table1 = ref(null)
    const table2 = ref(null)
    const table3 = ref(null)
    
    // 技术定位对比数据
    const techPositioningData = ref([
      { tech: 'Unity XR + OpenXR', type: '原生3D 引擎', position: '工程级、跨平台 VR 开发框架' },
      { tech: 'Unreal XR + OpenXR', type: '原生3D 引擎', position: '写实级、仿真级 VR 引擎（行业最强）' },
      { tech: 'Three.js + WebXR', type: 'Web 3D 库', position: '轻量级 Web VR 可视化' },
      { tech: 'Babylon.js + WebXR', type: 'Web 3D 引擎', position: '较完整的 WebVR 引擎，适合中型项目' }
    ])
    
    // 渲染能力对比数据
    const renderingCapabilityData = ref([
      { tech: 'UE XR + OpenXR', stars: 5, characteristic: 'Nanite + Lumen = 电影级写实效果，适合大型站点、机房还原' },
      { tech: 'Unity XR + OpenXR', stars: 4, characteristic: '性能好，画面较好，可达工业级，但不及 UE 写实' },
      { tech: 'Babylon.js + WebXR', stars: 4, characteristic: 'WebGPU 提升明显，但仍受限于浏览器' },
      { tech: 'Three.js + WebXR', stars: 3, characteristic: 'WebGL 基础，画质普通，适用于中小型可视化' }
    ])
    
    // 性能对比数据
    const performanceData = ref([
      { tech: 'UE XR', stars: 5, explanation: '最能处理大型、高模场景' },
      { tech: 'Unity XR', stars: 4, explanation: '表现优秀，但大场景优化量较大' },
      { tech: 'Babylon.js', stars: 3, explanation: 'WebGPU 加持下中型场景可运行；大型场景困难' },
      { tech: 'Three.js', stars: 3, explanation: '适合轻场景；无法处理庞大模型或复杂特效' }
    ])
    
    // 动画方法
    const animateTable = (tableRef) => {
      if (tableRef.value) {
        const rows = tableRef.value.querySelectorAll('tbody tr')
        gsap.fromTo(rows, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            stagger: 0.15,
            ease: "back.out(1.2)"
          }
        )
      }
    }
    
    const resetTable = (tableRef) => {
      if (tableRef.value) {
        const rows = tableRef.value.querySelectorAll('tbody tr')
        gsap.set(rows, { opacity: 1, y: 0 })
      }
    }
    
    // 控制方法
    const animateAllTables = () => {
      // 重置所有表格
      resetAllTables()
      
      // 使用setTimeout确保重置完成后再执行动画
      setTimeout(() => {
        // 依次动画每个表格
        animateTable(table1)
        
        setTimeout(() => {
          animateTable(table2)
          
          setTimeout(() => {
            animateTable(table3)
          }, 800)
        }, 800)
      }, 100)
    }
    
    const resetAllTables = () => {
      resetTable(table1)
      resetTable(table2)
      resetTable(table3)
    }
    
    // 生命周期
    onMounted(() => {
      // 组件挂载后自动播放动画
      setTimeout(() => {
        animateAllTables()
      }, 500)
    })
    
    return {
      title,
      subtitle,
      table1,
      table2,
      table3,
      techPositioningData,
      renderingCapabilityData,
      performanceData,
      animateAllTables,
      resetAllTables
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.comparison-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #2575fc;
  color: #2c3e50;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.comparison-table th {
  background-color: #2575fc;
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
}

.comparison-table td {
  padding: 15px;
  border-bottom: 1px solid #eaeaea;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.comparison-table tr:nth-child(even) {
  background-color: #f8fafc;
}

.comparison-table tr:hover {
  background-color: #f0f7ff;
  transition: background-color 0.3s;
}

.stars {
  display: flex;
  color: #ffc107;
}

.star {
  font-size: 1.2rem;
  margin-right: 2px;
}

.control-panel {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 30px 0;
}

.btn {
  padding: 12px 25px;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(37, 117, 252, 0.3);
}

.btn:hover {
  background-color: #1a68e8;
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(37, 117, 252, 0.4);
}

.btn:active {
  transform: translateY(0);
}

.btn-reset {
  background-color: #6c757d;
}

.btn-reset:hover {
  background-color: #5a6268;
}

.tech-type {
  font-weight: 600;
  color: #2575fc;
}

.core-position {
  color: #2c3e50;
}

.characteristic {
  color: #495057;
}

.explanation {
  color: #6c757d;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .comparison-table {
    font-size: 0.9rem;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 10px;
  }
  
  .header h1 {
    font-size: 1.8rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style>