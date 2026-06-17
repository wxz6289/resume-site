import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { SkillRadarChart } from "./components/SkillRadarChart";
import { Timeline } from "./components/Timeline";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { resume } from "./data/resume";

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero profile={resume.profile} social={resume.social} />
      <StatsBar stats={resume.stats} />
      <SkillRadarChart skills={resume.skills.radar} tags={resume.skills.tags} />
      <Timeline experience={resume.experience} />
      <Projects projects={resume.projects} />
      <Contact
        profile={resume.profile}
        education={resume.education}
        social={resume.social}
      />
      <footer className="border-t border-slate-800 px-6 py-8 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} {resume.profile.name} · 最后更新 2026-06
      </footer>
    </div>
  );
}
