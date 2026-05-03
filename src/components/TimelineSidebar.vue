<script setup lang="ts">
import TimelineItem from './TimelineItem.vue'
import type { SectionData } from '../data/sections'

defineProps<{
  sections: SectionData[]
  activeSection: string
  readSections: string[]
}>()

const emit = defineEmits<{
  select: [targetId: string]
}>()
</script>

<template>
  <aside class="timeline-shell" aria-label="章节时间轴导航">
    <div class="timeline-card">
      <div class="timeline-card__head">
        <p>实践故事轴</p>
        <span>滚动阅读时自动定位当前章节</span>
      </div>

      <div class="timeline-list">
        <TimelineItem
          v-for="section in sections"
          :key="section.id"
          :section="section"
          :active="section.id === activeSection"
          :read="readSections.includes(section.id)"
          @select="emit('select', $event)"
        />
      </div>
    </div>
  </aside>
</template>
