"use client"

import { useEffect, useState } from "react"

/**
 * Types out `text` one character at a time on mount, with a trailing cursor
 * until it finishes. Under prefers-reduced-motion it renders the full text
 * immediately — no animation.
 */
export function Typed({
  text,
  speed = 55,
  startDelay = 300,
  className,
  cursor = true,
}: {
  text: string
  speed?: number
  startDelay?: number
  className?: string
  cursor?: boolean
}) {
  const [shown, setShown] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text)
      setDone(true)
      return
    }

    let cancelled = false
    const timers: number[] = []
    const sleep = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)))

    ;(async () => {
      await sleep(startDelay)
      for (let i = 1; i <= text.length; i++) {
        if (cancelled) return
        await sleep(speed)
        setShown(text.slice(0, i))
      }
      if (!cancelled) setDone(true)
    })()

    return () => {
      cancelled = true
      timers.forEach((t) => clearTimeout(t))
    }
  }, [text, speed, startDelay])

  return (
    <span className={className}>
      {shown}
      {cursor && !done && <span className="cursor-blink">_</span>}
    </span>
  )
}
