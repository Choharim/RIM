import { PostCategory } from '@/entity/post/type'

export type AppPageName = keyof AppPageParams

export type AppPageParams = {
  main: {
    searchParams: { page?: string }
  }
  category: {
    category: PostCategory
    searchParams: { page?: string }
  }
  blogDetails: {
    id: string
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
}

/**
 * @description
 * 특정 페이지의 router.query 타입을 정의합니다.
 * @example
 * /something/:something?a=first&b=second -> { something: string, a: string, b: string }
 */
export type AppPageRouterQuery<Name extends AppPageName> =
  'searchParams' extends keyof AppPageParams[Name]
    ? Omit<AppPageParams[Name], 'searchParams'> &
        AppPageParams[Name]['searchParams']
    : AppPageParams[Name]

/**
 * @description
 * searchParams에 들어가는 타입을 정의합니다.
 * @example
 * /something?a=first&b=second -> { a: string, b: string }
 */
export type AppPageSearchParams<Name extends AppPageName> =
  'searchParams' extends keyof AppPageParams[Name]
    ? AppPageParams[Name]['searchParams']
    : // eslint-disable-next-line @typescript-eslint/ban-types
      {}

/**
 * @description
 * pathParams에 들어가는 타입을 정의합니다.
 * @example
 * /something/:something -> { something: string }
 */
export type AppPagePathParams<Name extends AppPageName> = Omit<
  AppPageParams[Name],
  'searchParams'
>

/**
 * @description
 * 페이지 별 props 타입을 정의합니다.
 */
export type AppPageProps<Name extends AppPageName> = {
  params: Name extends keyof AppPageParams
    ? AppPageParams[Name]
    : Record<string, never>
  searchParams: AppPagePathParams<Name>
}
