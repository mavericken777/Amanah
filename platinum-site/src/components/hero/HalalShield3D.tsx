import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function HalalShield3D() {
  const hostRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (reducedMotion || !hostRef.current) return;

    const host = hostRef.current;
    let cancelled = false;
    let runtime: Awaited<ReturnType<typeof import("./halalShieldRuntime")>>["mountHalalShield"] extends (...args: never[]) => infer R ? R | null : never = null;
    let resizeObserver: ResizeObserver | null = null;

    const observer = new IntersectionObserver(async entries => {
      if (!entries.some(entry => entry.isIntersecting) || cancelled) return;
      observer.disconnect();

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
        // Static shield remains the deterministic fallback when WebGL is unavailable.
        setInteractive(false);
      }
    }, { rootMargin: "120px" });

    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      resizeObserver?.disconnect();
      runtime?.dispose();
    };
  }, [reducedMotion]);

  return (
    <div className="halal-shield-stage" ref={hostRef} data-interactive={interactive ? "true" : "false"}>
      <div className="static-shield" aria-hidden="true">
        <span className="static-shield-ring" />
        <strong lang="ar" dir="rtl">حلال</strong>
      </div>
      <span className="shield-caption">{reducedMotion ? "STATIC TRUST SHIELD" : "INTERACTIVE TRUST SHIELD"}</span>
    </div>
  );
}
