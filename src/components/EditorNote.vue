<script setup lang="ts">
defineProps<{
  label: string
  text: string
  title?: string
}>()
</script>

<template>
  <aside class="editor-note">
    <span class="editor-note__label">{{ label }}</span>
    <h3 v-if="title">{{ title }}</h3>
    <p>{{ text }}</p>
  </aside>
</template>
