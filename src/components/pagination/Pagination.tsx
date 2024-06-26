import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Icon from '../icon'
import PageLink from './PageLink'

import FONT from '@/styles/constants/font'
import Flex from '../flex'
import COLOR from '@/styles/constants/color'

import * as style from './style/pagination.css'

const DISPLAY_PAGE_COUNT = 5
const HALF = Math.floor(DISPLAY_PAGE_COUNT / 2)

const getDisplayPageNumbers = (
  totalPage: number,
  currentPage: number
): [number, number] => {
  let startIndex: number
  let endIndex: number

  if (currentPage <= HALF) {
    startIndex = 0
    endIndex = DISPLAY_PAGE_COUNT
  } else if (currentPage > totalPage - HALF) {
    startIndex = totalPage - DISPLAY_PAGE_COUNT
    endIndex = totalPage
  } else {
    startIndex = currentPage + HALF - DISPLAY_PAGE_COUNT
    endIndex = currentPage + HALF
  }

  return [startIndex, endIndex]
}

export type PaginationProps = {
  totalPage: number
  currentPage: number
  pageQueryKey: string
}

const Pagination = ({
  totalPage,
  currentPage,
  pageQueryKey,
}: PaginationProps) => {
  const router = useRouter()
  const [start, end] = getDisplayPageNumbers(totalPage, currentPage)
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1).slice(
    start,
    end
  )

  if (totalPage === 1) return null

  return (
    <Flex align="center" gap="4px" className={style.wrapper}>
      <CustomPageLink
        isDisabled={currentPage === 1}
        pageQueryKey={pageQueryKey}
        pageQueryValue={1}
      >
        <CustomIcon
          className={style.icon}
          type="DoubleArrowRight"
          color="grey500"
        />
      </CustomPageLink>
      <CustomPageLink
        isDisabled={currentPage === 1}
        pageQueryKey={pageQueryKey}
        pageQueryValue={currentPage - 1}
      >
        <CustomIcon className={style.icon} type="ArrowRight" color="grey500" />
      </CustomPageLink>

      {pages.map((page) => (
        <Link
          key={page}
          href={{ query: { ...router.query, [pageQueryKey]: page } }}
        >
          <Page isActive={page === currentPage}>{page}</Page>
        </Link>
      ))}

      <CustomPageLink
        isDisabled={totalPage === currentPage}
        pageQueryKey={pageQueryKey}
        pageQueryValue={currentPage + 1}
      >
        <CustomIcon type="ArrowRight" color="grey500" />
      </CustomPageLink>

      <CustomPageLink
        isDisabled={totalPage === currentPage}
        pageQueryKey={pageQueryKey}
        pageQueryValue={totalPage}
      >
        <CustomIcon type="DoubleArrowRight" color="grey500" />
      </CustomPageLink>
    </Flex>
  )
}

export default Pagination

const Page = styled.span<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  ${FONT.title_3};

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${COLOR.grey900};
          cursor: default;
          pointer-events: none;
        `
      : css`
          color: ${COLOR.grey600};
          cursor: pointer;
        `}
`

const CustomPageLink = styled(PageLink)<{ isDisabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isDisabled }) =>
    isDisabled
      ? css`
          cursor: default;
          pointer-events: none;
          ${CustomIcon} {
            color: ${COLOR.grey300};
          }
        `
      : css`
          cursor: pointer;
        `}
`

const CustomIcon = styled(Icon)`
  padding: 4px;
  width: 28px;
  height: 28px;
  cursor: pointer;
`
