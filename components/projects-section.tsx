type ProjectLink = { label: string; href: string }

type Project = {
  slug: string
  name: string
  window: string
  domain: string
  mark: string
  category: string
  tags: string[]
  desc: string
  links: ProjectLink[]
}

const PROJECTS: Project[] = [
  {
    slug: "sana",
    name: "Sana",
    window: "sana.app",
    domain: "sana.africa",
    mark: "SA",
    category: "Web",
    tags: ["platform", "services", "africa"],
    desc: "Comprehensive platform connecting users with essential services and opportunities across Africa.",
    links: [{ label: "Website", href: "https://sana.africa" }],
  },
  {
    slug: "trashcoin",
    name: "TrashCoin",
    window: "trashcoin.app",
    domain: "trashcoin.eu",
    mark: "TC",
    category: "Mobile · Blockchain",
    tags: ["solana", "blockchain", "flutter"],
    desc: "Revolutionary blockchain platform that transforms waste into digital currency. Built on the Solana blockchain.",
    links: [
      { label: "Website", href: "https://trashcoin.eu" },
      { label: "Source", href: "https://github.com/GenesisNorth/trashcoin" },
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=eu.trashcoin" },
    ],
  },
  {
    slug: "spendify",
    name: "Spendify",
    window: "spendify.app",
    domain: "spendify.ca",
    mark: "SP",
    category: "Web · Fintech",
    tags: ["finance", "budgeting", "fintech"],
    desc: "Smart financial management platform for tracking expenses, budgeting, and achieving financial goals.",
    links: [{ label: "Website", href: "https://spendify.ca" }],
  },
  {
    slug: "rida-natural",
    name: "Rida Natural",
    window: "rida-natural.app",
    domain: "ridanatural.com",
    mark: "RN",
    category: "Web · E-commerce",
    tags: ["e-commerce", "health", "wellness"],
    desc: "E-commerce platform dedicated to natural health and wellness products with a seamless shopping experience.",
    links: [{ label: "Website", href: "https://ridanatural.com" }],
  },
  {
    slug: "nans-lms",
    name: "NANS LMS",
    window: "nans-lms.app",
    domain: "nans-lms.ng",
    mark: "NL",
    category: "Web · Education",
    tags: ["education", "lms", "students"],
    desc: "Educational platform for student management, learning resources, and academic collaboration.",
    links: [{ label: "Website", href: "https://nans-lms.ng" }],
  },
  {
    slug: "africartz",
    name: "Africartz",
    window: "africartz.app",
    domain: "africartz.com",
    mark: "AZ",
    category: "Mobile",
    tags: ["booking", "travel", "accommodation"],
    desc: "Accommodation booking platform featuring a seamless mobile experience for travelers.",
    links: [
      { label: "Website", href: "https://www.africartz.com" },
      { label: "Source", href: "https://github.com/GenesisNorth/africartz" },
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.africartz.bookings" },
    ],
  },
]

export function ProjectsSection() {
  return (
    <div className="portfolio-grid">
      {PROJECTS.map((p) => (
        <article className="project-card" key={p.slug}>
          <div className="window-header">
            <span>{p.window}</span>
            <div className="window-controls" aria-hidden="true">
              <button className="window-btn" tabIndex={-1} aria-label="Minimize">
                <span className="minimize-icon" />
              </button>
              <button className="window-btn" tabIndex={-1} aria-label="Maximize">
                <span className="maximize-icon" />
              </button>
              <button className="window-btn window-close" tabIndex={-1} aria-label="Close">
                <span className="close-icon" />
              </button>
            </div>
          </div>

          <div className="project-preview">
            <div className="preview-cmd">
              <span className="term-arrow">➜</span> <span className="term-cmd">open {p.domain}</span>
            </div>
            <div className="preview-mark" aria-hidden="true">
              {p.mark}
            </div>
            <div className="preview-cat">{p.category}</div>
          </div>

          <div className="project-info">
            <span className="project-tag">{p.tags.map((t) => `#${t}`).join(" ")}</span>
            <h3 className="project-title">{p.name}</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{p.desc}</p>
            <div className="project-links">
              {p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="project-link">
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
