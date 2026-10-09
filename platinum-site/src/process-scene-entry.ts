let dispose: (() => void) | undefined;
const startScenes = () => {
  import("./components/scene/processSceneRuntime").then(runtime => {
    dispose = runtime.mountVisibleProcessScenes();
  }).catch(() => {
    document.querySelectorAll<HTMLElement>("[data-process-scene]").forEach(scene => { scene.dataset.sceneFallback = "true"; });
  });
};
const startup = window.setTimeout(() => {
  const idleWindow = window as Window & { requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number };
  if (idleWindow.requestIdleCallback) {
    idleWindow.requestIdleCallback(startScenes, { timeout: 1600 });
  } else startScenes();
}, 700);
window.addEventListener("pagehide", () => { window.clearTimeout(startup); dispose?.(); }, { once: true });
