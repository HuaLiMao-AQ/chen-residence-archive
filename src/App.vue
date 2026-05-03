<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import BackToTop from './components/BackToTop.vue'
import HeroSection from './components/HeroSection.vue'
import ReadingProgress from './components/ReadingProgress.vue'
import SectionBlock from './components/SectionBlock.vue'
import TimelineSidebar from './components/TimelineSidebar.vue'
import { navItems, sections } from './data/sections'

const activeSection = ref(sections[0].id)
const visibleSections = ref<string[]>([])
const readSections = computed(() => {
  const activeIndex = sections.findIndex((section) => section.id === activeSection.value)
  if (activeIndex < 0) return []
  return sections.slice(0, activeIndex + 1).map((section) => section.id)
})

const sectionElements = new Map<string, HTMLElement>()
let observer: IntersectionObserver | null = null

const registerSection = (id: string, element: Element | null) => {
  if (!(element instanceof HTMLElement)) {
    sectionElements.delete(id)
    return
  }
  sectionElements.set(id, element)
}

const scrollToSection = (id: string) => {
  const target = sectionElements.get(id)
  if (!target) return

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const activeNav = computed(() => {
  const section = sections.find((item) => item.id === activeSection.value)
  return section?.navGroup ?? 'home'
})

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const intersectingEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)

      if (intersectingEntries.length > 0) {
        const currentId = intersectingEntries[0].target.getAttribute('id')
        if (currentId) {
          activeSection.value = currentId
        }
      }

      visibleSections.value = Array.from(sectionElements.entries())
        .filter(([, element]) => {
          const rect = element.getBoundingClientRect()
          return rect.top < window.innerHeight * 0.9
        })
        .map(([id]) => id)
    },
    {
      rootMargin: '-20% 0px -45% 0px',
      threshold: [0.2, 0.35, 0.55, 0.75],
    },
  )

  sectionElements.forEach((element) => observer?.observe(element))
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="app-shell">
    <ReadingProgress />
    <AppHeader :items="navItems" :active-key="activeNav" @navigate="scrollToSection" />

    <main>
      <HeroSection @navigate="scrollToSection" />

      <section class="content-shell" aria-label="实践内容主体">
        <div class="content-grid">
          <TimelineSidebar
            :sections="sections"
            :active-section="activeSection"
            :read-sections="readSections"
            @select="scrollToSection"
          />

          <div class="article-column">
            <SectionBlock
              v-for="section in sections"
              :key="section.id"
              :section="section"
              :visible="visibleSections.includes(section.id)"
              :set-section-ref="(element) => registerSection(section.id, element)"
            />
          </div>
        </div>
      </section>
    </main>

    <BackToTop />
  </div>
</template>
