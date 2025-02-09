import notionAPI from '@/adapter/notion'

import CategoryFilter from '@/feature/post/_components/CategoryFilter'

import PostEntity from '@/entity/post'
import { AppPageProps } from '@/feature/application/_types/navigation'
import { Suspense } from 'react'
import { Metadata } from 'next'
import PostFeature from '@/feature/post'
import { toPascalCase } from '@/shared/_utils'
import PostList from '../../_components/PostList'
import StructuredData from '@/feature/seo/_components/StructuredData'
import AppFeature from '@/feature/application'
import SEOFeature from '@/feature/seo'

async function CategoryPage({
  params: { category },
}: AppPageProps<'category'>) {
  const categoryList = await notionAPI.getCategories()

  const categorized = await notionAPI.getFrontMattersByCategory(category)
  const frontMatters = PostEntity.sortFrontMattersByNewest(categorized)

  return (
    <>
      <StructuredData
        data={SEOFeature.getCollectionPageContext({
          category: category,
          frontMatters,
          url: `${AppFeature.URL.domain}${AppFeature.getAppURI({
            name: 'category',
            pathParams: { category: category },
          })}`,
        })}
      />

      <CategoryFilter>
        <CategoryFilter.Chip isSeleted={!category}>전체</CategoryFilter.Chip>
        {categoryList.map((c) => (
          <CategoryFilter.Chip
            key={c}
            category={c}
            isSeleted={category === c}
          />
        ))}
      </CategoryFilter>

      <Suspense>
        <PostList frontMatters={frontMatters} />
      </Suspense>
    </>
  )
}

export default CategoryPage

export async function generateStaticParams() {
  const categories = await notionAPI.getCategories()

  return categories.map((category) => ({
    params: { category },
  }))
}

export async function generateMetadata({
  params,
}: AppPageProps<'category'>): Promise<Metadata> {
  const category = (await params).category

  return {
    title: `${PostFeature.getCategoryName(category)}(${toPascalCase(
      category
    )}) 글 목록`,
    description: `${PostFeature.getCategoryName(
      category
    )} 개발에 관한 인사이트를 제공해요.`,
  }
}
