<script setup lang="ts">
defineProps<{
  items: Array<{
    key: string
    label: string
    targetId: string
  }>
  activeKey: string
}>()

const emit = defineEmits<{
  navigate: [targetId: string]
}>()
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <button class="app-header__brand" type="button" @click="emit('navigate', 'hero')">
        <span class="app-header__brand-mark">Red Memory</span>
        <span class="app-header__brand-name">红色记忆轴</span>
      </button>

      <nav class="app-header__nav" aria-label="页面导航">
        <button
          v-for="item in items"
          :key="item.key"
          type="button"
          class="app-header__link"
          :class="{ 'is-active': activeKey === item.key }"
          @click="emit('navigate', item.targetId)"
        >
          {{ item.label }}
        </button>
      </nav>
    </div>
  </header>
</template>
