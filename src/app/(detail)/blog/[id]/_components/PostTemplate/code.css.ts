import { globalStyle, style } from '@vanilla-extract/css'

export const base = style({
  margin: '16px 0',
  padding: '16px',
  borderRadius: '4px',
  backgroundColor: '#1e1e1e !important', // 덮어씌우기 방지
  overflowX: 'auto',
  fontFamily: `'Consolas', 'Courier New', monospace`,
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#d4d4d4', // 기본 텍스트 색상 (VSCode 기본 색상)
})

globalStyle(`${base} code`, {
  width: '100%',
  display: 'block',
  whiteSpace: 'pre',
  wordBreak: 'normal',
})

globalStyle(`${base} .notion-code-copy`, {
  display: 'none',
})

globalStyle(`${base} .comment`, {
  color: '#6a9955', // 초록색 (주석)
})

globalStyle(`${base} .keyword`, {
  color: '#569cd6', // 파란색 (키워드)
  fontWeight: 'bold',
})

globalStyle(`${base} .function`, {
  color: '#dcdcaa', // 노란색 (함수명)
})

globalStyle(`${base} .operator`, {
  color: '#d4d4d4', // 기본 텍스트 색상과 동일
})

globalStyle(`${base} .string`, {
  color: '#ce9178', // 주황색 (문자열)
})

globalStyle(`${base} .literal-property`, {
  color: '#9cdcfe', // 밝은 하늘색 (속성)
})

globalStyle(`${base} .imports.maybe-class-name`, {
  color: '#4ec9b0', // 청록색 (import, class)
})

globalStyle(`${base} .parameter, ${base} .maybe-class-name`, {
  color: '#9cdcfe', // 밝은 하늘색 (매개변수, 클래스 이름)
})

globalStyle(`${base} .module`, {
  color: '#4ec9b0', // 청록색 (모듈)
})

globalStyle(`${base} .plain`, {
  color: '#d4d4d4', // 기본 텍스트 색상
})
