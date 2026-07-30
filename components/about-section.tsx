import { MacWindow, Prompt } from "@/components/mac-window"

export function AboutSection() {
  return (
    <MacWindow id="about" title="genesis@habila: ~/about — -zsh">
      <Prompt path="~">whoami</Prompt>
      <p className="term-out term-strong">
        Genesis Habila — Software Engineer <span className="term-accent">(AI, Blockchain &amp; Security)</span>
      </p>

      <Prompt path="~">cat about.txt</Prompt>
      <p className="term-out">
        A Passionate and Innovative Software Engineer and enthusiastic Software Security individual with years of
        extensive experience in developing high-end, Fullstack, Mobile, Blockchain and AI Solutions. Also, with keen
        attention to Technical Leadership, Project Management, Cybersecurity and Research.
      </p>
      <p className="term-out">
        A Consistent Learner with adaptability skills, Problem Solving and Cross functional Team Collaboration. My
        research interests include Space Exploration/Astrophysics, AIOT &amp; Embedded Systems, and Blockchain.
      </p>

      <Prompt path="~">ls ~/focus</Prompt>
      <div className="term-tags">
        <span className="term-tag">Technical Leadership</span>
        <span className="term-tag">Project Management</span>
        <span className="term-tag">Cybersecurity</span>
        <span className="term-tag">AI &amp; Blockchain</span>
        <span className="term-tag">Research</span>
      </div>

      <Prompt path="~">cat education.txt</Prompt>
      <p className="term-out">
        <span className="term-strong">B.Tech Statistics</span> <span className="term-accent">— 2023</span>
        <br />
        Federal University of Technology Minna, Niger State.
      </p>

      <Prompt path="~">ls ~/practices</Prompt>
      <div className="term-tags">
        <span className="term-tag">Fullstack Development</span>
        <span className="term-tag">Mobile Application Development</span>
        <span className="term-tag">Blockchain &amp; AI Development</span>
        <span className="term-tag">Technical Management</span>
      </div>

      <Prompt path="~">ls ~/research-interests</Prompt>
      <div className="term-tags">
        <span className="term-tag">Space Exploration / Astrophysics</span>
        <span className="term-tag">AIOT &amp; Embedded Systems</span>
        <span className="term-tag">Blockchain</span>
      </div>

      <Prompt path="~">cat soft-skills.txt</Prompt>
      <p className="term-out">
        Adaptability · Problem Solving · Ideation · Research · Written &amp; Verbal Communication · Effective Listening ·
        Employee Relations · Team Building
      </p>

      <Prompt path="~">cat certifications.txt</Prompt>
      <ul className="term-list">
        <li>LinkedIn Learning — Web Security, Databases, Full Stack Development, JavaScript Essentials</li>
        <li>Udemy — Laravel, JavaScript</li>
        <li>Digital Nigeria &amp; Microsoft — Software Development Fundamentals, Networking Fundamentals</li>
      </ul>

      <Prompt path="~">cat volunteering.txt</Prompt>
      <ul className="term-list">
        <li>Fail Conference — coordinated with speakers for an event attended by 50+ developers (09/2022)</li>
        <li>Google Developers Group Abuja — community-building strategies for events with 500+ attendees (09/2022)</li>
      </ul>
      <p className="term-out">
        <span className="cursor-blink">_</span>
      </p>
    </MacWindow>
  )
}
