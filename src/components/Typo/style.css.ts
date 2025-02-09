import { createObjectByFormatter, getObjectKeys } from '@/shared/_utils'
import COLOR from '@/styles/color'
import FONT, { getResponsiveFont } from '@/styles/font'
import { recipe } from '@vanilla-extract/recipes'
import { TypoStyle } from '.'
import { CSSProperties } from 'react'
import { DEVICE_BREAK_POINT } from '@/styles/device'

export const typo = recipe({
  base: {
    all: 'unset',
    whiteSpace: 'pre-wrap',
    selectors: {
      '&:empty': {
        display: 'none',
      },
    },
  },
  variants: {
    color: createObjectByFormatter<TypoStyle['color'], CSSProperties>(
      [...getObjectKeys(COLOR), 'inherit'],
      (key) => {
        return {
          color: key === 'inherit' ? 'inherit' : COLOR[key],
        }
      }
    ),
    variety: createObjectByFormatter<TypoStyle['variety'], CSSProperties>(
      getObjectKeys(FONT),
      (key) => {
        const { pc, tablet, mobile } = getResponsiveFont(key)

        return {
          ...FONT[pc],

          '&[data-responsive="true"]': {
            [`@media screen and (max-width: ${DEVICE_BREAK_POINT.pc}px)`]: {
              ...FONT[tablet],
            },
            [`@media screen and (max-width: ${DEVICE_BREAK_POINT.tablet}px)`]: {
              ...FONT[mobile],
            },
          },
        }
      }
    ),
  },
})
