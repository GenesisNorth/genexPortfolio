import { MacWindow, Prompt } from "@/components/mac-window"

export function AboutSection() {
  return (
    <MacWindow id="about" title="genesis@habila: ~/about — -zsh">
      <Prompt path="~">whoami</Prompt>
      <p className="term-out term-strong">
        Genesis Habila — Software Engineer <span className="term-accent">(AI &amp; Blockchain)</span>
      </p>

      <Prompt path="~">cat about.txt</Prompt>
      <p className="term-out">
        A Passionate and Innovative Software Engineer with years of extensive experience in developing high-end,
        Fullstack, Mobile, Blockchain and AI Solutions. Also, with keen attention to Technical Leadership, Project
        Management and Research.
      </p>
      <p className="term-out">
        A Consistent Learner with fast adaptability skills, Problem Solving and Cross functional Team Collaboration. My
        research interests include Space Exploration/Astrophysics, AIOT &amp; Embedded Systems, and Blockchain.
      </p>

      <Prompt path="~">ls ~/focus</Prompt>
      <div className="term-tags">
        <span className="term-tag">Technical Leadership</span>
        <span className="term-tag">Project Management</span>
        <span className="term-tag">AI &amp; Blockchain</span>
        <span className="term-tag">Research</span>
      </div>

      <Prompt path="~">cat education.txt</Prompt>
      <p className="term-out">
        <span className="term-strong">B.Tech Statistics</span>
        <br />
        Federal University of Technology Minna, Niger State.
      </p>

      <Prompt path="~">ls ~/research-interests</Prompt>
      <div className="term-tags">
        <span className="term-tag">Space Exploration / Astrophysics</span>
        <span className="term-tag">AIOT &amp; Embedded Systems</span>
        <span className="term-tag">AI/ML</span>
        <span className="term-tag">Blockchain</span>
      </div>

      <Prompt path="~">cat certifications.txt</Prompt>
      <p className="term-out">LinkedIn Learning · Udemy · Digital Nigeria</p>

      <Prompt path="~">cat volunteering.txt</Prompt>
      <p className="term-out">
        Fail Conference · Google Developers Group Abuja <span className="cursor-blink">_</span>
      </p>
    </MacWindow>
  )
}
