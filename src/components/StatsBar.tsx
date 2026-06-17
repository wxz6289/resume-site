import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";
import type { Stat } from "../types";

interface Props {
  stats: Stat[];
}

export function StatsBar({ stats }: Props) {
  return (
    <section className="pb-4">
      <div className="section-wrap">
        <motion.div
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i}
              className="glass glass-hover group rounded-2xl p-5 md:p-6"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {stat.value}
                </span>
                <span className="text-sm text-zinc-500">{stat.unit}</span>
              </div>
              <p className="mt-2 text-xs text-zinc-500 transition group-hover:text-zinc-400 md:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
