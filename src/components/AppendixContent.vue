<script setup lang="ts">
import type { DiscussionNote, TimelineEntry } from '../data/sections'

defineProps<{
  timeline?: TimelineEntry[]
  references?: string[]
  discussionNotes?: DiscussionNote[]
}>()
</script>

<template>
  <!-- Timeline / 年表 -->
  <div v-if="timeline?.length" class="appendix-timeline">
    <div class="appendix-section-head">
      <span>附录一</span>
      <h3>陈独秀生平年表</h3>
    </div>
    <div class="timeline-track">
      <div v-for="entry in timeline" :key="entry.year" class="timeline-entry">
        <span class="timeline-entry__year">{{ entry.year }}</span>
        <span class="timeline-entry__dot"></span>
        <span class="timeline-entry__text">{{ entry.event }}</span>
      </div>
    </div>
  </div>

  <!-- References / 参考文献 -->
  <div v-if="references?.length" class="appendix-references">
    <div class="appendix-section-head">
      <span>附录二</span>
      <h3>参考文献与资料来源</h3>
    </div>
    <ol class="references-list">
      <li v-for="(ref, index) in references" :key="index" class="references-list__item">
        {{ ref }}
      </li>
    </ol>
  </div>

  <!-- Discussion Notes / 讨论记录 -->
  <div v-if="discussionNotes?.length" class="appendix-discussion">
    <div class="appendix-section-head">
      <span>附录三</span>
      <h3>小组讨论与实践记录</h3>
    </div>
    <div class="discussion-grid">
      <article v-for="note in discussionNotes" :key="note.topic" class="discussion-card">
        <h4 class="discussion-card__topic">{{ note.topic }}</h4>
        <p class="discussion-card__content">{{ note.content }}</p>
      </article>
    </div>
  </div>
</template>
