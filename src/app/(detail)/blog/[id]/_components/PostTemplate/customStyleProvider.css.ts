import { globalStyle, style } from '@vanilla-extract/css'
import FONT from '@/styles/font'
import { convertHEXToRGB } from '@/shared/_utils'
import COLOR from '@/styles/color'

export const base = style({})

// Global 스타일 정의
globalStyle(`${base} main`, {
  padding: 0,
  margin: 0,
  width: '100%',
})

globalStyle(`${base} h2, h3, h4`, {
  color: COLOR.grey800,
})

globalStyle(`${base} h2`, {
  margin: '35px 0 20px',
  ...FONT.header_1,
})

globalStyle(`${base} h3`, {
  margin: '30px 0 15px',
  ...FONT.header_2,
})

globalStyle(`${base} h4`, {
  margin: '25px 0 10px',
  ...FONT.header_3,
})

globalStyle(`${base} div, div code`, {
  ...FONT.body_1,
  color: COLOR.grey900,
})

globalStyle(`${base} div`, {
  marginBottom: '12px',
})

globalStyle(`${base} div:last-child`, {
  marginBottom: '0',
})

globalStyle(`${base} strong`, {
  ...FONT.subtitle_1,
  color: COLOR.primary500,
})

globalStyle(`${base} ol, ul`, {
  ...FONT.body_1,
  listStylePosition: 'inside',
  paddingInlineStart: 1,
  color: COLOR.grey900,
  display: 'grid',
  padding: 0,
})

globalStyle(`${base} ol`, {
  listStyleType: 'decimal',
})

globalStyle(`${base} ul`, {
  listStyleType: 'disc',
})

globalStyle(`${base} li::marker`, {
  ...FONT.body_1,
})

globalStyle(`${base} .notion-list li`, {
  padding: '2px 0',
})

globalStyle(`${base} blockquote`, {
  padding: '8px 10px 8px 20px',
  margin: '20px 0',
  ...FONT.subtitle_1,
  borderLeft: `4px solid ${COLOR.primary400}`,
  backgroundColor: COLOR.primary50,
  borderRadius: '4px',
})
globalStyle(`${base} blockquote div`, {
  ...FONT.subtitle_1,
})

globalStyle(`${base} blockquote code`, {
  color: COLOR.primary400,
})

globalStyle(`${base} .notion-inline-underscore`, {
  textDecoration: 'none',
  boxShadow: `inset 0 -8px 0 rgba(${convertHEXToRGB(COLOR.primary200)}, 0.7)`,
})

globalStyle(`${base} .notion-callout ul,${base} .notion-callout ol`, {
  marginTop: 0,
  marginBottom: 0,
})

globalStyle(
  `${base} div code,${base} li code,${base} .notion-callout code,${base} .notion-inline-code`,
  {
    display: 'inline',
    borderRadius: '0px',
    padding: '0.2em 0',
    fontFamily: 'inherit',
    ...FONT.body_1,
    fontWeight: 600,
    color: COLOR.grey900,
    backgroundColor: `rgba(${convertHEXToRGB(COLOR.primary300)}, 0.3)`,
  }
)

globalStyle(`${base} .notion-viewport:empty`, {
  display: 'none',
})
