import { ElementType, forwardRef } from 'react'

import { PolymorphicComponentProps, PolymorphicRef } from '@/shared/_types'
import { ColorKey, FontKey } from '@/styles/type'

import { combineClassName, limitTextLine } from '@/styles/mixin'
import * as style from './style.css'

const DEFAULT_TAG: ElementTag = 'span'

type ElementTag = Extract<
  ElementType,
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'time'
  | 'strong'
  | 'em'
  | 'sub'
>

export type TypoStyle = {
  variety: FontKey
  color: ColorKey | 'inherit'
  lineClamp?: number
  responsive?: boolean
}

export type TypoProps<E extends ElementType> = PolymorphicComponentProps<
  E,
  Partial<TypoStyle>
>

const Typo = forwardRef(
  <E extends ElementType>(
    {
      variety = 'body_1',
      color = 'black',
      lineClamp,
      responsive = true,
      as = DEFAULT_TAG,
      children,
      className,
      ...attributes
    }: TypoProps<E | typeof DEFAULT_TAG>,
    forwardRef: PolymorphicRef<E>
  ) => {
    const _className = combineClassName(
      className,
      style.typo({ variety, color })
    )
    const Component = as

    return (
      <Component
        {...attributes}
        style={{
          ...attributes.style,
          ...(lineClamp ? limitTextLine(lineClamp) : {}),
        }}
        className={_className}
        data-responsive={responsive}
        ref={forwardRef}
        as={as}
      >
        {children}
      </Component>
    )
  }
)

/**
 * @description
 * forwardRef에 제네릭을 적용하면 prop 타입이 추론되지 않아
 * 타입 단언을 합니다.
 * @issue
 * styled로 재확장하고 as prop을 사용할 경우, elementType의 고유 property 타입을 추론하지 못합니다.
 * ex) label의 htmlFor
 */
export default Typo as <E extends ElementTag>(
  props: TypoProps<E> & { ref?: PolymorphicRef<E> }
) => ReturnType<typeof Typo>

Typo.displayName = 'Typo'
