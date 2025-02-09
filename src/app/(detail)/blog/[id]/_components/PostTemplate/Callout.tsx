import React from 'react'
import { PageBlock } from 'notion-types'
import { getTextContent } from 'notion-utils'

import * as styles from './callout.css'
import Flex from '@/components/Flex'
import Typo from '@/components/Typo'

interface Props {
  block: PageBlock
}
const Callout = ({ block }: Props) => {
  const text = getTextContent(block.properties?.title) || ''
  const emoji = block.format?.page_icon || '💡'

  return (
    <div className={styles.bg}>
      <Flex as="article" gap={'15px'} className={styles.card}>
        <span className={styles.emoji}>{emoji}</span>

        <Typo as="p" variety="body_1">
          {text}
        </Typo>
      </Flex>
    </div>
  )
}

export default Callout
