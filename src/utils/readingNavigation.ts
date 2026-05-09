export type SectionMeasurement = {
  id: string
  top: number
  height: number
}

type ActiveSectionInput = {
  sections: SectionMeasurement[]
  scrollY: number
  viewportHeight: number
  stickyOffset: number
}

type ReadingCompletionInput = {
  articleTop: number
  articleHeight: number
  scrollY: number
  viewportHeight: number
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const getAnchorY = ({ scrollY, viewportHeight, stickyOffset }: ActiveSectionInput) =>
  scrollY + stickyOffset + Math.max(viewportHeight - stickyOffset, 0) * 0.2

const getReadY = ({ scrollY, viewportHeight, stickyOffset }: ActiveSectionInput) =>
  scrollY + stickyOffset + Math.max(viewportHeight - stickyOffset, 0) * 0.45

export const getActiveSectionId = ({
  sections,
  scrollY,
  viewportHeight,
  stickyOffset,
}: ActiveSectionInput) => {
  if (!sections.length) return ''

  const anchorY = getAnchorY({ sections, scrollY, viewportHeight, stickyOffset })
  let activeId = sections[0].id

  for (const section of sections) {
    if (anchorY >= section.top) {
      activeId = section.id
      continue
    }

    break
  }

  return activeId
}

export const getReadSectionIds = ({
  sections,
  scrollY,
  viewportHeight,
  stickyOffset,
}: ActiveSectionInput) => {
  const readY = getReadY({ sections, scrollY, viewportHeight, stickyOffset })

  return sections
    .filter((section) => section.top + section.height <= readY)
    .map((section) => section.id)
}

export const getReadingCompletion = ({
  articleTop,
  articleHeight,
  scrollY,
  viewportHeight,
}: ReadingCompletionInput) => {
  if (articleHeight <= 0) return 0

  const anchorY = scrollY + viewportHeight * 0.5
  const traversed = anchorY - articleTop
  const ratio = traversed / articleHeight

  return Math.round(clamp(ratio, 0, 1) * 100)
}
