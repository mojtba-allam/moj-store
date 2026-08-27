/* رسوم بيانية SVG خفيفة بلغة مشكاة البصرية */

export function AreaChart({ data, labels, h = 190 }: { data: number[]; labels: string[]; h?: number }) {
  const W = 600, H = h, pad = 8;
  const max = Math.max(...data) * 1.15 || 1;
  const pts = data.map((v, i) => [
    pad + (i * (W - pad * 2)) / (data.length - 1),
    H - pad - (v / max) * (H - pad * 2 - 18),
  ]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0]},${H - pad} L${pts[0][0]},${H - pad} Z`;
  return (
    <div dir="ltr">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <defs>
          <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8a8f63" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#8a8f63" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={pad} x2={W - pad} y1={H * g} y2={H * g} stroke="#e5e1d8" strokeDasharray="3 5" />
        ))}
        <path d={area} fill="url(#ag)" />
        <path d={line} fill="none" stroke="#8a8f63" strokeWidth="2.2" strokeLinecap="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4.5 : 2.6} fill={i === pts.length - 1 ? "#1c1c1a" : "#8a8f63"} />
        ))}
      </svg>
      <div className="flex justify-between text-[0.6rem] font-bold text-mute mt-1 px-1">
        {labels.map((l, i) => (
          <span key={i} className={i % 2 ? "hidden sm:inline" : ""}>{l}</span>
        ))}
      </div>
    </div>
  );
}

export function HBars({ items, unit = "" }: { items: { label: string; value: number }[]; unit?: string }) {
  const max = Math.max(...items.map((i) => i.value)) || 1;
  return (
    <div className="space-y-3.5">
      {items.map((it) => (
        <div key={it.label}>
          <div className="flex justify-between text-[0.68rem] font-bold mb-1.5">
            <span>{it.label}</span>
            <span className="num text-mute">{it.value.toLocaleString("en-EG")}{unit}</span>
          </div>
          <div className="h-2 bg-paper border border-line/60">
            <div className="h-full bg-olive transition-[width] duration-700" style={{ width: `${(it.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Donut({ items, centerLabel }: { items: { label: string; value: number; color: string }[]; centerLabel: string }) {
  const total = items.reduce((s, i) => s + i.value, 0) || 1;
  const R = 54, C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 140 140" className="w-32 h-32 shrink-0 -rotate-90">
        <circle cx="70" cy="70" r={R} fill="none" stroke="#e5e1d8" strokeWidth="16" />
        {items.map((it) => {
          const frac = it.value / total;
          const el = (
            <circle key={it.label} cx="70" cy="70" r={R} fill="none" stroke={it.color} strokeWidth="16"
              strokeDasharray={`${frac * C} ${C}`} strokeDashoffset={-acc * C} className="transition-all duration-700" />
          );
          acc += frac;
          return el;
        })}
        <text x="70" y="70" textAnchor="middle" dominantBaseline="middle" transform="rotate(90 70 70)" className="fill-ink" fontSize="15" fontWeight="800" fontFamily="Almarai">
          {centerLabel}
        </text>
      </svg>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-2.5 text-[0.7rem] font-bold">
            <span className="w-3 h-3" style={{ background: it.color }} />
            <span>{it.label}</span>
            <span className="num text-mute">{Math.round((it.value / total) * 100)}٪</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function downloadCSV(name: string, rows: (string | number)[][]) {
  const csv = "\uFEFF" + rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  a.download = `${name}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}
