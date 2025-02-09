import PostEntity from '.'

export type PostCategory = typeof PostEntity.CATEGORY_LIST[number]

export type PostTag =
  | 'theory'
  | 'problem-solving'
  | 'trouble-shooting'
  | 'thinking'

type CreateDate = `${number}-${number}-${number}`

export type PostFrontMatter = {
  id: string
  title: string
  description: string
  category: PostCategory
  tag: PostTag[]
  create_date: CreateDate
  update_date: CreateDate
  published: boolean
  recommand: boolean
}
