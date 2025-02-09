import notionAPI from '@/adapter/notion'
import PostEntity from '@/entity/post'
import React, { Suspense } from 'react'
import { Metadata } from 'next'
import StructuredData from '@/feature/seo/_components/StructuredData'
import AppFeature from '@/feature/application'
import SEOFeature from '@/feature/seo'
import CategoryFilter from '@/feature/post/_components/CategoryFilter'
import PostList from './_components/PostList'

async function Page() {
  const categoryList = await notionAPI.getCategories()

  const all = await notionAPI.getPublishedPostFrontMatters()
  const frontMatters = PostEntity.sortFrontMattersByNewest(all)

  return (
    <>
      <StructuredData
        data={SEOFeature.getCollectionPageContext({
          frontMatters,
          url: `${AppFeature.URL.domain}${AppFeature.getAppURI({
            name: 'main',
          })}`,
        })}
      />

      <CategoryFilter>
        {categoryList.map((c) => (
          <CategoryFilter.Chip key={c} category={c} isSeleted={false} />
        ))}
      </CategoryFilter>

      <Suspense>
        <PostList frontMatters={frontMatters} />
      </Suspense>
    </>
  )
}

export default Page

export const metadata: Metadata = {
  title: '글 목록',
}
