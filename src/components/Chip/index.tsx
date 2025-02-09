'use client'

import React, {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
} from 'react'
import * as style from './style.css'
import { combineClassName } from '@/styles/mixin'
import { Color, Size, Variety } from './shared'

type ChipStyle = {
  variety: Variety
  size: Size
  color: Color
}

interface Props
  extends Omit<ComponentPropsWithoutRef<'span'>, 'color'>,
    ChipStyle {}

const Chip = (
  { variety, size, color, children, className, ...rest }: Props,
  forwardedRef: ForwardedRef<HTMLSpanElement>
) => {
  const _className = combineClassName(
    className,
    style.chip({ colorVariety: `${color}-${variety}`, size })
  )

  return (
    <span {...rest} className={_className} ref={forwardedRef}>
      {children}
    </span>
  )
}

export default forwardRef(Chip)
