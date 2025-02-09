'use client'
import React, { MouseEvent, useEffect, useRef, useState } from 'react'

import Flex from '@/components/Flex'

import { NAVBAR_HEIGHT } from '@/components/Layout/navbar.css'

import * as style from './index.css'
import { HEADERS_OF_CONTENTS, HeadersOfContents, setTOCId } from './_shared'

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: `-${NAVBAR_HEIGHT}px`,
}

interface Props {
  direction: 'top' | 'right'
}
const TableOfContents = ({ direction }: Props) => {
  const [headingElements, setHeadingElements] = useState<Element[]>([])
  const [isHighlightId, setisHighlightId] = useState<string>('')
  const entriesRef = useRef<Record<string, IntersectionObserverEntry>>({})

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entriesRef.current[entry.target.id] = entry
      })

      const isHighlightEntry = Object.values(entriesRef.current).find(
        (entry) => entry.isIntersecting
      )

      if (isHighlightEntry) setisHighlightId(isHighlightEntry.target.id)
    }, OBSERVER_OPTIONS)

    const headingElements = Array.from(
      document.querySelectorAll(HEADERS_OF_CONTENTS.join(','))
    )
    setTOCId(headingElements)
    setHeadingElements(headingElements)

    headingElements.forEach((header) => {
      observer.observe(header)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToTargetHeading = (event: MouseEvent<HTMLLIElement>) => {
    const target = headingElements.find(
      (heading) => heading.id === event.currentTarget.id
    )

    if (target?.getBoundingClientRect().top) {
      window.scrollTo({
        top:
          target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT,
      })
    }
  }

  if (!headingElements.length) <></>

  return (
    <aside className={style.asideRecipe({ direction })}>
      <div className={style.tocBoxRecipe({ direction })}>
        <Flex as="ol" direction="column">
          {headingElements.map((heading) => (
            <li
              key={heading.id}
              id={heading.id}
              className={style.liRecipe({
                highlight: heading.id === isHighlightId,
                headerType: heading.localName as HeadersOfContents,
              })}
              onClick={scrollToTargetHeading}
            >
              {heading.textContent}
            </li>
          ))}
        </Flex>
      </div>
    </aside>
  )
}

export default TableOfContents
