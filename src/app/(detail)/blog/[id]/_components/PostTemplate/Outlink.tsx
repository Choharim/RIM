import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

import * as styles from './outlink.css'
const Outlink = ({
  children,
  ...linkAttributes
}: ComponentPropsWithoutRef<'a'>) => {
  const { href = '' } = linkAttributes

  return (
    <Link
      {...linkAttributes}
      href={href}
      target="_blank"
      rel="noreferrer"
      className={styles.wrapper}
    >
      {children}
    </Link>
  )
}

export default Outlink
