import { StyleRule } from '@vanilla-extract/css'
import { Device } from './type'
import { CSSProperties } from 'react'

export const DEVICE_BREAK_POINT = {
  mobile: 360,
  tablet: 768,
  pc: 1040,
} as const

export const responsiveStyle = ({
  mobile,
  tablet,
  custom,
}: Partial<Record<Device, CSSProperties>> & {
  custom?: {
    value: number
    css: CSSProperties
  }
}): StyleRule => ({
  '@media': {
    [`screen and (max-width: ${DEVICE_BREAK_POINT.pc}px)`]: tablet ?? {},
    [`screen and (max-width: ${DEVICE_BREAK_POINT.tablet}px)`]: mobile ?? {},
    ...(custom?.value
      ? { [`screen and (max-width: ${custom.value}px)`]: custom.css }
      : {}),
  },
})
