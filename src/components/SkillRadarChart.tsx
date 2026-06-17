import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { SkillRadar } from "../types";

interface Props {
  skills: SkillRadar[];
  tags: string[];
}

export function SkillRadarChart({ skills, tags }: Props) {
  const data = skills.map((s) => ({
    subject: s.subject,
    score: s.score,
    fullMark: 5,
    projects: s.projects.join("、"),
  }));

  return (
    <section className="px-6 py-16 md:px-12 print-break">
      <motion.h2
        className="mb-8 text-2xl font-bold"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        技能雷达
      </motion.h2>

      <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
        <div className="h-80 no-print">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: "#64748b", fontSize: 10 }} />
              <Radar
                name="能力值"
                dataKey="score"
                stroke="#818cf8"
                fill="#4f46e5"
                fillOpacity={0.4}
              />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
                labelStyle={{ color: "#f1f5f9" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {skills.map((s) => (
            <div key={s.subject}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium">{s.subject}</span>
                <span className="text-amber-400">{s.score}/5</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  className="h-full rounded-full bg-indigo-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(s.score / 5) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">{s.projects.join("、")}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
