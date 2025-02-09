export const HEADERS_OF_CONTENTS = ['h2', 'h3', 'h4'] as const

export const TOC_WIDTH_IN_PC = 280

export type HeadersOfContents = typeof HEADERS_OF_CONTENTS[number]

export const setTOCId = (headingElements: Element[]) => {
  let h2Count = 0
  let h3Count = 0
  let h4Count = 0

  headingElements.forEach((header) => {
    if (!isHeadersOfContents(header.localName)) return

    if (header.localName === 'h2') {
      h2Count++
      h3Count = 0
      h4Count = 0
    } else if (header.localName === 'h3') {
      h3Count++
      h4Count = 0
    } else {
      h4Count++
    }

    header.id = getTOCId({
      headerText: `${header.textContent}`,
      headerType: header.localName,
      h2Count,
      h3Count,
      h4Count,
    })
  })
}

const isHeadersOfContents = (
  headerName: string
): headerName is HeadersOfContents => {
  return HEADERS_OF_CONTENTS.includes(headerName as HeadersOfContents)
}

type Params = {
  headerText: string
  h2Count: number
  h3Count: number
  h4Count: number
  headerType: HeadersOfContents
}

const getTOCId = ({
  headerText,
  headerType,
  h2Count,
  h3Count,
  h4Count,
}: Params) => {
  let group

  switch (headerType) {
    case 'h2':
      group = h2Count
      break
    case 'h3':
      group = `${h2Count}_${h3Count}`
      break

    default:
    case 'h4':
      group = `${h2Count}_${h3Count}_${h4Count}`
      break
  }

  return `${group}-${headerText.replace(/ /g, '_')}`
}
