// 'use client'

import { useEffect, useRef, useState } from 'react'

export default function Logo() {
  const rRef = useRef<SVGPathElement>(null)
  const iRef = useRef<SVGPathElement>(null)
  const cRef = useRef<SVGPathElement>(null)
  const kRef = useRef<SVGPathElement>(null)
  const [rPathLength, setrPathLength] = useState(0)
  const [iPathLength, setiPathLength] = useState(0)
  const [cPathLength, setcPathLength] = useState(0)
  const [kPathLength, setkPathLength] = useState(0)

  useEffect(() => {
    if (rRef.current) {
      setrPathLength(rRef.current.getTotalLength())
    }
    if (iRef.current) {
      setiPathLength(iRef.current.getTotalLength())
    }
    if (cRef.current) {
      setcPathLength(cRef.current.getTotalLength())
    }
    if (kRef.current) {
      setkPathLength(kRef.current.getTotalLength())
    }
  }, [])

  return (
    <article className="group/ellian-logo w-12 h-12">
      <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" id='ellian-logo'>
        <path ref={rRef} d="M57 215L57 371.336M377 375H57" stroke="currentColor" strokeWidth="30" strokeLinecap="square" id='ellian-logo-r'
          style={{
            strokeDasharray: rPathLength,
            strokeDashoffset: rPathLength,
            animation: 'dash 1s ease-in-out 1s forwards',
          }} />
        <path ref={iRef} d="M97 55L97 215H266" stroke="currentColor" strokeWidth="30" strokeLinecap="square" id='ellian-logo-i' style={{
          strokeDasharray: iPathLength,
          strokeDashoffset: iPathLength,
          animation: 'dash 1s ease-in-out 1.5s forwards',
        }} />
        <path ref={cRef} d="M297 255L457 255M457 95V247.5" stroke="currentColor" strokeWidth="30" strokeLinecap="square" id='ellian-logo-c' style={{
          strokeDasharray: cPathLength,
          strokeDashoffset: cPathLength,
          animation: 'dash 1s ease-in-out 2s forwards',
        }} />
        <path ref={kRef} d="M137 455L457 455V295L297 295" stroke="currentColor" strokeWidth="30" strokeLinecap="square" id='ellian-logo-k' style={{
          strokeDasharray: kPathLength,
          strokeDashoffset: kPathLength,
          animation: 'dash 1s ease-in-out 2.5s forwards',
        }} />
        <path d="M1 492H513V512H1V492Z" fill="currentColor" />
        <path d="M10 0H522V20H10V0Z" fill="currentColor" />
        <path d="M21 -1V511H1V-1H21Z" fill="currentColor" />
        <path d="M512 -7V505H492V-7H512Z" fill="currentColor" />`
      </svg>
    </article>
  )
}
