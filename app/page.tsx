'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { projects } from '../lib/projects';

const ease = 'cubicBezier(0.22, 1, 0.36, 1)';
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function Letters({ text }: { text: string }) {
 return <>{[...text].map((char, i) => <span className="char" key={i}>{char === ' ' ? '\u00a0' : char}</span>)}</>;
}

export default function Home() {
 const root = useRef<HTMLDivElement>(null);
 const [selected, setSelected] = useState(0);
 const [inWork, setInWork] = useState(false);
 const [copied, setCopied] = useState(false);
 const previous = useRef(0);
 const scrollAnimation = useRef<anime.AnimeInstance | null>(null);
 const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

 useEffect(() => {
  const el = root.current!;
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const intro = el.querySelector<HTMLElement>('.intro-scene')!;
  const work = el.querySelector<HTMLElement>('.work-scene')!;
  const heading = el.querySelectorAll('.hero-char .char');
  const entrance = anime({ targets: heading, translateY: ['110%', '0%'], rotate: [5, 0], delay: anime.stagger(24), duration: media.matches ? 0 : 1100, easing: ease });

  const scene = anime.timeline({ autoplay: false, easing: 'linear' })
   .add({ targets: el.querySelector('.line-first'), translateX: [0, -80], translateY: ['0%', '-115%'], opacity: [1, 0], duration: 420 }, 0)
   .add({ targets: el.querySelector('.line-second'), translateX: [0, 100], translateY: ['0%', '-110%'], opacity: [1, 0], duration: 480 }, 80)
   .add({ targets: el.querySelectorAll('.intro-note,.intro-action'), translateY: [0, -24], opacity: [1, 0], duration: 280, delay: anime.stagger(35) }, 40)
   .add({ targets: el.querySelector('.work-surface'), clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'], duration: 650 }, 160)
   .add({ targets: el.querySelectorAll('.work-reveal'), translateY: [70, 0], opacity: [0, 1], duration: 520, delay: anime.stagger(75) }, 340);

  let targetProgress = 0;
  let currentProgress = 0;
  let inWorkCurrent = false;
  let rafId: number | null = null;

  function updateTarget() {
   const range = Math.max(1, el.offsetHeight - window.innerHeight);
   targetProgress = Math.max(0, Math.min(1, window.scrollY / range));
  }

  function loop() {
   if (media.matches) {
    const active = targetProgress > 0.48;
    if (active !== inWorkCurrent) {
     inWorkCurrent = active;
     setInWork(active);
     intro.inert = active;
     work.inert = !active;
     intro.setAttribute('aria-hidden', String(active));
     work.setAttribute('aria-hidden', String(!active));
    }
    scene.seek(active ? scene.duration : 0);
    rafId = requestAnimationFrame(loop);
    return;
   }

   const diff = targetProgress - currentProgress;
   if (Math.abs(diff) > 0.0003) {
    currentProgress += diff * 0.15;
    scene.seek(currentProgress * scene.duration);

    const active = currentProgress > 0.48;
    if (active !== inWorkCurrent) {
     inWorkCurrent = active;
     setInWork(active);
     intro.inert = active;
     work.inert = !active;
     intro.setAttribute('aria-hidden', String(active));
     work.setAttribute('aria-hidden', String(!active));
    }
   }
   rafId = requestAnimationFrame(loop);
  }

  updateTarget();
  currentProgress = targetProgress;
  scene.seek(currentProgress * scene.duration);

  rafId = requestAnimationFrame(loop);

  const onPreference = () => { entrance.seek(entrance.duration); updateTarget(); };
  const interrupt = () => scrollAnimation.current?.pause();

  window.addEventListener('scroll', updateTarget, { passive: true });
  window.addEventListener('resize', updateTarget);
  window.addEventListener('wheel', interrupt, { passive: true });
  window.addEventListener('touchstart', interrupt, { passive: true });
  media.addEventListener('change', onPreference);

  return () => {
   if (rafId) cancelAnimationFrame(rafId);
   entrance.pause();
   scene.pause();
   scrollAnimation.current?.pause();
   anime.remove(el.querySelectorAll('*'));
   window.removeEventListener('scroll', updateTarget);
   window.removeEventListener('resize', updateTarget);
   window.removeEventListener('wheel', interrupt);
   window.removeEventListener('touchstart', interrupt);
   media.removeEventListener('change', onPreference);
   if (copyTimer.current) clearTimeout(copyTimer.current);
  };
 }, []);

 useEffect(() => {
  const panels = root.current!.querySelectorAll<HTMLElement>('.project-panel');
  const current = panels[selected];
  const old = panels[previous.current];
  panels.forEach((panel, i) => { panel.inert = i !== selected; });
  if (old !== current) {
   const out = old.querySelectorAll('.project-letter .char');
   const oldMeta = old.querySelectorAll('.project-meta > *');
   anime.remove(out);
   anime.remove(oldMeta);
   anime({ targets: out, translateY: '-115%', opacity: 0, duration: reduced() ? 0 : 520, delay: reduced() ? 0 : anime.stagger(16), easing: ease });
   anime({ targets: oldMeta, translateY: -12, opacity: 0, duration: reduced() ? 0 : 160, easing: ease });
  }
  const chars = current.querySelectorAll('.project-letter .char');
  const meta = current.querySelectorAll('.project-meta > *');
  anime.remove([...chars, ...meta]);
  anime({ targets: chars, translateY: ['115%', '0%'], opacity: [1, 1], rotate: [4, 0], duration: reduced() ? 0 : 1000, delay: reduced() ? 0 : anime.stagger(24, { start: 130 }), easing: ease });
  anime({ targets: meta, translateY: [22, 0], opacity: [0, 1], delay: reduced() ? 0 : anime.stagger(70, { start: 260 }), duration: reduced() ? 0 : 700, easing: ease });
  previous.current = selected;
 }, [selected]);

 function go(work: boolean, index?: number) {
  if (index !== undefined) setSelected(index);
  scrollAnimation.current?.pause();
  const destination = work ? root.current!.offsetHeight - window.innerHeight : 0;
  if (reduced()) { window.scrollTo(0, destination); return; }
  const position = { y: window.scrollY };
  scrollAnimation.current = anime({
   targets: position,
   y: destination,
   duration: 900,
   easing: 'cubicBezier(0.25, 1, 0.5, 1)',
   update: () => window.scrollTo(0, position.y)
  });
 }
 function wave(event: React.PointerEvent<HTMLHeadingElement>, reset = false) {
  if (reduced() || event.pointerType === 'touch') return;
  const chars = [...event.currentTarget.querySelectorAll('.char')];
  const distances = chars.map(char => { const r = char.getBoundingClientRect(); return Math.hypot(event.clientX - r.left - r.width / 2, event.clientY - r.top - r.height / 2); });
  anime.remove(chars);
  anime({ targets: chars, translateY: (_: Element, i: number) => reset ? 0 : -14 * Math.max(0, 1 - distances[i] / 170), rotate: 0, duration: reset ? 900 : 480, easing: ease });
 }
 function roll(button: HTMLElement, active: boolean) {
  const label = button.querySelector('.roll-track'); const arrow = button.querySelector('.action-arrow');
  anime.remove([label, arrow]);
  anime({ targets: label, translateY: active ? '-50%' : '0%', duration: reduced() ? 0 : 550, easing: ease });
  anime({ targets: arrow, translateX: active ? 4 : 0, translateY: active ? -4 : 0, duration: reduced() ? 0 : 550, easing: ease });
 }
 async function copy() {
  try { await navigator.clipboard.writeText('hrafsa.a@gmail.com'); setCopied(true); if (copyTimer.current) clearTimeout(copyTimer.current); copyTimer.current = setTimeout(() => setCopied(false), 2400); }
  catch { location.href = 'mailto:hrafsa.a@gmail.com'; }
 }

 return <div className="scroll-stage" ref={root}>
  <div className="portfolio" data-view={inWork ? 'work' : 'intro'}>
   <div className="work-surface" aria-hidden="true"/>
   <header className="site-top">
    <a href="#intro" className="signature" onClick={e => { e.preventDefault(); go(false); }}>hrafsa<span>Developer</span></a>
    <nav aria-label="Views"><button aria-pressed={!inWork} onClick={() => go(false)}>Intro</button><button aria-pressed={inWork} onClick={() => go(true)}>Work <sup>{projects.length}</sup></button></nav>
    <a className="github-link" href="https://github.com/hrafsa" target="_blank" rel="noreferrer">GitHub ↗</a>
   </header>
   <main className="single-stage">
    <section className="intro-scene" id="intro" aria-labelledby="intro-title">
     <h1 id="intro-title" aria-label="Ideas into things." onPointerMove={wave} onPointerLeave={e => wave(e, true)}>
      <span className="line-mask"><span className="hero-line line-first"><span className="hero-char" aria-hidden="true"><Letters text="Ideas into"/></span></span></span>
      <span className="line-mask second-mask"><span className="hero-line line-second serif"><span className="hero-char" aria-hidden="true"><Letters text="things."/></span></span></span>
     </h1>
     <p className="intro-note">Exploring ideas.<br/>Building useful things.<br/><span>Always a work in progress.</span></p>
     <button className="intro-action text-action" onClick={() => go(true)} onPointerEnter={e => roll(e.currentTarget, true)} onPointerLeave={e => roll(e.currentTarget, false)} onFocus={e => roll(e.currentTarget, true)} onBlur={e => roll(e.currentTarget, false)}><span className="roll-mask"><span className="roll-track"><span>Explore the work</span><span aria-hidden="true">A few things I’ve made</span></span></span><span className="action-arrow" aria-hidden="true">↗</span></button>
    </section>
    <section className="work-scene" aria-label="Selected projects" aria-hidden={!inWork}>
     <div className="work-top work-reveal"><h2>Selected work</h2><div className="project-controls"><span>{String(selected + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><button aria-label="Previous project" onClick={() => setSelected(i => (i - 1 + projects.length) % projects.length)}>←</button><button aria-label="Next project" onClick={() => setSelected(i => (i + 1) % projects.length)}>→</button></div></div>
     <div className="project-display work-reveal">{projects.map((project, i) => <article className="project-panel" key={project.title} aria-hidden={selected !== i} data-active={selected === i}>
      <h3 className="project-heading" aria-label={project.title}>{project.display.map((line, j) => <span className={`project-line ${j ? 'serif' : ''}`} key={line}><span className="project-letter" aria-hidden="true"><Letters text={line}/></span></span>)}</h3>
      <div className="project-meta"><span className="project-type">{project.type}</span><p>{project.description}</p><div className="project-links"><a className="text-action" href={project.url} target="_blank" rel="noreferrer" onPointerEnter={e => roll(e.currentTarget, true)} onPointerLeave={e => roll(e.currentTarget, false)}><span className="roll-mask"><span className="roll-track"><span>Open project</span><span aria-hidden="true">Take a look</span></span></span><span className="action-arrow" aria-hidden="true">↗</span></a><a className="source-link" href={project.source} target="_blank" rel="noreferrer" aria-label={`Source code for ${project.title}`}>Source ↗</a></div></div>
     </article>)}</div>
    </section>
    <div className="project-index" aria-label="Project index"><span className="index-label">A few things<br/>I’ve made</span><div>{projects.map((project, i) => <button key={project.title} aria-pressed={inWork && selected === i} onClick={() => go(true, i)}><span className="index-number">{String(i + 1).padStart(2, '0')}</span><span className="index-name">{project.title}</span><span aria-hidden="true">↗</span></button>)}</div><span className="scroll-hint">{inWork ? 'Scroll up to return ↑' : 'Scroll to explore ↓'}</span></div>
   </main>
   <footer className="site-bottom"><span className="availability"><i/> Open to opportunities</span><button onClick={copy} aria-live="polite">{copied ? 'Email copied ✓' : 'Let’s talk ↗'}</button><span>ID</span></footer>
  </div>
 </div>;
}
