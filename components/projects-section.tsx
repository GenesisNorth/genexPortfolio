"use client"

import { useState } from "react"
import { WindowBar, Prompt } from "@/components/mac-window"
import { ScrollTyped } from "@/components/scroll-typed"

type Filter = "web" | "mobile" | "blockchain" | "ai"
type Status = "live" | "dev" | "archived"
type ProjectLink = { label: string; href: string }

type Project = {
  slug: string
  name: string
  window: string
  category: string
  filters: Filter[]
  status: Status
  tags: string[]
  desc: string
  /** Screenshot in /public/projects. Omit to fall back to the terminal preview. */
  image?: string
  /** Shown in the terminal fallback preview */
  mark?: string
  links: ProjectLink[]
}

type Repo = {
  name: string
  lang: string
  updated: string
  filters: Filter[]
  desc: string
  href: string
}

const FILTERS: ("all" | Filter)[] = ["all", "web", "mobile", "blockchain", "ai"]

const STATUS_LABEL: Record<Status, string> = {
  live: "● live",
  dev: "◐ in development",
  archived: "○ archived",
}

// Live products people can open and use. The first link is the primary "visit" action.
const PROJECTS: Project[] = [
  {
    slug: "tokenstocks",
    name: "TokenStocks Architecture",
    window: "token-stocks-doc.app",
    category: "Web · Blockchain",
    filters: ["web", "blockchain"],
    status: "live",
    tags: ["stellar", "soroban", "architecture"],
    desc: "Interactive explorer for a tokenized-stocks backend on Stellar/Soroban. Click through services, workflows and the tech stack.",
    image: "/projects/tokenstocks.webp",
    links: [
      { label: "Explore", href: "https://token-stocks-doc.vercel.app" },
      { label: "Source", href: "https://github.com/GenesisNorth/token-stocks-doc" },
    ],
  },
  {
    slug: "spendify",
    name: "Spendify",
    window: "spendify.app",
    category: "Web · Fintech · AI",
    filters: ["web", "mobile", "ai"],
    status: "live",
    tags: ["fintech", "ai-bookkeeping", "budgeting"],
    desc: "AI bookkeeping for personal and business finances. Speak, scan, type or upload what you spent, then see where your money went.",
    image: "/projects/spendify.webp",
    links: [{ label: "Visit", href: "https://spendify.ca" }],
  },
  {
    slug: "places",
    name: "Places",
    window: "useplaces.com",
    category: "Mobile · Social · AI",
    filters: ["mobile", "web", "ai"],
    status: "live",
    tags: ["social", "places-ai", "flutter"],
    desc: "Reconnect with people through the schools, workplaces and neighbourhoods you shared. Build a timeline of places and get matched by the years you overlapped, with Places AI search.",
    image: "/projects/places.webp",
    links: [
      { label: "Visit", href: "https://useplaces.com" },
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.placesapp.places" },
    ],
  },
  {
    slug: "trashcoin",
    name: "TrashCoin",
    window: "trashcoin.app",
    category: "Mobile · Blockchain",
    filters: ["mobile", "blockchain", "web"],
    status: "live",
    tags: ["solana", "flutter", "eco-fintech"],
    desc: "Eco-fintech platform that turns recyclable waste into cash. Drop off waste via the mobile app or USSD and get paid instantly. Built on Solana.",
    image: "/projects/trashcoin.webp",
    links: [
      { label: "Visit", href: "https://trashcoin.eu" },
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=eu.trashcoin" },
      { label: "App Store", href: "https://apps.apple.com/app/trashcoin/id1636559878" },
    ],
  },
  {
    slug: "niteon",
    name: "Niteon",
    window: "niteon.co",
    category: "Mobile · B2B Marketplace",
    filters: ["mobile", "web", "ai"],
    status: "live",
    tags: ["marketplace", "export", "logistics"],
    desc: "AI-assisted B2B trade center connecting Africa's verified manufacturers with global buyers: marketplace, export, logistics and secure payments across four verticals.",
    image: "/projects/niteon.webp",
    links: [
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.niteonapp.app" },
      { label: "Website", href: "https://niteon.co" },
    ],
  },
  {
    slug: "sequoia",
    name: "Sequoia by Fiyin",
    window: "sequoia-fiyin.app",
    category: "Web · E-commerce",
    filters: ["web"],
    status: "live",
    tags: ["e-commerce", "fashion", "typescript"],
    desc: "Luxury fashion and lifestyle storefront for a heritage couture house: collections, boutiques and a full shopping flow.",
    image: "/projects/sequoia.webp",
    links: [{ label: "Visit", href: "https://sequoia-fiyin.vercel.app" }],
  },
  {
    slug: "queens-palm",
    name: "Queens Palm Support Initiative",
    window: "queenspalmsi.org",
    category: "Web · Non-profit",
    filters: ["web"],
    status: "live",
    tags: ["ngo", "education", "nextjs"],
    desc: "Website for an NGO that equips young people with soft skills for life and career, with programs, publications and registration.",
    image: "/projects/queens-palm.webp",
    links: [{ label: "Visit", href: "https://queenspalmsi.org" }],
  },
  {
    slug: "rida-natural",
    name: "Rida Natural",
    window: "rida-natural.app",
    category: "Web · E-commerce",
    filters: ["web"],
    status: "live",
    tags: ["e-commerce", "health", "wellness"],
    desc: "E-commerce store for natural health and wellness products, with multi-currency pricing and live chat.",
    image: "/projects/rida-natural.webp",
    links: [{ label: "Visit", href: "https://ridanatural.com" }],
  },
  {
    slug: "rccg-hh",
    name: "RCCG Halleluyah House",
    window: "rccg-hh-chicago.app",
    category: "Web · Community",
    filters: ["web"],
    status: "live",
    tags: ["church", "community", "typescript"],
    desc: "Website for a Pentecostal church in Grayslake, Illinois, with ministries, prayer requests, giving and a live audio stream.",
    image: "/projects/rccg-hh.webp",
    links: [{ label: "Visit", href: "https://rccg-hh-chicago.vercel.app" }],
  },
  {
    slug: "lsc-abuja",
    name: "LSC Abuja",
    window: "lsc-abuja.app",
    category: "Web · Community",
    filters: ["web"],
    status: "live",
    tags: ["church", "livestream", "react"],
    desc: "Website for Living Seed Church Abuja (The Emerging Generation): watch live, read, and give online.",
    image: "/projects/lsc-abuja.webp",
    links: [{ label: "Visit", href: "https://lscweb.vercel.app" }],
  },
  {
    slug: "afribooking",
    name: "AfriBooking",
    window: "afribooking.app",
    category: "Mobile · Travel",
    filters: ["mobile"],
    status: "live",
    tags: ["booking", "travel", "flutter"],
    desc: "Discover, compare and book hotels, serviced apartments and short stays across major African cities, with owner tools to manage listings and bookings.",
    image: "/projects/afribooking.webp",
    links: [
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.africartz.bookings" },
      { label: "App Store", href: "https://apps.apple.com/app/afribooking-own-manage/id6745455021" },
    ],
  },
]

// Open-source / in-progress work: code to read rather than a product to use.
const REPOS: Repo[] = [
  {
    name: "PhotoGenerator",
    lang: "python",
    updated: "2026-05",
    filters: ["ai"],
    desc: "Synthetic headshot dataset pipeline: ComfyUI + InstantID + JuggernautXL on RunPod, producing identity-consistent neutral/smile pairs at scale.",
    href: "https://github.com/GenesisNorth/PhotoGenerator",
  },
  {
    name: "gratitude-stories",
    lang: "typescript",
    updated: "2026-11",
    filters: ["web"],
    desc: "Physical-gift experience where each box continues a private, consent-safe trail of kindness. PostgreSQL + Paystack.",
    href: "https://github.com/GenesisNorth/mysterybox",
  },
  {
    name: "jarina-app",
    lang: "dart",
    updated: "2026-11",
    filters: ["mobile", "blockchain"],
    desc: "Flutter app for Jarina, a multi-investment platform for crypto and stocks, with its own design-system packages.",
    href: "https://github.com/GenesisNorth/jarina-app",
  },
  {
    name: "Carb",
    lang: "dart",
    updated: "2023-11",
    filters: ["mobile"],
    desc: "Transportation system for Africa: rider-facing Flutter app.",
    href: "https://github.com/GenesisNorth/Carb",
  },
]

export function ProjectsSection() {
  const [filter, setFilter] = useState<"all" | Filter>("all")
  const match = (f: Filter[]) => filter === "all" || f.includes(filter)
  const projects = PROJECTS.filter((p) => match(p.filters))
  const repos = REPOS.filter((r) => match(r.filters))

  return (
    <>
      <div className="proj-filter" role="group" aria-label="Filter projects">
        <span className="proj-filter-cmd" aria-hidden="true">
          <span className="term-arrow">➜</span> <span className="term-path">~/projects</span>{" "}
          <span className="term-cmd">ls --filter</span>
        </span>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className="proj-filter-btn"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
        <span className="term-muted proj-count" aria-live="polite">
          // {projects.length} live · {repos.length} {repos.length === 1 ? "repo" : "repos"}
        </span>
      </div>

      <div className="portfolio-grid">
        {projects.map((p) => (
          <article className="win project-card" key={p.slug}>
            <WindowBar title={p.window} />

            {p.image ? (
              // Duplicate of the primary link below, so it's skipped by keyboard + screen readers
              <a
                className="project-shot"
                href={p.links[0].href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img src={p.image} alt="" width={960} height={600} loading="lazy" decoding="async" />
                <span className="project-shot-cat">{p.category}</span>
              </a>
            ) : (
              <div className="project-preview">
                <div className="preview-cmd">
                  <span className="term-arrow">➜</span> <span className="term-cmd">open {p.window}</span>
                </div>
                <div className="preview-mark" aria-hidden="true">
                  {p.mark}
                </div>
                <div className="preview-cat">{p.category}</div>
              </div>
            )}

            <div className="project-info">
              <div className="project-meta">
                <span className={`project-status status-${p.status}`}>{STATUS_LABEL[p.status]}</span>
                <span className="project-tag">{p.tags.map((t) => `#${t}`).join(" ")}</span>
              </div>
              <h3 className="project-title">{p.name}</h3>
              <ScrollTyped text={p.desc} className="project-desc" />
              <div className="project-links">
                {p.links.map((l, i) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={i === 0 ? "project-visit" : "project-link"}
                  >
                    {i === 0 ? `[ ${l.label.toLowerCase()} ↗ ]` : `${l.label} ↗`}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
        {projects.length === 0 && (
          <p className="term-muted proj-empty">// no live products match --filter {filter}. see ~/repos below.</p>
        )}
      </div>

      <section className="win win-section repo-window" aria-label="Open-source repositories">
        <WindowBar title="genesis@habila: ~/repos — -zsh" />
        <div className="win-body">
          <Prompt path="~/repos">
            ls -la{filter !== "all" ? ` --filter ${filter}` : ""}
          </Prompt>
          {repos.length === 0 ? (
            <p className="term-muted">// no repos match --filter {filter}</p>
          ) : (
            <ul className="repo-list">
              {repos.map((r) => (
                <li className="repo-row" key={r.name}>
                  <span className="repo-perm" aria-hidden="true">
                    drwxr-xr-x
                  </span>
                  <span className="repo-lang">{r.lang}</span>
                  <span className="repo-date">{r.updated}</span>
                  <a className="repo-name" href={r.href} target="_blank" rel="noopener noreferrer">
                    {r.name}/ ↗
                  </a>
                  <span className="repo-desc">{r.desc}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="term-out term-muted repo-more">
            // more on{" "}
            <a className="json-link" href="https://github.com/GenesisNorth" target="_blank" rel="noopener noreferrer">
              github.com/GenesisNorth
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
