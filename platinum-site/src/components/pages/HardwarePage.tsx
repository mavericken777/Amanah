import { useEffect, useRef, useState } from "react";
import { hardwareCopy, type HardwareLocale } from "../../data/hardwareContent";
import { ProcessFlow3D } from "../scene/ProcessFlow3D";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export const hardwareRoutes = ["hardware", "hardware-zh-Hans", "hardware-zh-Hant", "hardware-ar"];
export function HardwarePage({slug}:{slug:string}) {
  const locale:HardwareLocale = slug.endsWith("zh-Hans") ? "zh-Hans" : slug.endsWith("zh-Hant") ? "zh-Hant" : slug.endsWith("ar") ? "ar" : "en";
  const c = hardwareCopy[locale];
  const [sector,setSector] = useState(0);
  const [scenario,setScenario] = useState(0);
  const [moviePlaying,setMoviePlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const movieWanted = useRef(false);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    movieWanted.current = !reduced;
    let visible = true;
    const reconcile = () => {
      if (visible && movieWanted.current && !document.hidden) void element.play().catch(() => setMoviePlaying(false));
      else element.pause();
    };
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      reconcile();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", reconcile);
    reconcile();
    return () => {observer.disconnect();document.removeEventListener("visibilitychange", reconcile);element.pause();};
  },[reduced]);
  const ids = ["environments","equipment","capture","lifecycle","evidence","procurement"];
  const labels={previous:c.previous,next:c.next,pause:c.pause,play:c.play,showStep:c.showStep,overview:c.overview,reduced:c.reduced};
  const switchLanguage = (route:string) => {
    const sections = [...document.querySelectorAll<HTMLElement>("main > section[id]")];
    const current = sections.filter(section => section.getBoundingClientRect().top < window.innerHeight * .5).at(-1);
    return route + ".html" + (current ? "#" + current.id : window.location.hash);
  };
  return <div className="secondary-shell hardware-page" lang={locale} dir={locale==="ar"?"rtl":"ltr"}>
    <a className="skip-link" href="#secondary-main">{locale==="en"?"Skip to content":locale==="ar"?"انتقل إلى المحتوى":"跳至內容"}</a>
    <header className="hardware-header">
      <a className="hardware-brand" href="index.html"><img src="assets/company-logo.webp" width="42" height="48" alt=""/><span>GLOBAL HALAL SUPPLY CHAIN LTD<small>AMANAH · GLOBAL HALAL DIGITAL TRUST</small></span></a>
      <nav aria-label={c.tour}><a href="index.html">{c.home}</a><a href="platform-tour.html">{c.tour}</a><a href="https://amanah-yq9x.vercel.app/login">{c.portal} ↗</a></nav>
      <nav className="hardware-languages" aria-label="Language">{[["hardware","en","EN"],["hardware-zh-Hans","zh-Hans","简体"],["hardware-zh-Hant","zh-Hant","繁體"],["hardware-ar","ar","العربية"]].map(([route,lang,name])=><a key={route} href={route+".html"} lang={lang} aria-current={locale===lang?"page":undefined} onClick={event=>{event.preventDefault();window.location.href=switchLanguage(route);}}>{name}</a>)}</nav>
    </header>
    <main id="secondary-main">
      <section className="hardware-hero">
        <div className="hardware-film">
          <video ref={video} muted loop playsInline preload="none" poster="assets/scene-assurance.webp" aria-label={c.videoLabel} onPlay={()=>setMoviePlaying(true)} onPause={()=>setMoviePlaying(false)}><source src="assets/hardware-evidence.mp4" type="video/mp4"/></video>
          <button type="button" aria-label={c.videoLabel+": "+(moviePlaying?c.pause:c.play)} onClick={()=>{movieWanted.current=!moviePlaying;if(moviePlaying)video.current?.pause();else void video.current?.play().catch(()=>setMoviePlaying(false));}}>{moviePlaying?c.pause:c.play}</button>
        </div>
        <div className="hardware-hero-copy"><p className="eyebrow">AMANAH · {c.sectionTitles[1]}</p><h1>{c.title}</h1><p>{c.intro}</p><a className="button-primary" href="#environments">{c.sectionTitles[0]} ↓</a><p className="hardware-corridor">China → GCC direct</p></div>
      </section>
      <nav className="hardware-index" aria-label={c.tour}>{ids.map((id,i)=><a href={"#"+id} key={id}>{c.sectionTitles[i]}</a>)}</nav>
      <section id="environments" className="hardware-section"><p className="eyebrow">01</p><h2>{c.sectionTitles[0]}</h2><p>{c.sectorIntro}</p><div className="hardware-choice" role="group" aria-label={c.sectionTitles[0]}>{c.sectors.map(([name],i)=><button key={name} type="button" aria-pressed={sector===i} onClick={()=>setSector(i)}>{name}</button>)}</div><article className="hardware-selection" aria-live="polite"><h3>{c.sectors[sector][0]}</h3><p>{c.sectors[sector][1]}</p><p className="hardware-handoff">{c.sectors[sector][2]}</p></article></section>
      <section id="equipment" className="hardware-section"><p className="eyebrow">02</p><h2>{c.deviceTitle}</h2><div className="hardware-equipment">{c.devices.map(([name,model,detail])=><details key={name}><summary>{name}</summary><div><p className="hardware-model" dir="auto">{model}</p><p>{detail}</p></div></details>)}</div></section>
      <section id="capture" className="hardware-section"><p className="eyebrow">03</p><h2>{c.sectionTitles[2]}</h2><p>{c.flowIntro}</p><ProcessFlow3D mode="hardware" title={c.sectionTitles[2]} steps={c.steps.map(x=>x[0])} descriptions={c.steps.map(x=>x[1])} labels={labels} id="hardware-evidence-flow"/></section>
      <section id="lifecycle" className="hardware-section"><p className="eyebrow">04</p><h2>{c.sectionTitles[3]}</h2><p>{c.lifecycleIntro}</p><div className="hardware-lifecycle">{c.lifecycle.map(([name,detail],i)=><article key={name}><span>{String(i+1).padStart(2,"0")}</span><h3>{name}</h3><p>{detail}</p></article>)}</div></section>
      <section id="evidence" className="hardware-section"><p className="eyebrow">05</p><h2>{c.sectionTitles[4]}</h2><p>{c.evidenceIntro}</p><div className="hardware-choice" role="group" aria-label={c.sectionTitles[4]}>{c.scenarios.map(([name],i)=><button key={name} type="button" aria-pressed={scenario===i} onClick={()=>setScenario(i)}>{name}</button>)}</div><dl className="hardware-event" aria-live="polite">{c.evidenceLabels.map((label,i)=><div key={label}><dt>{label}</dt><dd>{c.scenarios[scenario][i+1]}</dd></div>)}</dl></section>
      <section id="procurement" className="hardware-section"><p className="eyebrow">06</p><h2>{c.sectionTitles[5]}</h2><p>{c.quote}</p><a className="button-primary" href="contact.html">{c.contact} ↗</a><div className="hardware-governance"><p>{c.governance}</p><p dir="ltr">AHTE ⇄ Direct JAKIM API ⇄ JAKIM</p><p>{c.topologyNote}</p><strong>{c.principle}</strong></div></section>
    </main>
    <footer className="hardware-footer"><p>GLOBAL HALAL SUPPLY CHAIN LTD · AMANAH</p><nav><a href="smart-audit.html">{c.sectors[0][0]} · {c.devices[0][0]}</a><a href="laboratory.html">{c.sectors[8][0]}</a><a href="china-gcc.html">{c.sectors[6][0]}</a><a href="cybersecurity.html">{c.steps[4][0]}</a><a href="contact.html">{c.contact}</a></nav></footer>
  </div>;
}
