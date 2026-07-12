'use client';

import { useMemo, useState } from 'react';
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
};

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

  return (
    <div>
      <div className="relative max-w-xl mx-auto mb-14">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar una herramienta..."
          className="w-full rounded-full border border-border bg-card/80 backdrop-blur-sm pl-11 pr-4 py-3 text-sm outline-none transition-colors focus:border-primary/60"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          No se encontraron herramientas para &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => {
            const Icon = icons[tool.iconName];
            const content = (
              <>
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4.5 w-4.5 text-primary" />
                  </span>
                  {tool.external ? (
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  )}
                </div>
                <h2 className="font-semibold mb-1.5">{tool.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
              </>
            );

            const className =
              'group block rounded-xl border border-border bg-card/80 backdrop-blur-sm p-5 transition-all hover:border-primary/40 hover:bg-card';

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
      )}
    </div>
  );
}
