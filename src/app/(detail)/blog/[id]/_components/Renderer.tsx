'use client'

import React, { ComponentProps } from 'react'
import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import Outlink from '@/app/(detail)/blog/[id]/_components/PostTemplate/Outlink'
import Callout from './PostTemplate/Callout'

const Code = dynamic(
  () => import('@/app/(detail)/blog/[id]/_components/PostTemplate/Code'),
  { ssr: false }
)

interface Props {
  post: ComponentProps<typeof NotionRenderer>['recordMap']
}
function Renderer({ post }: Props) {
  return (
    <NotionRenderer
      recordMap={post}
      showTableOfContents={false}
      components={{
        Code: Code,
        nextImage: Image,
        Link: Outlink,
        nextLink: Link,
        Callout: Callout,
        Collection: () => <></>,
        Equation: () => <></>,
      }}
    />
  )
}

export default Renderer
