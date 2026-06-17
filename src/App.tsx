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
    <>
      <div className="page-bg" aria-hidden />
      <div className="relative min-h-screen">
        <Nav pdf={resume.pdf} name={resume.profile.name} />
        <main>
          <Hero profile={resume.profile} social={resume.social} pdf={resume.pdf} />
          <StatsBar stats={resume.stats} />
          <SkillRadarChart skills={resume.skills.radar} tags={resume.skills.tags} />
          <Timeline experience={resume.experience} />
          <Projects projects={resume.projects} />
          <Contact
            profile={resume.profile}
            education={resume.education}
            social={resume.social}
          />
        </main>
        <footer className="border-t border-white/5 py-10 text-center">
          <p className="font-mono text-xs tracking-wider text-zinc-600">
            © {new Date().getFullYear()} {resume.profile.name}
            <span className="mx-2 text-zinc-800">·</span>
            Updated 2026.04
          </p>
        </footer>
      </div>
    </>
  );
}
