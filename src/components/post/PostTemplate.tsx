import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { FrontMatter } from '@/domain/post/type'
import { HighlightBlock } from '../mdx/style'

import CategoryChip from './CategoryChip'
import Thumbnail from '../Thumbnail'
import Frame from '../layout/Frame'
import TOC, { TOC_WIDTH_IN_PC } from './TOC'
import { NAVBAR_HEIGHT } from '../layout/Navbar'

type Props = {
  children: React.ReactNode
  data: FrontMatter
}

const WIDTH = 644

const PostTemplate = ({ data, children }: Props) => {
  const { title, createDate, category, thumbnailSrc, description } = data
  const [showThumbnail, setShowThumbnail] = useState(!!thumbnailSrc)

  const handleSrcError = () => {
    try {
      return require(`/public/post/${thumbnailSrc}`)
    } catch (error) {
      setShowThumbnail(false)
      console.error(`/public/post/${thumbnailSrc} 이미지 로드에 실패했습니다.`)
    }
  }

  return (
    <Article>
      <HeaderFrame>
        {showThumbnail && (
          <Thumbnail
            src={handleSrcError()}
            layout="responsive"
            objectFit="contain"
            placeholder="blur"
            round
          />
        )}
        <Title>{title}</Title>
        <SubInfo>
          {!!category && <CategoryChip category={category} />}
          <CreateDate dateTime={createDate}>{createDate}</CreateDate>
        </SubInfo>
        <Summary>{description}</Summary>
      </HeaderFrame>

      <BodyFrame>
        {!showThumbnail && (
          <Aside $direction="top">
            <TOC />
          </Aside>
        )}
        <BodyWrapper>
          <MDXWrapper>{children}</MDXWrapper>
          <Aside $direction="right">
            <TOC />
          </Aside>
        </BodyWrapper>
      </BodyFrame>
    </Article>
  )
}

export default PostTemplate

const Article = styled.article`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;

  color: ${({ theme }) => theme.color.grey700};
  word-break: keep-all;
`

const HeaderFrame = styled(Frame)`
  display: grid;
  gap: 10px;
  max-width: ${WIDTH}px;
  margin-bottom: 40px;
  margin-top: ${NAVBAR_HEIGHT}px;

  ${({ theme }) => theme.media.mobile} {
    margin-bottom: 30px;
  }
`

const Title = styled.h1`
  ${({ theme }) => theme.font.header_1};
  color: ${({ theme }) => theme.color.grey800};
  margin: 20px 0 10px;

  ${({ theme }) => css`
    ${theme.media.tablet} {
      ${theme.font.header_2}
    }
  `}
`

const SubInfo = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 10px;
  width: fit-content;
`

const CreateDate = styled.time`
  ${({ theme }) => theme.font.body_3};
  color: ${({ theme }) => theme.color.grey500};
`

const Summary = styled.p`
  ${({ theme }) => theme.font.subtitle_3};
`

const MEDIA_SCREEN_FOR_TOC = `@media screen and (max-width: ${
  WIDTH + TOC_WIDTH_IN_PC * 2
}px)`

const BodyFrame = styled(Frame)`
  max-width: calc(${WIDTH}px + ${TOC_WIDTH_IN_PC * 2}px);

  ${MEDIA_SCREEN_FOR_TOC} {
    max-width: ${WIDTH}px;
  }
`

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
  margin-left: ${TOC_WIDTH_IN_PC}px;

  ${MEDIA_SCREEN_FOR_TOC} {
    margin-left: 0;
  }
`

const Aside = styled.aside<{ $direction: 'right' | 'top' }>`
  &:empty {
    display: none;
  }

  ${({ $direction }) =>
    $direction === 'right'
      ? css`
          ${MEDIA_SCREEN_FOR_TOC} {
            display: none;
          }

          ${TOC.TOCBox} {
            position: sticky;
            right: 0;
            top: ${NAVBAR_HEIGHT}px;
            width: ${TOC_WIDTH_IN_PC}px;
            padding-left: 40px;
            margin-top: 40px;
          }
        `
      : css`
          display: none;
          ${MEDIA_SCREEN_FOR_TOC} {
            display: flex;
          }

          ${TOC.TOCBox} {
            position: unset;
            width: 100%;
          }
        `}

  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`

const MDXWrapper = styled.div`
  max-width: ${WIDTH}px;

  aside {
    ${HighlightBlock}

    p:last-child {
      margin-bottom: 0;
    }
  }
`
