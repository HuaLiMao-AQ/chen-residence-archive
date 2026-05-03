<script setup lang="ts">
defineProps<{
  meta: {
    title: string
    mastheadCenter: string
    mastheadRight: string
  }
}>()

const emit = defineEmits<{
  navigateHome: []
}>()
</script>

<template>
  <header class="masthead">
    <div class="masthead__row">
      <button class="masthead__title" type="button" @click="emit('navigateHome')">
        {{ meta.title }}
      </button>
      <p class="masthead__center">{{ meta.mastheadCenter }}</p>
      <p class="masthead__right">{{ meta.mastheadRight }}</p>
    </div>
  </header>
</template>
