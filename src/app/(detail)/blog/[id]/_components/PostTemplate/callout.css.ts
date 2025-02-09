import COLOR from '@/styles/color'
import { keyframes, style } from '@vanilla-extract/css'

const gradient = keyframes({
  '0%': { backgroundPosition: '15% 0%' },
  '50%': { backgroundPosition: '85% 100%' },
  '100%': { backgroundPosition: '15% 0%,' },
})

const RADIUS = 15
const WIDTH = 2

export const bg = style({
  position: 'relative',
  margin: '16px 0',

  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,

      background: `linear-gradient(-225deg, ${COLOR.primary300} 0%, ${COLOR.primary400} 30%, #fbc8d4 100%)`,
      backgroundSize: '400%',
      animation: `${gradient} 2s ease-in-out infinite`,
      zIndex: -1,
      borderRadius: RADIUS,
    },
  },
})

export const card = style({
  backgroundColor: COLOR.white,
  borderRadius: `calc(${RADIUS}px - ${WIDTH}px)`,
  margin: WIDTH,

  padding: '15px 20px',
})

export const emoji = style({
  fontSize: 24,
})
