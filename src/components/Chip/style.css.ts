import FONT from '@/styles/font'

import COLOR from '@/styles/color'
import { recipe } from '@vanilla-extract/recipes'
import { CSSProperties } from 'react'
import { createObjectByFormatter } from '@/shared/_utils'
import { FontKey } from '@/styles/type'
import { Color, Size, SIZE_LIST, Variety } from './shared'

const SIZE: Record<
  Size,
  {
    padding: string
    radius: number
    font: FontKey
  }
> = {
  s: { padding: '2px 6px', radius: 8, font: 'caption_1' },
  m: { padding: '2px 8px', radius: 10, font: 'subtitle_3' },
  l: { padding: '4px 10px', radius: 12, font: 'subtitle_2' },
}

type ColorGroup = 'accent' | 'accentHalf' | 'accentContrast'
const COLOR_GROUP: Record<Color, Record<ColorGroup, string>> = {
  primary: {
    accent: COLOR.primary400,
    accentHalf: COLOR.primary200,
    accentContrast: COLOR.primary50,
  },
}

type ColorVariety = `${Color}-${Variety}`
const COLOR_VARIETY: Record<
  ColorVariety,
  Partial<Record<'border' | 'color' | 'background', string>>
> = {
  'primary-solid': {
    background: COLOR_GROUP.primary.accent,
    color: COLOR_GROUP.primary.accentContrast,
  },
  'primary-soft': {
    background: COLOR_GROUP.primary.accentContrast,
    color: COLOR_GROUP.primary.accent,
  },
  'primary-surface': {
    border: COLOR_GROUP.primary.accentHalf,
    background: COLOR_GROUP.primary.accentContrast,
    color: COLOR_GROUP.primary.accent,
  },
  'primary-outline': {
    border: COLOR_GROUP.primary.accent,
    color: COLOR_GROUP.primary.accent,
  },
}

export const chip = recipe({
  base: {
    width: 'fit-content',
    display: 'inline-block',
    ':empty': {
      display: 'none',
    },
  },
  variants: {
    colorVariety: createObjectByFormatter<ColorVariety, CSSProperties>(
      ['primary-outline', 'primary-soft', 'primary-solid', 'primary-surface'],
      (key) => {
        const variant = COLOR_VARIETY[key]

        return {
          color: variant.color,
          backgroundColor: variant.background
            ? variant.background
            : 'transparent',
          border: `1px solid ${
            variant.border ? variant.border : 'transparent'
          }`,
        }
      }
    ),
    size: createObjectByFormatter<Size, CSSProperties>(SIZE_LIST, (size) => {
      const { padding, radius, font } = SIZE[size]

      return {
        padding,
        borderRadius: radius,
        ...FONT[font],
      }
    }),
  },
})
