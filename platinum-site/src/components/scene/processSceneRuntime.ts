import * as THREE from "three";

export type ProcessSceneHandle = {
  setStage: (label: string, index?: number) => void;
  resize: () => void;
  dispose: () => void;
};

type ProcessKind = "corridor" | "facility" | "laboratory" | "audit" | "warehouse" | "transport" | "port" | "market" | "authority" | "verification";

const inferKind = (label: string): ProcessKind => {
  const value = label.toLowerCase();
  if (/real product journey|full (?:china to gcc )?journey|complete corridor/.test(value)) return "corridor";
  if (/lab|sample|method|qc|science/.test(value)) return "laboratory";
  if (/audit|capa|inspection|finding/.test(value)) return "audit";
  if (/warehouse|storage|segregation|inventory/.test(value)) return "warehouse";
  if (/sinotrans|logistic|custody|transit|carrier|vehicle/.test(value)) return "transport";
  if (/port|custom|border|export|import|arrival/.test(value)) return "port";
  if (/gcc|market|retail|distribut|consumer/.test(value)) return /consumer|verify|disclosure/.test(value) ? "verification" : "market";
  if (/authority|jakim|standard|requirement|certification/.test(value)) return "authority";
  if (/verify|disclosure|passport/.test(value)) return "verification";
  if (/facility|production|manufactur|product|sku|supplier|origin|producer/.test(value)) return "facility";
  return "corridor";
};

const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);

function mountPerson(parent: THREE.Group, x: number, z: number, accent: THREE.Material, scale = 1) {
  const person = new THREE.Group();
  person.position.set(x, 0, z);
  person.scale.setScalar(scale);
  const coat = new THREE.Mesh(box(.25, .62, .18), accent);
  coat.position.y = .92;
  const head = new THREE.Mesh(new THREE.SphereGeometry(.13, 12, 10), new THREE.MeshStandardMaterial({ color: 0xc99f73, roughness: .76 }));
  head.position.y = 1.34;
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x202329, metalness: .28, roughness: .72 });
  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(box(.085, .48, .09), legMaterial);
    leg.position.set(side * .07, .35, 0);
    person.add(leg);
  }
  person.add(coat, head);
  parent.add(person);
  return person;
}

function mountProcessScene(container: HTMLElement): ProcessSceneHandle {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, .1, 80);
  camera.position.set(7.6, 6.4, 9.5);
  camera.lookAt(0, 1.1, 0);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1 : 1.5));
  renderer.setSize(container.clientWidth || 640, container.clientHeight || 360, false);
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.className = "process-scene-canvas";
  container.appendChild(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xd9e6f2, 0x10100e, 2.1));
  const key = new THREE.DirectionalLight(0xffd983, 3.1);
  key.position.set(5, 9, 6);
  scene.add(key);
  const rim = new THREE.PointLight(0x4d8795, 8, 24);
  rim.position.set(-6, 4, -5);
  scene.add(rim);

  const gold = new THREE.MeshStandardMaterial({ color: 0xd2ac60, metalness: .72, roughness: .3 });
  const goldLight = new THREE.MeshStandardMaterial({ color: 0xf1d998, emissive: 0x63481b, emissiveIntensity: .7, metalness: .38, roughness: .34 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x59636b, metalness: .72, roughness: .34 });
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x20262b, metalness: .66, roughness: .39 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x7395a0, metalness: .2, roughness: .26, transparent: true, opacity: .38 });
  const pack = new THREE.MeshStandardMaterial({ color: 0xb7955d, metalness: .16, roughness: .7 });
  const green = new THREE.MeshStandardMaterial({ color: 0x526c58, metalness: .1, roughness: .8 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, 11), new THREE.MeshStandardMaterial({ color: 0x101315, metalness: .28, roughness: .64 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -.04;
  scene.add(floor);

  const grid = new THREE.GridHelper(16, 32, 0x5b4a2a, 0x252729);
  grid.position.y = -.02;
  scene.add(grid);

  const routePoints = [new THREE.Vector3(-6, .12, 2.4), new THREE.Vector3(-3.6, .12, .2), new THREE.Vector3(-1.1, .12, 1.4), new THREE.Vector3(1.8, .12, -.9), new THREE.Vector3(4, .12, .9), new THREE.Vector3(6, .12, -1.4)];
  const route = new THREE.CatmullRomCurve3(routePoints);
  const routeLine = new THREE.Mesh(new THREE.TubeGeometry(route, 80, .025, 6, false), goldLight);
  scene.add(routeLine);
  const routeDot = new THREE.Mesh(new THREE.SphereGeometry(.105, 16, 12), new THREE.MeshStandardMaterial({ color: 0xffe5a4, emissive: 0xad761a, emissiveIntensity: 1.8 }));
  scene.add(routeDot);
  const nodes = routePoints.map((point, index) => {
    const node = new THREE.Mesh(new THREE.CylinderGeometry(.16, .2, .08, 20), index < 2 ? gold : steel);
    node.position.copy(point);
    node.position.y = .03;
    scene.add(node);
    const marker = new THREE.Mesh(new THREE.SphereGeometry(.12, 12, 8), index === 0 ? goldLight : darkSteel);
    marker.position.copy(point);
    marker.position.y = .19;
    scene.add(marker);
    return marker;
  });

  const groups: Record<ProcessKind, THREE.Group> = Object.fromEntries(([
    "corridor", "facility", "laboratory", "audit", "warehouse", "transport", "port", "market", "authority", "verification",
  ] as ProcessKind[]).map(kind => [kind, new THREE.Group()])) as Record<ProcessKind, THREE.Group>;
  Object.values(groups).forEach(group => scene.add(group));

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
  const cartons = Array.from({ length: 5 }, (_, i) => { const item = new THREE.Mesh(box(.42, .38, .38), i % 2 ? pack : green); item.position.set(-3.65 + i * .78, .94, .8); factory.add(item); return item; });
  const machine = new THREE.Mesh(box(.86, 1.35, .96), steel); machine.position.set(-.35, .86, .8); factory.add(machine);
  const machineWindow = new THREE.Mesh(box(.55, .42, .05), glass); machineWindow.position.set(-.35, 1, .3); factory.add(machineWindow);
  const factoryPerson = mountPerson(factory, -4.5, -.6, green, .86);
  const materialPerson = mountPerson(factory, 1, 1.1, gold, .86);

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
  const analyst = mountPerson(lab, 2.7, .7, new THREE.MeshStandardMaterial({ color: 0x3d5660, roughness: .72 }), .92);

  // Auditor scene: a real facility inspection bay with worktable and inspectors.
  const audit = groups.audit;
  const auditTable = new THREE.Mesh(box(2.5, .12, 1.2), steel); auditTable.position.set(0, 1, .3); audit.add(auditTable);
  const auditScreen = new THREE.Mesh(box(1.1, .68, .08), darkSteel); auditScreen.position.set(0, 1.48, -.2); audit.add(auditScreen);
  const auditPanel = new THREE.Mesh(box(.92, .5, .025), new THREE.MeshStandardMaterial({ color: 0x638578, emissive: 0x1b4932, emissiveIntensity: .55 })); auditPanel.position.set(0, 1.49, -.255); audit.add(auditPanel);
  mountPerson(audit, -1.3, .8, green, .92);
  mountPerson(audit, 1.55, -.4, gold, .92);
  const auditClipboard = new THREE.Mesh(box(.46, .58, .035), pack); auditClipboard.position.set(1.1, 1.27, .2); auditClipboard.rotation.z = -.15; audit.add(auditClipboard);

  // Certified warehouse: pallet stacks, selective racks and a moving lift truck.
  const warehouse = groups.warehouse;
  for (let z = -1.55; z <= 1.56; z += 1.55) {
    for (let y = .62; y <= 2.52; y += .94) {
      const beam = new THREE.Mesh(box(5.3, .1, .12), gold); beam.position.set(0, y, z); warehouse.add(beam);
      for (const x of [-2.55, 2.55]) { const post = new THREE.Mesh(box(.12, 2.75, .12), steel); post.position.set(x, 1.38, z); warehouse.add(post); }
      for (let x = -1.9; x <= 1.9; x += .95) { const crate = new THREE.Mesh(box(.76, .55, .62), y > 1.7 ? green : pack); crate.position.set(x, y - .3, z); warehouse.add(crate); }
    }
  }
  const forklift = new THREE.Group(); warehouse.add(forklift);
  const liftBody = new THREE.Mesh(box(1.05, .56, .68), gold); liftBody.position.y = .58; forklift.add(liftBody);
  const liftCab = new THREE.Mesh(box(.5, .86, .56), glass); liftCab.position.set(-.1, 1.2, -.02); forklift.add(liftCab);
  const mast = new THREE.Mesh(box(.12, 1.85, .16), steel); mast.position.set(.52, 1.08, .18); forklift.add(mast);
  const forks = new THREE.Mesh(box(.76, .06, .38), gold); forks.position.set(.87, .38, .16); forklift.add(forks);
  for (const x of [-.3, .38]) for (const z of [-.38, .38]) { const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.2, .2, .13, 16), darkSteel); wheel.rotation.x = Math.PI / 2; wheel.position.set(x, .24, z); forklift.add(wheel); }
  forklift.position.set(-.2, 0, 2.35);

  // China-to-GCC line haul: tractor, trailer, refrigerated unit and animated wheels.
  const transport = groups.transport;
  const truck = new THREE.Group(); transport.add(truck);
  const trailer = new THREE.Mesh(box(4.7, 1.45, 1.5), new THREE.MeshStandardMaterial({ color: 0x65717a, metalness: .52, roughness: .4 })); trailer.position.set(-.3, 1.65, 0); truck.add(trailer);
  for (let side = -1; side <= 1; side += 2) for (let i = 0; i < 7; i++) { const rib = new THREE.Mesh(box(.06, 1.3, .035), gold); rib.position.set(-2.55 + i * .72, 1.65, side * .77); truck.add(rib); }
  const cab = new THREE.Mesh(box(1.12, 1.35, 1.42), gold); cab.position.set(2.65, 1.1, 0); truck.add(cab);
  const windshield = new THREE.Mesh(box(.82, .52, .04), glass); windshield.position.set(2.65, 1.42, -.74); truck.add(windshield);
  const wheels: THREE.Mesh[] = [];
  for (const x of [-1.8, -.35, 1.8, 3.15]) for (const z of [-.82, .82]) { const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.38, .38, .2, 20), darkSteel); wheel.rotation.x = Math.PI / 2; wheel.position.set(x, .47, z); truck.add(wheel); wheels.push(wheel); }
  const driver = mountPerson(truck, 2.72, 0, green, .45); driver.position.y = .72;
  truck.position.set(0, 0, -.1);

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
  const craneCable = new THREE.Mesh(box(.035, 1.3, .035), steel); craneCable.position.set(.55, 3.15, -1.95); crane.add(craneCable);
  const spreader = new THREE.Mesh(box(1.15, .12, .28), goldLight); spreader.position.set(.55, 2.47, -1.95); crane.add(spreader);
  ship.position.z = .55;

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
  const scanBeam = new THREE.Mesh(box(.68, .025, .03), goldLight); scanBeam.position.set(3.2, .78, .92); market.add(scanBeam);
  mountPerson(market, 3.55, -.2, green, .9);

  // Authority review: evidence display, file table and two human reviewers.
  const authority = groups.authority;
  const authorityTable = new THREE.Mesh(box(3.4, .16, 1.5), steel); authorityTable.position.set(0, .95, .3); authority.add(authorityTable);
  const authorityScreen = new THREE.Mesh(box(2.25, 1.18, .09), darkSteel); authorityScreen.position.set(0, 1.83, -.48); authority.add(authorityScreen);
  const evidencePane = new THREE.Mesh(box(1.96, .82, .025), new THREE.MeshStandardMaterial({ color: 0x557a72, emissive: 0x153e32, emissiveIntensity: .72 })); evidencePane.position.set(0, 1.83, -.54); authority.add(evidencePane);
  for (let i = 0; i < 4; i++) { const bar = new THREE.Mesh(box(.28 + (i % 2) * .2, .04, .02), goldLight); bar.position.set(-.7 + i * .4, 1.8 - (i % 3) * .15, -.56); authority.add(bar); }
  mountPerson(authority, -2.25, .85, green, .96);
  mountPerson(authority, 2.25, .8, gold, .96);

  // Verification scene: product carton and a purposeful handheld verifier.
  const verification = groups.verification;
  const productBox = new THREE.Mesh(box(1.25, 1.7, .76), pack); productBox.position.set(-1.2, .88, 0); verification.add(productBox);
  const productLabel = new THREE.Mesh(box(.73, .74, .03), new THREE.MeshStandardMaterial({ color: 0xf0e8d4, roughness: .82 })); productLabel.position.set(-1.2, .93, -.4); verification.add(productLabel);
  const phone = new THREE.Group(); verification.add(phone);
  const phoneBody = new THREE.Mesh(box(.94, 1.75, .1), darkSteel); phoneBody.position.y = 1.05; phone.add(phoneBody);
  const phoneScreen = new THREE.Mesh(box(.79, 1.47, .025), new THREE.MeshStandardMaterial({ color: 0x345650, emissive: 0x1e6b51, emissiveIntensity: .45 })); phoneScreen.position.set(0, 1.05, -.063); phone.add(phoneScreen);
  for (let y = 0; y < 5; y++) for (let x = 0; x < 5; x++) if ((x * 7 + y * 3) % 4 !== 0) { const cell = new THREE.Mesh(box(.075, .075, .018), goldLight); cell.position.set(-.26 + x * .13, 1.17 + y * .13, -.082); phone.add(cell); }
  phone.position.set(1.35, .05, .25); phone.rotation.z = -.1;
  mountPerson(verification, 2.7, 1.5, green, .95);

  // The overview places all accountable physical handoffs in one continuous corridor.
  const overview = groups.corridor;
  const corridorPeople: THREE.Group[] = [];
  const detail = (w: number, h: number, d: number, material: THREE.Material, x: number, y: number, z: number, parent = overview) => {
    const mesh = new THREE.Mesh(box(w, h, d), material);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };
  const platform = (x: number, z: number) => detail(1.85, .13, 1.45, darkSteel, x, .08, z);

  // Origin factory: loading bays, translucent clerestory, vent stacks and material pallets.
  platform(-5.7, .72);
  detail(1.36, .83, .92, steel, -5.7, .57, .72);
  detail(1.46, .1, 1.02, darkSteel, -5.7, 1.04, .72);
  detail(.24, .38, .05, glass, -5.33, .55, .235);
  detail(.24, .38, .05, glass, -5.7, .55, .235);
  detail(.24, .38, .05, glass, -6.07, .55, .235);
  detail(.34, .48, .09, darkSteel, -5.7, .32, .235);
  for (const x of [-6.18, -5.86]) detail(.065, .7, .065, steel, x, 1.4, .42);
  for (const x of [-6.2, -5.72]) detail(.34, .22, .3, pack, x, .27, 1.05);
  corridorPeople.push(mountPerson(overview, -5.05, 1.45, green, .55));

  // Manufacturer review desk: people, document station and evidence display.
  platform(-3.25, -.7);
  detail(1.32, .88, .92, darkSteel, -3.25, .58, -.7);
  detail(.96, .52, .04, glass, -3.25, .73, -.23);
  detail(1.02, .08, .46, steel, -3.25, .66, -.1);
  detail(.74, .035, .32, gold, -3.25, .715, -.1);
  corridorPeople.push(mountPerson(overview, -3.92, -.15, green, .56));
  corridorPeople.push(mountPerson(overview, -2.55, -.05, gold, .56));

  // Laboratory: bench-mounted analyser, extraction hood, sample rack and glass vials.
  platform(-.7, .75);
  detail(1.48, .08, .68, steel, -.7, .7, .75);
  detail(.62, .62, .5, darkSteel, -.95, 1.04, .75);
  detail(.38, .27, .06, new THREE.MeshStandardMaterial({ color: 0x315f57, emissive: 0x174238, emissiveIntensity: .45 }), -.95, 1.08, .48);
  detail(.58, .78, .38, glass, -.15, .48, .98);
  for (let i = 0; i < 4; i++) { const vial = new THREE.Mesh(new THREE.CylinderGeometry(.045, .055, .34, 12), glass); vial.position.set(-1.12 + i * .19, .94, .52); overview.add(vial); }
  corridorPeople.push(mountPerson(overview, .15, 1.2, green, .54));

  // Certified storage: selective pallet rack, loaded shelves and a working lift truck.
  platform(1.9, -.75);
  for (const x of [1.3, 2.47]) {
    detail(.09, 1.38, .09, steel, x, .82, -.9);
    detail(.09, 1.38, .09, steel, x, .82, -.36);
    for (const z of [-.9, -.36]) for (const y of [.5, 1.13]) detail(1.22, .075, .08, gold, 1.89, y, z);
  }
  for (const x of [1.52, 1.95, 2.22]) for (const y of [.73, 1.35]) detail(.32, .38, .34, x === 1.95 ? green : pack, x, y, -.63);
  const overviewFork = new THREE.Group();
  const overviewLiftBody = new THREE.Mesh(box(.47, .34, .38), gold); overviewLiftBody.position.y = .36; overviewFork.add(overviewLiftBody);
  const overviewMast = new THREE.Mesh(box(.08, .82, .08), steel); overviewMast.position.set(.22, .75, -.06); overviewFork.add(overviewMast);
  const overviewForks = detail(.42, .035, .09, goldLight, 0, .36, -.25, overviewFork);
  overviewFork.position.set(2.75, 0, .2); overview.add(overviewFork);

  // Origin and destination ports: quay, stacked freight, gantry crane and ship hull.
  platform(4.42, .72);
  for (let row = 0; row < 2; row++) for (let col = 0; col < 2; col++) detail(.66, .4, .52, (row + col) % 2 ? pack : green, 3.92 + col * .72, .37 + row * .42, .88);
  detail(.1, 1.75, .1, steel, 4.9, .95, .3);
  detail(.1, 1.75, .1, steel, 5.54, .95, .3);
  detail(.8, .12, .12, gold, 5.22, 1.78, .3);
  detail(.08, .7, .08, gold, 5.22, 1.42, .3);
  detail(1.08, .22, .38, darkSteel, 4.98, .18, -.04);
  detail(.92, .14, .42, steel, 4.98, .27, -.04);
  detail(.34, .21, .27, glass, 5.22, .47, -.04);

  // GCC receiving and retail: storefront, shelving, products and a receiving operator.
  platform(6.28, -1.28);
  detail(1.46, .87, .92, darkSteel, 6.28, .55, -1.28);
  detail(1.36, .48, .04, glass, 6.28, .68, -.79);
  detail(.12, .64, .06, gold, 5.8, .55, -.76);
  detail(.12, .64, .06, gold, 6.75, .55, -.76);
  for (const y of [.42, .73, 1.04]) {
    detail(.86, .055, .36, gold, 6.28, y, -1.02);
    for (let i = 0; i < 3; i++) detail(.18, .2, .2, i % 2 ? green : pack, 5.98 + i * .3, y + .12, -1.02);
  }
  corridorPeople.push(mountPerson(overview, 6.95, -.55, green, .55));
  void overviewForks;
  const cargo = new THREE.Group();
  const cargoBody = new THREE.Mesh(box(.72, .45, .55), goldLight); cargo.add(cargoBody);
  const cargoWheels = [-.24, .24].map(x => { const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, .09, 12), darkSteel); wheel.rotation.x = Math.PI / 2; wheel.position.set(x, -.28, .22); cargo.add(wheel); return wheel; });
  scene.add(cargo);

  const animatedPeople = [factoryPerson, materialPerson, analyst, ...corridorPeople];
  let kind: ProcessKind = "corridor";
  let stageIndex = 0;
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
    if (kind === "corridor") {
      Object.entries(groups).forEach(([name, group]) => { group.visible = name === "corridor"; });
      const point = route.getPointAt(((time * .00004 + stageIndex / 20) % 1 + 1) % 1);
      cargo.position.copy(point); cargo.position.y = .45;
      routeDot.position.copy(point); routeDot.position.y = .18;
      cargo.rotation.y = Math.atan2(route.getTangentAt(stageIndex / 20).x, route.getTangentAt(stageIndex / 20).z);
      const activeNode = Math.round((stageIndex / 19) * (nodes.length - 1));
      nodes.forEach((node, index) => { node.material = index <= activeNode ? goldLight : darkSteel; });
    } else {
      Object.entries(groups).forEach(([name, group]) => { group.visible = name === kind; });
      cargo.position.set(5, -.3, 0);
    }
    const seconds = time * .001;
    truck.position.z = kind === "transport" ? Math.sin(seconds * 1.1) * .14 : -.1;
    truck.rotation.y = kind === "transport" ? Math.sin(seconds * .45) * .035 : 0;
    wheels.forEach(wheel => { wheel.rotation.z = kind === "transport" ? seconds * 1.7 : 0; });
    forklift.position.x = kind === "warehouse" ? Math.sin(seconds * .52) * 1.2 : -.2;
    craneCable.position.y = 3.15 + (kind === "port" ? Math.sin(seconds * .8) * .22 : 0);
    spreader.position.y = 2.47 + (kind === "port" ? Math.sin(seconds * .8) * .22 : 0);
    cartons.forEach((item, index) => { item.position.x = -3.65 + ((index * .78 + seconds * .32) % 3.9); });
    animatedPeople.forEach((person, index) => { person.rotation.y = Math.sin(seconds * .65 + index) * .12; person.position.y = Math.abs(Math.sin(seconds * 1.1 + index)) * .025; });
    analyst.rotation.y = kind === "laboratory" ? Math.sin(seconds * .7) * .11 : 0;
    phone.rotation.y = kind === "verification" ? Math.sin(seconds * .8) * .12 : -.1;
    scanBeam.position.y = kind === "market" ? .55 + Math.abs(Math.sin(seconds * 1.2)) * .48 : .78;
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
    kind = inferKind(label);
    container.dataset.sceneKind = kind;
    render(0);
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
    },
  };
}

export function mountProcessSceneOnElement(container: HTMLElement): ProcessSceneHandle | null {
  if (container.dataset.sceneMounted === "true") return null;
  container.dataset.sceneMounted = "loading";
  try {
    const scene = mountProcessScene(container);
    scene.setStage(container.dataset.stageLabel || container.dataset.scene || "corridor", Number(container.dataset.stageIndex || 0));
    container.dataset.sceneMounted = "true";
    container.querySelector(".process-scene-loading")?.remove();
    const observer = new MutationObserver(() => scene.setStage(container.dataset.stageLabel || container.dataset.scene || "corridor", Number(container.dataset.stageIndex || 0)));
    observer.observe(container, { attributes: true, attributeFilter: ["data-stage-label", "data-stage-index", "data-scene"] });
    const originalDispose = scene.dispose;
    scene.dispose = () => { observer.disconnect(); originalDispose(); delete container.dataset.sceneMounted; };
    return scene;
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
  const reveal = (element: HTMLElement) => { const scene = mountProcessSceneOnElement(element); if (scene) mounted.set(element, scene); };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const element = entry.target as HTMLElement;
      if (entry.isIntersecting) reveal(element);
      else { mounted.get(element)?.dispose(); mounted.delete(element); }
    });
  }, { rootMargin: "160px" });
  root.querySelectorAll<HTMLElement>("[data-process-scene]").forEach(element => observer.observe(element));
  return () => { observer.disconnect(); mounted.forEach(scene => scene.dispose()); mounted.clear(); };
}
