import React, { PropsWithChildren } from 'react'

import Frame from './Frame'
import Navbar from './Navbar'
import Footer from './Footer'
import Flex from '../flex'
import * as style from './style/layout.css'

interface Props {
  resetFrameStyle?: boolean
  hasFooter?: boolean
}

const Layout = ({
  resetFrameStyle,
  children,
  hasFooter = true,
}: PropsWithChildren<Props>) => {
  return (
    <Flex direction="column">
      <Navbar />
      {resetFrameStyle ? (
        <main>{children}</main>
      ) : (
        <Frame as="main" className={style.main}>
          {children}
        </Frame>
      )}
      {hasFooter && <Footer />}
    </Flex>
  )
}

export default Layout
