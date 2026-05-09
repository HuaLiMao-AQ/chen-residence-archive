<script setup lang="ts">
defineProps<{
  progress: number
}>()
</script>

<template>
  <div class="reading-progress" aria-hidden="true">
    <span class="reading-progress__bar" :style="{ width: `${progress}%` }"></span>
  </div>
</template>
