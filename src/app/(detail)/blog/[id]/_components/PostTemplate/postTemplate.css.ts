import COLOR from '@/styles/color'
import { DEVICE_BREAK_POINT, responsiveStyle } from '@/styles/device'
import { style } from '@vanilla-extract/css'
import { TOC_WIDTH_IN_PC } from './TableOfContents/_shared'

export const wrapper = style({
  marginBottom: 100,
  color: COLOR.grey900,
  wordBreak: 'keep-all',
})

const WIDTH = DEVICE_BREAK_POINT.tablet

export const headerFrame = style([
  {
    maxWidth: WIDTH,
    marginBottom: 40,
  },
  responsiveStyle({
    mobile: {
      marginBottom: 20,
    },
  }),
])

export const bodyFrame = style([
  {
    maxWidth: `calc(${WIDTH}px + ${TOC_WIDTH_IN_PC * 2}px)`,
  },
  responsiveStyle({
    custom: {
      value: WIDTH + TOC_WIDTH_IN_PC * 2,
      css: {
        maxWidth: WIDTH,
      },
    },
  }),
])

export const bodyWrapper = style([
  {
    position: 'relative',
    display: 'flex',
    marginLeft: TOC_WIDTH_IN_PC,
  },
  responsiveStyle({
    custom: {
      value: WIDTH + TOC_WIDTH_IN_PC * 2,
      css: {
        marginLeft: 0,
      },
    },
  }),
])

export const content = style({
  maxWidth: WIDTH,
  width: '-webkit-fill-available',
})
