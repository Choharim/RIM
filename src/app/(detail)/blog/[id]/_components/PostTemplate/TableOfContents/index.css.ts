import Z_INDEX from '@/styles/zIndex'
import { recipe } from '@vanilla-extract/recipes'
import COLOR from '@/styles/color'
import FONT from '@/styles/font'

import { NAVBAR_HEIGHT } from '@/components/Layout/navbar.css'
import { DEVICE_BREAK_POINT, responsiveStyle } from '@/styles/device'
import { convertHEXToRGB } from '@/shared/_utils'
import { TOC_WIDTH_IN_PC } from './_shared'

const WIDTH = DEVICE_BREAK_POINT.tablet

export const asideRecipe = recipe({
  base: {
    selectors: {
      '&:emtpy': {
        display: 'none',
      },
    },
  },
  variants: {
    direction: {
      right: [
        responsiveStyle({
          custom: {
            value: WIDTH + TOC_WIDTH_IN_PC * 2,
            css: {
              display: 'none',
            },
          },
        }),
      ],
      top: [
        {
          display: 'none',
        },
        responsiveStyle({
          custom: {
            value: WIDTH + TOC_WIDTH_IN_PC * 2,
            css: {
              display: 'flex',
            },
          },
        }),
      ],
    },
  },
})

export const tocBoxRecipe = recipe({
  base: {
    zIndex: Z_INDEX.aside,
  },
  variants: {
    direction: {
      right: {
        position: 'sticky',
        right: 0,
        top: NAVBAR_HEIGHT,
        width: TOC_WIDTH_IN_PC,
        paddingLeft: 40,
        marginTop: 40,
      },
      top: {
        position: 'unset',
        width: '100%',
        margin: '20px 0',
      },
    },
  },
})

export const liRecipe = recipe({
  base: {
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        color: COLOR.primary300,
      },
    },
  },
  variants: {
    headerType: {
      h2: {
        color: COLOR.grey700,
        ...FONT.subtitle_2,
      },
      h3: {
        marginLeft: 10,
        paddingLeft: 10,
        color: COLOR.grey700,
        ...FONT.subtitle_2,
      },
      h4: {
        marginLeft: 10,
        paddingLeft: 25,
        color: COLOR.grey600,
        ...FONT.subtitle_3,
      },
    },
    highlight: {
      true: {
        color: COLOR.primary400,
        filter: `drop-shadow(0 0 8px rgba(${convertHEXToRGB(
          COLOR.primary400
        )}, 0.7))`,
        borderLeft: `2px solid ${COLOR.primary300}`,
      },
      false: {
        borderLeft: `2px solid ${COLOR.grey200}`,
      },
    },
  },
})
