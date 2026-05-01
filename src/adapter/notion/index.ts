import PostEntity from '@/entity/post'
import { PostCategory, PostFrontMatter } from '@/entity/post/type'
import { Client } from '@notionhq/client'
import { NotionAPI as NotionClient } from 'notion-client'

const notionClient = new NotionClient()

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const DATABASE_ID = process.env.NEXT_PUBLIC_NOTION_BLOG_ID as string

let dataSourceIdPromise: Promise<string> | null = null
const getDataSourceId = (): Promise<string> => {
  if (dataSourceIdPromise) return dataSourceIdPromise

  const promise = notion.databases
    .retrieve({ database_id: DATABASE_ID })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((db: any) => {
      const id: string | undefined = db?.data_sources?.[0]?.id
      if (!id) {
        throw new Error(
          `No data source found for database ${DATABASE_ID}. Make sure the integration is shared with the database.`
        )
      }
      return id
    })
    .catch((err: unknown) => {
      dataSourceIdPromise = null
      throw err
    })

  dataSourceIdPromise = promise
  return promise
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPlainText = (richText: any[] | undefined): string =>
  (richText ?? []).map((t) => t.plain_text).join('')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapPageToFrontMatter = (page: any): PostFrontMatter => {
  const props = page.properties ?? {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const titleProp = Object.values(props).find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (p: any) => p?.type === 'title'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any

  return {
    id: String(page.id ?? '').replace(/-/g, ''),
    title: getPlainText(titleProp?.title),
    description: getPlainText(props.description?.rich_text),
    category: props.category?.select?.name as PostCategory,
    tag:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props.tag?.multi_select?.map((t: any) => t.name) ?? [],
    create_date: props.create_date?.date?.start,
    update_date: props.update_date?.date?.start,
    published: !!props.published?.checkbox,
    recommand: !!props.recommand?.checkbox,
  }
}

class NotionAPI {
  // 모든 FrontMatter을 가져옵니다.
  private async getPostFrontMatters(): Promise<PostFrontMatter[]> {
    const dataSourceId = await getDataSourceId()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results: any[] = []
    let cursor: string | undefined

    do {
      const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        start_cursor: cursor,
        page_size: 100,
      })
      results.push(...response.results)
      cursor = response.has_more ? response.next_cursor ?? undefined : undefined
    } while (cursor)

    return results.map(mapPageToFrontMatter)
  }

  // 게시된 모든 FrontMatter을 가져옵니다.
  public async getPublishedPostFrontMatters(): Promise<PostFrontMatter[]> {
    const all = await this.getPostFrontMatters()

    return PostEntity.filterPublishedFrontMatters(all)
  }

  // 추천된 모든 FrontMatter을 가져옵니다.
  public async getRecommandPostFrontMatters(): Promise<PostFrontMatter[]> {
    const all = await this.getPostFrontMatters()

    return PostEntity.filterRecommandFrontMatters(all)
  }

  // 특정 category의 모든 FrontMatter을 가져옵니다.
  public async getFrontMattersByCategory(
    category: PostCategory
  ): Promise<PostFrontMatter[]> {
    const all = await this.getPublishedPostFrontMatters()
    const categorized = PostEntity.filterFrontMattersByCategory(all, category)

    return categorized
  }

  // 특정 id의 FrontMatter을 가져옵니다.
  public async getFrontMatterById(
    id: string
  ): Promise<PostFrontMatter | undefined> {
    const all = await this.getPublishedPostFrontMatters()
    const frontMatter = PostEntity.findFrontMatter(all, id)

    return frontMatter
  }

  // 특정 페이지를 가져옵니다.
  public async getPost(id: string) {
    return await notionClient.getPage(id)
  }

  // 모든 카데고리를 가져옵니다.
  public async getCategories(): Promise<PostCategory[]> {
    const dataSourceId = await getDataSourceId()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataSource: any = await notion.dataSources.retrieve({
      data_source_id: dataSourceId,
    })

    const categoryProp = dataSource?.properties?.category
    if (categoryProp?.type !== 'select') return []

    return (
      categoryProp.select?.options?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (option: any) => option.name as PostCategory
      ) ?? []
    )
  }
}

const notionAPI = new NotionAPI()

export default notionAPI
