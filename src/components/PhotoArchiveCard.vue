<script setup lang="ts">
import type { PhotoCard } from '../data/sections'

defineProps<{
  photo: PhotoCard
}>()
</script>

<template>
  <article class="photo-archive-card" :class="photo.layout ? `is-${photo.layout}` : ''">
    <div class="photo-archive-card__image">
      <span class="photo-archive-card__stamp">{{ photo.status }}</span>
      <div class="photo-archive-card__grain"></div>
      <p>待替换为小组实地拍摄照片</p>
    </div>
    <div class="photo-archive-card__caption">
      <div class="photo-archive-card__line">
        <strong>{{ photo.code }}</strong>
        <span>{{ photo.subject }}</span>
      </div>
      <small>{{ photo.note }}</small>
    </div>
  </article>
</template>
