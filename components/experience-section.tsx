import { MacWindow, Prompt } from "@/components/mac-window"

type Role = {
  slug: string
  role: string
  company: string
  dates: string
  location: string
  website?: string
  summary: string
  bullets: string[]
  tech: string[]
}

const ROLES: Role[] = [
  {
    slug: "niteon",
    role: "Backend & AI Engineer",
    company: "Niteon",
    dates: "06/2025 – Present",
    location: "Colorado, USA",
    website: "https://niteonhq.com",
    summary: "Leading backend development and AI integration for e-commerce solutions.",
    bullets: [
      "Fixed existing system bugs that improved user experience by 50%",
      "Built an AI recommendation system for products and conversational user interactions",
      "Collaborated with cross-functional teams to integrate AI solutions into existing systems",
      "Designed algorithms to optimize performance of artificial intelligence implementation",
      "Optimized codebase for improved scalability and efficiency of automated processes",
      "Ensured secure payment processing",
    ],
    tech: ["AI/ML", "Backend", "Algorithms", "Optimization"],
  },
  {
    slug: "trashcoin",
    role: "Blockchain & Mobile Engineer",
    company: "TrashCoin",
    dates: "08/2024 – 04/2025",
    location: "City of Dover, USA",
    website: "https://trashcoin.eu",
    summary: "Developing mobile applications for cryptocurrency transactions and wallet management.",
    bullets: [
      "Developed mobile application for cryptocurrency transactions and wallet management",
      "Integrated blockchain technology into mobile platforms for secure transactions",
      "Built a custom token for transactions using Solana blockchain and Rust",
      "Integrated third-party APIs into existing mobile products",
      "Used bug-tracking software like JIRA to document defects found during testing",
      "Improved mobile application features to reduce latency and improve load times",
      "Implemented user interface designs for seamless user experiences across devices",
    ],
    tech: ["Solana", "Rust", "Flutter", "Mobile", "Blockchain"],
  },
  {
    slug: "century",
    role: "Fullstack & AI Engineer",
    company: "Century Information Systems",
    dates: "01/2025 – 07/2025",
    location: "Abuja, Nigeria",
    website: "https://centuryinformationsystems.com",
    summary: "Full-stack development with a focus on AI integration and performance optimization.",
    bullets: [
      "Modified existing application features and integrated AI for Text-to-Speech (TTS)",
      "Redesigned and implemented new UI features",
      "Implemented APIs to enhance the functionality of existing systems",
      "Optimized frontend performance by implementing caching strategies such as Redis",
    ],
    tech: ["React", "AI/ML", "Text-to-Speech", "Redis", "Frontend"],
  },
  {
    slug: "slantapp",
    role: "Fullstack & Blockchain Engineer",
    company: "SlantApp Technologies",
    dates: "11/2023 – 05/2025",
    location: "Abuja, Nigeria",
    website: "https://www.slantapp.com",
    summary: "Building seamless mobile and web applications with advanced AI and blockchain features.",
    bullets: [
      "Created seamless mobile applications compatible with various platforms",
      "Engineered web applications incorporating advanced AI features",
      "Troubleshot and resolved technical issues in existing mobile and web applications promptly",
      "Developed smart contracts using Solidity for a multi-level Reward System",
      "Tested and debugged blockchain-based applications to ensure quality assurance",
      "Developed strategies to increase transaction throughputs by optimizing codebases",
      "Participated in open source communities such as Polygon Guild and Arbitrum Stylus",
    ],
    tech: ["Solidity", "Smart Contracts", "AI", "Mobile", "Web"],
  },
  {
    slug: "africartz",
    role: "Mobile Engineer",
    company: "Africartz",
    dates: "11/2024 – 05/2025",
    location: "Lagos, Nigeria",
    website: "https://www.africartz.com",
    summary: "Developing cross-platform mobile applications for e-commerce.",
    bullets: [
      "Developed the Africartz mobile application for cross-platform usage",
      "Enhanced basic features and worked on UI improvements",
      "Created a seamless user experience for the application",
      "Conducted code reviews to ensure quality and adherence to best practices",
      "Researched emerging technologies to continuously improve mobile capabilities",
    ],
    tech: ["Mobile", "Cross-platform", "UI/UX"],
  },
  {
    slug: "elc",
    role: "Fullstack & Mobile Engineer",
    company: "ELC Nigeria",
    dates: "03/2024 – 04/2025",
    location: "Abuja, Nigeria",
    summary: "Modernizing real estate applications and providing technical leadership.",
    bullets: [
      "Modernized codebases to improve real estate web and mobile applications",
      "Coordinated testing and validation procedures through the software development lifecycle",
      "Provided technical expertise to team members regarding mobile application design",
      "Implemented new features that boosted user satisfaction by 20%",
      "Conducted weekly research to enhance application credibility and value",
      "Resolved bugs across various applications to ensure optimal performance",
    ],
    tech: ["Real Estate", "Mobile", "Web", "Full-Stack"],
  },
  {
    slug: "edsqill",
    role: "Mobile Engineer (Contract)",
    company: "EdSqill",
    dates: "03/2024 – 12/2024",
    location: "Abuja, Nigeria",
    website: "https://edsqill.com",
    summary: "Enhancing educational mobile platforms for better user engagement.",
    bullets: [
      "Enhanced functionality of mobile applications to improve user experience",
      "Revamped existing user interface for better engagement",
      "Resolved bugs and integrated new features for effective course learning",
      "Optimized app performance to ensure faster load times and responsiveness",
    ],
    tech: ["Flutter", "Mobile", "UI/UX", "Education"],
  },
  {
    slug: "laundry-dna",
    role: "Mobile Engineer (Contract)",
    company: "Laundry DNA",
    dates: "04/2023 – 10/2023",
    location: "Abuja, Nigeria",
    summary: "Optimizing laundry service applications for efficiency and user experience.",
    bullets: [
      "Improved navigation and categorization, increasing functionality by 30%",
      "Integrated third-party APIs to expand application functionality",
      "Conducted code reviews to ensure quality and maintainability of mobile applications",
      "Improved app security and features, resulting in a 20% increase in app usage",
      "Reduced bug resolution time by 20%, ensuring timely fixes",
      "Resolved bugs in payment gateway to ensure seamless transactions",
    ],
    tech: ["Flutter", "Mobile", "Payment Gateway", "UI/UX"],
  },
  {
    slug: "inec",
    role: "Fullstack & Mobile Engineer (Intern)",
    company: "INEC — Independent National Electoral Commission",
    dates: "02/2022 – 07/2023",
    location: "Abuja, Nigeria",
    website: "https://inecnigeria.org",
    summary: "Developing critical electoral systems for national democratic processes.",
    bullets: [
      "Developed Voter Enrollment Mobile Application, enhancing voter verification by 30%",
      "Configured Bi-Modal Voters Registration System (BVAS) devices for 100% election integrity",
      "Conducted software testing on old and new BVAS devices, boosting efficiency by over 50%",
      "Implemented custom Android OS for Continuous Voter Registration (CVR) and Voter's Identification Number (VIN)",
    ],
    tech: ["Android", "Python", "Custom OS", "BVAS", "Government Systems"],
  },
  {
    slug: "nimedix",
    role: "Blockchain Engineer",
    company: "Nimedix Ecosystem",
    dates: "07/2022 – 12/2022",
    location: "Abuja, Nigeria",
    summary: "Developing decentralized healthcare solutions using NEAR Protocol.",
    bullets: [
      "Developed basic smart contracts using the Rust programming language",
      "Built applications with the NEAR Protocol blockchain",
      "Acquired comprehensive knowledge of Blockchain Technology and Decentralized systems",
      "Developed software solutions using agile methodologies for healthcare applications",
      "Implemented testing protocols to ensure software quality and reliability",
    ],
    tech: ["Rust", "NEAR Protocol", "Blockchain", "Smart Contracts"],
  },
]

export function ExperienceSection() {
  return (
    <MacWindow id="experience" title="genesis@habila: ~/experience — -zsh">
      <Prompt path="~/experience">git log --oneline --stat</Prompt>
      <p className="term-out term-muted">// {ROLES.length} positions · 2022 → present</p>

      <div className="exp-list">
        {ROLES.map((r) => (
          <article className="exp-item" key={r.slug}>
            <div className="term-line">
              <span className="term-arrow">➜</span>{" "}
              <span className="term-path">~/experience</span>{" "}
              <span className="term-cmd">cat {r.slug}.log</span>
            </div>
            <div className="exp-head">
              <h3 className="exp-role">
                {r.role} <span className="exp-at">@</span> <span className="exp-company">{r.company}</span>
              </h3>
              <span className="exp-dates">
                {r.dates} · {r.location}
              </span>
            </div>
            <p className="term-out exp-summary">{r.summary}</p>
            <ul className="exp-bullets">
              {r.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="term-tags">
              {r.tech.map((t) => (
                <span className="term-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            {r.website && (
              <a className="exp-link" href={r.website} target="_blank" rel="noopener noreferrer">
                → visit {r.company.toLowerCase().replace(/\s+/g, "")}
              </a>
            )}
          </article>
        ))}
      </div>
    </MacWindow>
  )
}
