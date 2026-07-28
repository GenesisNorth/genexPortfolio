"use client"

import { useEffect, useState } from "react"
import { TerminalBoot } from "@/components/terminal-boot"
import { Typed } from "@/components/typed"
import { MacWindow } from "@/components/mac-window"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"
import { ProjectsSection } from "@/components/projects-section"

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const statusElement = document.querySelector(".system-status")

    // Update the system clock
    function updateClock() {
      const now = new Date()
      const timeStr =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0") +
        ":" +
        now.getSeconds().toString().padStart(2, "0")
      if (statusElement) {
        statusElement.textContent = `SYS_UP: ${timeStr} | CPU: ${Math.floor(Math.random() * 20) + 5}%`
      }
    }

    // One-time boot sequence on first load, then hand off to the live clock.
    let interval: ReturnType<typeof setInterval>
    const bootTimers: ReturnType<typeof setTimeout>[] = []
    const startClock = () => {
      updateClock()
      interval = setInterval(updateClock, 1000)
    }
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (statusElement && !prefersReduced) {
      const bootFrames = [
        "[BOOT] loading retro.exe",
        "[BOOT] loading retro.exe .",
        "[BOOT] loading retro.exe . .",
        "[BOOT] loading retro.exe . . .",
        "[ OK ] system online",
      ]
      bootFrames.forEach((frame, i) => {
        bootTimers.push(setTimeout(() => (statusElement.textContent = frame), i * 340))
      })
      bootTimers.push(setTimeout(startClock, bootFrames.length * 340 + 450))
    } else {
      startClock()
    }

    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(interval)
      bootTimers.forEach((t) => clearTimeout(t))
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {showScrollTop && (
        <button onClick={scrollToTop} className="scroll-to-top" aria-label="Scroll to top">
          <span className="scroll-arrow">↑</span>
        </button>
      )}

      <header>
        <div className="container header-inner">
          <div className="logo">Genesis.Habila</div>
          <nav id="primary-nav" className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              ABOUT
            </a>
            <a href="#work" onClick={() => setMenuOpen(false)}>
              PROJECTS
            </a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>
              EXPERIENCE
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              CONTACT
            </a>
          </nav>
          <div className="system-status">SYS_UP: 24:12:05:08 | CPU: 12%</div>
          <button
            className="nav-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "[ close ]" : "[ menu ]"}
          </button>
        </div>
      </header>

      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <p style={{ marginBottom: "10px" }}>
              <span className="prompt">{"genesis@habila:~$"}</span>{" "}
              <Typed text="whoami" className="command" />
            </p>
            <h1>
              Genesis <span>Habila</span>
            </h1>
            <p className="hero-role">
              Software Engineer <span className="hero-role-accent">// AI &amp; Blockchain</span>
            </p>
            <p>
              Building innovative solutions with years of experience in decentralized systems, artificial intelligence,
              and scalable full-stack architectures.
            </p>
            <div className="hero-cta">
              <a href="#work" className="btn-retro">
                VIEW PROJECTS
              </a>
              <a href="#contact" className="btn-ghost">
                GET IN TOUCH
              </a>
            </div>
          </div>
          <div className="window-frame">
            <div className="window-header">
              <span>genesis_habila.jpg</span>
              <div className="window-controls">
                <button className="window-btn" aria-label="Minimize">
                  <span className="minimize-icon"></span>
                </button>
                <button className="window-btn" aria-label="Maximize">
                  <span className="maximize-icon"></span>
                </button>
                <button className="window-btn window-close" aria-label="Close">
                  <span className="close-icon"></span>
                </button>
              </div>
            </div>
            <img src="/headshot-genesis.JPG" alt="Genesis Habila" className="hero-image" />
          </div>
        </section>

        {/* Stats */}
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-val">5+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-val">10</div>
            <div className="stat-label">Companies</div>
          </div>
          <div className="stat-item">
            <div className="stat-val">06</div>
            <div className="stat-label">Featured Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-val">15+</div>
            <div className="stat-label">Technologies</div>
          </div>
        </div>

        {/* About */}
        <AboutSection />

        {/* Portfolio */}
        <section id="work">
          <h2 className="section-title">Latest Deployments</h2>
          <ProjectsSection />
        </section>

        {/* Experience */}
        <ExperienceSection />
      </div>

      {/* Marquee */}
      <div className="marquee-container">
        <div className="marquee-text">
          <span>AVAILABLE FOR FREELANCE • </span>
          <span>HIRE THE SYSTEM • </span>
          <span>BUILDING THE FUTURE • </span>
          <span>RETRO STYLING MODERN TECH • </span>
          <span>AVAILABLE FOR FREELANCE • </span>
          <span>HIRE THE SYSTEM • </span>
          <span>BUILDING THE FUTURE • </span>
          <span>RETRO STYLING MODERN TECH • </span>
        </div>
      </div>

      <div className="container">
        {/* Skills terminal */}
        <MacWindow id="lab" title="genesis@habila: ~/skills — -zsh">
          <TerminalBoot>
            <div className="terminal-row">
              <span className="prompt">{"guest@system:~$"}</span>
              <span className="command">fetch skills --all</span>
            </div>
            <div className="terminal-row">
              <span className="output">{"> Analyzing core competencies..."}</span>
            </div>
            <div className="terminal-row">
              <span className="output">{"[███████████████░] 95% - REACT.JS"}</span>
            </div>
            <div className="terminal-row">
              <span className="output">{"[██████████████░░] 90% - NODE.JS & EXPRESS"}</span>
            </div>
            <div className="terminal-row">
              <span className="output">{"[██████████████░░] 90% - FLUTTER & DART"}</span>
            </div>
            <div className="terminal-row">
              <span className="output">{"[██████████████░░] 85% - SOLIDITY & SMART CONTRACTS"}</span>
            </div>
            <div className="terminal-row">
              <span className="output">{"[█████████████░░░] 80% - AWS & DEVOPS"}</span>
            </div>
            <div className="terminal-row">
              <span className="prompt">{"guest@system:~$"}</span>
              <span className="command">run contact_protocol.sh</span>
            </div>
            <div className="terminal-row">
              <span className="output">
                {"> Establishing secure connection... "}
                <span className="cursor-blink">_</span>
              </span>
            </div>
          </TerminalBoot>
        </MacWindow>

        {/* Contact */}
        <ContactSection />

        {/* Footer */}
        <footer>
          <div className="footer-logo">
            <p style={{ color: "var(--accent)", fontSize: "0.8rem", marginBottom: "10px" }}>END_OF_PAGE</p>
            <h2>
              GENESIS
              <br />
              HABILA©
            </h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ marginBottom: "20px" }}>
              <a
                href="https://github.com/GenesisNorth"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-primary)", textDecoration: "none", marginLeft: "20px" }}
              >
                GITHUB
              </a>
              <a
                href="https://linkedin.com/in/habilagenesis"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-primary)", textDecoration: "none", marginLeft: "20px" }}
              >
                LINKEDIN
              </a>
              <a
                href="mailto:habilagenesis@gmail.com"
                style={{ color: "var(--text-primary)", textDecoration: "none", marginLeft: "20px" }}
              >
                EMAIL
              </a>
            </div>
            <p className="copyright">SOFTWARE ENGINEER · AI &amp; BLOCKCHAIN · BUILT FROM THE TERMINAL.</p>
          </div>
        </footer>

        <div className="footer-badge">
          <div className="badge-content-footer">
            <span className="badge-label">©</span>
            <span className="badge-highlight">2026</span>
            <span className="badge-separator">·</span>
            <span className="badge-highlight">GENESIS HABILA</span>
            <span className="badge-separator">·</span>
            <span className="badge-label">ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </>
  )
}
