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
      <img
        v-if="photo.imageSrc"
        class="photo-archive-card__media"
        :src="photo.imageSrc"
        :alt="photo.imageAlt ?? photo.subject"
        loading="lazy"
        referrerpolicy="no-referrer"
      />
      <div class="photo-archive-card__grain"></div>
      <p v-if="!photo.imageSrc">待替换为小组实地拍摄照片</p>
    </div>
    <div class="photo-archive-card__caption">
      <div class="photo-archive-card__header">
        <strong>{{ photo.code }}</strong>
        <span class="photo-archive-card__subject">{{ photo.subject }}</span>
      </div>
      <p class="photo-archive-card__note">{{ photo.note }}</p>
      <div v-if="photo.sourceUrl || photo.credit || photo.license" class="photo-archive-card__source">
        <a
          v-if="photo.sourceUrl"
          :href="photo.sourceUrl"
          target="_blank"
          rel="noreferrer"
        >
          {{ photo.sourceLabel ?? '查看来源' }}
        </a>
        <span v-if="photo.credit">{{ photo.credit }}</span>
        <span v-if="photo.license">{{ photo.license }}</span>
      </div>
    </div>
  </article>
</template>
