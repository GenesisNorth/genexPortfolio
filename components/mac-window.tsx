import type { ReactNode } from "react"

/**
 * Title bar shared by every window on the page (sections, hero portrait,
 * project cards): three phosphor "traffic lights" on the left and a centered
 * monospace title. Purely decorative controls, so they're hidden from AT.
 */
export function WindowBar({ title }: { title: string }) {
  return (
    <div className="win-bar">
      <span className="win-dots" aria-hidden="true">
        <span className="win-dot" />
        <span className="win-dot" />
        <span className="win-dot" />
      </span>
      <span className="win-title">{title}</span>
    </div>
  )
}

/** A full terminal window section: title bar + terminal body. */
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
    <section id={id} className={`win win-section ${className ?? ""}`}>
      <WindowBar title={title} />
      <div className="win-body">{children}</div>
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
