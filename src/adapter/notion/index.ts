import PostEntity from '@/entity/post'
import { PostCategory, PostFrontMatter } from '@/entity/post/type'
import { NotionAPI as NotionClient } from 'notion-client'

const notionClient = new NotionClient()

class NotionAPI {
  private NOTION_ID = {
    page: {
      blog: '51e8461a3f77425aac9bf1d8ccac7720',
    },
  } as const

  private BASE_URL = 'https://notion-api.splitbee.io/v1'

  // 모든 FrontMatter을 가져옵니다.
  private async getPostFrontMatters(): Promise<PostFrontMatter[]> {
    return await fetch(
      `${this.BASE_URL}/table/${this.NOTION_ID.page.blog}`
    ).then((res) => res.json())
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
    const all = await notionAPI.getPublishedPostFrontMatters()
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

  private async getTable() {
    return await notionClient.getPage(this.NOTION_ID.page.blog)
  }

  private async getFilters() {
    const tableOfPosts = await this.getTable()
    const filterCodes: string[] =
      Object.values(
        tableOfPosts.collection_view
      )[0]?.value?.format?.property_filters?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (filterInfo: any) => filterInfo.filter.property
      ) || []

    const schema = Object.values(tableOfPosts.collection)[0]?.value?.schema

    let filters: Record<string, string[]> = {}

    filterCodes.forEach((code) => {
      const key = schema?.[code].name
      const values = schema?.[code].options?.map((option) => option.value) || []

      if (!key) return

      filters = {
        ...filters,
        [key]: values,
      }
    })

    return filters as { category: PostCategory[] }
  }

  // 모든 카데고리를 가져옵니다.
  public async getCategories(): Promise<PostCategory[]> {
    const filtes = await this.getFilters()

    return filtes['category'] || []
  }
}

const notionAPI = new NotionAPI()

export default notionAPI
