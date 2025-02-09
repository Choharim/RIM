import { styleVariants } from '@vanilla-extract/css'

export const link = styleVariants({
  selected: {
    cursor: 'default',
  },
  default: {
    cursor: 'pointer',
  },
})
