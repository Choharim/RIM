'use client'

import { useEffect, useId, useRef, useState } from 'react'
import * as style from './mermaid.css'

interface Props {
  chart: string
}

/**
 * Notion의 "Mermaid" 코드 블록을 다이어그램(SVG)으로 렌더한다.
 * react-notion-x 기본 Code 컴포넌트는 mermaid를 그리지 못하고 raw 텍스트로 보여주므로,
 * 이 컴포넌트에서 mermaid를 동적 import해 직접 렌더한다. (무거운 mermaid 번들은 지연 로드)
 */
const Mermaid = ({ chart }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const rawId = useId()
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9-]/g, '')}`
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          // 블로그 본문은 작성자 소유 콘텐츠이므로 <br> 등 줄바꿈 라벨 렌더를 허용
          securityLevel: 'loose',
          flowchart: { htmlLabels: true, useMaxWidth: true },
        })

        const { svg } = await mermaid.render(id, chart)
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg
        }
      } catch {
        if (!cancelled) setFailed(true)
      }
    }

    render()

    return () => {
      cancelled = true
    }
  }, [chart, id])

  // 파싱 실패 시 원본 코드를 그대로 보여준다.
  if (failed) {
    return <pre className={style.fallback}>{chart}</pre>
  }

  return <div ref={ref} className={style.base} aria-label="diagram" />
}

export default Mermaid
