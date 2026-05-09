<script setup lang="ts">
import type { ArchiveCard } from '../data/sections'

defineProps<{
  card: ArchiveCard
}>()
</script>

<template>
  <article class="archive-note">
    <div class="archive-note__meta">
      <span>{{ card.code }}</span>
      <strong v-if="card.status">{{ card.status }}</strong>
    </div>
    <div class="archive-note__body">
      <h3>{{ card.title }}</h3>
      <p class="archive-note__source">来源：{{ card.source }}</p>
      <p class="archive-note__content">{{ card.content }}</p>
    </div>
  </article>
</template>
