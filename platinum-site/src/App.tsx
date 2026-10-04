const tokens = [
  ["Obsidian Base", "var(--obsidian-base)"],
  ["Obsidian Raised", "var(--obsidian-raised)"],
  ["Gold Primary", "var(--gold-primary)"],
  ["Gold Bright", "var(--gold-bright)"],
  ["Neon Green", "var(--neon-green)"],
  ["Telemetry Blue", "var(--telemetry-blue)"],
  ["Alert Red", "var(--alert-red)"],
];

export default function App() {
  return (
    <main className="phase-zero-shell">
      <section className="foundation-panel glass" aria-labelledby="phase-zero-title">
        <div className="brand-shield" aria-hidden="true">حلال</div>
        <p className="eyebrow">GHSCL · AMANAH · PHASE 0</p>
        <h1 id="phase-zero-title">Obsidian &amp; Gold Foundation</h1>
        <p className="lede">
          Vite + TypeScript foundation for the platinum-tier trust terminal. This page exists only to validate
          design tokens, accessibility fallbacks, motion safeguards and glass treatment before interactive phases.
        </p>
        <div className="token-grid" aria-label="Design token rendering test">
          {tokens.map(([label, value]) => (
            <article className="token-card" key={label}>
              <span className="token-swatch" style={{ background: value }} aria-hidden="true" />
              <strong>{label}</strong>
              <code>{value}</code>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
