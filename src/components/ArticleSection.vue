<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { SectionData } from '../data/sections'
import AppendixContent from './AppendixContent.vue'
import ArchiveNote from './ArchiveNote.vue'
import EditorNote from './EditorNote.vue'
import PhotoArchiveCard from './PhotoArchiveCard.vue'
import SourceBox from './SourceBox.vue'

const props = defineProps<{
  section: SectionData
  visible: boolean
  setSectionRef: (element: Element | null) => void
}>()

const handleRef = (value: Element | ComponentPublicInstance | null) => {
  props.setSectionRef(value instanceof Element ? value : null)
}
</script>

<template>
  <section
    :id="section.id"
    :ref="handleRef"
    class="article-section"
    :class="{ 'is-visible': visible }"
  >
    <header class="article-section__header">
      <div class="article-section__ordinal">{{ section.ordinal }}</div>
      <div class="article-section__heading">
        <p v-if="section.intro" class="article-section__intro">{{ section.intro }}</p>
        <h2>{{ section.title }}</h2>
        <p class="article-section__dek">{{ section.dek }}</p>
      </div>
    </header>

    <div v-if="section.lead" class="article-section__lead">
      {{ section.lead }}
    </div>

    <div class="article-section__body">
      <p v-for="paragraph in section.paragraphs" :key="paragraph">
        {{ paragraph }}
      </p>
    </div>

    <div v-if="section.photos?.length" class="photo-sheet">
      <PhotoArchiveCard
        v-for="photo in section.photos"
        :key="photo.code"
        :photo="photo"
      />
    </div>

    <div v-if="section.archiveCards?.length" class="archive-grid">
      <ArchiveNote
        v-for="card in section.archiveCards"
        :key="card.code"
        :card="card"
      />
    </div>

    <div v-if="section.analysisColumns?.length" class="analysis-columns">
      <article v-for="column in section.analysisColumns" :key="column.title" class="analysis-column">
        <h3>{{ column.title }}</h3>
        <p>{{ column.text }}</p>
      </article>
    </div>

    <div v-if="section.editorNote || section.youthComment" class="margin-notes">
      <EditorNote
        v-if="section.editorNote"
        :label="section.editorNote.label"
        :text="section.editorNote.text"
      />
      <EditorNote
        v-if="section.youthComment"
        label="青年短评"
        :title="section.youthComment.title"
        :text="section.youthComment.text"
      />
    </div>

    <SourceBox title="资料来源栏" :items="section.sources" />

    <AppendixContent
      v-if="section.timeline || section.references || section.discussionNotes"
      :timeline="section.timeline"
      :references="section.references"
      :discussion-notes="section.discussionNotes"
    />
  </section>
</template>
