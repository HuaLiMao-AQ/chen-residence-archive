<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const visible = ref(false)

const handleScroll = () => {
  visible.value = window.scrollY > 520
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button
    type="button"
    class="back-to-top"
    :class="{ 'is-visible': visible }"
    @click="scrollToTop"
  >
    回页首
  </button>
</template>
