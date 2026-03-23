"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const tickerItems = [
  "Open to remote full-stack opportunities",
  "Focus on education",
];

const navItems = ["About", "Projects", "Experience", "Contact"];
const skills = ["HTML", "CSS", "JavaScript", "React", "PHP", "Laravel", "Next.js", "Tailwind", "MySQL"];
const heroStats = [
  { value: "1+", label: "Years Experience" },
  { value: "1", label: "Projects Shipped" },
  { value: "9", label: "Tech Skills" },
  { value: "115k+", label: "Visitors" },
];
const projects = [
  {
    title: "MLBB Draft",
    desc: "Open-source web app for drafting Mobile Legends teams like professionals analyzers.",
    tag: "Open Source",
    image: "/images/mlbb-draft.png",
    demoUrl: "https://mlbb-draft.vercel.app",
    sourceUrl: "https://github.com/hrafsa/mlbb-draft",
  }
];

export default function Home() {
  const [editionDate] = useState(() =>
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Jakarta",
    })
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink bg-paper/95 backdrop-blur">
        <div className="w-full border-b border-ink">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 px-6 py-2 font-mono text-[11px] uppercase tracking-[0.16em] md:grid-cols-3">
            <span className="py-1 md:border-r md:border-ink">Vol. 22</span>
            <span className="py-1 md:border-r md:border-ink md:px-4 md:text-center">Edition 0319</span>
            <span className="py-1 md:text-right">{editionDate}</span>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-6 py-4">
          <a className="font-display text-[clamp(28px,3.2vw,46px)] font-black leading-none" href="#top" aria-label="Home">
            HRAFSA
          </a>

          <nav className="hidden items-center gap-6 font-ui text-[11px] font-semibold uppercase tracking-[0.16em] md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="inline-flex min-h-11 items-center transition-colors duration-200 ease-out hover:text-red">
                {item}
              </a>
            ))}
            <a href="#contact" className="inline-flex min-h-11 items-center border border-ink bg-ink px-7 py-3 text-paper transition-colors duration-200 ease-out hover:bg-paper hover:text-ink">
              Hire Me
            </a>
          </nav>

          <button className="grid h-11 w-11 place-items-center border border-ink md:hidden" aria-label="Toggle menu" onClick={() => setMobileNavOpen((value) => !value)}>
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
          </button>
        </div>
      </header>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-paper p-6 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button className="ml-auto block min-h-11 border border-ink px-5 py-2 font-ui text-[11px] uppercase tracking-[0.16em]" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}>
            Close
          </button>
          <nav className="mt-8 grid gap-3" aria-label="Mobile primary">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="inline-flex min-h-11 items-center justify-center border border-ink px-4 py-3 text-center font-ui text-[11px] uppercase tracking-[0.16em]"
                onClick={() => setMobileNavOpen(false)}
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="inline-flex min-h-11 items-center justify-center border border-ink bg-ink px-4 py-3 text-paper" onClick={() => setMobileNavOpen(false)}>
              Hire Me
            </a>
          </nav>
        </div>
      )}

      <main id="top" className="overflow-x-hidden">
        <section className="mx-auto grid w-full max-w-[1280px] gap-8 px-6 py-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em]">Jakarta Desk • Web Developer</p>
            <h1 className="mt-5 font-display text-[clamp(52px,7vw,112px)] font-black leading-[0.9] tracking-[-0.03em]">
              Crafting Code
              <br />
              That Matters.
            </h1>
            <p className="drop-cap mt-6 max-w-3xl text-[17px] leading-[1.75]">
              Driven by a thirst for knowledge and a desire to contribute to impactful projects. I&aposve built experience in both static and dynamic websites, and I&aposm constantly refining my skills through continuous learning. Eager to collaborate and tackle new challenges, I bring a blend of passion, agility, and work to the table.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex min-h-11 items-center border border-ink bg-ink px-7 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-paper transition-colors duration-200 ease-out hover:bg-paper hover:text-ink">
                View Projects
              </a>
              <a href="#contact" className="inline-flex min-h-11 items-center border border-ink px-7 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-200 ease-out hover:bg-ink hover:text-paper">
                Contact Now
              </a>
            </div>
          </div>

          <aside className="md:col-span-4 md:self-start border border-ink bg-muted">
            <div className="grid min-h-64 place-items-center border-b border-ink bg-paper [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Profile Photo</span>
            </div>
            <div className="grid grid-cols-2 bg-paper">
              {heroStats.map((stat, index) => (
                <article
                  key={stat.label}
                  className={`p-3 ${index < 2 ? "border-b border-ink" : ""} ${index % 2 === 0 ? "border-r border-ink" : ""}`}
                >
                  <strong className="block text-2xl font-black">{stat.value}</strong>
                  <span className="text-[14px]">{stat.label}</span>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="border-y-4 border-ink bg-ink py-3 text-paper">
          <div className="ticker-track">
            <div className="ticker-inner whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em]">
              {tickerItems.concat(tickerItems).map((item, index) => (
                <span key={`${item}-${index}`} className="mr-16 inline-flex min-h-8 items-center gap-3">
                  <span className="inline-flex min-h-6 items-center bg-red px-2 text-[10px] font-semibold tracking-[0.18em]">BREAKING</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="border-b border-muted py-8 text-center font-display text-xl tracking-[0.8em] text-ink-faint">✧ ✧ ✧</div>

        <section id="about" className="mx-auto grid w-full max-w-[1280px] gap-8 px-6 py-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em]">About</p>
            <h2 className="mt-4 font-display text-[clamp(36px,5vw,56px)] font-black leading-[0.95]">Authoritative Engineering for Modern Products</h2>
            <p className="drop-cap mt-5 text-[17px] leading-[1.75]">
              Driven by a thirst for knowledge and a desire to contribute to impactful projects, Rafsa builds modern websites that blend performance and maintainable code.
            </p>
            <div className="mt-7 grid grid-cols-3 border border-ink bg-paper">
              {skills.map((skill, index) => (
                (() => {
                  const skillCols = 3;
                  const rowStart = Math.floor(index / skillCols) * skillCols;
                  const itemsInRow = Math.min(skillCols, skills.length - rowStart);
                  const itemInRow = index - rowStart;
                  const isLastInRow = itemInRow === itemsInRow - 1;
                  const lastRowStart = Math.floor((skills.length - 1) / skillCols) * skillCols;
                  const isLastRow = rowStart === lastRowStart;

                  return (
                    <article
                      key={skill}
                      className={`min-h-11 px-3 pl-3 ${!isLastRow ? "border-b border-ink" : ""} ${!isLastInRow ? "border-r border-ink" : ""}`}
                    >
                      <span className="inline-flex min-h-11 items-center text-[11px] font-semibold uppercase tracking-[0.14em]">
                        {skill}
                      </span>
                    </article>
                  );
                })()
              ))}
            </div>
          </div>

          <aside className="md:col-span-5 border border-ink bg-muted p-6">
            <h3 className="font-display text-[28px] font-bold">Field Notes</h3>
            <div className="mt-4 space-y-3 text-[14px]">
              <p><span className="font-semibold">Location:</span> Jakarta, Indonesia</p>
              <p><span className="font-semibold">Availability:</span> Open for Remote Roles</p>
              <p><span className="font-semibold">Education:</span> S.Pd. Informatics and Computer Engineering Education, Jakarta State University</p>
            </div>
            <a href="#contact" className="mt-6 inline-flex min-h-11 items-center border border-ink px-6 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-200 ease-out hover:bg-ink hover:text-paper">
              Download CV
            </a>
          </aside>
        </section>

        <div className="border-b border-muted py-8 text-center font-display text-xl tracking-[0.8em] text-ink-faint">✧ ✧ ✧</div>

        <section id="projects" className="mx-auto w-full max-w-[1280px] px-6 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em]">Projects</p>
          <h2 className="mt-3 font-display text-[clamp(36px,5vw,56px)] font-black leading-[0.95]">Published Work</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="border border-ink bg-paper transition-all duration-200 ease-out hover:-translate-x-[3px] hover:-translate-y-[3px] hover:bg-muted hover:shadow-[5px_5px_0_0_#111111]">
                {project.image ? (
                  <div className="relative min-h-44 border-b border-ink bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="min-h-44 border-b border-ink bg-muted [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:14px_14px]" aria-hidden="true" />
                )}
                <div className="p-6">
                  <p className="font-ui text-[11px] uppercase tracking-[0.14em] text-red">{project.tag}</p>
                  <h3 className="mt-2 text-[24px] font-bold">{project.title}</h3>
                  <p className="mt-2 text-[16px]">{project.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center border border-ink bg-ink px-4 py-2 font-ui text-[11px] font-bold uppercase tracking-[0.14em] text-paper transition-colors duration-200 ease-out hover:bg-paper hover:text-ink"
                    >
                      Demo
                    </a>
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center border border-ink px-4 py-2 font-ui text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 ease-out hover:bg-ink hover:text-paper"
                    >
                      Source
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="bg-ink py-16 text-paper">
          <div className="mx-auto w-full max-w-[1280px] px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-red">Experience</p>
            <h2 className="mt-3 font-display text-[clamp(36px,5vw,56px)] font-black leading-[0.95]">Career Timeline</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <article className="border border-white/15 bg-white/5 p-6">
                <p className="font-ui text-[11px] uppercase tracking-[0.14em] text-red">2025-2025</p>
                <h3 className="mt-2 text-[24px] font-bold">Admin Dashboard</h3>
                <p className="mt-2 text-paper/70">Assisted in handling user reports and ensuring tickets were properly documented and processed.</p>
              </article>
              <article className="border border-white/15 bg-white/5 p-6">
                <p className="font-ui text-[11px] uppercase tracking-[0.14em] text-red">2025-2025</p>
                <h3 className="mt-2 text-[24px] font-bold">Developer Intern</h3>
                <p className="mt-2 text-paper/70">Collaborate on creating a program ticketing system for complaints and services.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-ink px-6 py-16">
          <div className="mx-auto grid w-full max-w-[1280px] gap-8 md:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em]">Contact</p>
              <h2 className="mt-3 font-display text-[clamp(36px,5vw,56px)] font-black leading-[0.95]">Let us build something meaningful.</h2>
              <p className="mt-5 max-w-xl text-[17px] leading-[1.75]">Open to collaborations, freelance projects, and full-time remote opportunities.</p>
              <div className="mt-8 space-y-3">
                <a href="mailto:rlmzmasteriwan@gmail.com" className="flex min-h-11 items-center gap-3 border border-ink p-3 transition-colors duration-200 ease-out hover:text-red">
                  <span className="grid h-11 w-11 place-items-center border border-ink font-mono text-[14px]">@</span>
                  <span>
                    <span className="block font-semibold text-[14px]">Email</span>
                    <span className="block font-mono text-[12px] text-ink-soft">hrafsa.a@gmail.com</span>
                  </span>
                </a>
                <a href="https://github.com/hrafsa" className="flex min-h-11 items-center gap-3 border border-ink p-3 transition-colors duration-200 ease-out hover:text-red">
                  <span className="grid h-11 w-11 place-items-center border border-ink font-mono text-[14px]">GH</span>
                  <span>
                    <span className="block font-semibold text-[14px]">GitHub</span>
                    <span className="block font-mono text-[12px] text-ink-soft">github.com/hrafsa</span>
                  </span>
                </a>
              </div>
            </div>

            <form className="border border-ink bg-muted p-6">
              <label className="mb-4 block">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Name</span>
                <input className="mt-2 block min-h-11 w-full border-b-2 border-ink bg-transparent px-1 py-2 font-mono text-[14px] outline-none focus:bg-muted" />
              </label>
              <label className="mb-4 block">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Email</span>
                <input className="mt-2 block min-h-11 w-full border-b-2 border-ink bg-transparent px-1 py-2 font-mono text-[14px] outline-none focus:bg-muted" />
              </label>
              <label className="mb-6 block">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Message</span>
                <textarea className="mt-2 block min-h-28 w-full border-b-2 border-ink bg-transparent px-1 py-2 font-mono text-[14px] outline-none focus:bg-muted" />
              </label>
              <button className="inline-flex min-h-11 items-center border border-ink bg-ink px-7 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-paper transition-colors duration-200 ease-out hover:bg-paper hover:text-ink">
                Send Message
              </button>
            </form>
          </div>
        </section>

        <footer className="border-t border-ink px-6 py-12">
          <div className="mx-auto grid w-full max-w-[1280px] gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="font-display text-[34px] font-black leading-none">Hashemi Rafsa Alfatih</p>
              <p className="mt-3 max-w-xl text-[16px] leading-[1.75]">Editorial-style portfolio focused on robust engineering and clear product communication.</p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em]">Navigation</p>
              <div className="mt-3 space-y-2 text-[14px]">
                <a className="block transition-colors duration-200 ease-out hover:text-red" href="#about">About</a>
                <a className="block transition-colors duration-200 ease-out hover:text-red" href="#projects">Projects</a>
                <a className="block transition-colors duration-200 ease-out hover:text-red" href="#experience">Experience</a>
              </div>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em]">Edition</p>
              <p className="mt-3 font-mono text-[12px] text-ink-soft">Vol. 22</p>
              <p className="font-mono text-[12px] text-ink-soft">Edition 0319</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
