import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

interface Props {
  index: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ index, title, subtitle }: Props) {
  return (
    <motion.div
      className="mb-10 md:mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      <p className="mb-2 font-mono text-xs tracking-[0.2em] text-accent uppercase">
        {index}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-xl text-sm text-muted md:text-base">{subtitle}</p>
      )}
      <div className="mt-4 h-px w-16 bg-gradient-to-r from-accent to-transparent" />
    </motion.div>
  );
}
