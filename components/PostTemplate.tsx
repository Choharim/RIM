import React from 'react'
import styled from 'styled-components'

import { copy } from 'utils/copy'
import { deviceSize } from 'constants/common'
import { FrontMatter } from 'entity/post/type'

import ShareLink from './ShareLink'
import TagLink from './TagLink'
import Thumbnail from './Thumbnail'

type Props = {
  children: React.ReactNode
  data: FrontMatter
}

const PostTemplate = ({ data, children }: Props) => {
  const { title, createDate, tags, thumbnail } = data

  const shareLink = () => {
    copy(window.location.href)
  }

  return (
    <Article>
      <Header>
        <Wrapper>
          <TitleWrapper>
            <Title>{title}</Title>
            <TagContainer>
              {tags?.map((tag, i) => (
                <TagLink key={`${tag}_${i}`} tag={tag}>
                  # {tag}
                </TagLink>
              ))}
            </TagContainer>
          </TitleWrapper>
          <ShareLink onClick={shareLink} />
        </Wrapper>
        <CreatedTime dateTime={createDate}>{createDate}</CreatedTime>
        {thumbnail && (
          <Thumbnail
            src={thumbnail}
            layout="responsive"
            width={`${deviceSize.pc}px`}
            height="300px"
            objectFit="contain"
          />
        )}
      </Header>

      {children}
    </Article>
  )
}

export default PostTemplate

const Article = styled.article`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: grid;
  gap: 10px;
  margin: 20px 0 30px;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h1`
  ${({ theme }) => theme.font.header_1};
  color: ${({ theme }) => theme.color.lightBlack};
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const CreatedTime = styled.time`
  ${({ theme }) => theme.font.subtitle_2};
  color: ${({ theme }) => theme.color.darkGray};
`

const TagContainer = styled.div`
  display: flex;
  margin-left: 12px;

  & div {
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
`
