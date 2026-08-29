import Link from 'next/link';
import {
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
  ScanSearch,
  Globe,
  Scale,
  ClipboardCheck,
  ShieldAlert,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { Tool } from '@/lib/tools';

export const toolIcons: Record<Tool['iconName'], LucideIcon> = {
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
  ScanSearch,
  Globe,
  Scale,
  ClipboardCheck,
  ShieldAlert,
  Users,
};

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = toolIcons[tool.iconName];
  const className =
    'group block rounded-xl border border-border bg-card/80 backdrop-blur-sm p-4 transition-all hover:border-primary/40 hover:bg-card';

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

  return tool.external ? (
    <a href={tool.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={tool.href} className={className}>
      {content}
    </Link>
  );
}
