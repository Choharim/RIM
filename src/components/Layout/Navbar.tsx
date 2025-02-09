'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Frame from './Frame'
import Logo from '../Logo'
import Flex from '../Flex'

import useScrollDirection from '@/hooks/useScrollDirection'
import useScrollTop from '@/hooks/useScrollTop'
import * as styles from './navbar.css'
import AppFeature from '@/feature/application'
import Icon from '../Icon'
import { Either } from '@/shared/_types'
import Typo from '../Typo'
import { IconType } from '../Icon/shared'
import { combineClassName } from '@/styles/mixin'

type TextMenu = {
  href: string
} & Either<{ iconType: IconType }, { label: string }>

const MENUS: Readonly<Array<TextMenu>> = [
  {
    href: AppFeature.URL.github,
    iconType: 'GithubMark',
  },
]

const SCROLL_THRESHOLD = 30

const Navbar = () => {
  const direction = useScrollDirection(SCROLL_THRESHOLD)
  const isScrollTop = useScrollTop()
  const pathname = usePathname()

  return (
    <nav
      className={styles.navigation}
      data-hidden={direction === 'down' && !isScrollTop}
    >
      <Frame className={styles.navigationFrame}>
        <Logo />

        <Flex as="ul" align="center" gap={'10px'}>
          {MENUS.map((menu, i) => {
            const isActive = pathname === menu.href

            return (
              <li
                key={`menu_${i}`}
                className={combineClassName(
                  styles.menuWrapper,
                  menu.label ? styles.label : ''
                )}
                data-active={isActive}
              >
                {menu.iconType ? (
                  <Icon
                    type={menu.iconType}
                    color={'inherit'}
                    className={styles.icon}
                  />
                ) : (
                  <Typo
                    variety="subtitle_2"
                    color={'inherit'}
                    className={styles.label}
                  >
                    {menu.label}
                  </Typo>
                )}

                <Link
                  href={menu.href}
                  target={AppFeature.isOutLink(menu.href) ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={styles.link}
                />
              </li>
            )
          })}
        </Flex>
      </Frame>
    </nav>
  )
}

export default Navbar
