import type { Profile, ResumeData } from "../types";

interface Props {
  profile: Profile;
  education: ResumeData["education"];
  social: ResumeData["social"];
}

export function Contact({ profile, education, social }: Props) {
  return (
    <section className="border-t border-slate-800 px-6 py-16 md:px-12 print-break">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold">教育 & 联系</h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-medium text-slate-300">教育背景</h3>
            <p className="text-white">{education.school}</p>
            <p className="text-slate-400">
              {education.major} · {education.degree} · {education.period}
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-medium text-slate-300">联系方式</h3>
            <p className="text-slate-400">
              <a href={`mailto:${profile.email}`} className="hover:text-indigo-300">
                {profile.email}
              </a>
            </p>
            <p className="text-slate-400">{profile.phone}</p>
            <p className="text-slate-400">{profile.location}</p>
          </div>
        </div>

        {(social.blog || social.github) && (
          <div className="mt-8 flex gap-4 text-sm text-slate-500">
            {social.blog && <span>博客：{social.blog}</span>}
            {social.github && (
              <a href={social.github} className="hover:text-indigo-300">
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
