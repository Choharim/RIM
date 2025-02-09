import COLOR from '@/styles/color'
import { keyframes, style, styleVariants } from '@vanilla-extract/css'

const accordion = keyframes({
  '0%': {
    opacity: 1,
    width: '100%',
  },
  '50%': {
    opacity: 0.5,
  },
  '100%': {
    opacity: 0,
    width: 0,
  },
})
export const wrapper = styleVariants({
  initial: {},
  fullname: {
    background: `linear-gradient(-225deg, ${COLOR.primary300} 0%, ${COLOR.primary400} 30%, #fbc8d4 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `${accordion} 3s ease-in-out 0.8s forwards`,
  },
})

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
})

export const sub = style({
  margin: '0 0 6px 4px',
  alignSelf: 'end',
  whiteSpace: 'nowrap',
  animation: `${fadeIn} 0.3s ease-in-out 3.8s backwards`,
})
