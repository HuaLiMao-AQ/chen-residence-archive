<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import ArticleSection from './components/ArticleSection.vue'
import BackToTop from './components/BackToTop.vue'
import IssueDirectory from './components/IssueDirectory.vue'
import NewYouthHeader from './components/NewYouthHeader.vue'
import NewspaperHero from './components/NewspaperHero.vue'
import ReadingProgress from './components/ReadingProgress.vue'
import SourceBox from './components/SourceBox.vue'
import { footerSources, issueMeta, sections } from './data/sections'
import {
  getActiveSectionId,
  getReadSectionIds,
  getReadingCompletion,
  type SectionMeasurement,
} from './utils/readingNavigation'

const activeSection = ref(sections[0].id)
const readSectionIds = ref<string[]>([])
const readingProgress = ref(0)
const heroInView = ref(true)
const compactDirectoryMode = ref(false)
const portraitBreadcrumbMode = ref(false)
const visibleSections = ref<string[]>([])
const paperArticle = ref<HTMLElement | null>(null)
const sectionElements = new Map<string, HTMLElement>()

let sectionObserver: IntersectionObserver | null = null
let heroObserver: IntersectionObserver | null = null
let resizeObserver: ResizeObserver | null = null
let scrollFrame = 0
let compactMediaQuery: MediaQueryList | null = null
let portraitMediaQuery: MediaQueryList | null = null
let updateCompactDirectoryMode: (() => void) | null = null
let updatePortraitBreadcrumbMode: (() => void) | null = null

const currentSection = computed(
  () => sections.find((section) => section.id === activeSection.value) ?? sections[0],
)

const breadcrumbLabel = computed(() =>
  heroInView.value ? '专刊首页' : currentSection.value.menuTitle,
)

const directoryActiveId = computed(() => {
  if (compactDirectoryMode.value || heroInView.value) return ''
  return activeSection.value
})

const registerSection = (id: string, element: Element | null) => {
  if (!(element instanceof HTMLElement)) {
    const previousElement = sectionElements.get(id)
    if (previousElement) {
      sectionObserver?.unobserve(previousElement)
      resizeObserver?.unobserve(previousElement)
    }
    sectionElements.delete(id)
    return
  }

  sectionElements.set(id, element)
  sectionObserver?.observe(element)
  resizeObserver?.observe(element)
}

const scrollToSection = (id: string) => {
  const target = id === 'hero' ? document.getElementById('hero') : sectionElements.get(id)
  if (!target) return

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const getStickyOffset = () => {
  const mastheadHeight = document.querySelector<HTMLElement>('.masthead')?.offsetHeight ?? 0
  const directoryHeight =
    window.matchMedia('(max-width: 1180px)').matches
      ? (document.querySelector<HTMLElement>('.issue-directory')?.offsetHeight ?? 0)
      : 0

  return mastheadHeight + directoryHeight + 16
}

const getSectionMeasurements = (): SectionMeasurement[] =>
  sections
    .map((section) => {
      const element = sectionElements.get(section.id)
      if (!element) return null

      return {
        id: section.id,
        top: window.scrollY + element.getBoundingClientRect().top,
        height: element.offsetHeight,
      }
    })
    .filter((section): section is SectionMeasurement => section !== null)

const updateReadingState = () => {
  scrollFrame = 0

  const sectionMeasurements = getSectionMeasurements()
  if (!sectionMeasurements.length) return

  const stickyOffset = getStickyOffset()
  activeSection.value = getActiveSectionId({
    sections: sectionMeasurements,
    scrollY: window.scrollY,
    viewportHeight: window.innerHeight,
    stickyOffset,
  })
  readSectionIds.value = getReadSectionIds({
    sections: sectionMeasurements,
    scrollY: window.scrollY,
    viewportHeight: window.innerHeight,
    stickyOffset,
  })

  if (paperArticle.value) {
    const articleTop = window.scrollY + paperArticle.value.getBoundingClientRect().top
    readingProgress.value = getReadingCompletion({
      articleTop,
      articleHeight: paperArticle.value.offsetHeight,
      scrollY: window.scrollY,
      viewportHeight: window.innerHeight,
    })
  }
}

const scheduleReadingState = () => {
  if (scrollFrame) return
  scrollFrame = window.requestAnimationFrame(updateReadingState)
}

onMounted(() => {
  compactMediaQuery = window.matchMedia('(max-width: 1180px)')
  updateCompactDirectoryMode = () => {
    compactDirectoryMode.value = compactMediaQuery?.matches ?? false
  }

  portraitMediaQuery = window.matchMedia('(max-width: 1180px) and (orientation: portrait)')
  updatePortraitBreadcrumbMode = () => {
    portraitBreadcrumbMode.value = portraitMediaQuery?.matches ?? false
  }

  updateCompactDirectoryMode()
  updatePortraitBreadcrumbMode()
  compactMediaQuery.addEventListener('change', updateCompactDirectoryMode)
  portraitMediaQuery.addEventListener('change', updatePortraitBreadcrumbMode)

  sectionObserver = new IntersectionObserver(
    () => {
      visibleSections.value = Array.from(sectionElements.entries())
        .filter(([, element]) => {
          const rect = element.getBoundingClientRect()
          return rect.top < window.innerHeight * 0.92
        })
        .map(([id]) => id)
    },
    {
      rootMargin: '-18% 0px -45% 0px',
      threshold: [0.2, 0.4, 0.55],
    },
  )

  resizeObserver = new ResizeObserver(() => {
    scheduleReadingState()
  })

  sectionElements.forEach((element) => {
    sectionObserver?.observe(element)
    resizeObserver?.observe(element)
  })

  if (paperArticle.value) {
    resizeObserver.observe(paperArticle.value)
  }

  const heroElement = document.getElementById('hero')
  if (heroElement) {
    heroObserver = new IntersectionObserver(
      (entries) => {
        heroInView.value = entries[0]?.isIntersecting ?? false
      },
      {
        threshold: 0.35,
      },
    )

    heroObserver.observe(heroElement)
  }

  updateReadingState()
  window.addEventListener('scroll', scheduleReadingState, { passive: true })
  window.addEventListener('resize', scheduleReadingState)
  window.addEventListener('load', scheduleReadingState)

  nextTick(() => {
    scheduleReadingState()
  })
})

onBeforeUnmount(() => {
  sectionObserver?.disconnect()
  heroObserver?.disconnect()
  resizeObserver?.disconnect()
  if (compactMediaQuery && updateCompactDirectoryMode) {
    compactMediaQuery.removeEventListener('change', updateCompactDirectoryMode)
  }
  if (portraitMediaQuery && updatePortraitBreadcrumbMode) {
    portraitMediaQuery.removeEventListener('change', updatePortraitBreadcrumbMode)
  }
  window.removeEventListener('scroll', scheduleReadingState)
  window.removeEventListener('resize', scheduleReadingState)
  window.removeEventListener('load', scheduleReadingState)
  if (scrollFrame) {
    window.cancelAnimationFrame(scrollFrame)
  }
})
</script>

<template>
  <div class="app-shell">
    <ReadingProgress :progress="readingProgress" />
    <NewYouthHeader
      :meta="issueMeta"
      :breadcrumb="portraitBreadcrumbMode ? breadcrumbLabel : ''"
      @navigate-home="scrollToSection('hero')"
    />

    <main class="paper-layout">
      <NewspaperHero :meta="issueMeta" @navigate="scrollToSection" />

      <section class="paper-body" aria-label="数字报刊正文">
        <IssueDirectory
          :sections="sections"
          :active-id="directoryActiveId"
          :read-ids="readSectionIds"
          @select="scrollToSection"
        />

        <div ref="paperArticle" class="paper-article">
          <ArticleSection
            v-for="section in sections"
            :key="section.id"
            :section="section"
            :visible="visibleSections.includes(section.id)"
            :set-section-ref="(element) => registerSection(section.id, element)"
          />

          <footer class="paper-footer">
            <SourceBox title="资料来源说明" :items="footerSources" />
          </footer>
        </div>
      </section>
    </main>

    <BackToTop />
  </div>
</template>
