import { motion } from "framer-motion";
import type { Stat } from "../types";

interface Props {
  stats: Stat[];
}

export function StatsBar({ stats }: Props) {
  return (
    <section className="border-y border-slate-800 bg-slate-900/50 px-6 py-10 md:px-12">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="text-3xl font-bold text-amber-400 md:text-4xl">
              {stat.value}
              <span className="ml-1 text-lg text-slate-500">{stat.unit}</span>
            </div>
            <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
