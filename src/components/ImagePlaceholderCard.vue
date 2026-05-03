<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    caption: string
    variant?: 'wide' | 'tall' | 'standard'
  }>(),
  {
    variant: 'standard',
  },
)
</script>

<template>
  <article class="image-placeholder-card" :class="`is-${variant}`">
    <div class="image-placeholder-card__visual">
      <div class="image-placeholder-card__stamp">实地材料占位</div>
      <div class="image-placeholder-card__lines">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>待替换为小组实地拍摄照片</p>
    </div>
    <div class="image-placeholder-card__caption">
      <strong>{{ title }}</strong>
      <span>{{ caption }}</span>
    </div>
  </article>
</template>
