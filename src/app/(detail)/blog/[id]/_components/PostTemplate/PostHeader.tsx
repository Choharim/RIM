import { PostFrontMatter } from '@/entity/post/type'

import Typo from '@/components/Typo'
import Flex from '@/components/Flex'

import * as style from './postHeader.css'
import CategoryLabel from '@/feature/post/_components/CategoryLabel'
import CategoryTag from '@/feature/post/_components/CategoryTag'

type Props = {
  frontMatter: PostFrontMatter
}

const PostHeader = ({ frontMatter }: Props) => {
  const { title, create_date, category, description, tag } = frontMatter

  return (
    <Flex direction="column" className={style.wrapper} gap="12px">
      <Typo as="h1" variety="header_1" color="grey900">
        {title}
      </Typo>

      <Flex align="center" gap={'12px'}>
        <CategoryLabel size="m">{category}</CategoryLabel>
        {tag.map((t, i) => (
          <CategoryTag size="m" key={`${t}-${i}`}>
            {t}
          </CategoryTag>
        ))}
        <Typo color="grey400">|</Typo>
        <Typo as="time" dateTime={create_date} variety="body_2" color="grey700">
          {create_date}
        </Typo>
      </Flex>

      <Typo as="p" variety="body_1" color="grey800">
        {description}
      </Typo>
    </Flex>
  )
}

export default PostHeader
