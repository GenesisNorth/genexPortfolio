"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

/** Terminal-style `[ light ]` / `[ dark ]` switch. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = !mounted || resolvedTheme !== "light"
  const next = isDark ? "light" : "dark"

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {/* Render a stable label until mounted to avoid a hydration mismatch */}
      <span aria-hidden="true" className="toggle-long">
        {mounted ? `[ ${next} ]` : "[ theme ]"}
      </span>
      {/* Compact glyph for narrow headers */}
      <span aria-hidden="true" className="toggle-short">
        [{isDark ? "☀" : "☾"}]
      </span>
    </button>
  )
}
