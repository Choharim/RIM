import React from 'react'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'

import { TAGS } from 'entity/post/constant'
import { Tag } from 'entity/post/type'
import { TAG_COLOR_BY_TYPE } from 'constants/post/tag'

import TagLink from './TagLink'

const TagFilter = () => {
  const { query } = useRouter()

  return (
    <TagButtonContainer>
      {TAGS.map((tag, i) => (
        <TagButton key={`${tag}_${i}`}>
          <CircleTagLink tag={tag} $active={query.tag?.includes(tag) || false}>
            {tag}
          </CircleTagLink>
        </TagButton>
      ))}
    </TagButtonContainer>
  )
}

export default TagFilter

const TagButtonContainer = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: -4px;
`
const TagButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  margin: 4px;
`

const CircleTagLink = styled(TagLink)<{ $active: boolean; tag?: Tag }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.font.subtitle_3}
  border-radius: 100px;
  padding: 12px 28px;
  white-space: nowrap;

  ${({ $active, tag }) =>
    $active &&
    css`
      color: ${({ theme }) => theme.color.black};
      background-color: ${TAG_COLOR_BY_TYPE[tag]?.hover};
      border: 1px solid ${TAG_COLOR_BY_TYPE[tag]?.active};
    `};
`
