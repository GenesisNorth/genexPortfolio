"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * Progressive enhancement for the SYSTEM_CONSOLE.EXE block.
 *
 * The static terminal rows stay authored in the page — they are the baseline
 * that renders with no JS and under prefers-reduced-motion. When motion is
 * allowed and the block scrolls into view, this wrapper replays that same
 * content as a live boot: commands type out, progress bars fill, output
 * streams in. Nothing is duplicated; it reads the rows it was handed.
 */
export function TerminalBoot({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    // Guard against React StrictMode double-invoke in dev.
    if (root.dataset.booted) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return // leave the static block as-is

    const rows = Array.from(root.querySelectorAll<HTMLElement>(".terminal-row"))
    if (!rows.length) return
    root.dataset.booted = "1"

    const CELLS = 16

    type Plan =
      | { row: HTMLElement; kind: "command"; el: HTMLElement; full: string }
      | { row: HTMLElement; kind: "bar"; el: HTMLElement; pct: number; label: string }
      | { row: HTMLElement; kind: "output" }

    // Read the authored content, then blank the parts we'll animate.
    const plans: Plan[] = rows.map((row): Plan => {
      const cmd = row.querySelector<HTMLElement>(".command")
      if (cmd) {
        const full = cmd.textContent ?? ""
        cmd.textContent = ""
        return { row, kind: "command", el: cmd, full }
      }
      const out = row.querySelector<HTMLElement>(".output")
      if (out && !out.querySelector(".cursor-blink")) {
        const text = out.textContent ?? ""
        const m = text.match(/^\[[█░]*\]\s*(\d+)%\s*-\s*(.+)$/)
        if (m) {
          const pct = Number(m[1])
          const label = m[2]
          out.textContent = `[${"░".repeat(CELLS)}] 0% - ${label}`
          return { row, kind: "bar", el: out, pct, label }
        }
      }
      return { row, kind: "output" }
    })

    // Hold layout stable (no footer jump) while hidden.
    plans.forEach((p) => {
      p.row.style.visibility = "hidden"
    })

    let cancelled = false
    const timers: number[] = []
    const sleep = (ms: number) =>
      new Promise<void>((res) => timers.push(window.setTimeout(res, ms)))

    const makeCursor = () => {
      const c = document.createElement("span")
      c.className = "cursor-blink"
      c.textContent = "_"
      return c
    }

    async function boot() {
      for (const p of plans) {
        if (cancelled) return
        p.row.style.visibility = "visible"

        if (p.kind === "command") {
          const cursor = makeCursor()
          p.el.appendChild(cursor)
          for (let i = 1; i <= p.full.length; i++) {
            if (cancelled) return
            await sleep(38)
            cursor.remove()
            p.el.textContent = p.full.slice(0, i)
            p.el.appendChild(cursor)
          }
          await sleep(260)
          cursor.remove()
        } else if (p.kind === "bar") {
          const target = Math.round((p.pct / 100) * CELLS)
          for (let f = 1; f <= target; f++) {
            if (cancelled) return
            await sleep(45)
            const pct = f === target ? p.pct : Math.round((f / CELLS) * 100)
            p.el.textContent = `[${"█".repeat(f)}${"░".repeat(CELLS - f)}] ${pct}% - ${p.label}`
          }
          await sleep(150)
        } else {
          await sleep(220)
        }
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect()
          boot()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(root)

    return () => {
      cancelled = true
      timers.forEach((t) => clearTimeout(t))
      io.disconnect()
    }
  }, [])

  return <div ref={ref}>{children}</div>
}
