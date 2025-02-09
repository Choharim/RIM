import notionAPI from '@/adapter/notion'
import AppFeature from '@/feature/application'

import { MetadataRoute } from 'next'

// https://root-in-meaningful.vercel.app/sitemap.xml 에서 확인
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${AppFeature.URL.domain}`,
      lastModified: new Date().toISOString(),
    },
  ]

  const dynamicRoutes: MetadataRoute.Sitemap = []

  const [categoryListResult, postResult] = await Promise.allSettled([
    notionAPI.getCategories(),
    notionAPI.getPublishedPostFrontMatters(),
  ])

  if (categoryListResult.status === 'fulfilled') {
    dynamicRoutes.push(
      ...categoryListResult.value.map((category) => ({
        url: `${AppFeature.URL.domain}${AppFeature.getAppURI({
          name: 'category',
          pathParams: { category },
        })}`,
        lastModified: new Date().toISOString(),
      }))
    )
  }

  if (postResult.status === 'fulfilled') {
    dynamicRoutes.push(
      ...postResult.value.map((post) => ({
        url: `${AppFeature.URL.domain}${AppFeature.getAppURI({
          name: 'blogDetails',
          pathParams: {
            id: post.id,
          },
        })}`,
        lastModified: new Date(post.update_date).toISOString(),
      }))
    )
  }

  return [...staticRoutes, ...dynamicRoutes]
}
