import React from 'react'
import Link from 'next/link'

import Typo from '../Typo'
import Flex from '../Flex'

import * as styles from './style.css'
import AppFeature from '@/feature/application'

const alphabets = AppFeature.BLOG_NAME.fullName.split('')
const isInitial = (alphabet: string) => {
  return alphabet.toUpperCase() === alphabet
}

const Logo = () => {
  return (
    <Link href={AppFeature.getAppURI({ name: 'main' })}>
      <Flex align="center">
        {alphabets.map((alphabet, i) => (
          <Typo
            responsive={false}
            key={`${alphabet}_${i}`}
            className={
              styles.wrapper[isInitial(alphabet) ? 'initial' : 'fullname']
            }
            variety="header_2"
            color="primary400"
          >
            {alphabet}
          </Typo>
        ))}

        <Typo
          className={styles.sub}
          as="sub"
          variety="subtitle_3"
          color="grey500"
          responsive={false}
        >
          블로그
        </Typo>
      </Flex>
    </Link>
  )
}

export default React.memo(Logo)
