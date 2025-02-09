'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Frame from './Frame'
import Logo from '../Logo'
import Flex from '../Flex'
import Typo from '../Typo'

import useScrollDirection from '@/hooks/useScrollDirection'
import useScrollTop from '@/hooks/useScrollTop'
import * as style from './navbar.css'
import AppFeature from '@/feature/application'

type TextMenu = {
  href: string
  isOutlink?: boolean
  label: string
}

const MENUS: Readonly<Array<TextMenu>> = [
  {
    href: AppFeature.URL.github,
    isOutlink: true,
    label: 'Github',
  },
]

const SCROLL_THRESHOLD = 30

const Navbar = () => {
  const direction = useScrollDirection(SCROLL_THRESHOLD)
  const isScrollTop = useScrollTop()
  const pathname = usePathname()

  return (
    <nav
      className={style.navigation}
      data-hidden={direction === 'down' && !isScrollTop}
    >
      <Frame className={style.navigationFrame}>
        <Logo />

        <Flex as="ul">
          {MENUS.map((menu, i) => {
            const isActive = pathname === menu.href

            return (
              <li
                key={`menu_${i}`}
                className={style.menuWrapper}
                data-active={isActive}
              >
                <Link
                  href={menu.href}
                  target={menu.isOutlink ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                >
                  <Typo
                    className={style.menu}
                    variety="subtitle_2"
                    color="grey700"
                  >
                    {menu.label}
                  </Typo>
                </Link>
              </li>
            )
          })}
        </Flex>
      </Frame>
    </nav>
  )
}

export default Navbar
