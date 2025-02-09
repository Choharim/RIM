import notionAPI from '@/adapter/notion'
import PostEntity from '@/entity/post'
import { AppPageProps } from '@/feature/application/_types/navigation'
import PostTemplate from '@/app/(detail)/blog/[id]/_components/PostTemplate'
import CustomStyleProvider from '@/app/(detail)/blog/[id]/_components/PostTemplate/CustomStyleProvider'

import React from 'react'
import Renderer from './_components/Renderer'
import { Metadata } from 'next'
import StructuredData from '@/feature/seo/_components/StructuredData'
import SEOFeature from '@/feature/seo'
import { notFound } from 'next/navigation'

async function PostDetail({ params: { id } }: AppPageProps<'blogDetails'>) {
  const frontMatter = await notionAPI.getFrontMatterById(id)

  if (!frontMatter) {
    notFound()
  }

  const post = await notionAPI.getPost(id)

  return (
    <>
      <StructuredData
        data={SEOFeature.getBlogPostingContext({
          title: frontMatter.title,
          desc: frontMatter.description,
          category: frontMatter.category,
          datePublished: frontMatter.create_date,
          id,
        })}
      />
      <PostTemplate frontMatter={frontMatter}>
        <CustomStyleProvider>
          <Renderer post={post} />
        </CustomStyleProvider>
      </PostTemplate>
    </>
  )
}

export default PostDetail

export async function generateStaticParams() {
  const all = await notionAPI.getPublishedPostFrontMatters()
  const ids = PostEntity.getPostIDs(all)

  const paths = ids.map((id) => {
    return {
      params: {
        id,
      },
    }
  })

  return paths
}

export async function generateMetadata({
  params,
}: AppPageProps<'blogDetails'>): Promise<Metadata> {
  const id = (await params).id
  const frontMatter = await notionAPI.getFrontMatterById(id)

  if (!frontMatter) return {}

  return {
    title: frontMatter.title,
    description: frontMatter.description || '',
  }
}
