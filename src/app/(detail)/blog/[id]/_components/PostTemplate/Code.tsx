import { combineClassName } from '@/styles/mixin'
import { ComponentProps } from 'react'
import { NotionComponents } from 'react-notion-x'
import { Code as NotionCode } from 'react-notion-x/build/third-party/code'
import * as style from './code.css'
import Mermaid from './Mermaid'

type Props = ComponentProps<NotionComponents['Code']>

// Notion 텍스트는 [["조각1"], ["조각2", 데코]] 형태의 decoration 배열로 들어온다.
type Decoration = [string, ...unknown[]]

/** decoration 배열에서 순수 텍스트만 이어붙인다. (조각이 나뉘어 와도 안전) */
const getPlainText = (decorations: Decoration[] | undefined): string =>
  (decorations ?? []).map(([text]) => text).join('')

// react-notion-x가 <code>에 붙이는 `language-${lang}`과 정규화 규칙을 맞춘다.
const LANGUAGE_ALIASES: Record<string, string> = {
  'c++': 'cpp',
  'f#': 'fsharp',
}

/**
 * 코드 블록의 언어를 react-notion-x의 `language-${lang}` className과 동일하게
 * 정규화해 반환한다. (소문자화 + 별칭 치환)
 */
const getLanguage = (block: Props['block']): string => {
  const language = getPlainText(block?.properties?.language).toLowerCase()
  return LANGUAGE_ALIASES[language] ?? language
}

const Code = (props: Props) => {
  // Notion의 Mermaid 코드 블록은 다이어그램으로 렌더한다.
  if (getLanguage(props.block) === 'mermaid') {
    return <Mermaid chart={getPlainText(props.block?.properties?.title)} />
  }

  return (
    <NotionCode
      {...props}
      className={combineClassName(props.className, style.base)}
    />
  )
}

export default Code
