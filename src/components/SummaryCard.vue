<script setup lang="ts">
defineProps<{
  title: string
  text: string
}>()
</script>

<template>
  <article class="summary-card">
    <p>{{ title }}</p>
    <strong>{{ text }}</strong>
  </article>
</template>
