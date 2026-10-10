import { useEffect } from "react";
import source from "../../../../ghscl-website/ecosystem.en.json";
import { SecondaryInteractions } from "./SecondaryInteractions";
import extraPagesSource from "../../../data/extra-pages.json";
import { ProcessFlow3D } from "../scene/ProcessFlow3D";
import { ProcessScene3D } from "../scene/ProcessScene3D";
const companyLogo = "assets/company-logo.webp";

type Card=[string,string];
type LinkPair=[string,string];
type Section={id:string;title:string;text?:string;cards?:Card[];flow?:string[];link?:LinkPair;detail?:string};
type Page={slug:string;label:string;title:string;description:string;sections:Section[]};
type Site={messages:{brand:string;operator:string;boundary:string;principle:string};navigation:LinkPair[];pages:Page[]};
const site=source as unknown as Site;
const extraPages=extraPagesSource as unknown as Page[];

function slugFromLocation(pathname: string){
  const file=pathname.split("/").filter(Boolean).pop()||"index.html";
  const route=file.replace(/\.html$/i,"");
  return route==="zh-Hans"?"zh-Hant":route;
}

export function SecondaryPage({ pathname = window.location.pathname }: { pathname?: string }){
  useEffect(()=>{
    const closeMenus=(event:KeyboardEvent)=>{if(event.key!=="Escape")return;document.querySelectorAll<HTMLDetailsElement>(".secondary-header details[open]").forEach(menu=>{menu.open=false;menu.querySelector<HTMLElement>("summary")?.focus();});};
    document.addEventListener("keydown",closeMenus);return ()=>document.removeEventListener("keydown",closeMenus);
  },[]);
  const slug=slugFromLocation(pathname);
  const page=[...site.pages,...extraPages].find(item=>item.slug===slug);
  const localized=slug==='ar'||slug==='zh-Hant';
  const chinese=slug==='zh-Hant';
  const words=chinese?{skip:'跳至主要內容',explore:'探索平台',portal:'安全工作區',open:'開啟 AMANAH',plan:'合作洽談',index:'本頁內容',detail:'信任與營運詳情',principle:'先有證據，才有信任。先有信任，才可營運放行。認證由主管機關決定。'}:slug==='ar'?{skip:'انتقل إلى المحتوى',explore:'استكشف المنصة',portal:'مساحة العمل الآمنة',open:'افتح أمانة',plan:'تواصل للشراكة',index:'محتويات الصفحة',detail:'تفاصيل الثقة والتشغيل',principle:'الأدلة قبل الثقة. الثقة قبل الإفراج التشغيلي. السلطة قبل التصديق.'}:{skip:'Skip to content',explore:'Explore',portal:'Secure portal ↗',open:'Open Amanah ↗',plan:'Plan your rollout',index:'On this page',detail:'Trust and operating detail',principle:site.messages.principle};
  const translated=chinese?['首頁','平台導覽','生態系統','公司簡介','視覺旅程','運作方式','標準框架','AHTE 數位信任','指揮中心','追溯','實驗室','智慧稽核','硬體','中國 → GCC','GCC 進口商','GCC 分銷商','零售與市場','中國合作計畫','合作夥伴','製造商','API 與互通性','資訊安全','金融與伊斯蘭保險','查驗','聯絡','繁體中文','安全工作區','العربية']:['الرئيسية','جولة المنصة','المنظومة','الشركة','الرحلة المرئية','كيف تعمل','المعايير','الثقة الرقمية AHTE','مركز القيادة','التتبع','المختبر','التدقيق الذكي','الأجهزة','الصين ← الخليج','المستورد','الموزع','التجزئة والسوق','التعاون في الصين','الشركاء','المصنّعون','التكامل وواجهات API','الأمن السيبراني','التمويل والتكافل','التحقق','التواصل','繁體中文','الدخول الآمن','العربية'];
  const navigation:LinkPair[]=site.navigation.map(([href,label],i)=>[href,localized?(translated[i]||label):label]);
  if(!page)return <main className="secondary-not-found"><p className="eyebrow">AMANAH / PUBLIC SITE</p><h1>Page not found.</h1><a className="button-primary" href="index.html">Return home</a></main>;
  return <div className="secondary-shell" data-route={slug} lang={slug==="ar"?"ar":slug==="zh-Hant"?"zh-Hant":"en"} dir={slug==="ar"?"rtl":"ltr"}>
    <a className="skip-link" href="#secondary-main">{words.skip}</a>
    <header className="platinum-header glass secondary-header">
      <a className="identity" href="index.html"><span className="identity-mark" aria-hidden="true"><img src={companyLogo} alt="" /></span><span className="identity-copy"><strong>{site.messages.brand}</strong><small>{site.messages.operator}</small></span></a>
      <nav aria-label="Primary navigation" className="secondary-nav">
        {navigation.slice(0,4).map(([href,label])=><a key={href} href={href} aria-current={href===slug+".html"?"page":undefined}>{label}</a>)}
        <details className="secondary-route-menu"><summary>{words.explore}</summary><div className="secondary-route-panel">{navigation.slice(4).map(([href,label])=><a key={href} href={href} aria-current={href===slug+".html"?"page":undefined}>{label}</a>)}</div></details>
      </nav>
      <details className="secondary-mobile-menu"><summary>{words.explore}</summary><div className="secondary-mobile-panel">{navigation.map(([href,label])=><a key={href} href={href}>{label}</a>)}</div></details>
      <a className="header-cta" href="login/index.html">{words.portal}</a>
    </header>
    <main id="secondary-main">
      <section className="secondary-hero">
        <div><p className="eyebrow">{page.label.toUpperCase()}</p><h1>{page.title}</h1><p>{page.description}</p>
          <div className="hero-actions"><a className="button-primary" href="https://amanah-yq9x.vercel.app/login">{words.open}</a><a className="button-secondary" href="contact.html">{words.plan}</a></div>
          <div className="secondary-topology">AHTE ⇄ Direct JAKIM API ⇄ JAKIM <span>·</span> {chinese?"中國 → GCC 直達":slug==="ar"?"الصين إلى الخليج مباشرة":"China → GCC direct"}</div>
        </div>
        <div className="secondary-hero-scene"><ProcessScene3D mode={slug} stage={chinese?"中國來源至 GCC 目的地":slug==="ar"?"من الصين إلى أسواق الخليج":`${page.label} · China origin to GCC destination`} className="secondary-page-scene" overviewOnly /></div>
      </section>
      <nav className="secondary-index" aria-label={words.index}>{page.sections.map(section=><a key={section.id} href={"#"+section.id}>{section.title}</a>)}</nav>
      {page.sections.map((section,index)=><section className="secondary-section" id={section.id} key={section.id}>
        <div className="secondary-section-heading"><span>{String(index+1).padStart(2,"0")}</span><p className="eyebrow">{page.label}</p><h2>{section.title}</h2></div>
        <div className="secondary-section-body">
          {section.text?<p className="secondary-lede">{section.text}</p>:null}
          {section.cards?<div className="secondary-card-grid">{section.cards.map(([title,text])=><article className="secondary-card glass" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>:null}
          {section.flow?.length?<><ProcessFlow3D title={section.title} steps={section.flow} mode={slug} id={`${slug}-${section.id}-process`} /><ol className="secondary-flow">{section.flow.map((item,i)=><li key={item}><span>{String(i+1).padStart(2,"0")}</span><strong>{item}</strong></li>)}</ol></>:null}
          {section.detail?<details className="secondary-technical"><summary>{words.detail}</summary><p>{section.detail}</p></details>:null}
          {section.link?<a className="button-secondary" href={section.link[0]}>{section.link[1]} ↗</a>:null}
        </div>
      </section>)}
      <SecondaryInteractions slug={slug} />
      {!localized?<section className="secondary-special"><h2>How this capability connects</h2><p>Product identity connects this workflow to its applicable controls, attributable evidence and next accountable handoff. Explore the complete journey to follow the same record from origin to destination and back through corrective action.</p><a className="button-secondary" href="index.html#journey">Follow the connected journey</a></section>:null}

    </main>
    <footer className="secondary-footer"><div><img className="footer-lockup" src={companyLogo} alt="Global Halal Supply Chain Ltd company logo" /><strong>{site.messages.brand}</strong><p>{words.principle}</p></div><nav aria-label="Footer">{navigation.map(([href,label])=><a href={href} key={href}>{label}</a>)}</nav><nav className="language-links" aria-label="Language"><a href="index.html">English</a><a href="zh-Hant.html" lang="zh-Hant">繁體中文</a><a href="ar.html" lang="ar" dir="rtl">العربية</a></nav></footer>
  </div>;
}
