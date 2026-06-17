import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../lib/motion";
import type { Profile, ResumeData } from "../types";

interface Props {
  profile: Profile;
  social: ResumeData["social"];
  pdf: ResumeData["pdf"];
}

export function Hero({ profile, social, pdf }: Props) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="section-wrap">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-zinc-400"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {profile.intents[0]}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mb-4 text-5xl font-semibold tracking-tight md:text-7xl"
            >
              <span className="gradient-text">{profile.name}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mb-6 text-lg text-zinc-400 md:text-xl"
            >
              {profile.title}
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-base leading-relaxed text-zinc-500 md:text-lg"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-8 flex flex-wrap gap-2"
            >
              <span className="chip">{profile.location}</span>
              <span className="chip">{profile.experienceYears} 年经验</span>
              <span className="chip">期望 {profile.salary}</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass glass-hover rounded-2xl p-6 md:p-8"
          >
            <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
              {profile.summary}
            </p>

            <div className="no-print mt-8 flex flex-wrap gap-3">
              <a
                href={pdf.url}
                download={pdf.filename}
                className="btn-primary rounded-xl px-5 py-2.5 text-sm font-medium"
              >
                下载简历 PDF
              </a>
              <button onClick={copyEmail} className="btn-ghost rounded-xl px-5 py-2.5 text-sm font-medium">
                {copied ? "已复制 ✓" : "复制邮箱"}
              </button>
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost rounded-xl px-5 py-2.5 text-sm font-medium"
                >
                  GitHub
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute -top-20 right-0 h-[420px] w-[420px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm text-white shadow-2xl ring-1 ring-white/10"
          >
            邮箱已复制到剪贴板
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
