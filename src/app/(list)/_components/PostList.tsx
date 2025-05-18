'use client'

import usePagination from '@/components/Pagination/usePagination'
import { PostFrontMatter } from '@/entity/post/type'
import CategoryLabel from '@/feature/post/_components/CategoryLabel'
import CategoryTag from '@/feature/post/_components/CategoryTag'
import PostCard from '@/feature/post/_components/PostCard'
import React from 'react'

import { notFound } from 'next/navigation'
import Flex from '@/components/Flex'

interface Props {
  frontMatters: PostFrontMatter[]
}
function PostList({ frontMatters }: Props) {
  const { Pagination, paginatedPosts } = usePagination({
    posts: frontMatters,
  })

  if (!paginatedPosts.length) {
    notFound()
  }

  return (
    <Flex direction="column" gap={'12px'}>
      {paginatedPosts.map((post) => {
        const { id, title, description, create_date, category, tag } = post

        return (
          <PostCard key={id} id={id}>
            <PostCard.Body>
              <PostCard.Title>{title}</PostCard.Title>
              <PostCard.Desc>{description}</PostCard.Desc>
            </PostCard.Body>

            <PostCard.Footer>
              <PostCard.LabelSection>
                <CategoryLabel size="s">{category}</CategoryLabel>
                {tag.map((t, i) => (
                  <CategoryTag size="s" key={`${t}-${i}`}>
                    {t}
                  </CategoryTag>
                ))}
              </PostCard.LabelSection>

              <PostCard.Date dateTime={create_date} />
            </PostCard.Footer>
          </PostCard>
        )
      })}

      <Pagination />
    </Flex>
  )
}

export default PostList
