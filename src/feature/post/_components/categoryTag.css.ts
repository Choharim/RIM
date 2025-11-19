import COLOR from '@/styles/color'
import { style } from '@vanilla-extract/css'

export const base = style({
  selectors: {
    '&::before': {
      content: '#',
      color: COLOR.primary500,
      marginRight: 1,
    },
  },
})
