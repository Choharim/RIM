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
    // chart가 바뀌어 재시도할 때 이전 실패 상태를 초기화한다. (초기화하지 않으면
    // fallback 상태에 갇혀 div가 렌더되지 않아 다이어그램을 다시 그릴 수 없다)
    setFailed(false)

    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          // strict는 라벨 텍스트를 DOMPurify로 정제(XSS 방어)하며, <br> 줄바꿈은 그대로 유지된다.
          securityLevel: 'strict',
          flowchart: { useMaxWidth: true },
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
