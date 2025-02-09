import React, { PropsWithChildren } from 'react'

import { PostFrontMatter } from '@/entity/post/type'

import Frame from '@/components/Layout/Frame'
import Flex from '@/components/Flex'

import TableOfContents from './TableOfContents'
import PostHeader from './PostHeader'
import * as style from './postTemplate.css'

type Props = {
  frontMatter: PostFrontMatter
}

const PostTemplate = ({ frontMatter, children }: PropsWithChildren<Props>) => {
  return (
    <Flex as="article" direction="column" className={style.wrapper}>
      <Frame className={style.headerFrame}>
        <PostHeader frontMatter={frontMatter} />
      </Frame>

      <Frame className={style.bodyFrame}>
        <TableOfContents direction="top" />

        <div className={style.bodyWrapper}>
          <div className={style.content}>{children}</div>

          <TableOfContents direction="right" />
        </div>
      </Frame>
    </Flex>
  )
}

export default PostTemplate
