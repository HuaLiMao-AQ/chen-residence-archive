import test from 'node:test'
import assert from 'node:assert/strict'

import {
  getActiveSectionId,
  getReadSectionIds,
  getReadingCompletion,
  type SectionMeasurement,
} from '../src/utils/readingNavigation.ts'

const sections: SectionMeasurement[] = [
  { id: 'section-01', top: 240, height: 500 },
  { id: 'section-02', top: 820, height: 680 },
  { id: 'section-03', top: 1600, height: 720 },
]

test('marks the first section active when the reading anchor is still near the top', () => {
  assert.equal(
    getActiveSectionId({
      sections,
      scrollY: 0,
      viewportHeight: 900,
      stickyOffset: 88,
    }),
    'section-01',
  )
})

test('switches the active section when the reading anchor passes into the next section', () => {
  assert.equal(
    getActiveSectionId({
      sections,
      scrollY: 760,
      viewportHeight: 900,
      stickyOffset: 88,
    }),
    'section-02',
  )
})

test('returns read sections based on section bottoms instead of active index guesses', () => {
  assert.deepEqual(
    getReadSectionIds({
      sections,
      scrollY: 1500,
      viewportHeight: 900,
      stickyOffset: 88,
    }),
    ['section-01', 'section-02'],
  )
})

test('computes reading completion from article start to article end', () => {
  assert.equal(
    getReadingCompletion({
      articleTop: 160,
      articleHeight: 2300,
      scrollY: 1310,
      viewportHeight: 900,
    }),
    70,
  )
})
