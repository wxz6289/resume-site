import type { ResumeData } from "../types";

const NAV_ITEMS = [
  { id: "skills", label: "技能" },
  { id: "experience", label: "经历" },
  { id: "projects", label: "项目" },
  { id: "contact", label: "联系" },
];

export function Nav({ pdf }: { pdf: ResumeData["pdf"] }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="no-print sticky top-0 z-50 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3 md:px-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm font-semibold text-slate-200 transition hover:text-white"
        >
          王显朝
        </button>

        <div className="flex items-center gap-1 sm:gap-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="rounded-md px-2 py-1 text-xs text-slate-400 transition hover:text-indigo-300 sm:px-3 sm:text-sm"
            >
              {item.label}
            </button>
          ))}
          <a
            href={pdf.url}
            download={pdf.filename}
            className="ml-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-500 sm:text-sm"
          >
            PDF
          </a>
        </div>
      </div>
    </nav>
  );
}
