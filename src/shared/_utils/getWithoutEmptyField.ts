/**
 * @description
 * key가 없는 빈 Object인지 확인합니다.
 * @example
 * isEmptyObject({}) // true
 *
 * const fn = () => { ... };
 * isEmptyObject(fn) // console 'Object 타입이 아닙니다.'
 */
const isEmptyObject = (obj: object) => {
  if (obj?.constructor !== Object) {
    console.error('Object 타입이 아닙니다.')
    return
  }

  return obj.constructor === Object && Object.values(obj).length === 0
}

/**
 * @description
 * Object의 'null, undefined, 빈 배열, 빈 객체'를 탐색하여 제거합니다.
 */
const getWithoutEmptyField = <T extends object>(obj: T): Partial<T> => {
  const filledObj = {}

  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') return
    if (Array.isArray(value)) {
      if (!value.length) return
    } else if (typeof value === 'object') {
      if (isEmptyObject(value)) return
    }

    ;(filledObj as Record<string | number, unknown>)[key] = value
  })

  return filledObj
}

export default getWithoutEmptyField
