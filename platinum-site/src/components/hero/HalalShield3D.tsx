import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function HalalShield3D() {
  const hostRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (reducedMotion || !hostRef.current) return;

    const host = hostRef.current;
    let cleanup = () => {};
    let cancelled = false;

    const observer = new IntersectionObserver(async entries => {
      if (!entries.some(entry => entry.isIntersecting) || cancelled) return;
      observer.disconnect();

      const THREE = await import("three");
      if (cancelled || !hostRef.current) return;

      const width = host.clientWidth || 420;
      const height = host.clientHeight || 420;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.z = 5.6;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      host.appendChild(renderer.domElement);

      const shape = new THREE.Shape();
      shape.moveTo(0, 1.8);
      shape.lineTo(1.45, 1.16);
      shape.lineTo(1.2, -0.92);
      shape.quadraticCurveTo(0, -2, -1.2, -0.92);
      shape.lineTo(-1.45, 1.16);
      shape.closePath();

      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.22,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.08,
        bevelThickness: 0.06,
      });
      geometry.center();

      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#b98f2f"),
        metalness: 0.92,
        roughness: 0.24,
      });
      const shield = new THREE.Mesh(geometry, material);
      shield.rotation.x = -0.08;
      scene.add(shield);

      const ringGeometry = new THREE.TorusGeometry(0.78, 0.025, 12, 80);
      const ringMaterial = new THREE.MeshStandardMaterial({ color: "#f0d36a", metalness: 1, roughness: 0.18 });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.z = 0.22;
      scene.add(ring);

      const ambient = new THREE.AmbientLight(0xffe5a8, 1.25);
      const key = new THREE.DirectionalLight(0xffd76c, 4.2);
      key.position.set(2.4, 2.8, 4.5);
      const rim = new THREE.PointLight(0x00bfff, 4.5, 10);
      rim.position.set(-3, -1.2, 3.5);
      scene.add(ambient, key, rim);

      let pointerX = 0;
      let pointerY = 0;
      const onPointer = (event: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        pointerX = ((event.clientX - rect.left) / rect.width - .5) * .32;
        pointerY = ((event.clientY - rect.top) / rect.height - .5) * .2;
      };
      host.addEventListener("pointermove", onPointer, { passive: true });

      const resize = () => {
        if (!hostRef.current) return;
        const nextWidth = host.clientWidth || 420;
        const nextHeight = host.clientHeight || 420;
        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(nextWidth, nextHeight, false);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);

      renderer.setAnimationLoop((time) => {
        const t = time * 0.00035;
        shield.rotation.y += (pointerX + Math.sin(t) * .08 - shield.rotation.y) * .04;
        shield.rotation.x += (-pointerY - shield.rotation.x) * .04;
        ring.rotation.z = Math.sin(t * .7) * .18;
        renderer.render(scene, camera);
      });
      setInteractive(true);

      cleanup = () => {
        renderer.setAnimationLoop(null);
        host.removeEventListener("pointermove", onPointer);
        resizeObserver.disconnect();
        geometry.dispose();
        material.dispose();
        ringGeometry.dispose();
        ringMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }, { rootMargin: "120px" });

    observer.observe(host);

    return () => {
      cancelled = true;
      observer.disconnect();
      cleanup();
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
