import { ObjectKey } from '../_types'

/**
 * @description
 * value가 동일하거나 규칙을 가질 경우 사용할 수 있습니다.
 * @example
 * createObjectByFormatter(['key1', 'key2'], (key) => { value: `${key}의 값`}) // { key1: 'key1의 값', key2: 'key2의 값'}
 * createObjectByFormatter(['key1', 'key2'], {value: '값'})  // { key1: '값', key2: '값'}
 */

type ValueFormatter<Key extends ObjectKey, Value> = (key: Key) => Value
const isValueFormatter = <Key extends ObjectKey, Value>(
  value: Value | ValueFormatter<Key, Value>
): value is ValueFormatter<Key, Value> => {
  return typeof value === 'function'
}
const createObjectByFormatter = <Key extends ObjectKey, Value>(
  arr: Readonly<Array<Key>>,
  value: ((key: Key) => Value) | Value
) => {
  return arr.reduce((acc, key) => {
    acc[key] = isValueFormatter(value) ? value(key) : value
    return acc
  }, {} as Record<Key, Value>)
}

export default createObjectByFormatter
