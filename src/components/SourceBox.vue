<script setup lang="ts">
defineProps<{
  title: string
  items: string[]
}>()
</script>

<template>
  <section class="source-box">
    <div class="source-box__head">
      <span>{{ title }}</span>
    </div>
    <ul>
      <li v-for="item in items" :key="item">
        {{ item }}
      </li>
    </ul>
  </section>
</template>
