import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <section className="relative overflow-hidden px-6 py-20 md:px-12 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-900" />
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

      <motion.div
        className="relative mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-2 text-sm font-medium tracking-widest text-amber-400 uppercase">
          {profile.intents.join(" / ")}
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
          {profile.name}
        </h1>
        <p className="mb-2 text-xl text-indigo-300 md:text-2xl">{profile.title}</p>
        <p className="mb-8 text-lg text-slate-400">{profile.tagline}</p>

        <div className="mb-8 flex flex-wrap gap-4 text-sm text-slate-300">
          <span>{profile.location}</span>
          <span>·</span>
          <span>{profile.experienceYears} 经验</span>
          <span>·</span>
          <span>期望 {profile.salary}</span>
        </div>

        <p className="mb-10 max-w-2xl leading-relaxed text-slate-400">{profile.summary}</p>

        <div className="flex flex-wrap gap-3 no-print">
          <a
            href={pdf.url}
            download={pdf.filename}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            下载 PDF
          </a>
          <button
            onClick={copyEmail}
            className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-indigo-500 hover:text-white"
          >
            复制邮箱
          </button>
          {social.github && (
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-indigo-500 hover:text-white"
            >
              GitHub
            </a>
          )}
          <a
            href={`tel:${profile.phone}`}
            className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-indigo-500 hover:text-white"
          >
            {profile.phone}
          </a>
        </div>
      </motion.div>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg"
          >
            邮箱已复制
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
