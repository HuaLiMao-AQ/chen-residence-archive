<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import ImagePlaceholderCard from './ImagePlaceholderCard.vue'
import InfoTagGroup from './InfoTagGroup.vue'
import QuoteBlock from './QuoteBlock.vue'
import SummaryCard from './SummaryCard.vue'
import type { SectionData } from '../data/sections'

const props = defineProps<{
  section: SectionData
  visible: boolean
  setSectionRef: (element: Element | null) => void
}>()

const blockId = props.section.id

const handleRef = (value: Element | ComponentPublicInstance | null) => {
  props.setSectionRef(value instanceof Element ? value : null)
}
</script>

<template>
  <section
    :id="blockId"
    :ref="handleRef"
    class="section-block"
    :class="{ 'is-visible': visible }"
  >
    <div class="section-block__frame">
      <header class="section-block__header">
        <div class="section-block__number">{{ section.number }}</div>
        <div class="section-block__title-group">
          <p class="section-block__kicker">{{ section.kicker }}</p>
          <h2>{{ section.title }}</h2>
          <p class="section-block__summary">{{ section.summary }}</p>
        </div>
      </header>

      <InfoTagGroup :tags="section.tags" />

      <div class="section-block__body">
        <p v-for="paragraph in section.paragraphs" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>

      <div v-if="section.quote" class="section-block__quote">
        <QuoteBlock :title="section.quote.title" :text="section.quote.text" :source="section.quote.source" />
      </div>

      <div v-if="section.analysisCards?.length" class="section-block__analysis">
        <article v-for="card in section.analysisCards" :key="card.title" class="analysis-card">
          <p>{{ card.eyebrow }}</p>
          <h3>{{ card.title }}</h3>
          <span>{{ card.text }}</span>
        </article>
      </div>

      <div class="section-block__media-grid" :class="`layout-${section.images.length}`">
        <ImagePlaceholderCard
          v-for="image in section.images"
          :key="image.title"
          :title="image.title"
          :caption="image.caption"
          :variant="image.variant"
        />
      </div>

      <div v-if="section.materialCards?.length" class="section-block__materials">
        <article v-for="card in section.materialCards" :key="card.title" class="material-card">
          <p class="material-card__type">{{ card.type }}</p>
          <h3>{{ card.title }}</h3>
          <p>{{ card.text }}</p>
        </article>
      </div>

      <div v-if="section.outcomeCards?.length" class="section-block__outcomes">
        <article v-for="card in section.outcomeCards" :key="card.title" class="outcome-card">
          <span class="outcome-card__icon">{{ card.icon }}</span>
          <h3>{{ card.title }}</h3>
          <p>{{ card.text }}</p>
        </article>
      </div>

      <SummaryCard :title="section.summaryCard.title" :text="section.summaryCard.text" />

      <footer class="section-block__footer">
        <span>资料来源说明</span>
        <p>{{ section.sourceNote }}</p>
      </footer>
    </div>
  </section>
</template>
