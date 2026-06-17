import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { fadeUp } from "../lib/motion";
import type { Profile, ResumeData } from "../types";

interface Props {
  profile: Profile;
  education: ResumeData["education"];
  social: ResumeData["social"];
}

const SOCIAL_LINKS = [
  { key: "github" as const, label: "GitHub" },
  { key: "blog" as const, label: "博客" },
  { key: "juejin" as const, label: "掘金" },
  { key: "zhihu" as const, label: "知乎" },
];

export function Contact({ profile, education, social }: Props) {
  const activeSocial = SOCIAL_LINKS.filter((s) => social[s.key]);

  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-24 print-break">
      <div className="section-wrap">
        <SectionHeader index="04" title="联系" subtitle="期待与您进一步交流" />

        <motion.div
          className="grid gap-4 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div variants={fadeUp} className="glass glass-hover rounded-2xl p-6 md:p-8">
            <p className="mb-4 font-mono text-xs tracking-widest text-zinc-600 uppercase">
              Education
            </p>
            <p className="text-xl font-medium text-white">{education.school}</p>
            <p className="mt-2 text-sm text-zinc-400">
              {education.major} · {education.degree}
            </p>
            <p className="mt-1 font-mono text-xs text-zinc-600">{education.period}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="glass glass-hover rounded-2xl p-6 md:p-8">
            <p className="mb-4 font-mono text-xs tracking-widest text-zinc-600 uppercase">
              Contact
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="block text-lg font-medium text-white transition hover:text-violet-300"
            >
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="mt-3 block text-sm text-zinc-400 transition hover:text-zinc-200"
            >
              {profile.phone}
            </a>
            <p className="mt-2 text-sm text-zinc-600">{profile.location}</p>
          </motion.div>
        </motion.div>

        {activeSocial.length > 0 && (
          <motion.div
            className="mt-4 flex flex-wrap gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {activeSocial.map((s) => {
              const value = social[s.key];
              const isUrl = value.startsWith("http");
              const El = isUrl ? "a" : "div";
              return (
                <motion.div key={s.key} variants={fadeUp}>
                  <El
                    {...(isUrl
                      ? { href: value, target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="glass glass-hover no-print flex items-center gap-3 rounded-xl px-5 py-3"
                  >
                    <span className="text-sm text-zinc-500">{s.label}</span>
                    <span className="text-sm font-medium text-zinc-200">
                      {isUrl ? new URL(value).hostname.replace("www.", "") : value}
                    </span>
                  </El>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
