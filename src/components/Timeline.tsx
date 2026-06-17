import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import type { Experience } from "../types";

interface Props {
  experience: Experience[];
}

const FILTERS = [
  { key: "all", label: "全部" },
  { key: "frontend", label: "前端" },
  { key: "fullstack", label: "全栈" },
  { key: "architect", label: "架构" },
  { key: "ai", label: "AI" },
];

export function Timeline({ experience }: Props) {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(experience[0]?.id ?? null);

  const filtered =
    filter === "all" ? experience : experience.filter((e) => e.tags.includes(filter));

  return (
    <section id="experience" className="scroll-mt-24 py-20 md:py-24 print-break">
      <div className="section-wrap">
        <SectionHeader
          index="02"
          title="工作经历"
          subtitle="十余年技术深耕与架构演进"
        />

        <div className="no-print mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                filter === f.key
                  ? "bg-white/10 text-white ring-1 ring-white/20"
                  : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((exp, i) => {
              const isOpen = expanded === exp.id;
              return (
                <motion.article
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className={`glass glass-hover overflow-hidden rounded-2xl transition-colors ${
                    isOpen ? "ring-1 ring-violet-500/30" : ""
                  }`}
                >
                  <button
                    className="flex w-full items-start justify-between gap-4 p-5 text-left md:p-6"
                    onClick={() => setExpanded(isOpen ? null : exp.id)}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-base font-medium text-white md:text-lg">
                          {exp.company}
                        </h3>
                        <span className="font-mono text-xs text-zinc-600">{exp.period}</span>
                      </div>
                      <p className="mt-1 text-sm text-violet-300/80">{exp.role}</p>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-1 shrink-0 text-zinc-600"
                    >
                      ↓
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden print-show"
                      >
                        <div className="border-t border-white/5 px-5 pb-5 md:px-6 md:pb-6">
                          <ul className="mt-4 space-y-2.5">
                            {exp.highlights.map((h) => (
                              <li key={h} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                                {h}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {exp.stack.map((s) => (
                              <span key={s} className="tag">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
