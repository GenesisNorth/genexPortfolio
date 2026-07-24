"use client"

import { useState, type FormEvent } from "react"
import { MacWindow, Prompt } from "@/components/mac-window"

const EMAIL = "habilagenesis@gmail.com"

export function ContactSection() {
  const [sent, setSent] = useState(false)

  // No backend — compose a mailto so the Send button actually does something.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get("name") ?? "")
    const email = String(form.get("email") ?? "")
    const message = String(form.get("message") ?? "")
    const subject = encodeURIComponent(`Portfolio contact from ${name || "someone"}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <MacWindow id="contact" title="genesis@habila: ~/contact — -zsh">
      <Prompt path="~">cat contact.json</Prompt>
      <pre className="term-json">
        {"{"}
        {"\n  "}
        <span className="json-key">"email"</span>: <a className="json-link" href={`mailto:${EMAIL}`}>"{EMAIL}"</a>,
        {"\n  "}
        <span className="json-key">"phone"</span>:{" "}
        <a className="json-link" href="tel:+2349068388713">"(+234) 906 838 8713"</a>,
        {"\n  "}
        <span className="json-key">"github"</span>:{" "}
        <a className="json-link" href="https://github.com/GenesisNorth" target="_blank" rel="noopener noreferrer">
          "github.com/GenesisNorth"
        </a>
        ,
        {"\n  "}
        <span className="json-key">"linkedin"</span>:{" "}
        <a
          className="json-link"
          href="https://linkedin.com/in/habilagenesis"
          target="_blank"
          rel="noopener noreferrer"
        >
          "linkedin.com/in/habilagenesis"
        </a>
        ,
        {"\n  "}
        <span className="json-key">"availability"</span>: <span className="json-val">"Open to Development opportunities"</span>
        {"\n}"}
      </pre>

      <Prompt path="~">./send-message.sh</Prompt>
      <p className="term-out term-muted">
        // Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
      </p>

      <form className="term-form" onSubmit={handleSubmit}>
        <label className="term-field">
          <span className="term-field-label">$ name:</span>
          <input name="name" type="text" required placeholder="your name" autoComplete="name" />
        </label>
        <label className="term-field">
          <span className="term-field-label">$ email:</span>
          <input name="email" type="email" required placeholder="you@domain.com" autoComplete="email" />
        </label>
        <label className="term-field term-field-block">
          <span className="term-field-label">$ message:</span>
          <textarea name="message" required rows={4} placeholder="type your message..." />
        </label>
        <button type="submit" className="btn-retro term-submit">
          SEND_MESSAGE
        </button>
        {sent && (
          <p className="term-out term-accent" role="status">
            → opening your mail client... <span className="cursor-blink">_</span>
          </p>
        )}
      </form>
    </MacWindow>
  )
}
