import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { fadeUp } from "../lib/motion";
import type { Project } from "../types";

interface Props {
  projects: Project[];
}

export function Projects({ projects }: Props) {
  const [expanded, setExpanded] = useState<string | null>(projects[0]?.id ?? null);

  return (
    <section id="projects" className="scroll-mt-24 py-20 md:py-24 print-break">
      <div className="section-wrap">
        <SectionHeader
          index="03"
          title="核心项目"
          subtitle="从 0 到 1 的产品交付与技术实践"
        />

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, i) => {
            const isOpen = expanded === project.id;
            const isFeatured = i < 2;

            return (
              <motion.article
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i}
                className={`glass glass-hover flex flex-col overflow-hidden rounded-2xl ${
                  isFeatured ? "md:col-span-1" : ""
                } ${isOpen ? "ring-1 ring-cyan-500/25" : ""}`}
              >
                <button
                  className="flex flex-1 flex-col p-5 text-left md:p-6"
                  onClick={() => setExpanded(isOpen ? null : project.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-medium leading-snug text-white md:text-lg">
                        {project.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-zinc-500">
                        {project.role}
                        <span className="mx-1.5 text-zinc-700">·</span>
                        {project.period}
                      </p>
                    </div>
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="no-print shrink-0 rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-300 transition hover:bg-cyan-500/20"
                      >
                        Demo →
                      </a>
                    )}
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-500">
                    {project.description}
                  </p>
                </button>

                <div className={`${isOpen ? "block" : "hidden print:block"}`}>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-t border-white/5 px-5 pb-5 md:px-6 md:pb-6"
                      >
                        <ul className="mt-4 space-y-2">
                          {project.highlights.map((h) => (
                            <li key={h} className="flex gap-3 text-sm text-zinc-400">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                              {h}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.stack.map((s) => (
                            <span key={s} className="tag">
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.metrics.map((m) => (
                            <span
                              key={m}
                              className="rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs text-violet-300"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
