import {
  AmbientLight,
  Color,
  DirectionalLight,
  ExtrudeGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  Shape,
  SRGBColorSpace,
  TorusGeometry,
  WebGLRenderer,
} from "three";

export type ShieldRuntimeHandle = {
  setPointer: (x: number, y: number) => void;
  resize: (width: number, height: number) => void;
  dispose: () => void;
};

export function mountHalalShield(container: HTMLElement): ShieldRuntimeHandle {
  const width = container.clientWidth || 420;
  const height = container.clientHeight || 420;
  const scene = new Scene();
  const camera = new PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.z = 5.6;

  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height, false);
  renderer.outputColorSpace = SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const shape = new Shape();
  shape.moveTo(0, 1.8);
  shape.lineTo(1.45, 1.16);
  shape.lineTo(1.2, -0.92);
  shape.quadraticCurveTo(0, -2, -1.2, -0.92);
  shape.lineTo(-1.45, 1.16);
  shape.closePath();

  const geometry = new ExtrudeGeometry(shape, {
    depth: 0.22,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.08,
    bevelThickness: 0.06,
  });
  geometry.center();

  const material = new MeshStandardMaterial({
    color: new Color("goldenrod"),
    metalness: 0.92,
    roughness: 0.24,
  });
  const shield = new Mesh(geometry, material);
  shield.rotation.x = -0.08;
  scene.add(shield);

  const ringGeometry = new TorusGeometry(0.78, 0.025, 12, 80);
  const ringMaterial = new MeshStandardMaterial({ color: new Color("gold"), metalness: 1, roughness: 0.18 });
  const ring = new Mesh(ringGeometry, ringMaterial);
  ring.position.z = 0.22;
  scene.add(ring);

  const ambient = new AmbientLight("white", 1.1);
  const key = new DirectionalLight("gold", 4.2);
  key.position.set(2.4, 2.8, 4.5);
  const rim = new PointLight("deepskyblue", 4.5, 10);
  rim.position.set(-3, -1.2, 3.5);
  scene.add(ambient, key, rim);

  let pointerX = 0;
  let pointerY = 0;

  renderer.setAnimationLoop((time) => {
    const t = time * 0.00035;
    shield.rotation.y += (pointerX + Math.sin(t) * .08 - shield.rotation.y) * .04;
    shield.rotation.x += (-pointerY - shield.rotation.x) * .04;
    ring.rotation.z = Math.sin(t * .7) * .18;
    renderer.render(scene, camera);
  });

  return {
    setPointer(x, y) {
      pointerX = x;
      pointerY = y;
    },
    resize(nextWidth, nextHeight) {
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight, false);
    },
    dispose() {
      renderer.setAnimationLoop(null);
      geometry.dispose();
      material.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
