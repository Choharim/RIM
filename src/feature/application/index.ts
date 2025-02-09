import { getSearchParamString } from '@/shared/_utils'
import {
  AppPageName,
  AppPagePathParams,
  AppPageSearchParams,
} from './_types/navigation'

class AppFeature {
  static readonly AUTHOR_NAME = {
    en: 'Harim Cho',
    ko: '조하림',
  }

  static readonly BLOG_NAME = {
    shortName: 'RIM',
    fullName: 'RootInMeaningful',
  }

  static readonly URL = {
    github: 'https://github.com/Choharim',
    domain: 'https://root-in-meaningful.vercel.app',
  }

  private static APP_URL: {
    [Name in AppPageName]: keyof AppPagePathParams<Name> extends never
      ? () => string
      : (params: AppPagePathParams<Name>) => string
  } = {
    main() {
      return '/'
    },
    blogDetails({ id }) {
      return `/blog/${id}`
    },

    category({ category }) {
      return `/category/${category}`
    },
  }

  public static getAppURI = <Name extends AppPageName>(
    page: keyof AppPagePathParams<Name> extends never
      ? { name: Name }
      : { name: Name; pathParams: AppPagePathParams<Name> },
    searchParams?: AppPageSearchParams<Name>
  ) => {
    const getURL = this.APP_URL[page.name]

    let pathname

    if ('pathParams' in page) {
      pathname = getURL(page.pathParams)
    } else {
      pathname = (getURL as () => string)()
    }

    const searchParamsString = getSearchParamString(searchParams ?? {})

    return `${pathname}${
      searchParamsString ? `?${searchParamsString}` : searchParamsString
    }`
  }

  public static isLocal = process.env.NEXT_PUBLIC_MODE === 'local'
  public static isProduction = process.env.NEXT_PUBLIC_MODE === 'production'
}
export default AppFeature
