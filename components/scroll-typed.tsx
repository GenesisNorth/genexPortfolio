"use client"

import { useEffect, useRef, useState, type ElementType, type CSSProperties } from "react"

interface ScrollTypedProps {
  text: string
  as?: ElementType
  className?: string
  style?: CSSProperties
  speed?: number
  delay?: number
  threshold?: number
  cursor?: boolean
}

/**
 * ScrollTyped: Animates text with a fast typing effect as the element scrolls into view.
 * 
 * - Preserves exact layout dimensions via an invisible ghost layer to eliminate CLS (layout shifts).
 * - Types quickly and adaptively so long paragraphs don't take forever to read.
 * - Respects prefers-reduced-motion and displays full text immediately on SSR.
 */
export function ScrollTyped({
  text,
  as: Tag = "p",
  className,
  style,
  speed,
  delay = 0,
  threshold = 0.15,
  cursor = true,
}: ScrollTypedProps) {
  const ref = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const [visibleChars, setVisibleChars] = useState(0)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true)
      return
    }

    // Adaptive speed: fast typing for longer paragraphs so they display completely without lag
    const charInterval = speed ?? (text.length > 200 ? 8 : text.length > 100 ? 10 : 13)
    const step = text.length > 240 ? 3 : text.length > 100 ? 2 : 1

    let timer: number | null = null
    let delayTimer: number | null = null
    let cancelled = false

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !cancelled) {
          observer.disconnect()
          delayTimer = window.setTimeout(() => {
            if (cancelled) return
            setStarted(true)
            let current = 0
            timer = window.setInterval(() => {
              if (cancelled) return
              current = Math.min(current + step, text.length)
              setVisibleChars(current)
              if (current >= text.length) {
                if (timer) window.clearInterval(timer)
                setDone(true)
              }
            }, charInterval)
          }, delay)
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    )

    observer.observe(el)

    return () => {
      cancelled = true
      observer.disconnect()
      if (timer) window.clearInterval(timer)
      if (delayTimer) window.clearTimeout(delayTimer)
    }
  }, [mounted, text, speed, delay, threshold])

  // SSR or reduced motion or completed: render full clean text
  if (!mounted || done) {
    return (
      <Tag ref={ref as any} className={className} style={style}>
        {text}
      </Tag>
    )
  }

  const typed = text.slice(0, visibleChars)
  const remaining = text.slice(visibleChars)

  return (
    <Tag ref={ref as any} className={className} style={style}>
      <span>{typed}</span>
      {cursor && started && !done && <span className="cursor-blink">_</span>}
      <span
        style={{
          visibility: "hidden",
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {remaining}
      </span>
    </Tag>
  )
}
