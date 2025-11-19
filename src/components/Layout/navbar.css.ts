import { convertHEXToRGB } from '@/shared/_utils'
import COLOR from '@/styles/color'
import Z_INDEX from '@/styles/zIndex'
import { style } from '@vanilla-extract/css'

export const NAVBAR_HEIGHT = 60

export const navigation = style({
  position: 'sticky',
  top: 0,
  left: 0,
  width: '100%',
  height: NAVBAR_HEIGHT,
  backgroundColor: `rgb(${convertHEXToRGB(COLOR.white)}, 0.5)`,
  backdropFilter: 'saturate(180%) blur(5px)',
  borderBottom: `1px solid ${COLOR.grey100}`,
  zIndex: Z_INDEX.nav,
  display: 'block',
  transition: 'transform 0.2s',

  selectors: {
    '&[data-hidden="true"]': {
      transform: `translateY(-100%)`,
    },
    '&[data-hidden="false"]': {
      transform: `translateY(0)`,
    },
  },
})

export const navigationFrame = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const menuWrapper = style({
  position: 'relative',

  display: 'flex',
  alignItems: 'center',
  height: 40,

  borderRadius: 4,
  color: COLOR.grey700,

  selectors: {
    '&[data-active="true"]': {
      pointerEvents: 'none',
      backgroundColor: COLOR.grey100,
      color: COLOR.grey800,
    },

    '&:hover': {
      backgroundColor: COLOR.grey100,
      color: COLOR.grey800,
    },
  },
})

export const link = style({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
})

const menuContent = style({
  padding: 8,
})

export const icon = style([
  menuContent,
  {
    width: 40,
  },
])

export const label = style([menuContent])
