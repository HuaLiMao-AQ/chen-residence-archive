<script setup lang="ts">
import { nextTick, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type { SectionData } from '../data/sections'

const props = defineProps<{
  sections: SectionData[]
  activeId: string
  readIds: string[]
}>()

const emit = defineEmits<{
  select: [targetId: string]
}>()

const itemElements = new Map<string, HTMLElement>()

const setItemRef = (id: string, element: Element | null) => {
  if (!(element instanceof HTMLElement)) {
    itemElements.delete(id)
    return
  }

  itemElements.set(id, element)
}

const handleItemRef = (id: string, value: Element | ComponentPublicInstance | null) => {
  setItemRef(id, value instanceof Element ? value : null)
}

watch(
  () => props.activeId,
  async (activeId) => {
    if (!activeId || !window.matchMedia('(max-width: 1180px)').matches) return

    await nextTick()
    itemElements.get(activeId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  },
)
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
        :ref="(element) => handleItemRef(section.id, element)"
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
