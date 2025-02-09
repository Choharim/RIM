import COLOR from '@/styles/color'
import { style } from '@vanilla-extract/css'

export const wrapper = style({
  all: 'unset',
  textDecoration: '1.5px underline dashed',
  textUnderlineOffset: 6,
  wordBreak: 'break-word',

  cursor: 'pointer',

  color: COLOR.primary400,
  ':hover': {
    color: COLOR.primary300,
  },
})
