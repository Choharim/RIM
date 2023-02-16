import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  PreviewData,
} from 'next'
import React from 'react'
import { ParsedUrlQuery } from 'querystring'

import { Category } from '@/domain/post/type'
import { CATEGORIES } from '@/domain/post/constant'
import { NextPageWithLayout } from 'pages/_app'

// import usePagination from '@/hooks/usePagination'
import CategoryFilter from '@/components/post/CategoryFilter'
import PostCardLink from '@/components/post/PostCardLink'
import { fetchPosts } from '@/services/api'
import CardListFrame from '@/components/post/CardListFrame'

const PostsPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts }) => {
  // TODO:
  // const { posts, targetRef } = usePagination({ category })

  return (
    <>
      <CategoryFilter />
      <CardListFrame>
        {posts?.map(({ data, slug }) => {
          return <PostCardLink key={slug} data={data} slug={slug} />
        })}
      </CardListFrame>
      {/* <div ref={targetRef} /> */}
    </>
  )
}

export default PostsPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: CATEGORIES.map((category) => `/category/${category}`),
    fallback: false,
  }
}

export type Params = {
  slug: Category
}

export const getStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) => {
  const { slug } = context.params as Params
  const posts = await fetchPosts(process.env.BASE_URL || '', { category: slug })

  return {
    props: {
      posts,
    },
  }
}