import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Frame from './Frame'
import Logo from '../Logo'
import Flex from '../flex'
import Typo from '../typo'

import { GITHUB_URL } from '@/feature/app/constants/owner'
import useScrollDirection from '@/hooks/useScrollDirection'
import useScrollTop from '@/hooks/useScrollTop'
import * as style from './style/navbar.css'
import { assignInlineVars } from '@vanilla-extract/dynamic'

type TextMenu = {
  href: string
  isOutlink?: boolean
  label: string
}

const MENUS: Readonly<Array<TextMenu>> = [
  {
    href: GITHUB_URL,
    isOutlink: true,
    label: 'Github',
  },
]

const SCROLL_THRESHOLD = 30

const Navbar = () => {
  const direction = useScrollDirection(SCROLL_THRESHOLD)
  const isScrollTop = useScrollTop()

  return (
    <nav
      className={style.navigation}
      style={assignInlineVars({
        [style.navigationYVar]:
          direction === 'down' && !isScrollTop
            ? style.NAV_Y.hidden
            : style.NAV_Y.show,
      })}
    >
      <Frame className={style.navigationFrame}>
        <Logo isFold />
        <Navbar.Menu />
      </Frame>
    </nav>
  )
}

export default Navbar

Navbar.Menu = React.memo(function Component() {
  const { pathname } = useRouter()

  return (
    <Flex as="ul" align="baseline">
      {MENUS.map((menu, i) => {
        const isActive = pathname === menu.href

        return (
          <li
            key={`menu_${i}`}
            className={style.menuWrapper[isActive ? 'active' : 'default']}
          >
            <Link
              href={menu.href}
              target={menu.isOutlink ? '_blank' : '_self'}
              rel="noopener noreferrer"
            >
              <Typo
                className={style.menu[isActive ? 'active' : 'default']}
                variety="title_3"
                color="grey700"
              >
                {menu.label}
              </Typo>
            </Link>
          </li>
        )
      })}
    </Flex>
  )
})
