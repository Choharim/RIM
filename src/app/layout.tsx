import { BLOG, AUTHOR_NAME } from '@/feature/application/constants/owner'
import { METADATA } from '@/feature/seo/constants/metadata'
import type { Metadata } from 'next'

import localFont from 'next/font/local'
import 'src/styles/globalStyle.css'

const pretendardFont = localFont({
  src: [
    {
      path: '../../public/font/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../public/font/Pretendard-Medium.woff2',
      weight: '500',
    },
    {
      path: '../../public/font/Pretendard-SemiBold.woff2',
      weight: '600',
    },
  ],
  variable: '--font-pretendard',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${METADATA.title}`,
    default: `${METADATA.title}`,
  },
  keywords: METADATA.keword,
  applicationName: METADATA.title,
  authors: [{ name: AUTHOR_NAME.en, url: BLOG.domain }],
  openGraph: {
    title: {
      template: `%s | ${METADATA.title}`,
      default: METADATA.title,
    },
    locale: 'ko_KR',
    type: 'website',
    siteName: METADATA.title,
  },
  metadataBase: new URL(BLOG.domain),
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  // 레이아웃은 children prop을 받아야 합니다.
  // 이는 중첩된 레이아웃 또는 페이지로 채워집니다.
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <meta
        name="google-site-verification"
        content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
      />
      <body className={pretendardFont.className}>{children}</body>
    </html>
  )
}
