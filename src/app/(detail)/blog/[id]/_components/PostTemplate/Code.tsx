import { ComponentProps } from 'react'
import { NotionComponents } from 'react-notion-x'
import { Code as NotionCode } from 'react-notion-x/build/third-party/code'
import * as style from './code.css'
type Props = ComponentProps<NotionComponents['Code']>

const Code = (props: Props) => {
  return <NotionCode {...props} className={style.base} />
}
export default Code
