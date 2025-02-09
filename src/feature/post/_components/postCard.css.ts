import COLOR from '@/styles/color'
import { style } from '@vanilla-extract/css'

export const wrapper = style([
  {
    position: 'relative',
    padding: '20px 0',
    minHeight: 100,
    cursor: 'pointer',

    transition: 'box-shadow 300ms ease-in-out, transform 300ms ease-in-out',

    ':hover': {
      transform: 'translateY(-4px)',
    },
  },
])

export const link = style({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
})

export const labelContainer = style({
  marginBottom: 4,
})

export const title = style({
  transition: 'color 0.2s ease-in-out',

  selectors: {
    [`${wrapper}:hover &`]: {
      color: COLOR.primary400,
    },
  },
})

export const footer = style({
  marginTop: 20,
})

export const date = style({
  margin: '0 0 0 auto',
})
