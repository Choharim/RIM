import { Device, FontKey } from './type'

const FONT = {
  // 헤더 (대형 제목)
  header_1: {
    fontSize: '2rem', // 32px
    lineHeight: '1.35',
    fontWeight: 600,
  },
  header_2: {
    fontSize: '1.75rem', // 28px
    lineHeight: '1.4',
    fontWeight: 600,
  },
  header_3: {
    fontSize: '1.5rem', // 24px
    lineHeight: '1.45',
    fontWeight: 600,
  },

  // 타이틀 (중간 제목)
  title_1: {
    fontSize: '1.375rem', // 22px
    lineHeight: '1.5',
    fontWeight: 500,
  },
  title_2: {
    fontSize: '1.25rem', // 20px
    lineHeight: '1.55',
    fontWeight: 500,
  },
  title_3: {
    fontSize: '1.125rem', // 18px
    lineHeight: '1.6',
    fontWeight: 500,
  },

  // 서브타이틀 (문단 제목)
  subtitle_1: {
    fontSize: '1rem', // 16px
    lineHeight: '1.7',
    fontWeight: 500,
  },
  subtitle_2: {
    fontSize: '0.9375rem', // 15px
    lineHeight: '1.75',
    fontWeight: 500,
  },
  subtitle_3: {
    fontSize: '0.875rem', // 14px
    lineHeight: '1.75',
    fontWeight: 500,
  },

  // 캡션 / 메타 정보
  caption_1: {
    fontSize: '0.8125rem', // 13px
    lineHeight: '1.75',
    fontWeight: 500,
  },
  caption_2: {
    fontSize: '0.75rem', // 12px
    lineHeight: '1.75',
    fontWeight: 500,
  },

  // 본문
  body_1: {
    fontSize: '1rem', // 16px
    lineHeight: '1.75',
    fontWeight: 400,
  },
  body_2: {
    fontSize: '0.9375rem', // 15px
    lineHeight: '1.75',
    fontWeight: 400,
  },

  // 디테일
  detail_1: {
    fontSize: '0.875rem', // 14px
    lineHeight: '1.75',
    fontWeight: 400,
  },
  detail_2: {
    fontSize: '0.8125rem', // 13px
    lineHeight: '1.75',
    fontWeight: 400,
  },
} as const

export default FONT

const RESPONSIVE_FONT: Partial<
  Record<FontKey, Partial<Record<Device, FontKey>>>
> = {
  header_1: {
    mobile: 'header_2',
  },
  header_2: {
    mobile: 'header_3',
  },
  header_3: {
    mobile: 'title_1',
  },
  title_1: {
    mobile: 'title_2',
  },
  title_2: {
    mobile: 'title_3',
  },
  title_3: {
    mobile: 'subtitle_1',
  },
  subtitle_1: {
    mobile: 'subtitle_2',
  },
}

export const getResponsiveFont = (font: FontKey): Record<Device, FontKey> => {
  const responsiveFont = RESPONSIVE_FONT[font] ?? {}

  return {
    pc: font,
    tablet: responsiveFont.tablet || font,
    mobile: responsiveFont.mobile || font,
  }
}
