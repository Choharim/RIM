import Z_INDEX from '@/styles/constants/zIndex'
import { recipe } from '@vanilla-extract/recipes'
import COLOR from '@/styles/constants/color'
import FONT from '@/styles/constants/font'

import { NAVBAR_HEIGHT } from '@/components/layout/style/navbar.css'
import { DEVICE_BREAK_POINT, responsiveStyle } from '@/styles/constants/device'
import { TOC_WIDTH_IN_PC } from './constant'

const WIDTH = DEVICE_BREAK_POINT.tablet

export const asideRecipe = recipe({
  base: {
    selectors: {
      '&:emtpy': {
        display: 'none',
      },
    },

    ...responsiveStyle({
      mobile: {
        display: 'none',
      },
    }),
  },
  variants: {
    direction: {
      right: {
        ...responsiveStyle({
          custom: {
            value: WIDTH + TOC_WIDTH_IN_PC * 2,
            css: {
              display: 'none',
            },
          },
        }),
      },
      top: {
        display: 'none',

        ...responsiveStyle({
          custom: {
            value: WIDTH + TOC_WIDTH_IN_PC * 2,
            css: {
              display: 'flex',
            },
          },
        }),
      },
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
        marginBottom: 20,
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
        color: COLOR.grey800,
        ...FONT.title_3,
      },
      h3: {
        marginLeft: 10,
        paddingLeft: 10,
        color: COLOR.grey700,
        ...FONT.caption_1,
      },
      h4: {
        marginLeft: 10,
        paddingLeft: 25,
        color: COLOR.grey500,
        ...FONT.caption_1,
      },
    },
    highlight: {
      true: {
        color: COLOR.primary500,
        filter: `drop-shadow(0 0 8px rgba(134, 146, 208, 0.7))`,
        borderLeft: `2px solid ${COLOR.primary200}`,
      },
      false: {
        borderLeft: `2px solid ${COLOR.grey200}`,
      },
    },
  },
})