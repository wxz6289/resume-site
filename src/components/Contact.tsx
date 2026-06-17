import type { Profile, ResumeData } from "../types";

interface Props {
  profile: Profile;
  education: ResumeData["education"];
  social: ResumeData["social"];
}

const SOCIAL_LINKS = [
  { key: "github" as const, label: "GitHub", icon: "⌘" },
  { key: "blog" as const, label: "博客", icon: "✎" },
  { key: "juejin" as const, label: "掘金", icon: "◆" },
  { key: "zhihu" as const, label: "知乎", icon: "知" },
];

export function Contact({ profile, education, social }: Props) {
  const activeSocial = SOCIAL_LINKS.filter((s) => social[s.key]);

  return (
    <section id="contact" className="scroll-mt-16 border-t border-slate-800 px-6 py-16 md:px-12 print-break">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold">教育 & 联系</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="mb-3 text-sm font-medium tracking-wide text-indigo-300 uppercase">
              教育背景
            </h3>
            <p className="text-lg font-semibold text-white">{education.school}</p>
            <p className="mt-1 text-slate-400">
              {education.major} · {education.degree}
            </p>
            <p className="mt-1 text-sm text-slate-500">{education.period}</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="mb-3 text-sm font-medium tracking-wide text-indigo-300 uppercase">
              联系方式
            </h3>
            <a
              href={`mailto:${profile.email}`}
              className="block text-lg font-semibold text-white hover:text-indigo-300"
            >
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="mt-2 block text-slate-400 hover:text-indigo-300"
            >
              {profile.phone}
            </a>
            <p className="mt-2 text-sm text-slate-500">{profile.location}</p>
          </div>
        </div>

        {activeSocial.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {activeSocial.map((s) => {
              const value = social[s.key];
              const isUrl = value.startsWith("http");
              const Card = isUrl ? "a" : "div";
              return (
                <Card
                  key={s.key}
                  {...(isUrl
                    ? { href: value, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition hover:border-indigo-500/50"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/20 text-lg text-indigo-300">
                    {s.icon}
                  </span>
                  <div>
                    <p className="text-xs text-slate-500">{s.label}</p>
                    <p className="text-sm font-medium text-slate-200">
                      {isUrl ? new URL(value).hostname.replace("www.", "") : value}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
