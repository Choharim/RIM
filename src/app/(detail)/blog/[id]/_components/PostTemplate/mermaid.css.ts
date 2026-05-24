import { style } from '@vanilla-extract/css'

export const base = style({
  margin: '16px 0',
  display: 'flex',
  justifyContent: 'center',
  overflowX: 'auto',
})

export const fallback = style({
  margin: '16px 0',
  padding: '16px',
  borderRadius: '4px',
  backgroundColor: '#1e1e1e',
  color: '#d4d4d4',
  overflowX: 'auto',
  whiteSpace: 'pre',
  fontFamily: `'Consolas', 'Courier New', monospace`,
  fontSize: '14px',
  lineHeight: '1.5',
})
