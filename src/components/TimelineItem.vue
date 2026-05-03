<script setup lang="ts">
import type { SectionData } from '../data/sections'

defineProps<{
  section: SectionData
  active: boolean
  read: boolean
}>()

const emit = defineEmits<{
  select: [targetId: string]
}>()
</script>

<template>
  <button
    type="button"
    class="timeline-item"
    :class="{
      'is-active': active,
      'is-read': read,
    }"
    @click="emit('select', section.id)"
  >
    <span class="timeline-item__line"></span>
    <span class="timeline-item__dot"></span>
    <div class="timeline-item__content">
      <p class="timeline-item__index">{{ section.number }}</p>
      <h3>{{ section.title }}</h3>
      <p class="timeline-item__description">{{ section.navDescription }}</p>
    </div>
  </button>
</template>
