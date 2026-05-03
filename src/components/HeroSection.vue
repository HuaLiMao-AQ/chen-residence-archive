<script setup lang="ts">
const emit = defineEmits<{
  navigate: [targetId: string]
}>()

const overviewItems = [
  { label: '实践地点', value: '独秀园' },
  { label: '项目形式', value: '专题博客网页' },
  { label: '核心内容', value: '党史故事 / 实践材料 / 理论分析 / 青年感悟' },
]
</script>

<template>
  <section id="hero" class="hero-section">
    <div class="hero-section__inner">
      <div class="hero-section__content">
        <p class="hero-section__eyebrow">课程实践成果展示</p>
        <h1>红色记忆轴：从独秀园走近陈独秀与《新青年》</h1>
        <p class="hero-section__subtitle">
          基于安庆本地红色资源的党史故事实践调研互动博客
        </p>
        <p class="hero-section__description">
          以一次红色场馆实践为线索，串联地方资源、党史人物、思想启蒙与青年感悟，
          用专题阅读式网页讲述一段可感、可学、可传播的历史脉络。
        </p>

        <div class="hero-section__actions">
          <button type="button" class="button button--primary" @click="emit('navigate', 'section-01')">
            开始阅读
          </button>
          <button type="button" class="button button--ghost" @click="emit('navigate', 'section-03')">
            查看实践材料
          </button>
        </div>
      </div>

      <div class="hero-section__visual">
        <div class="hero-panel hero-panel--primary">
          <span class="hero-panel__meta">专题说明</span>
          <h2>从地方红色资源切入，重建一条更贴近青年的阅读路径</h2>
          <p>
            页面以专题文章的方式组织实践材料、人物故事和理论联系，尽量减少表演式装饰，让内容本身形成阅读节奏。
          </p>
        </div>

        <div class="hero-panel hero-panel--secondary">
          <div class="hero-panel__paper"></div>
          <p>独秀园</p>
          <span>场馆线索 / 文献线索 / 青年视角</span>
        </div>
      </div>
    </div>

    <div class="hero-section__overview">
      <article v-for="item in overviewItems" :key="item.label" class="hero-overview-card">
        <p>{{ item.label }}</p>
        <strong>{{ item.value }}</strong>
      </article>
    </div>
  </section>
</template>
