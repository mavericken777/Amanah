import * as THREE from "three";
import { inferKind, sceneAssetUrl, type ProcessKind } from "./sceneImages";

export type ProcessSceneHandle = {
  setStage: (label: string, index?: number) => boolean;
  resize: () => void;
  dispose: () => void;
};

const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);

function mountPerson(parent: THREE.Group, x: number, z: number, accent: THREE.Material, scale = 1) {
  const person = new THREE.Group();
  person.position.set(x, 0, z);
  person.scale.setScalar(scale);
  // Rounded, proportioned figures replace the square torsos and low-resolution
  // heads that made the old process model read like a toy game.
  const uniform = new THREE.MeshPhysicalMaterial({ color: 0x26343b, roughness: .84, clearcoat: .04 });
  const trim = new THREE.MeshStandardMaterial({ color: 0x8b8064, roughness: .78 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xa97858, roughness: .82 });
  const hair = new THREE.MeshStandardMaterial({ color: 0x242321, roughness: .92 });
  const sole = new THREE.MeshStandardMaterial({ color: 0x171a1b, roughness: .86 });
  const segment = (radius: number, length: number, material: THREE.Material) => new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 5, 12), material);
  const torso = segment(.175, .43, uniform);
  torso.position.y = .93;
  person.add(torso);
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(.085, .11, .08, 16), trim);
  collar.position.y = 1.19;
  person.add(collar);
  const neck = segment(.052, .06, skin);
  neck.position.y = 1.24;
  person.add(neck);
  const head = new THREE.Mesh(new THREE.SphereGeometry(.115, 24, 18), skin);
  head.scale.set(.82, 1.12, .9);
  head.position.set(0, 1.39, .005);
  person.add(head);
  const hairCap = new THREE.Mesh(new THREE.SphereGeometry(.118, 20, 12, 0, Math.PI * 2, 0, Math.PI * .56), hair);
  hairCap.scale.set(.85, .9, .95);
  hairCap.position.set(0, 1.43, -.008);
  person.add(hairCap);
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(.026, 12, 10), skin);
    ear.position.set(side * .092, 1.38, 0);
    person.add(ear);
    const leg = segment(.07, .34, uniform);
    leg.position.set(side * .09, .39, 0);
    person.add(leg);
    const boot = new THREE.Mesh(new THREE.CapsuleGeometry(.055, .13, 3, 8), sole);
    boot.rotation.x = Math.PI / 2;
    boot.position.set(side * .09, .105, .045);
    person.add(boot);
  }
  const arms: THREE.Mesh[] = [];
  for (const side of [-1, 1]) {
    const upperArm = segment(.062, .27, uniform);
    upperArm.position.set(side * .235, 1.01, 0);
    upperArm.rotation.z = side * -.12;
    person.add(upperArm);
    const elbow = new THREE.Mesh(new THREE.SphereGeometry(.06, 14, 12), uniform);
    elbow.position.set(side * .255, .8, 0);
    person.add(elbow);
    const forearm = segment(.05, .24, uniform);
    forearm.position.set(side * .27, .65, .012);
    forearm.rotation.z = side * .08;
    person.add(forearm);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(.045, 12, 10), skin);
    hand.position.set(side * .275, .49, .018);
    person.add(hand);
    arms.push(upperArm, forearm);
  }
  // The role accent is a small shoulder marker, never a full metallic uniform.
  const roleMark = new THREE.Mesh(new THREE.SphereGeometry(.038, 12, 10), accent);
  roleMark.scale.set(1, .58, .72);
  roleMark.position.set(.176, 1.1, .025);
  person.add(roleMark);
  person.userData.arms = arms;
  parent.add(person);
  return person;
}

function mountProcessScene(container: HTMLElement): ProcessSceneHandle {
  const cinematic = container.querySelector<HTMLImageElement>(".process-scene-photograph") || document.createElement("img");
  cinematic.className = "process-scene-photograph";
  cinematic.alt = "";
  cinematic.setAttribute("aria-hidden", "true");
  cinematic.decoding = "async";
  cinematic.src = sceneAssetUrl(inferKind(container.dataset.stageLabel || container.dataset.scene || "corridor"));
  if (!cinematic.isConnected) container.prepend(cinematic);
  const dataflow = document.createElement("div");
  dataflow.className = "process-scene-dataflow";
  dataflow.setAttribute("aria-hidden", "true");
  dataflow.innerHTML = '<svg viewBox="0 0 1200 600" preserveAspectRatio="none"><defs><linearGradient id="amanahTrace" x1="0" x2="1"><stop stop-color="#f4d58c" stop-opacity="0"/><stop offset=".48" stop-color="#f4d58c" stop-opacity=".95"/><stop offset="1" stop-color="#c99d4a" stop-opacity=".1"/></linearGradient></defs><path class="trace-under" d="M-20 402 C180 360 180 470 360 410 S560 255 710 335 895 450 1030 300 1155 210 1230 242"/><path class="trace-line" d="M-20 402 C180 360 180 470 360 410 S560 255 710 335 895 450 1030 300 1155 210 1230 242"/><circle class="trace-node node-origin" cx="120" cy="387" r="9"/><circle class="trace-node node-lab" cx="600" cy="293" r="9"/><circle class="trace-node node-destination" cx="1080" cy="275" r="9"/></svg>';
  container.append(dataflow);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, .1, 80);
  camera.position.set(0, 5.2, 12.6);
  camera.lookAt(0, .82, 0);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1 : 1.5));
  renderer.setSize(container.clientWidth || 640, container.clientHeight || 360, false);
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.className = "process-scene-canvas";
  container.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xcbd5df, 0x151719, 2.1));
  const key = new THREE.DirectionalLight(0xfff0d3, 3.35);
  key.position.set(5, 9, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -9;
  key.shadow.camera.right = 9;
  key.shadow.camera.top = 8;
  key.shadow.camera.bottom = -8;
  key.shadow.bias = -.00025;
  scene.add(key);
  const rim = new THREE.PointLight(0x91aeb4, 5.4, 24);
  rim.position.set(-6, 4, -5);
  scene.add(rim);

  const gold = new THREE.MeshStandardMaterial({ color: 0x9d8350, metalness: .56, roughness: .48 });
  const goldLight = new THREE.MeshStandardMaterial({ color: 0xd4b36d, emissive: 0x60471c, emissiveIntensity: .34, metalness: .32, roughness: .46 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x69747a, metalness: .58, roughness: .52 });
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x252b2e, metalness: .48, roughness: .58 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x84999d, metalness: .08, roughness: .18, transmission: .32, transparent: true, opacity: .46, thickness: .2 });
  const pack = new THREE.MeshStandardMaterial({ color: 0x8d7955, metalness: .02, roughness: .92 });
  const green = new THREE.MeshStandardMaterial({ color: 0x495e55, metalness: .03, roughness: .9 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, 11), new THREE.MeshStandardMaterial({ color: 0x24292a, metalness: .08, roughness: .9 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -.04;
  floor.receiveShadow = true;
  scene.add(floor);

  const routePoints = [new THREE.Vector3(-6, .12, 2.4), new THREE.Vector3(-3.6, .12, .2), new THREE.Vector3(-1.1, .12, 1.4), new THREE.Vector3(1.8, .12, -.9), new THREE.Vector3(4, .12, .9), new THREE.Vector3(6, .12, -1.4)];
  const route = new THREE.CatmullRomCurve3(routePoints);
  const routeLine = new THREE.Mesh(new THREE.TubeGeometry(route, 32, .025, 5, false), goldLight);
  scene.add(routeLine);
  const routeDot = new THREE.Mesh(new THREE.TorusGeometry(.15, .018, 8, 28), new THREE.MeshStandardMaterial({ color: 0xffe5a4, emissive: 0x76531f, emissiveIntensity: .72, metalness: .36, roughness: .4 }));
  routeDot.rotation.x = Math.PI / 2;
  scene.add(routeDot);
  const routeBases: THREE.Mesh[] = [];
  const nodes = routePoints.map((point, index) => {
    const node = new THREE.Mesh(new THREE.CylinderGeometry(.2, .22, .08, 28), darkSteel);
    node.position.copy(point);
    node.position.y = -.01;
    scene.add(node);
    routeBases.push(node);
    const marker = new THREE.Mesh(new THREE.TorusGeometry(.135, .023, 8, 24), index === 0 ? goldLight : steel);
    marker.position.copy(point);
    marker.position.y = .045;
    marker.rotation.x = Math.PI / 2;
    scene.add(marker);
    return marker;
  });

  const groups: Record<ProcessKind, THREE.Group> = Object.fromEntries(([
    "corridor", "onboarding", "materials", "facility", "laboratory", "audit", "warehouse", "transport", "port", "market", "authority", "verification", "monitoring",
  ] as ProcessKind[]).map(kind => [kind, new THREE.Group()])) as Record<ProcessKind, THREE.Group>;
  Object.values(groups).forEach(group => scene.add(group));

  const initialLabel = container.dataset.overviewOnly === "true" ? container.dataset.scene || "corridor" : container.dataset.stageLabel || container.dataset.scene || "corridor";
  let kind: ProcessKind = inferKind(initialLabel);
  const cartons: THREE.Mesh[] = [];
  let factoryPerson: THREE.Group | null = null;
  let materialPerson: THREE.Group | null = null;
  let analyst: THREE.Group | null = null;
  let forklift: THREE.Group | null = null;
  let truck: THREE.Group | null = null;
  let wheels: THREE.Mesh[] = [];
  let craneCable: THREE.Mesh | null = null;
  let spreader: THREE.Mesh | null = null;
  let phone: THREE.Group | null = null;
  let scanBeam: THREE.Mesh | null = null;

  if (kind === "onboarding") {
    // Manufacturer registration: an accountable operator reviews a scoped
    // organisation profile and identity records in a working office setting.
    const office = groups.onboarding;
    const desk = new THREE.Mesh(box(3.4, .14, 1.35), steel); desk.position.set(0, .93, .3); office.add(desk);
    for (const x of [-1.42, 1.42]) { const leg = new THREE.Mesh(box(.1, .9, .1), darkSteel); leg.position.set(x, .45, .3); office.add(leg); }
    const displayFrame = new THREE.Mesh(box(1.48, 1.05, .1), darkSteel); displayFrame.position.set(-.18, 1.65, -.42); office.add(displayFrame);
    const identityScreen = new THREE.Mesh(box(1.28, .84, .035), new THREE.MeshStandardMaterial({ color: 0x526d70, emissive: 0x193b3a, emissiveIntensity: .32, roughness: .52 })); identityScreen.position.set(-.18, 1.65, -.485); office.add(identityScreen);
    for (let i = 0; i < 4; i++) { const recordLine = new THREE.Mesh(box(.68 + (i % 2) * .25, .035, .02), goldLight); recordLine.position.set(-.38 + (i % 2) * .1, 1.88 - i * .16, -.51); office.add(recordLine); }
    const document = new THREE.Mesh(box(.72, .045, .54), pack); document.position.set(1.02, 1.03, .34); document.rotation.y = -.12; office.add(document);
    const profileCard = new THREE.Mesh(box(.46, .08, .32), new THREE.MeshStandardMaterial({ color: 0xd8d0bf, roughness: .84 })); profileCard.position.set(-1.05, 1.04, .33); office.add(profileCard);
    mountPerson(office, 1.75, .72, green, 1.02);
  }

  if (kind === "materials") {
    // Supplier and SKU review links tangible material lots to product identity.
    const source = groups.materials;
    const table = new THREE.Mesh(box(4.2, .13, 1.42), steel); table.position.set(0, .9, .15); source.add(table);
    for (const x of [-1.82, 1.82]) { const foot = new THREE.Mesh(box(.1, .86, .1), darkSteel); foot.position.set(x, .44, .15); source.add(foot); }
    const materials = [
      { x: -1.1, z: -.05, color: 0x8b7955, radius: .38, height: .62 },
      { x: -.12, z: .02, color: 0x556b60, radius: .3, height: .7 },
      { x: .92, z: -.03, color: 0x9d8350, radius: .32, height: .74 },
    ];
    for (const material of materials) {
      const lot = new THREE.Mesh(new THREE.CylinderGeometry(material.radius * .84, material.radius, material.height, 28), new THREE.MeshStandardMaterial({ color: material.color, roughness: .84, metalness: .04 }));
      lot.position.set(material.x, 1.02 + material.height * .5, material.z); source.add(lot);
      const batchBand = new THREE.Mesh(new THREE.CylinderGeometry(material.radius * .86, material.radius * .86, .1, 28), goldLight);
      batchBand.position.set(material.x, lot.position.y, material.z); source.add(batchBand);
    }
    const recordBoard = new THREE.Mesh(box(1.1, .62, .08), darkSteel); recordBoard.position.set(2.35, 1.5, -.38); source.add(recordBoard);
    const recordFace = new THREE.Mesh(box(.93, .45, .025), new THREE.MeshStandardMaterial({ color: 0x58766d, emissive: 0x143d35, emissiveIntensity: .24 })); recordFace.position.set(2.35, 1.5, -.435); source.add(recordFace);
    for (let i = 0; i < 3; i++) { const link = new THREE.Mesh(box(.54, .035, .018), goldLight); link.position.set(2.22, 1.6 - i * .12, -.455); source.add(link); }
  }

  if (kind === "facility") {
  // Origin production hall: frame, conveyor, cartons and a working inspection team.
  const factory = groups.facility;
  const hall = new THREE.Mesh(box(5.5, 2.15, 3.6), new THREE.MeshStandardMaterial({ color: 0x1e292b, metalness: .32, roughness: .5, transparent: true, opacity: .72 }));
  hall.position.set(-2, 1.25, 0);
  factory.add(hall);
  for (let x = -4.55; x <= .55; x += 1.7) {
    const pillar = new THREE.Mesh(box(.12, 2.8, .12), steel); pillar.position.set(x, 1.4, 1.84); factory.add(pillar);
    const beam = new THREE.Mesh(box(.12, 2.8, .12), steel); beam.position.set(x, 1.4, -1.84); factory.add(beam);
  }
  const belt = new THREE.Mesh(box(4.2, .18, .62), darkSteel); belt.position.set(-2, .65, .8); factory.add(belt);
  cartons.push(...Array.from({ length: 5 }, (_, i) => { const item = new THREE.Mesh(box(.42, .38, .38), i % 2 ? pack : green); item.position.set(-3.65 + i * .78, .94, .8); factory.add(item); return item; }));
  const machine = new THREE.Mesh(box(.86, 1.35, .96), steel); machine.position.set(-.35, .86, .8); factory.add(machine);
  const machineWindow = new THREE.Mesh(box(.55, .42, .05), glass); machineWindow.position.set(-.35, 1, .3); factory.add(machineWindow);
  factoryPerson = mountPerson(factory, -4.5, -.6, green, .86);
  materialPerson = mountPerson(factory, 1, 1.1, gold, .86);
  }

  if (kind === "laboratory") {
  // Laboratory: stainless bench, analyser, microscope, sample rack, vials and analyst.
  const lab = groups.laboratory;
  const bench = new THREE.Mesh(box(4.6, .15, 1.35), steel); bench.position.set(0, .95, .1); lab.add(bench);
  for (const x of [-1.9, 1.9]) { const leg = new THREE.Mesh(box(.12, .92, .12), darkSteel); leg.position.set(x, .46, .1); lab.add(leg); }
  const analyser = new THREE.Mesh(box(1.3, 1.25, .84), darkSteel); analyser.position.set(-1.15, 1.63, .1); lab.add(analyser);
  const display = new THREE.Mesh(box(.72, .45, .04), new THREE.MeshStandardMaterial({ color: 0x4e7774, emissive: 0x13413b, emissiveIntensity: .9 })); display.position.set(-1.15, 1.78, -.35); lab.add(display);
  const scopeBase = new THREE.Mesh(new THREE.CylinderGeometry(.28, .32, .08, 24), gold); scopeBase.position.set(.5, 1.09, .1); lab.add(scopeBase);
  const scopeArm = new THREE.Mesh(box(.12, .72, .12), steel); scopeArm.position.set(.54, 1.47, .08); scopeArm.rotation.z = -.22; lab.add(scopeArm);
  const scopeEyepiece = new THREE.Mesh(new THREE.CylinderGeometry(.07, .07, .35, 16), darkSteel); scopeEyepiece.position.set(.35, 1.78, .1); scopeEyepiece.rotation.z = -.22; lab.add(scopeEyepiece);
  for (let i = 0; i < 7; i++) { const vial = new THREE.Mesh(new THREE.CylinderGeometry(.075, .075, .38, 12), i % 2 ? glass : goldLight); vial.position.set(1.35 + (i % 4) * .25, 1.2, .15 + Math.floor(i / 4) * .35); lab.add(vial); }
  analyst = mountPerson(lab, 2.7, .7, new THREE.MeshStandardMaterial({ color: 0x3d5660, roughness: .72 }), .92);
  }

  if (kind === "audit") {
  // Auditor scene: a real facility inspection bay with worktable and inspectors.
  const audit = groups.audit;
  const auditTable = new THREE.Mesh(box(2.5, .12, 1.2), steel); auditTable.position.set(0, 1, .3); audit.add(auditTable);
  const auditScreen = new THREE.Mesh(box(1.1, .68, .08), darkSteel); auditScreen.position.set(0, 1.48, -.2); audit.add(auditScreen);
  const auditPanel = new THREE.Mesh(box(.92, .5, .025), new THREE.MeshStandardMaterial({ color: 0x638578, emissive: 0x1b4932, emissiveIntensity: .55 })); auditPanel.position.set(0, 1.49, -.255); audit.add(auditPanel);
  mountPerson(audit, -1.3, .8, green, .92);
  mountPerson(audit, 1.55, -.4, gold, .92);
  const auditClipboard = new THREE.Mesh(box(.46, .58, .035), pack); auditClipboard.position.set(1.1, 1.27, .2); auditClipboard.rotation.z = -.15; audit.add(auditClipboard);
  }

  if (kind === "warehouse") {
  // Certified warehouse: pallet stacks, selective racks and a moving lift truck.
  const warehouse = groups.warehouse;
  for (let z = -1.55; z <= 1.56; z += 1.55) {
    for (let y = .62; y <= 2.52; y += .94) {
      const beam = new THREE.Mesh(box(5.3, .1, .12), gold); beam.position.set(0, y, z); warehouse.add(beam);
      for (const x of [-2.55, 2.55]) { const post = new THREE.Mesh(box(.12, 2.75, .12), steel); post.position.set(x, 1.38, z); warehouse.add(post); }
      for (let x = -1.9; x <= 1.9; x += .95) { const crate = new THREE.Mesh(box(.76, .55, .62), y > 1.7 ? green : pack); crate.position.set(x, y - .3, z); warehouse.add(crate); }
    }
  }
  forklift = new THREE.Group(); warehouse.add(forklift);
  const liftBody = new THREE.Mesh(box(1.05, .56, .68), gold); liftBody.position.y = .58; forklift.add(liftBody);
  const liftCab = new THREE.Mesh(box(.5, .86, .56), glass); liftCab.position.set(-.1, 1.2, -.02); forklift.add(liftCab);
  const mast = new THREE.Mesh(box(.12, 1.85, .16), steel); mast.position.set(.52, 1.08, .18); forklift.add(mast);
  const forks = new THREE.Mesh(box(.76, .06, .38), gold); forks.position.set(.87, .38, .16); forklift.add(forks);
  for (const x of [-.3, .38]) for (const z of [-.38, .38]) { const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.2, .2, .13, 16), darkSteel); wheel.rotation.x = Math.PI / 2; wheel.position.set(x, .24, z); forklift.add(wheel); }
  forklift.position.set(-.2, 0, 2.35);
  }

  if (kind === "transport") {
  // China-to-GCC line haul: tractor, trailer, refrigerated unit and animated wheels.
  const transport = groups.transport;
  truck = new THREE.Group(); transport.add(truck);
  const trailer = new THREE.Mesh(box(4.7, 1.45, 1.5), new THREE.MeshStandardMaterial({ color: 0x65717a, metalness: .52, roughness: .4 })); trailer.position.set(-.3, 1.65, 0); truck.add(trailer);
  for (let side = -1; side <= 1; side += 2) for (let i = 0; i < 7; i++) { const rib = new THREE.Mesh(box(.06, 1.3, .035), gold); rib.position.set(-2.55 + i * .72, 1.65, side * .77); truck.add(rib); }
  const cab = new THREE.Mesh(box(1.12, 1.35, 1.42), gold); cab.position.set(2.65, 1.1, 0); truck.add(cab);
  const windshield = new THREE.Mesh(box(.82, .52, .04), glass); windshield.position.set(2.65, 1.42, -.74); truck.add(windshield);
  wheels = [];
  for (const x of [-1.8, -.35, 1.8, 3.15]) for (const z of [-.82, .82]) { const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.38, .38, .2, 20), darkSteel); wheel.rotation.x = Math.PI / 2; wheel.position.set(x, .47, z); truck.add(wheel); wheels.push(wheel); }
  const driver = mountPerson(truck, 2.72, 0, green, .45); driver.position.y = .72;
  truck.position.set(0, 0, -.1);
  }

  if (kind === "port") {
  // Port and customs: container vessel, stacked freight and gantry cranes.
  const port = groups.port;
  const ship = new THREE.Group(); port.add(ship);
  const hull = new THREE.Mesh(box(7.2, .74, 2.3), darkSteel); hull.position.set(0, .53, .4); ship.add(hull);
  const bow = new THREE.Mesh(new THREE.ConeGeometry(1.16, 1.75, 4), darkSteel); bow.rotation.z = -Math.PI / 2; bow.position.set(4.35, .53, .4); ship.add(bow);
  for (let layer = 0; layer < 2; layer++) for (let i = 0; i < 5; i++) { const container = new THREE.Mesh(box(1.28, .72, .95), [green, pack, steel, gold][(i + layer) % 4]); container.position.set(-2.5 + i * 1.18, 1.28 + layer * .76, -.3 + (i % 2) * .95); ship.add(container); }
  const crane = new THREE.Group(); port.add(crane);
  const craneLegA = new THREE.Mesh(box(.17, 3.9, .17), gold); craneLegA.position.set(-1.5, 1.95, -2); crane.add(craneLegA);
  const craneLegB = new THREE.Mesh(box(.17, 3.9, .17), gold); craneLegB.position.set(1.5, 1.95, -2); crane.add(craneLegB);
  const craneBeam = new THREE.Mesh(box(4.7, .19, .2), gold); craneBeam.position.set(0, 3.9, -2); crane.add(craneBeam);
  craneCable = new THREE.Mesh(box(.035, 1.3, .035), steel); craneCable.position.set(.55, 3.15, -1.95); crane.add(craneCable);
  spreader = new THREE.Mesh(box(1.15, .12, .28), goldLight); spreader.position.set(.55, 2.47, -1.95); crane.add(spreader);
  ship.position.z = .55;
  }

  if (kind === "market") {
  // GCC distribution/retail: shelves, goods, receiving scan and staff.
  const market = groups.market;
  for (const x of [-2.35, 0, 2.35]) {
    const shelf = new THREE.Mesh(box(.1, 2.5, .58), steel); shelf.position.set(x, 1.25, 0); market.add(shelf);
    for (const y of [.52, 1.25, 1.98]) {
      const plank = new THREE.Mesh(box(2.35, .09, .76), gold); plank.position.set(x, y, 0); market.add(plank);
      for (let i = 0; i < 4; i++) { const stock = new THREE.Mesh(box(.32, .44, .42), i % 2 ? green : pack); stock.position.set(x - .85 + i * .55, y + .26, .02); market.add(stock); }
    }
  }
  const scanner = new THREE.Mesh(box(.52, .86, .52), darkSteel); scanner.position.set(3.2, .45, 1.2); market.add(scanner);
  scanBeam = new THREE.Mesh(box(.68, .025, .03), goldLight); scanBeam.position.set(3.2, .78, .92); market.add(scanBeam);
  mountPerson(market, 3.55, -.2, green, .9);
  }

  if (kind === "authority") {
  // Authority review: evidence display, file table and two human reviewers.
  const authority = groups.authority;
  const authorityTable = new THREE.Mesh(box(3.4, .16, 1.5), steel); authorityTable.position.set(0, .95, .3); authority.add(authorityTable);
  const authorityScreen = new THREE.Mesh(box(2.25, 1.18, .09), darkSteel); authorityScreen.position.set(0, 1.83, -.48); authority.add(authorityScreen);
  const evidencePane = new THREE.Mesh(box(1.96, .82, .025), new THREE.MeshStandardMaterial({ color: 0x557a72, emissive: 0x153e32, emissiveIntensity: .72 })); evidencePane.position.set(0, 1.83, -.54); authority.add(evidencePane);
  for (let i = 0; i < 4; i++) { const bar = new THREE.Mesh(box(.28 + (i % 2) * .2, .04, .02), goldLight); bar.position.set(-.7 + i * .4, 1.8 - (i % 3) * .15, -.56); authority.add(bar); }
  mountPerson(authority, -2.25, .85, green, .96);
  mountPerson(authority, 2.25, .8, gold, .96);
  }

  if (kind === "verification") {
  // Verification scene: product carton and a purposeful handheld verifier.
  const verification = groups.verification;
  const productBox = new THREE.Mesh(box(1.25, 1.7, .76), pack); productBox.position.set(-1.2, .88, 0); verification.add(productBox);
  const productLabel = new THREE.Mesh(box(.73, .74, .03), new THREE.MeshStandardMaterial({ color: 0xf0e8d4, roughness: .82 })); productLabel.position.set(-1.2, .93, -.4); verification.add(productLabel);
  phone = new THREE.Group(); verification.add(phone);
  const phoneBody = new THREE.Mesh(box(.94, 1.75, .1), darkSteel); phoneBody.position.y = 1.05; phone.add(phoneBody);
  const phoneScreen = new THREE.Mesh(box(.79, 1.47, .025), new THREE.MeshStandardMaterial({ color: 0x345650, emissive: 0x1e6b51, emissiveIntensity: .45 })); phoneScreen.position.set(0, 1.05, -.063); phone.add(phoneScreen);
  for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++) if ((x * 7 + y * 3) % 4 !== 0) { const cell = new THREE.Mesh(box(.075, .075, .018), goldLight); cell.position.set(-.26 + x * .13, 1.17 + y * .13, -.082); phone.add(cell); }
  phone.position.set(1.35, .05, .25); phone.rotation.z = -.1;
  mountPerson(verification, 2.7, 1.5, green, .95);
  }

  // The overview places all accountable physical handoffs in one continuous corridor.
  const overview = groups.corridor;
  // The overview is an animated custody corridor, not a miniature playset.
  // Operational detail appears in the focused facility/lab/audit/port scenes.
  overview.visible = false;
  const cargo = new THREE.Group();
  const freightMaterial = new THREE.MeshStandardMaterial({ color: 0x58666c, metalness: .34, roughness: .7 });
  const cargoBody = new THREE.Mesh(box(2, .55, .52), freightMaterial); cargoBody.position.y = .44; cargo.add(cargoBody);
  for (const side of [-1, 1]) for (let i = 0; i < 14; i++) {
    const rib = new THREE.Mesh(box(.026, .51, .018), steel);
    rib.position.set(-.94 + i * .145, .44, side * .268);
    cargo.add(rib);
  }
  for (const x of [-.96, .96]) for (const z of [-.27, .27]) {
    const corner = new THREE.Mesh(box(.055, .58, .055), darkSteel);
    corner.position.set(x, .44, z);
    cargo.add(corner);
  }
  const rearDoors = new THREE.Mesh(box(.42, .49, .018), steel);
  rearDoors.position.set(1.01, .44, 0);
  cargo.add(rearDoors);
  const doorSeam = new THREE.Mesh(box(.012, .47, .022), darkSteel);
  doorSeam.position.set(1.02, .44, -.002);
  cargo.add(doorSeam);
  const cargoLabel = new THREE.Mesh(box(.22, .12, .018), new THREE.MeshStandardMaterial({ color: 0xe5dfcf, roughness: .88 }));
  cargoLabel.position.set(-.55, .48, -.268);
  cargo.add(cargoLabel);
  const trailerDeck = new THREE.Mesh(box(2.16, .12, .62), new THREE.MeshStandardMaterial({ color: 0x343b3e, metalness: .42, roughness: .68 }));
  trailerDeck.position.y = .11;
  cargo.add(trailerDeck);
  const axleGroups = [-.58, .12, .65].map(x => {
    const axle = new THREE.Group();
    for (const z of [-.36, .36]) {
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(.15, .15, .09, 20), new THREE.MeshStandardMaterial({ color: 0x17191a, roughness: .9 }));
      tire.rotation.x = Math.PI / 2;
      tire.position.set(x, -.045, z);
      axle.add(tire);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(.065, .065, .094, 16), steel);
      hub.rotation.x = Math.PI / 2;
      hub.position.set(x, -.045, z * 1.08);
      axle.add(hub);
    }
    cargo.add(axle);
    return axle;
  });
  scene.add(cargo);

  // One focused key light gives the scene a grounded studio/industrial finish.
  // Only the visible model is rendered, so shadow cost stays bounded.
  scene.traverse(object => {
    if (object instanceof THREE.Mesh && object !== floor) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  const animatedPeople = [factoryPerson, materialPerson, analyst].filter((person): person is THREE.Group => person !== null);
  let stageIndex = 0;
  let cameraKind: ProcessKind | null = null;
  let frame = 0;
  let active = true;
  let animationFrame = 0;
  let previousTime = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const handleReducedMotion = () => render(0);
  const onReducedMotionChange = () => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { window.cancelAnimationFrame(animationFrame); render(0); } else if (active) animate(0); };
  const resize = new ResizeObserver(() => {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    render(0);
  });
  resize.observe(container);

  function render(time: number) {
    const visibleKind = groups[kind].children.length > 0 ? kind : "corridor";
    const isCorridor = visibleKind === "corridor";
    if (cameraKind !== visibleKind) {
      if (isCorridor) {
        camera.position.set(0, 5.2, 12.6);
        camera.lookAt(0, .82, 0);
      } else {
        camera.position.set(3.6, 4.7, 8.8);
        camera.lookAt(0, 1.05, 0);
      }
      cameraKind = visibleKind;
    }
    floor.visible = false;
    routeLine.visible = true;
    routeDot.visible = true;
    cargo.visible = false;
    routeBases.forEach(node => { node.visible = false; });
    nodes.forEach(node => { node.visible = false; });
    Object.values(groups).forEach(group => { group.visible = false; });
    if (visibleKind === "corridor") {
      const point = route.getPointAt(((time * .00004 + stageIndex / 20) % 1 + 1) % 1);
      routeDot.position.copy(point); routeDot.position.y = .035;
    } else {
      cargo.position.set(5, -.3, 0);
      routeDot.position.copy(route.getPointAt(((time * .00004 + stageIndex / 20) % 1 + 1) % 1));
    }
    const seconds = time * .001;
    if (truck) { truck.position.z = visibleKind === "transport" ? Math.sin(seconds * 1.1) * .14 : -.1; truck.rotation.y = visibleKind === "transport" ? Math.sin(seconds * .45) * .035 : 0; }
    wheels.forEach(wheel => { wheel.rotation.z = visibleKind === "transport" ? seconds * 1.7 : 0; });
    axleGroups.forEach(axle => axle.rotation.z = visibleKind === "corridor" ? seconds * 1.35 : 0);
    if (forklift) forklift.position.x = visibleKind === "warehouse" ? Math.sin(seconds * .52) * 1.2 : -.2;
    if (craneCable) craneCable.position.y = 3.15 + (visibleKind === "port" ? Math.sin(seconds * .8) * .22 : 0);
    if (spreader) spreader.position.y = 2.47 + (visibleKind === "port" ? Math.sin(seconds * .8) * .22 : 0);
    cartons.forEach((item, index) => { item.position.x = -3.65 + ((index * .78 + seconds * .32) % 3.9); });
    animatedPeople.forEach((person, index) => {
      person.rotation.y = Math.sin(seconds * .38 + index) * .035;
      person.position.y = 0;
      const arms = person.userData.arms as THREE.Mesh[] | undefined;
      arms?.forEach((arm, armIndex) => { arm.rotation.z = Math.sin(seconds * .48 + index + armIndex * .35) * .035; });
    });
    if (analyst) analyst.rotation.y = visibleKind === "laboratory" ? Math.sin(seconds * .7) * .11 : 0;
    if (phone) phone.rotation.y = visibleKind === "verification" ? Math.sin(seconds * .8) * .12 : -.1;
    if (scanBeam) scanBeam.position.y = visibleKind === "market" ? .55 + Math.abs(Math.sin(seconds * 1.2)) * .48 : .78;
    const pulses = .95 + Math.sin(seconds * 2) * .17;
    routeDot.scale.setScalar(pulses);
    scene.rotation.y = Math.sin(seconds * .11) * .028;
    renderer.render(scene, camera);
  }

  function animate(time: number) {
    if (!active) return;
    animationFrame = window.requestAnimationFrame(animate);
    if (time - previousTime < (window.innerWidth < 760 ? 33 : 24)) return;
    previousTime = time;
    frame++;
    render(reducedMotion ? 0 : time);
  }

  function setStage(label: string, index = stageIndex) {
    stageIndex = Math.max(0, index);
    kind = inferKind(container.dataset.overviewOnly === "true" ? container.dataset.scene || "corridor" : label);
    container.dataset.sceneKind = kind;
    const nextImage = sceneAssetUrl(kind);
    if (!cinematic.src.endsWith(nextImage)) {
      cinematic.classList.add("is-transitioning");
      window.setTimeout(() => {
        if (!cinematic.isConnected) return;
        cinematic.onload = () => requestAnimationFrame(() => cinematic.classList.remove("is-transitioning"));
        cinematic.src = nextImage;
      }, 220);
    }
    render(0);
    return true;
  }
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionPreference.addEventListener?.("change", onReducedMotionChange);
  handleReducedMotion();
  if (!reducedMotion) animate(0);

  return {
    setStage,
    resize: () => { const width = container.clientWidth || 640; const height = container.clientHeight || 360; camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height, false); },
    dispose() {
      active = false;
      window.cancelAnimationFrame(animationFrame);
      resize.disconnect();
      motionPreference.removeEventListener?.("change", onReducedMotionChange);
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) { object.geometry.dispose(); const mats = Array.isArray(object.material) ? object.material : [object.material]; mats.forEach(material => material.dispose()); }
      });
      renderer.dispose();
      renderer.domElement.remove();
      cinematic.remove();
      dataflow.remove();
    },
  };
}

export function mountProcessSceneOnElement(container: HTMLElement): ProcessSceneHandle | null {
  if (container.dataset.sceneMounted === "true") return null;
  container.dataset.sceneMounted = "loading";
  try {
    let scene = mountProcessScene(container);
    const currentLabel = () => container.dataset.stageLabel || container.dataset.scene || "corridor";
    const currentIndex = () => Number(container.dataset.stageIndex || 0);
    scene.setStage(currentLabel(), currentIndex());
    container.dataset.sceneMounted = "true";
    container.querySelector(".process-scene-loading")?.remove();
    const observer = new MutationObserver(() => {
      const label = currentLabel();
      const index = currentIndex();
      if (scene.setStage(label, index)) return;
      // Construct only the selected process station. Rebuild on a semantic
      // stage change so a lab step shows the lab, an audit step shows the audit,
      // and so on without keeping every heavy geometry in memory.
      const nextScene = mountProcessScene(container);
      nextScene.setStage(label, index);
      const previousScene = scene;
      scene = nextScene;
      previousScene.dispose();
    });
    observer.observe(container, { attributes: true, attributeFilter: ["data-stage-label", "data-stage-index", "data-scene"] });
    return {
      setStage: (label, index) => scene.setStage(label, index),
      resize: () => scene.resize(),
      dispose: () => { observer.disconnect(); scene.dispose(); delete container.dataset.sceneMounted; },
    };
  } catch (error) {
    delete container.dataset.sceneMounted;
    container.dataset.sceneFallback = "true";
    container.querySelector(".process-scene-loading")?.remove();
    container.setAttribute("role", "img");
    if (!container.getAttribute("aria-label")) container.setAttribute("aria-label", "Animated 3D process visualization is unavailable on this device. The complete process remains available in the adjacent step list.");
    console.warn("3D process visual fell back to the accessible step sequence.", error);
    return null;
  }
}

export function mountVisibleProcessScenes(root: ParentNode = document) {
  const mounted = new Map<HTMLElement, ProcessSceneHandle>();
  const visible = new Set<HTMLElement>();
  const revealNext = () => {
    if (mounted.size > 0) return;
    const element = visible.values().next().value as HTMLElement | undefined;
    if (!element) return;
    const scene = mountProcessSceneOnElement(element);
    if (scene) mounted.set(element, scene);
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const element = entry.target as HTMLElement;
      if (entry.isIntersecting) visible.add(element);
      else {
        visible.delete(element);
        mounted.get(element)?.dispose();
        mounted.delete(element);
      }
    });
    revealNext();
  }, { rootMargin: "0px" });
  root.querySelectorAll<HTMLElement>("[data-process-scene]").forEach(element => observer.observe(element));
  return () => { observer.disconnect(); visible.clear(); mounted.forEach(scene => scene.dispose()); mounted.clear(); };
}
