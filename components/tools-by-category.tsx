'use client';

import { useMemo, useState } from 'react';
import { categories, type Category, type Tool } from '@/lib/tools';
import { ToolCard } from '@/components/tool-card';

export function ToolsByCategory({ tools }: { tools: Tool[] }) {
  const [selected, setSelected] = useState<Category | null>(null);

  const availableCategories = useMemo(
    () => categories.filter((category) => tools.some((tool) => tool.categories.includes(category))),
    [tools],
  );

  const filtered = useMemo(() => {
    if (!selected) return tools;
    return tools.filter((tool) => tool.categories.includes(selected));
  }, [tools, selected]);

  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-20 sm:pb-28">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
          Explora por categoría
        </h2>
        <p className="text-sm text-muted-foreground">
          Filtra las herramientas según lo que necesites resolver.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          type="button"
          onClick={() => setSelected(null)}
          aria-pressed={selected === null}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            selected === null
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-card/80 backdrop-blur-sm hover:border-primary/40 hover:bg-card'
          }`}
        >
          Todas
        </button>
        {availableCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelected(category)}
            aria-pressed={selected === category}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selected === category
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card/80 backdrop-blur-sm hover:border-primary/40 hover:bg-card'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">
          No hay herramientas en esta categoría todavía.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </section>
  );
}
