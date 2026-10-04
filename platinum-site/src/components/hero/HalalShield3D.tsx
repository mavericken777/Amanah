import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import type { ShieldRuntimeHandle } from "./halalShieldRuntime";

export function HalalShield3D() {
  const hostRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (reducedMotion || !hostRef.current) return;

    const host = hostRef.current;
    let cancelled = false;
    let runtime: ShieldRuntimeHandle | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let loading = false;

    const mount = async () => {
      if (cancelled || loading || runtime) return;
      loading = true;
      try {
        const module = await import("./halalShieldRuntime");
        if (cancelled || !hostRef.current) return;

        runtime = module.mountHalalShield(host);
        const onPointer = (event: PointerEvent) => {
          const rect = host.getBoundingClientRect();
          runtime?.setPointer(
            ((event.clientX - rect.left) / rect.width - .5) * .32,
            ((event.clientY - rect.top) / rect.height - .5) * .2,
          );
        };
        host.addEventListener("pointermove", onPointer, { passive: true });
        resizeObserver = new ResizeObserver(() => {
          runtime?.resize(host.clientWidth || 420, host.clientHeight || 420);
        });
        resizeObserver.observe(host);
        setInteractive(true);

        const originalDispose = runtime.dispose;
        runtime.dispose = () => {
          host.removeEventListener("pointermove", onPointer);
          originalDispose();
        };
      } catch {
        setInteractive(false);
      } finally {
        loading = false;
      }
    };

    // Keep the deterministic static shield on initial load. The heavier WebGL runtime
    // is fetched only after genuine user intent, preventing hero decoration from
    // consuming the page's main-thread performance budget.
    const onIntent = () => void mount();
    host.addEventListener("pointerenter", onIntent, { once: true, passive: true });
    host.addEventListener("focusin", onIntent, { once: true });
    host.addEventListener("touchstart", onIntent, { once: true, passive: true });

    return () => {
      cancelled = true;
      host.removeEventListener("pointerenter", onIntent);
      host.removeEventListener("focusin", onIntent);
      host.removeEventListener("touchstart", onIntent);
      resizeObserver?.disconnect();
      runtime?.dispose();
    };
  }, [reducedMotion]);

  return (
    <div className="halal-shield-stage" ref={hostRef} data-interactive={interactive ? "true" : "false"} tabIndex={0}>
      <div className="static-shield" aria-hidden="true">
        <span className="static-shield-ring" />
        <strong lang="ar" dir="rtl">حلال</strong>
      </div>
      <span className="shield-caption">{reducedMotion ? "STATIC TRUST SHIELD" : interactive ? "INTERACTIVE TRUST SHIELD" : "TRUST SHIELD · INTERACT TO EXPLORE"}</span>
    </div>
  );
}
