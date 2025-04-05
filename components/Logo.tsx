// 'use client'

import { useEffect, useRef, useState } from 'react'

export default function Logo() {
  const outlineRef = useRef<SVGPathElement>(null)
  const topRef = useRef<SVGPathElement>(null)
  const BottomRef = useRef<SVGPathElement>(null)
  const [outlinePathLength, setOutlinePathLength] = useState(0)
  const [topPathLength, setTopPathLength] = useState(0)
  const [bottomPathLength, setBottomPathLength] = useState(0)

  useEffect(() => {
    if (outlineRef.current) {
      setOutlinePathLength(outlineRef.current.getTotalLength())
    }

    if (topRef.current) {
      setTopPathLength(topRef.current.getTotalLength())
    }
    if (BottomRef.current) {
      setBottomPathLength(BottomRef.current.getTotalLength())
    }
  }, [])

  return (
    <article className="group/logo size-12">
      <svg
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="svg-logo"
      >
        <path
          ref={outlineRef}
          d="M14 10H466V462H14V10Z"
          stroke="currentColor"
          strokeWidth="20"
          strokeLinecap="square"
          id="outline"
          style={{
            strokeDasharray: outlinePathLength,
            strokeDashoffset: outlinePathLength,
            animation: 'dash 1.25s ease-in-out 1s forwards',
          }}
        />
        <path
          ref={topRef}
          d="M105 386V86H255"
          stroke="currentColor"
          strokeWidth="60"
          strokeLinecap="square"
          id="top"
          style={{
            strokeDasharray: topPathLength,
            strokeDashoffset: topPathLength,
            animation: 'dash .75s ease-in-out 1.2s forwards',
          }}
        />
        <path
          ref={BottomRef}
          d="M375 86V386H225"
          stroke="currentColor"
          strokeWidth="60"
          strokeLinecap="square"
          id="bottom"
          style={{
            strokeDasharray: bottomPathLength,
            strokeDashoffset: bottomPathLength,
            animation: 'dash .75s ease-in-out 1.2s forwards',
          }}
        />
      </svg>
    </article>
  )
}
