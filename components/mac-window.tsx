import type { ReactNode } from "react"

/**
 * Authentic macOS terminal/app window chrome: graphite title bar with the three
 * traffic-light controls on the left and a centered monospace title. Body is a
 * black terminal surface. Green frame + accents keep it on-theme.
 */
export function MacWindow({
  title,
  id,
  children,
  className,
}: {
  title: string
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`mac-window ${className ?? ""}`}>
      <div className="mac-titlebar">
        <div className="mac-dots" aria-hidden="true">
          <span className="mac-dot mac-dot-red" />
          <span className="mac-dot mac-dot-yellow" />
          <span className="mac-dot mac-dot-green" />
        </div>
        <span className="mac-title">{title}</span>
      </div>
      <div className="mac-body">{children}</div>
    </section>
  )
}

/** A shell prompt line: `➜  ~/path  command` in the oh-my-zsh style. */
export function Prompt({ path = "~", children }: { path?: string; children?: ReactNode }) {
  return (
    <div className="term-line">
      <span className="term-arrow">➜</span> <span className="term-path">{path}</span>{" "}
      <span className="term-cmd">{children}</span>
    </div>
  )
}
