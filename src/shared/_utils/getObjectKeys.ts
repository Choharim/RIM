/**
 * @description
 * object key의 타입을 유지한 채, key를 요소로한 배열을 리턴합니다.
 * @example
 * getObjectKeys({ a: 'hi', b: 'hello' }) // 추론 타입 ("a" | "b")[]
 */
const getObjectKeys = <T extends Record<string, unknown>>(
  obj: T
): (keyof T)[] => {
  return Object.keys(obj)
}

export default getObjectKeys
