'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowUpRight,
  ArrowRight,
  Radar,
  BookOpen,
  Map,
  Grid3x3,
  MessageCircleQuestion,
  Network,
  Calendar,
  KeyRound,
  QrCode,
  Hash,
  Mail,
  Binary,
  Link2,
  Fingerprint,
  ShieldCheck,
  Gauge,
  Fish,
  Inbox,
  MonitorCheck,
  Landmark,
  type LucideIcon,
} from 'lucide-react';
import type { Tool } from '@/lib/tools';

const icons: Record<Tool['iconName'], LucideIcon> = {
  Radar,
  BookOpen,
  Map,
  Grid3x3,
  MessageCircleQuestion,
  Network,
  Calendar,
  KeyRound,
  QrCode,
  Hash,
  Mail,
  Binary,
  Link2,
  Fingerprint,
  ShieldCheck,
  Gauge,
  Fish,
  Inbox,
  MonitorCheck,
  Landmark,
};

const MARQUEE_ROWS = 5;
// Con pocas herramientas por fila, dos copias no alcanzan a cubrir el ancho
// de la pantalla y el loop deja huecos visibles. Se repite la fila hasta
// llegar a un mínimo de chips por mitad, así la pista siempre es más ancha
// que el viewport sin importar cuántas herramientas únicas tenga la fila.
const MIN_CHIPS_PER_HALF = 12;
const SECONDS_PER_CHIP = 8.4375; // ritmo base (50% más lento que la versión anterior)

function ToolChip({
  tool,
  interactive,
}: {
  tool: Tool;
  interactive: boolean;
}) {
  const Icon = icons[tool.iconName];
  const className =
    'flex shrink-0 items-center gap-2.5 rounded-lg border border-border bg-card/80 backdrop-blur-sm px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors hover:border-primary/40 hover:bg-card';

  const inner = (
    <>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
        <Icon className="h-3.5 w-3.5 text-primary" />
      </span>
      {tool.title}
    </>
  );

  return tool.external ? (
    <a
      href={tool.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={interactive ? undefined : -1}
      aria-hidden={interactive ? undefined : true}
      className={className}
    >
      {inner}
    </a>
  ) : (
    <Link
      href={tool.href}
      tabIndex={interactive ? undefined : -1}
      aria-hidden={interactive ? undefined : true}
      className={className}
    >
      {inner}
    </Link>
  );
}

function ToolsMarqueeRow({
  tools,
  reverse,
  rowIndex,
}: {
  tools: Tool[];
  reverse?: boolean;
  rowIndex: number;
}) {
  const repeatCount = Math.max(2, Math.ceil(MIN_CHIPS_PER_HALF / tools.length));
  const half = Array.from({ length: repeatCount }, () => tools).flat();
  const track = [...half, ...half];
  const speed = half.length * SECONDS_PER_CHIP + rowIndex * 4.5;
  const style = { '--marquee-duration': `${speed}s` } as CSSProperties;

  const seenSlugs = new Set<string>();
  const chips = track.map((tool, i) => {
    const interactive = !seenSlugs.has(tool.slug);
    seenSlugs.add(tool.slug);
    return <ToolChip key={`${tool.slug}-${i}`} tool={tool} interactive={interactive} />;
  });

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        style={style}
        className={`flex w-max gap-3 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] ${
          reverse ? 'animate-marquee-ltr' : 'animate-marquee-rtl'
        }`}
      >
        {chips}
      </div>
    </div>
  );
}

function ToolsMarquee({ tools }: { tools: Tool[] }) {
  const rows = useMemo(() => {
    const buckets: Tool[][] = Array.from({ length: MARQUEE_ROWS }, () => []);
    tools.forEach((tool, i) => buckets[i % MARQUEE_ROWS].push(tool));
    return buckets;
  }, [tools]);

  return (
    <div className="full-bleed mb-14 flex flex-col gap-3">
      {rows.map((rowTools, i) => (
        <ToolsMarqueeRow key={i} tools={rowTools} reverse={i % 2 === 1} rowIndex={i} />
      ))}
    </div>
  );
}

export function ToolsSearch({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter(
      (tool) =>
        tool.title.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q),
    );
  }, [tools, query]);

  const isSearching = query.trim().length > 0;

  return (
    <div>
      <div className="relative max-w-xl mx-auto mb-10">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar una herramienta..."
          className="w-full rounded-full border border-border bg-card/80 backdrop-blur-sm pl-11 pr-4 py-3 text-sm outline-none transition-colors focus:border-primary/60"
        />
      </div>

      {!isSearching && <ToolsMarquee tools={tools} />}

      {isSearching &&
        (filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No se encontraron herramientas para &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((tool) => {
              const Icon = icons[tool.iconName];
              const content = (
                <>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </span>
                    {tool.external ? (
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                    ) : (
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    )}
                  </div>
                  <h2 className="text-sm font-semibold mb-1">{tool.title}</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                </>
              );

              const className =
                'group block rounded-xl border border-border bg-card/80 backdrop-blur-sm p-4 transition-all hover:border-primary/40 hover:bg-card';

              return tool.external ? (
                <a
                  key={tool.slug}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <Link key={tool.slug} href={tool.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
        ))}
    </div>
  );
}
