import { getWithoutEmptyField } from '.'

/**
 * @description
 * key와 value를 = 로, key value pair를 & 로 연결합니다.
 * @example
 * const paramsObj = { foo: "bar", baz: "bar" };
 * getSearchParamString(paramsObj) // "foo=bar&baz=bar"
 */
const getSearchParamString = <
  T extends Record<string, string> | URLSearchParams
>(
  pageParams: T
) => {
  const filledObj = getWithoutEmptyField(pageParams)
  const searchParams = new URLSearchParams(filledObj as T)

  return searchParams.toString()
}

export default getSearchParamString
