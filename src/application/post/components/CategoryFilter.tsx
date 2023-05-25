import React from 'react'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'

import CategoryLink from './CategoryLink'

import { CATEGORIES } from '@/domain/post/constant'
import { CATEGORY_TITLE } from '@/application/post/constant'
import { Category } from '@/domain/post/type'
import FONT from '@/styles/constants/font'

const GAP = 10

const CategoryFilter = () => {
  const { query } = useRouter()

  const isCategory = (category: unknown): category is Category => {
    return CATEGORIES.includes(category as Category)
  }

  const isActive = (category: Category) => {
    if (isCategory(query.slug)) {
      return query.slug === category
    } else {
      return category === 'all'
    }
  }

  return (
    <CategoryContainer>
      {CATEGORIES.map((category, i) => (
        <Wrapper key={`${category}_${i}`}>
          <CategoryLink category={category}>
            <CategoryWrapper
              $isAll={category === 'all'}
              $active={isActive(category)}
            >
              {CATEGORY_TITLE[category]}
            </CategoryWrapper>
          </CategoryLink>
        </Wrapper>
      ))}
    </CategoryContainer>
  )
}

export default CategoryFilter

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: -${GAP}px;
`

const Wrapper = styled.div`
  margin: ${GAP}px;
`

const CategoryWrapper = styled.div<{ $isAll: boolean; $active: boolean }>`
  padding: 2px 12px;
  border-radius: 8px;
  white-space: nowrap;
  color: ${({ theme }) => theme.color.grey700};

  ${FONT.title_3};

  ${({ $active, theme }) =>
    $active &&
    css`
      color: ${theme.color.primary500};
      background-color: ${theme.color.grey100};
      cursor: default;
    `};

  &:hover {
    background-color: ${({ theme }) => theme.color.grey100};
  }
`