'use client';

import { useEffect, useMemo, useState } from 'react';

import { CheckCircle2, ClipboardCheck, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export interface ChecklistItemData {
  id: string;
  text: string;
  help?: string;
}

export interface ChecklistSectionData {
  id: string;
  title: string;
  items: ChecklistItemData[];
}

function readStoredChecked(storageKey: string): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Checklist con progreso guardado en localStorage: a diferencia de otras
 * herramientas de la app, aquí sí conviene persistir entre visitas porque un
 * checklist de verificación de equipo se suele completar en varias sesiones.
 */
export function ChecklistGroup({
  storageKey,
  sections,
}: {
  storageKey: string;
  sections: ChecklistSectionData[];
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = readStoredChecked(storageKey);
    Promise.resolve().then(() => {
      setChecked(stored);
      setIsLoaded(true);
    });
  }, [storageKey]);

  useEffect(() => {
    if (!isLoaded) return;
    window.localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked, isLoaded, storageKey]);

  const allItems = useMemo(() => sections.flatMap((section) => section.items), [sections]);
  const checkedCount = allItems.filter((item) => checked[item.id]).length;
  const total = allItems.length;
  const allChecked = total > 0 && checkedCount === total;

  const toggleItem = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReset = () => setChecked({});

  return (
    <div className="w-full space-y-4">
      <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-primary" />
          <span className="font-semibold">Progreso del checklist</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">
            {checkedCount}/{total} completados
          </span>
          <div className="h-2 w-28 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${total ? (checkedCount / total) * 100 : 0}%` }}
            />
          </div>
          <Button onClick={handleReset} variant="outline" size="sm" data-test="checklist-reset">
            <RotateCcw className="mr-2 h-3.5 w-3.5" />
            Reiniciar
          </Button>
        </div>
      </Card>

      {allChecked && (
        <Card className="border-2 border-green-500 bg-green-50 p-4 text-center dark:bg-green-950/50">
          <p className="flex items-center justify-center gap-2 font-semibold">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            ¡Checklist completo! Quedó todo verificado.
          </p>
        </Card>
      )}

      {sections.map((section) => {
        const sectionCheckedCount = section.items.filter((item) => checked[item.id]).length;
        const sectionComplete = sectionCheckedCount === section.items.length;

        return (
          <Card key={section.id} className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">{section.title}</h3>
              <span
                className={cn(
                  'text-xs font-medium',
                  sectionComplete ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground',
                )}
              >
                {sectionCheckedCount}/{section.items.length}
              </span>
            </div>
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <Checkbox
                    id={item.id}
                    checked={Boolean(checked[item.id])}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="mt-0.5"
                    data-test={`checklist-item-${item.id}`}
                  />
                  <label htmlFor={item.id} className="flex-1 cursor-pointer text-sm leading-relaxed">
                    <span className={cn(checked[item.id] && 'text-muted-foreground line-through')}>
                      {item.text}
                    </span>
                    {item.help && (
                      <span className="text-muted-foreground mt-0.5 block text-xs">{item.help}</span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}
