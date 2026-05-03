<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const progress = ref(0)

const updateProgress = () => {
  const scrollTop = window.scrollY
  const viewportHeight = window.innerHeight
  const scrollable = document.documentElement.scrollHeight - viewportHeight
  progress.value = scrollable <= 0 ? 0 : Math.min((scrollTop / scrollable) * 100, 100)
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>

<template>
  <div class="reading-progress" aria-hidden="true">
    <span class="reading-progress__bar" :style="{ width: `${progress}%` }"></span>
  </div>
</template>
