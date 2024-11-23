import postFeature from '@/feature/post'
import { PostCategory } from '@/entity/post/type'
import Chip from '@/components/Chip'
import AppFeature from '@/feature/application'
import Link from 'next/link'
import * as styles from './style/categoryChip.css'
import { ComponentProps } from 'react'
interface Props extends Pick<ComponentProps<typeof Chip>, 'size'> {
  children: PostCategory
}
const CategoryChip = ({ children: category, size }: Props) => {
  return (
    <Link
      href={AppFeature.getAppURI({
        name: 'category',
        pathParams: { category },
      })}
      className={styles.link}
    >
      <Chip color="primary" size={size} variety="soft">
        {postFeature.getCategoryName(category)}
      </Chip>
    </Link>
  )
}

export default CategoryChip
