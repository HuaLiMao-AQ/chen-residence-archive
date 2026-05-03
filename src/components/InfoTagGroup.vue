<script setup lang="ts">
defineProps<{
  tags: string[]
}>()
</script>

<template>
  <div class="info-tag-group" aria-label="关键词标签">
    <span v-for="tag in tags" :key="tag" class="info-tag-group__tag">
      {{ tag }}
    </span>
  </div>
</template>
