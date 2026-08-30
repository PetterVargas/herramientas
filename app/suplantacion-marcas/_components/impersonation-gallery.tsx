import {
  AtSign,
  Briefcase,
  Globe,
  MessageCircle,
  MessagesSquare,
  Newspaper,
  ShoppingBag,
  Store,
  Video,
  type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { examples, type ImpersonationChannel } from '../_lib/examples';

const icons: Record<ImpersonationChannel, LucideIcon> = {
  instagram: AtSign,
  facebook: Newspaper,
  whatsapp: MessageCircle,
  'whatsapp-business': Store,
  website: Globe,
  twitter: MessagesSquare,
  linkedin: Briefcase,
  tiktok: Video,
  marketplace: ShoppingBag,
};

export function ImpersonationGallery() {
  return (
    <div className="space-y-4">
      {examples.map((example, i) => {
        const Icon = icons[example.channel];

        return (
          <details
            key={example.id}
            className="group bg-card overflow-hidden rounded-lg border"
            data-test={`example-${example.id}`}
            {...(i === 0 ? { open: true } : {})}
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 p-4 select-none">
              <span className="text-muted-foreground bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                {example.id}
              </span>
              <Icon className="text-muted-foreground h-5 w-5 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{example.channelLabel}</Badge>
                  <span className="text-muted-foreground text-xs">{example.brandType}</span>
                </div>
                <p className="mt-0.5 truncate text-sm font-semibold">{example.title}</p>
              </div>
              <span className="text-muted-foreground shrink-0 text-xs transition-transform group-open:rotate-180">
                ▼
              </span>
            </summary>

            <div className="space-y-4 border-t px-4 pt-4 pb-5">
              <div className="bg-muted overflow-hidden rounded-lg border">
                <div className="bg-background border-b px-3 py-2">
                  <p className="truncate text-xs font-semibold">{example.handle}</p>
                </div>
                <p className="text-foreground/90 p-3 text-sm leading-relaxed whitespace-pre-line">
                  {example.mockup}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-sm font-semibold">Por qué es falso</h4>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                    {example.signals.map((signal) => (
                      <li key={signal}>{signal}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-semibold">Cómo verificar</h4>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                    {example.howToVerify.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}
