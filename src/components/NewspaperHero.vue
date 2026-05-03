<script setup lang="ts">
defineProps<{
  meta: {
    title: string
    subtitle: string
    english: string
    publicationInfo: string[]
    abstract: string
  }
}>()

const emit = defineEmits<{
  navigate: [targetId: string]
}>()
</script>

<template>
  <section id="hero" class="front-page">
    <div class="front-page__topline">
      <span>实践调研号</span>
      <span>安庆独秀园实践记录</span>
      <span>{{ meta.english }}</span>
    </div>

    <div class="front-page__headline">
      <div>
        <p class="front-page__english">{{ meta.english }}</p>
        <h1>{{ meta.title }}</h1>
        <h2>{{ meta.subtitle }}</h2>
      </div>
      <div class="front-page__seal">实践专刊</div>
    </div>

    <div class="front-page__meta">
      <p v-for="item in meta.publicationInfo" :key="item">
        {{ item }}
      </p>
    </div>

    <div class="front-page__abstract">
      <p>{{ meta.abstract }}</p>
      <div class="front-page__actions">
        <button type="button" class="newspaper-link" @click="emit('navigate', 'section-01')">
          阅读卷首语
        </button>
        <button type="button" class="newspaper-link" @click="emit('navigate', 'section-03')">
          查看实地材料
        </button>
      </div>
    </div>
  </section>
</template>
