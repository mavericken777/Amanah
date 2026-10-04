export function CircuitMapBackground() {
  const traces = [
    "M40 130 H210 L250 90 H390 L430 130 H620",
    "M90 210 H240 L290 165 H470 L520 210 H720",
    "M180 45 H330 L360 75 H540 L600 25 H780",
    "M520 280 H650 L705 225 H860",
  ];

  return (
    <svg className="circuit-map" viewBox="0 0 900 320" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="traceGold" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.78 0.13 85 / 0)" />
          <stop offset=".45" stopColor="oklch(0.78 0.13 85 / .6)" />
          <stop offset="1" stopColor="oklch(0.88 0.15 88 / .05)" />
        </linearGradient>
      </defs>
      <g className="world-wire">
        <path d="M70 105c38-45 92-66 154-59 45 5 86 28 125 33 38 6 76-7 115-1 52 8 83 47 129 54 65 10 128-27 197-8" />
        <path d="M96 182c58-21 108-12 153 12 43 23 83 39 135 28 48-11 82-42 134-37 62 6 103 46 174 42" />
      </g>
      <g className="circuit-traces">
        {traces.map(trace => <path d={trace} key={trace} />)}
      </g>
      {[40,210,250,390,430,620,90,240,290,470,520,720].map((x,index) => (
        <circle key={`${x}-${index}`} cx={x} cy={index < 6 ? 130 : 210} r="3" />
      ))}
    </svg>
  );
}
