<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import ArticleSection from './components/ArticleSection.vue'
import BackToTop from './components/BackToTop.vue'
import IssueDirectory from './components/IssueDirectory.vue'
import NewYouthHeader from './components/NewYouthHeader.vue'
import NewspaperHero from './components/NewspaperHero.vue'
import ReadingProgress from './components/ReadingProgress.vue'
import SourceBox from './components/SourceBox.vue'
import { footerSources, issueMeta, sections, technicalNotes, workDivision } from './data/sections'

const activeSection = ref(sections[0].id)
const heroInView = ref(true)
const visibleSections = ref<string[]>([])
const sectionElements = new Map<string, HTMLElement>()

let sectionObserver: IntersectionObserver | null = null
let heroObserver: IntersectionObserver | null = null

const registerSection = (id: string, element: Element | null) => {
  if (!(element instanceof HTMLElement)) {
    sectionElements.delete(id)
    return
  }

  sectionElements.set(id, element)
}

const scrollToSection = (id: string) => {
  const target = id === 'hero' ? document.getElementById('hero') : sectionElements.get(id)
  if (!target) return

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const directoryReadIds = computed(() => {
  const activeIndex = sections.findIndex((section) => section.id === activeSection.value)
  if (activeIndex < 0) return []
  return sections.slice(0, activeIndex).map((section) => section.id)
})

onMounted(() => {
  sectionObserver = new IntersectionObserver(
    (entries) => {
      const intersecting = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => right.intersectionRatio - left.intersectionRatio)

      const topEntry = intersecting[0]
      const currentId = topEntry?.target.getAttribute('id')
      if (currentId) {
        activeSection.value = currentId
      }

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

  sectionElements.forEach((element) => sectionObserver?.observe(element))

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
})

onBeforeUnmount(() => {
  sectionObserver?.disconnect()
  heroObserver?.disconnect()
})
</script>

<template>
  <div class="app-shell">
    <ReadingProgress />
    <NewYouthHeader :meta="issueMeta" @navigate-home="scrollToSection('hero')" />

    <main class="paper-layout">
      <NewspaperHero :meta="issueMeta" @navigate="scrollToSection" />

      <section class="paper-body" aria-label="数字报刊正文">
        <IssueDirectory
          :sections="sections"
          :active-id="heroInView ? '' : activeSection"
          :read-ids="directoryReadIds"
          @select="scrollToSection"
        />

        <div class="paper-article">
          <ArticleSection
            v-for="section in sections"
            :key="section.id"
            :section="section"
            :visible="visibleSections.includes(section.id)"
            :set-section-ref="(element) => registerSection(section.id, element)"
          />

          <footer class="paper-footer">
            <div class="footer-grid">
              <SourceBox title="资料来源说明" :items="footerSources" />

              <section class="footer-column">
                <div class="footer-column__header">
                  <span>小组分工栏</span>
                  <h2>实践协作记录</h2>
                </div>
                <ul class="work-list">
                  <li v-for="item in workDivision" :key="item.role">
                    <strong>{{ item.role }}</strong>
                    <span>{{ item.detail }}</span>
                  </li>
                </ul>
              </section>
            </div>

            <section class="tech-note">
              <div class="footer-column__header">
                <span>项目技术说明</span>
                <h2>实现与成果</h2>
              </div>
              <p v-for="note in technicalNotes" :key="note">
                {{ note }}
              </p>
            </section>
          </footer>
        </div>
      </section>
    </main>

    <BackToTop />
  </div>
</template>
