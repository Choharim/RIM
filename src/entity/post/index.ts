import { PostCategory, PostFrontMatter } from './type'

class PostEntity {
  // published 된 fontMatters
  public static filterPublishedFrontMatters(posts: PostFrontMatter[]) {
    return posts.filter((post) => post.published)
  }

  // 최신순으로 나열된 frontMatters
  public static sortFrontMattersByNewest(posts: PostFrontMatter[]) {
    const copiedPosts = [...posts]

    copiedPosts.sort((a, b) => {
      return Date.parse(b.create_date) - Date.parse(a.create_date)
    })

    return copiedPosts
  }

  // 특정 category의 frontMatters
  public static filterFrontMattersByCategory(
    posts: PostFrontMatter[],
    category: PostCategory
  ) {
    return posts.filter((post) => post.category === category)
  }

  public static filterRecommandFrontMatters(posts: PostFrontMatter[]) {
    return posts.filter((post) => post.recommand)
  }

  public static getPostIDs(posts: PostFrontMatter[]) {
    return posts.map((post) => post.id)
  }

  public static findFrontMatter(
    posts: PostFrontMatter[],
    id: string
  ): PostFrontMatter | undefined {
    return posts.find((post) => post.id === id)
  }

  public static readonly CATEGORY_LIST = [
    'network',
    'data-structure',
    'algorithms',
    'operating-system',
    'typescript',
    'javascript',
    'webview',
    'frontend',
  ] as const
  public static isCategory(category: string) {
    return this.CATEGORY_LIST.includes(category as PostCategory)
  }
}

export default PostEntity
