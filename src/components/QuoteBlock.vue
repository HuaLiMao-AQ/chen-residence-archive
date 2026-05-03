<script setup lang="ts">
defineProps<{
  title: string
  text: string
  source?: string
}>()
</script>

<template>
  <blockquote class="quote-block">
    <p class="quote-block__title">{{ title }}</p>
    <p class="quote-block__text">{{ text }}</p>
    <footer v-if="source" class="quote-block__source">{{ source }}</footer>
  </blockquote>
</template>
