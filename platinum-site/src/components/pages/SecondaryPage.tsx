import { HardwarePage, hardwareRoutes } from "./HardwarePage";
import source from "../../../../ghscl-website/ecosystem.en.json";
import { SecondaryInteractions } from "./SecondaryInteractions";
import extraPagesSource from "../../../data/extra-pages.json";
import { ProcessFlow3D } from "../scene/ProcessFlow3D";
import { ProcessScene3D } from "../scene/ProcessScene3D";
const companyLogo = "assets/company-logo.webp";

type Card=[string,string];
type LinkPair=[string,string];
type Section={id:string;title:string;text?:string;cards?:Card[];flow?:string[];link?:LinkPair};
type Page={slug:string;label:string;title:string;description:string;sections:Section[]};
type Site={messages:{brand:string;operator:string;boundary:string;principle:string};navigation:LinkPair[];pages:Page[]};
const site=source as unknown as Site;
const extraPages=extraPagesSource as unknown as Page[];
const navigationGroups = [
  {title:"Assurance",routes:["standards","digital-trust","laboratory","smart-audit","hardware","cybersecurity","verify"]},
  {title:"Operations",routes:["manufacturers","traceability","china-gcc","gcc-importer","distributor","retail-market","command-center","interoperability"]},
  {title:"Institutional",routes:["corporate-profile","visuals","how-it-works","china-mission","partners","finance-takaful","contact","zh-Hant","ar","login/index"]},
];
function GroupedLinks(){return <>{navigationGroups.map(group=><div className="secondary-navigation-group" key={group.title}><strong>{group.title}</strong>{site.navigation.filter(([href])=>group.routes.includes(href.replace(/\.html$/,""))).map(([href,label])=><a href={href} key={href}>{label}</a>)}</div>)}</>;}

function slugFromLocation(pathname: string){
  const file=pathname.split("/").filter(Boolean).pop()||"index.html";
  const route=file.replace(/\.html$/i,"");
  return route==="zh-Hans"?"zh-Hant":route;
}

export function SecondaryPage({ pathname = window.location.pathname }: { pathname?: string }){
  const slug=slugFromLocation(pathname);
  if(hardwareRoutes.includes(slug)) return <HardwarePage slug={slug}/>;
  const page=[...site.pages,...extraPages].find(item=>item.slug===slug);
  if(!page)return <main className="secondary-not-found"><p className="eyebrow">AMANAH / PUBLIC SITE</p><h1>Page not found.</h1><a className="button-primary" href="index.html">Return home</a></main>;
  return <div className="secondary-shell" data-route={slug} lang={slug==="ar"?"ar":slug==="zh-Hant"?"zh-Hant":"en"} dir={slug==="ar"?"rtl":"ltr"}>
    <a className="skip-link" href="#secondary-main">Skip to content</a>
    <header className="platinum-header glass secondary-header">
      <a className="identity" href="index.html"><span className="identity-mark" aria-hidden="true"><img src={companyLogo} alt="" /></span><span className="identity-copy"><strong>{site.messages.brand}</strong><small>{site.messages.operator}</small></span></a>
      <nav aria-label="Primary navigation" className="secondary-nav">
        {site.navigation.slice(0,4).map(([href,label])=><a key={href} href={href} aria-current={href===slug+".html"?"page":undefined}>{label}</a>)}
        <details className="secondary-route-menu"><summary>Explore</summary><div className="secondary-route-panel"><GroupedLinks/></div></details>
      </nav>
      <details className="secondary-mobile-menu"><summary>Explore</summary><div className="secondary-mobile-panel"><GroupedLinks/></div></details>
      <a className="header-cta" href="login/index.html">Secure portal ↗</a>
    </header>
    <main id="secondary-main">
      <section className="secondary-hero">
        <div><p className="eyebrow">{page.label.toUpperCase()}</p><h1>{page.title}</h1><p>{page.description}</p>
          <div className="hero-actions"><a className="button-primary" href="https://amanah-yq9x.vercel.app/login">Open Amanah ↗</a><a className="button-secondary" href="contact.html">Plan your rollout</a></div>
          <div className="secondary-topology">AHTE ⇄ Direct JAKIM API ⇄ JAKIM <span>·</span> China → GCC direct</div>
        </div>
        <div className="secondary-hero-scene"><ProcessScene3D mode={slug} stage={`${page.label} · China origin to GCC destination`} className="secondary-page-scene" overviewOnly /></div>
      </section>
      <nav className="secondary-index" aria-label="On this page">{page.sections.map(section=><a key={section.id} href={"#"+section.id}>{section.title}</a>)}</nav>
      {page.sections.map((section,index)=><section className="secondary-section" id={section.id} key={section.id}>
        <div className="secondary-section-heading"><span>{String(index+1).padStart(2,"0")}</span><p className="eyebrow">{page.label}</p><h2>{section.title}</h2></div>
        <div className="secondary-section-body">
          {section.text?<p className="secondary-lede">{section.text}</p>:null}
          {section.cards?<div className="secondary-card-grid">{section.cards.map(([title,text])=><article className="secondary-card glass" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>:null}
          {section.flow?.length?<><ProcessFlow3D title={section.title} steps={section.flow} mode={slug} id={`${slug}-${section.id}-process`} /><ol className="secondary-flow secondary-flow-fallback">{section.flow.map((item,i)=><li key={item}><span>{String(i+1).padStart(2,"0")}</span><strong>{item}</strong></li>)}</ol></>:null}
          {section.link?<a className="button-secondary" href={section.link[0]}>{section.link[1]} ↗</a>:null}
        </div>
      </section>)}
      <SecondaryInteractions slug={slug} />

    </main>
    <footer className="secondary-footer"><div><img className="footer-lockup" src={companyLogo} alt="Global Halal Supply Chain Ltd company logo" /><strong>{site.messages.brand}</strong><p>{site.messages.principle}</p></div><nav aria-label="Footer"><GroupedLinks/></nav><nav className="language-links" aria-label="Language"><a href="index.html">English</a><a href="zh-Hant.html" lang="zh-Hant">繁體中文</a><a href="ar.html" lang="ar" dir="rtl">العربية</a></nav></footer>
  </div>;
}
