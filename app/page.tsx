"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  {
    title: "MLBB Draft",
    year: "2026",
    type: "Web application",
    role: "Design & development",
    description:
      "A focused drafting workspace for planning Mobile Legends team compositions through a clearer, analysis-first flow.",
    image: "/images/mlbb-draft.png",
<<<<<<< HEAD
    demoUrl: "https://mlbb-draft.vercel.app",
    sourceUrl: "https://github.com/hrafsa/mlbb-draft",
    tags: ["Responsive UI", "Draft analysis", "Open source"],
  },
];

const experiences = [
  {
    year: "2025",
    role: "Developer Intern",
    title: "Service ticketing system",
    description:
      "Collaborated on a web-based ticketing flow for service requests and complaints.",
  },
  {
    year: "2025",
    role: "Support & Report Administration",
    title: "Issue documentation",
    description:
      "Handled user reports and kept support tickets clear, categorized, and ready for follow-up.",
  },
=======
    demoUrl: "https://mlbb-drafting.vercel.app",
    sourceUrl: "https://github.com/hrafsa/mlbb-drafting",
  }
>>>>>>> 32288f07ef20c4dd5da24b4b578b80d68f081212
];

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = root.dataset.theme === "dark" ? "dark" : "light";
    const syncFrame = window.requestAnimationFrame(() => setTheme(currentTheme));
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const syncWithSystem = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("portfolio-theme")) return;
      const nextTheme: Theme = event.matches ? "dark" : "light";
      root.dataset.theme = nextTheme;
      root.style.colorScheme = nextTheme;
      setTheme(nextTheme);
    };

    media.addEventListener("change", syncWithSystem);
    return () => {
      window.cancelAnimationFrame(syncFrame);
      media.removeEventListener("change", syncWithSystem);
    };
  }, []);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNavOpen(false);
    };

    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [mobileNavOpen]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  };

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="shell header-row">
          <a className="wordmark" href="#top" aria-label="Hrafsa, home">
            HRAFSA
          </a>

          <p className="header-status">
            <span aria-hidden="true" /> Available for work / Jakarta
          </p>

          <div className="header-actions">
            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              aria-pressed={theme === "dark"}
            >
              <span>Light</span>
              <i aria-hidden="true"><b /></i>
              <span>Dark</span>
            </button>
            <a className="header-contact" href="mailto:hrafsa.a@gmail.com">
              Email me
            </a>
            <button
              className="menu-button"
              type="button"
              aria-label="Open navigation"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileNavOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={`mobile-navigation ${mobileNavOpen ? "is-open" : ""}`}
        aria-hidden={!mobileNavOpen}
      >
        <div className="mobile-navigation-head">
          <span>Index</span>
          <button type="button" onClick={closeMobileNav} aria-label="Close navigation">
            Close
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMobileNav}
              tabIndex={mobileNavOpen ? 0 : -1}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href="mailto:hrafsa.a@gmail.com" tabIndex={mobileNavOpen ? 0 : -1}>
          hrafsa.a@gmail.com
        </a>
      </div>

      <main id="main-content">
        <section id="top" className="hero shell">
          <p className="kicker">Web developer / Product-minded engineering</p>
          <h1>I build clear, useful web products.</h1>
          <div className="hero-foot">
            <p>
              I turn real needs into responsive digital experiences that people can understand and use.
            </p>
            <a className="primary-link" href="mailto:hrafsa.a@gmail.com">
              Start a conversation
            </a>
          </div>

          <dl className="hero-profile" aria-label="Working profile">
            <div>
              <dt>Focus</dt>
              <dd>Useful web products</dd>
            </div>
            <div>
              <dt>Approach</dt>
              <dd>Clear + responsive</dd>
            </div>
            <div>
              <dt>Core stack</dt>
              <dd>React / Next.js / Laravel</dd>
            </div>
            <div>
              <dt>Work mode</dt>
              <dd><span aria-hidden="true" /> Remote / Jakarta</dd>
            </div>
          </dl>
        </section>

        <section id="work" className="projects shell" aria-labelledby="projects-title">
          <header className="projects-heading">
            <div>
              <p className="section-label">Selected work</p>
              <h2 id="projects-title">Products built around real use.</h2>
            </div>
            <p>{projects.length} project{projects.length === 1 ? "" : "s"} published</p>
          </header>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-row" key={project.title}>
                <div className="project-index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <time>{project.year}</time>
                </div>

                <div className="project-thumbnail">
                  <Image
                    src={project.image}
                    alt={`${project.title} interface`}
                    width={480}
                    height={270}
                    sizes="(max-width: 760px) 100vw, 300px"
                  />
                </div>

                <div className="project-summary">
                  <p>{project.type} / {project.role}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul aria-label={`${project.title} traits`}>
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>

                <div className="project-links">
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">Live project</a>
                  <a href={project.sourceUrl} target="_blank" rel="noreferrer">Source code</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="studio-layout shell">
          <aside id="about" className="studio-index">
            <div className="index-inner">
              <p className="section-label">Studio index</p>
              <nav aria-label="Page index">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href}>{item.label}</a>
                ))}
              </nav>

              <div className="index-block">
                <h2>About</h2>
                <p>
                  Hashemi Rafsa Alfatih is a Jakarta-based web developer with a background in Informatics and Computer Engineering Education.
                </p>
              </div>

              <div className="index-block">
                <h2>Capabilities</h2>
                <p>React, Next.js, JavaScript, Tailwind CSS, PHP, Laravel, and MySQL.</p>
              </div>

              <div className="index-block availability-copy">
                <h2>Availability</h2>
                <p><span aria-hidden="true" /> Open to remote, full-time, and freelance work.</p>
              </div>

              <div className="index-links">
                <a href="mailto:hrafsa.a@gmail.com">Email</a>
                <a href="https://github.com/hrafsa" target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </aside>

          <div className="studio-content">
            <section id="experience" className="experience" aria-labelledby="experience-title">
              <p className="section-label">Experience</p>
              <h2 id="experience-title">Learning through real work.</h2>
              <div className="experience-rows">
                {experiences.map((experience) => (
                  <article key={experience.role}>
                    <time>{experience.year}</time>
                    <div>
                      <h3>{experience.role}</h3>
                      <strong>{experience.title}</strong>
                    </div>
                    <p>{experience.description}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section id="contact" className="contact-band">
          <div className="shell contact-row">
            <div>
              <p className="section-label">Contact</p>
              <h2>Have something useful to build?</h2>
            </div>
            <div className="contact-action">
              <dl className="contact-details">
                <div>
                  <dt>Work type</dt>
                  <dd>Full-time / Freelance / Collaboration</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>Jakarta / Remote</dd>
                </div>
              </dl>
              <a href="mailto:hrafsa.a@gmail.com">
                <span>Email</span>
                <strong>hrafsa.a@gmail.com</strong>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-row">
          <span>Hashemi Rafsa Alfatih</span>
          <span>Web developer / Jakarta</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  );
}
