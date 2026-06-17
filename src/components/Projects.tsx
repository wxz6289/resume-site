import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "../types";

interface Props {
  projects: Project[];
}

export function Projects({ projects }: Props) {
  const [expanded, setExpanded] = useState<string | null>(projects[0]?.id ?? null);

  return (
    <section className="bg-slate-900/30 px-6 py-16 md:px-12 print-break">
      <h2 className="mb-8 text-2xl font-bold">核心项目</h2>

      <div className="mx-auto grid max-w-4xl gap-6">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-indigo-500/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <button
              className="w-full text-left"
              onClick={() => setExpanded(expanded === project.id ? null : project.id)}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  <p className="text-sm text-indigo-300">
                    {project.role} · {project.period}
                  </p>
                </div>
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="no-print rounded-lg bg-indigo-600/20 px-3 py-1 text-xs text-indigo-300 hover:bg-indigo-600/40"
                  >
                    在线演示 →
                  </a>
                )}
              </div>
              <p className="mt-2 text-sm text-slate-400">{project.description}</p>
            </button>

            <div className={`mt-4 ${expanded === project.id ? "block" : "hidden print:block"}`}>
              <ul className="mb-4 space-y-1.5 text-sm text-slate-400">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-amber-400">▸</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mb-3 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span key={s} className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.metrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs text-amber-300"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
