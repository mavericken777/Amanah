import source from "../../../../ghscl-website/ecosystem.en.json";

type Card=[string,string];
type LinkPair=[string,string];
type Section={id:string;title:string;text?:string;cards?:Card[];flow?:string[];link?:LinkPair};
type Page={slug:string;label:string;title:string;description:string;sections:Section[]};
type Site={messages:{brand:string;operator:string;boundary:string;principle:string};navigation:LinkPair[];pages:Page[]};
const site=source as unknown as Site;

function slugFromLocation(){
  const file=window.location.pathname.split("/").filter(Boolean).pop()||"index.html";
  return file.replace(/\.html$/i,"");
}

export function SecondaryPage(){
  const slug=slugFromLocation();
  const page=site.pages.find(item=>item.slug===slug);
  if(!page)return <main className="secondary-not-found"><p className="eyebrow">AMANAH / PUBLIC SITE</p><h1>Page not found.</h1><a className="button-primary" href="index.html">Return home</a></main>;
  return <div className="secondary-shell">
    <a className="skip-link" href="#secondary-main">Skip to content</a>
    <header className="platinum-header glass secondary-header">
      <a className="identity" href="index.html"><span className="identity-mark" aria-hidden="true">حلال</span><span className="identity-copy"><strong>{site.messages.brand}</strong><small>{site.messages.operator}</small></span></a>
      <nav aria-label="Primary navigation" className="secondary-nav">
        {site.navigation.slice(0,7).map(([href,label])=><a key={href} href={href} aria-current={href===slug+".html"?"page":undefined}>{label}</a>)}
      </nav>
      <a className="header-cta" href="https://amanah-yq9x.vercel.app/login">Secure portal ↗</a>
    </header>
    <main id="secondary-main">
      <section className="secondary-hero">
        <div><p className="eyebrow">{page.label.toUpperCase()}</p><h1>{page.title}</h1><p>{page.description}</p>
          <div className="hero-actions"><a className="button-primary" href="https://amanah-yq9x.vercel.app/login">Open Amanah ↗</a><a className="button-secondary" href="contact.html">Plan your rollout</a></div>
          <div className="secondary-topology">AHTE ⇄ Direct JAKIM API ⇄ JAKIM <span>·</span> China → GCC direct</div>
        </div>
        <aside className="secondary-crest glass"><span className="secondary-orbit" aria-hidden="true"/><div className="secondary-shield"><strong lang="ar" dir="rtl">حلال</strong></div><small>EVIDENCE → ASSESSMENT → HUMAN AUTHORITY → RELEASE</small></aside>
      </section>
      <nav className="secondary-index" aria-label="On this page">{page.sections.map(section=><a key={section.id} href={"#"+section.id}>{section.title}</a>)}</nav>
      {page.sections.map((section,index)=><section className="secondary-section" id={section.id} key={section.id}>
        <div className="secondary-section-heading"><span>{String(index+1).padStart(2,"0")}</span><p className="eyebrow">{page.label}</p><h2>{section.title}</h2></div>
        <div className="secondary-section-body">
          {section.text?<p className="secondary-lede">{section.text}</p>:null}
          {section.cards?<div className="secondary-card-grid">{section.cards.map(([title,text])=><article className="secondary-card glass" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>:null}
          {section.flow?<ol className="secondary-flow">{section.flow.map((item,i)=><li key={item}><span>{String(i+1).padStart(2,"0")}</span><strong>{item}</strong></li>)}</ol>:null}
          {section.link?<a className="button-secondary" href={section.link[0]}>{section.link[1]} ↗</a>:null}
        </div>
      </section>)}
      <section className="secondary-boundary glass"><p className="eyebrow">AUTHORITY BOUNDARY</p><h2>Technology strengthens assurance. It does not create the competent-authority decision.</h2><p>{site.messages.boundary}</p></section>
    </main>
    <footer className="secondary-footer"><div><strong>{site.messages.brand}</strong><p>{site.messages.principle}</p></div><nav aria-label="Footer">{site.navigation.map(([href,label])=><a href={href} key={href}>{label}</a>)}</nav><p className="secondary-source-note">Frozen standards baseline preserved · external production connectors remain separately authorised.</p></footer>
  </div>;
}
