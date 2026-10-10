import { inferKind, sceneAssetUrl, type ProcessKind } from "./sceneImages";

export type ProcessSceneHandle = {
  setStage: (label: string, index?: number) => boolean;
  resize: () => void;
  setVisible: (visible: boolean) => void;
  dispose: () => void;
};

// Each environment explains an operation, its evidence and the next handoff.
// These are explanatory sequences, never live certification or telemetry records.
const operations: Record<ProcessKind, readonly string[]> = {
  corridor: ["Identify the product", "Connect assurance evidence", "Maintain custody", "Verify at destination"],
  onboarding: ["Register the organisation", "Verify premises and scope", "Link product and SKU", "Assign accountable teams"],
  materials: ["Identify each supplier", "Record ingredient origin", "Match formulation and scope", "Link evidence to the batch"],
  facility: ["Confirm production scope", "Check process controls", "Record the production batch", "Prepare traceable dispatch"],
  laboratory: ["Identify and seal the sample", "Record laboratory custody", "Analyse with method and QC", "Review and sign the report"],
  audit: ["Plan the inspection", "Observe and capture evidence", "Review findings with the team", "Verify corrective action"],
  warehouse: ["Receive and reconcile", "Segregate and locate", "Monitor storage conditions", "Release to dispatch custody"],
  transport: ["Record operator handoff", "Bind container and seal", "Monitor route and condition", "Reconcile arrival evidence"],
  port: ["Prepare the export dossier", "Reconcile load and seal", "Record customs disposition", "Transfer receiving custody"],
  market: ["Reconcile importer receipt", "Connect destination inventory", "Trace distribution and retail", "Maintain withdrawal visibility"],
  authority: ["Map applicable requirements", "Assemble reviewed evidence", "Record authorised decision", "Monitor certification status"],
  verification: ["Read the product identity", "Retrieve permitted provenance", "Check evidence and status", "Explain the product journey"],
  monitoring: ["Connect operational events", "Assess exceptions and risk", "Recommend preemptive action", "Track accountable response"],
};

function mountProcessScene(container: HTMLElement): ProcessSceneHandle {
  const locale=document.documentElement.lang;
  const translatedSequence=locale==='zh-Hant'?['確認產品與批次','連結稽核與實驗室證據','追蹤物流及保管鏈','目的地查驗與持續保障']:locale==='ar'?['تحديد المنتج والدفعة','ربط أدلة التدقيق والمختبر','تتبع النقل وسلسلة الحيازة','التحقق والمراقبة المستمرة']:null;
  const pauseLabel=locale==='zh-Hant'?'暫停動畫':locale==='ar'?'إيقاف الحركة':'Pause scene';
  const playLabel=locale==='zh-Hant'?'播放動畫':locale==='ar'?'تشغيل الحركة':'Play scene';
  const existing = container.querySelector<HTMLImageElement>(".process-scene-photograph");
  const cinematic = existing || document.createElement("img");
  cinematic.className = "process-scene-photograph";
  cinematic.alt = "";
  cinematic.setAttribute("aria-hidden", "true");
  cinematic.decoding = "async";
  if (!existing) container.prepend(cinematic);
  const story = document.createElement("div");
  story.className = "process-scene-story";
  container.setAttribute("role", "group");
  const eyebrow = document.createElement("span");
  eyebrow.className = "process-story-eyebrow";
  eyebrow.textContent = locale==='zh-Hant'?"運作流程":locale==='ar'?"كيف تعمل المنظومة":"HOW THE PROCESS WORKS";
  const title = document.createElement("strong");
  title.className = "process-story-action";
  const steps = document.createElement("ol");
  steps.className = "process-story-steps";
  const playback = document.createElement("button");
  playback.className = "process-story-pause";
  playback.type = "button";
  playback.textContent = pauseLabel;
  playback.setAttribute("aria-label", "Pause this process explanation");
  container.append(playback);
  story.append(eyebrow, title, steps);
  container.append(story);
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let kind: ProcessKind = "corridor";
  let phase = 0;
  let timer = 0;
  let active = true;
  let paused = preference.matches;
  let visible = true;
  let request = 0;

  const paintPhase = () => {
    const sequence = translatedSequence||operations[kind];
    title.textContent = sequence[phase];
    steps.querySelectorAll("li").forEach((item, index) => {
      item.dataset.state = index === phase ? "active" : index < phase ? "complete" : "pending";
    });
    story.dataset.phase = String(phase);
  };
  const schedule = () => {
    window.clearInterval(timer);
    container.dataset.scenePaused = String(paused || !visible);
    playback.textContent = paused ? playLabel : pauseLabel;
    playback.setAttribute("aria-label", paused ? playLabel : pauseLabel);
    if (!paused && visible && !document.hidden) timer = window.setInterval(() => {
      phase = (phase + 1) % operations[kind].length;
      paintPhase();
    }, 3600);
  };
  playback.addEventListener("click", () => { paused = !paused; schedule(); });
  const onVisibility = () => schedule();
  const onPreference = () => { paused = preference.matches; schedule(); };
  document.addEventListener("visibilitychange", onVisibility);
  preference.addEventListener("change", onPreference);

  const setStage = (label: string, _index = 0) => {
    kind = inferKind(container.dataset.overviewOnly === "true" ? container.dataset.scene || "corridor" : label);
    container.dataset.sceneKind = kind;
    phase = 0;
    steps.replaceChildren(...(translatedSequence||operations[kind]).map((operation, index) => {
      const item = document.createElement("li");
      const number = document.createElement("span");
      number.textContent = String(index + 1).padStart(2, "0");
      const text = document.createElement("span");
      text.textContent = operation;
      item.append(number, text);
      return item;
    }));
    paintPhase();
    const nextImage = sceneAssetUrl(kind);
    const version = ++request;
    if (!cinematic.src.endsWith(nextImage)) {
      const preload = new Image();
      preload.onload = () => {
        if (!active || version !== request) return;
        cinematic.src = nextImage;
        container.dataset.sceneFallback = "false";
      };
      preload.onerror = () => { if (active && version === request) container.dataset.sceneFallback = "true"; };
      preload.src = nextImage;
    }
    schedule();
    return true;
  };
  setStage(container.dataset.stageLabel || container.dataset.scene || "corridor");
  container.querySelector(".process-scene-loading")?.remove();
  container.dataset.sceneMounted = "true";
  return {
    setStage,
    resize: () => {},
    setVisible: value => { visible = value; schedule(); },
    dispose() {
      active = false;
      request++;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      preference.removeEventListener("change", onPreference);
      story.remove();
      playback.remove();
      // The persistent photograph belongs to its host, including when React rendered it.
      // Preserve it during scroll disposal and immediately show it on return.
      delete container.dataset.sceneMounted;
    },
  };
}

export function mountProcessSceneOnElement(container: HTMLElement): ProcessSceneHandle | null {
  if (container.dataset.sceneMounted === "true") return null;
  const scene = mountProcessScene(container);
  const currentLabel = () => container.dataset.stageLabel || container.dataset.scene || "corridor";
  const observer = new MutationObserver(() => scene.setStage(currentLabel(), Number(container.dataset.stageIndex || 0)));
  observer.observe(container, { attributes: true, attributeFilter: ["data-stage-label", "data-stage-index"] });
  return { ...scene, dispose: () => { observer.disconnect(); scene.dispose(); } };
}

export function mountVisibleProcessScenes() {
  const mounted = new Map<HTMLElement, ProcessSceneHandle>();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const host = entry.target as HTMLElement;
      if (entry.isIntersecting && mounted.has(host)) mounted.get(host)?.setVisible(true);
      if (entry.isIntersecting && !mounted.has(host)) {
        const scene = mountProcessSceneOnElement(host);
        if (scene) mounted.set(host, scene);
      } else if (!entry.isIntersecting) {
        mounted.get(host)?.setVisible(false);

      }
    }
  }, { rootMargin: "0px" });
  document.querySelectorAll<HTMLElement>("[data-process-scene]").forEach(host => observer.observe(host));
  return () => { observer.disconnect(); mounted.forEach(scene => scene.dispose()); mounted.clear(); };
}
