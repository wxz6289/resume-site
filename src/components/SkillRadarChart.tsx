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
import type { TooltipProps } from "recharts";
import { SectionHeader } from "./SectionHeader";
import { fadeUp } from "../lib/motion";
import type { SkillRadar } from "../types";

interface Props {
  skills: SkillRadar[];
  tags: string[];
}

interface RadarDataPoint {
  subject: string;
  score: number;
  fullMark: number;
  projects: string;
}

function RadarTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload as RadarDataPoint;

  return (
    <div className="glass rounded-xl px-4 py-3 shadow-xl">
      <p className="font-medium text-white">{data.subject}</p>
      <p className="text-sm text-violet-300">{data.score} / 5</p>
      <p className="mt-1.5 text-xs text-zinc-500">{data.projects}</p>
    </div>
  );
}

export function SkillRadarChart({ skills, tags }: Props) {
  const data: RadarDataPoint[] = skills.map((s) => ({
    subject: s.subject,
    score: s.score,
    fullMark: 5,
    projects: s.projects.join(" · "),
  }));

  return (
    <section id="skills" className="scroll-mt-24 py-20 md:py-24 print-break">
      <div className="section-wrap">
        <SectionHeader
          index="01"
          title="技能图谱"
          subtitle="多维能力评估与技术栈覆盖"
        />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            className="glass relative h-80 overflow-hidden rounded-2xl p-4 no-print"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#a1a1aa", fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 5]}
                  tick={{ fill: "#52525b", fontSize: 9 }}
                  axisLine={false}
                />
                <Radar
                  dataKey="score"
                  stroke="#a78bfa"
                  fill="url(#radarGradient)"
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <Tooltip content={<RadarTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {skills.map((s, i) => (
              <motion.div key={s.subject} variants={fadeUp} custom={i}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-zinc-200">{s.subject}</span>
                  <span className="font-mono text-xs text-violet-300">{s.score}</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(s.score / 5) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-zinc-600">{s.projects.join(" · ")}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex flex-wrap gap-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.02 } } }}
        >
          {tags.map((tag) => (
            <motion.span key={tag} variants={fadeUp} className="tag">
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
