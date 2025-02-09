'use client'
import React, { ComponentProps, SVGAttributes } from 'react'

import { ICON_COMPONENT, IconType } from './shared'
import { ColorKey } from '@/styles/type'
import COLOR from '@/styles/color'

interface IconProps
  extends Pick<SVGAttributes<SVGAElement>, 'width' | 'height'>,
    Pick<ComponentProps<'svg'>, 'className' | 'onClick'> {
  type: IconType
  color: ColorKey | 'inherit'
}
const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ type, width = 18, height, color, ...restProps }, ref) => {
    const IconComponent = ICON_COMPONENT[type]

    return (
      <IconComponent
        ref={ref}
        width={width}
        height={height}
        color={color === 'inherit' ? 'inherit' : COLOR[color]}
        strokeWidth="2.0"
        {...restProps}
      />
    )
  }
)

export default Icon

Icon.displayName = 'Icon'
