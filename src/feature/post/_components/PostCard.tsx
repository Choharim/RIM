import React, { ComponentProps, PropsWithChildren } from 'react'

import Typo from '@/components/Typo'
import Flex from '@/components/Flex'

import * as styles from './postCard.css'
import { PostFrontMatter } from '@/entity/post/type'
import Link from 'next/link'
import AppFeature from '@/feature/application'

interface Props {
  id: PostFrontMatter['id']
}
const PostCard = ({ children, id }: PropsWithChildren<Props>) => {
  return (
    <Flex
      direction="column"
      as="article"
      justify="between"
      className={styles.wrapper}
    >
      {children}
      <Link
        href={AppFeature.getAppURI({
          name: 'blogDetails',
          pathParams: { id },
        })}
        className={styles.link}
      />
    </Flex>
  )
}

export default Object.assign(PostCard, {
  Title,
  Desc,
  Date,
  LabelSection,
  Body,
  Footer,
})

function Title({ children }: PropsWithChildren) {
  return (
    <Typo
      as="span"
      variety="title_1"
      color="grey900"
      lineClamp={2}
      className={styles.title}
    >
      {children}
    </Typo>
  )
}

function Desc({ children }: PropsWithChildren) {
  return (
    <Typo as="p" variety="body_1" color="grey800" lineClamp={2}>
      {children}
    </Typo>
  )
}

function LabelSection({ children }: PropsWithChildren) {
  return (
    <Flex align="center" gap={'8px'} className={styles.labelContainer}>
      {children}
    </Flex>
  )
}

function Body({ children }: PropsWithChildren) {
  return (
    <Flex direction="column" gap="8px">
      {children}
    </Flex>
  )
}

function Footer({ children }: PropsWithChildren) {
  return (
    <Flex justify="between" align="end" gap={'10px'} className={styles.footer}>
      {children}
    </Flex>
  )
}

function Date({ dateTime }: Pick<ComponentProps<'time'>, 'dateTime'>) {
  return (
    <Typo
      as="time"
      dateTime={dateTime}
      variety="detail_2"
      color="grey600"
      className={styles.date}
    >
      {dateTime}
    </Typo>
  )
}
