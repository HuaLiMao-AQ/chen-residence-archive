<script setup lang="ts">
import type { SectionData } from '../data/sections'

defineProps<{
  sections: SectionData[]
  activeId: string
  readIds: string[]
}>()

const emit = defineEmits<{
  select: [targetId: string]
}>()
</script>

<template>
  <aside class="issue-directory">
    <div class="directory-box">
      <div class="directory-box__head">
        <span>本期目录</span>
        <p>Contents</p>
      </div>

      <button
        v-for="section in sections"
        :key="section.id"
        type="button"
        class="directory-item"
        :class="{
          'is-active': activeId === section.id,
          'is-read': readIds.includes(section.id),
        }"
        @click="emit('select', section.id)"
      >
        <span class="directory-item__ordinal">{{ section.ordinal }}</span>
        <span class="directory-item__text">
          <strong>{{ section.menuTitle }}</strong>
          <small>{{ section.menuSubtitle }}</small>
        </span>
      </button>
    </div>
  </aside>
</template>
