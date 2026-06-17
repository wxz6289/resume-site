import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Experience } from "../types";

interface Props {
  experience: Experience[];
}

const FILTERS = [
  { key: "all", label: "全部" },
  { key: "frontend", label: "前端" },
  { key: "fullstack", label: "全栈" },
  { key: "architect", label: "架构" },
];

export function Timeline({ experience }: Props) {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(experience[0]?.id ?? null);

  const filtered =
    filter === "all"
      ? experience
      : experience.filter((e) => e.tags.includes(filter));

  return (
    <section id="experience" className="scroll-mt-16 px-6 py-16 md:px-12 print-break">
      <h2 className="mb-6 text-2xl font-bold">工作经历</h2>

      <div className="no-print mb-8 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              filter === f.key
                ? "bg-indigo-600 text-white"
                : "border border-slate-700 text-slate-400 hover:border-indigo-500"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute top-0 bottom-0 left-4 w-px bg-slate-700 md:left-6" />

        {filtered.map((exp, i) => (
          <motion.div
            key={exp.id}
            className="relative mb-8 pl-12 md:pl-16"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="absolute left-2.5 h-3 w-3 rounded-full border-2 border-indigo-500 bg-slate-900 md:left-4.5" />

            <button
              className="w-full text-left"
              onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-lg font-semibold">{exp.company}</h3>
                <span className="text-sm text-slate-500">{exp.period}</span>
              </div>
              <p className="text-indigo-300">{exp.role}</p>
            </button>

            <AnimatePresence>
              {expanded === exp.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 overflow-hidden print-show"
                >
                  <ul className="mb-3 space-y-1.5 text-sm text-slate-400">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="text-amber-400">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span key={s} className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
