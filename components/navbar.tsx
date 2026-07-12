'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  BookOpenText,
  Newspaper,
  FileText,
  Wrench,
  Users,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { principalWebsiteUtm } from '@/lib/tools';
import { ThemeToggle } from '@/components/theme-toggle';

const coCreemosUrl = `https://app.divisioncero.com/auth/sign-up?${principalWebsiteUtm}`;

const primaryLinks = [
  {
    icon: GraduationCap,
    text: 'CyberAcademy',
    url: `https://cyberacademy.divisioncero.com/?${principalWebsiteUtm}`,
  },
  {
    icon: BookOpen,
    text: 'Kudo',
    url: `https://kudo.divisioncero.com?${principalWebsiteUtm}`,
  },
  {
    icon: BookOpenText,
    text: 'Documentación',
    url: `https://divisioncero.com/docs?${principalWebsiteUtm}`,
  },
];

const resourceLinks = [
  {
    icon: Newspaper,
    text: 'Blog',
    description: 'Artículos y actualizaciones sobre ciberseguridad',
    url: `https://divisioncero.com/blog?${principalWebsiteUtm}`,
  },
  {
    icon: FileText,
    text: 'Open Sources',
    description: 'Proyectos y contribuciones abiertos',
    url: `https://divisioncero.com/open-source?${principalWebsiteUtm}`,
  },
  {
    icon: Wrench,
    text: 'Herramientas',
    description: 'Ayuda en Ciberseguridad',
    url: '/',
  },
  {
    icon: BookOpen,
    text: 'Releases',
    description: 'Actualizaciones sobre la plataforma',
    url: `https://divisioncero.com/releases?${principalWebsiteUtm}`,
  },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <svg width="24" height="24" viewBox="0 0 790 790" aria-label="Logo">
        <path
          transform="translate(746,1)"
          d="m0 0 13 2 9 4 6 4 8 9 5 11 1 10v591l-1 17-4 10-8 10-8 5-21 7-69 19-212 58-59 16-5 1h-14l-45-12-62-17-117-32-62-17-58-16-16-5-8-4-8-7-6-10-2-6-1-7-1-233v-97l1-233 1-46 4-11 6-8 7-6 10-5 3-1h12l28 7 44 12 73 20 149 41 47 13 11 2 50-14 47-13 225-62zm-39 92-35 9-65 18-166 46-35 10-14 2-31-8-229-63-47-13h-3l-1 177v336l8 3 47 13 132 37 107 30 17 5 8-1 128-35 135-37 37-10 8-3 1-515z"
          fill="currentColor"
        />
        <path
          transform="translate(149,219)"
          d="m0 0h490l14 7 9 9 6 12 2 15v15l-1 20-1 1h-470v221l12 3 119 33 50 14 17 4 13-4 68-19 119-33 69-19 4 1v57l-3 10-6 9-5 5-7 5-27 8-214 60-9 2h-9l-122-34-82-23-42-12-10-6-7-8-6-12-2-11v-291l2-10 7-14 7-7 10-6z"
          className="fill-[#4DAE84] dark:fill-white"
        />
      </svg>
      <span className="font-semibold">Herramientas</span>
    </Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 gap-4">
        <Logo />

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {primaryLinks.map((link) => (
            <a
              key={link.text}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <link.icon className="h-4 w-4" />
              {link.text}
            </a>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              onClick={() => setResourcesOpen((v) => !v)}
              aria-expanded={resourcesOpen}
            >
              Recursos
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {resourcesOpen && (
              <div className="absolute left-0 top-full pt-2 w-72">
                <div className="rounded-lg border border-border bg-popover p-2 shadow-md">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.text}
                      href={link.url}
                      target={link.url.startsWith('http') ? '_blank' : undefined}
                      rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-3 rounded-md p-2 hover:bg-accent transition-colors"
                    >
                      <link.icon className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>
                        <span className="block text-sm font-medium">{link.text}</span>
                        <span className="block text-xs text-muted-foreground">
                          {link.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://github.com/PetterVargas/herramientas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <svg role="img" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a
            href={coCreemosUrl}
            className="flex items-center gap-1.5 border border-primary text-primary hover:bg-primary/10 rounded-md px-3 py-1.5 text-sm font-bold transition-colors"
          >
            <Users className="h-4 w-4" />
            Co-Creemos
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:bg-accent"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 space-y-1 text-sm">
          {[...primaryLinks, ...resourceLinks].map((link) => (
            <Link
              key={link.text}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2 px-2 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <link.icon className="h-4 w-4" />
              {link.text}
            </Link>
          ))}
          <ThemeToggle
            showLabel
            className="flex w-full items-center gap-2 px-2 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          />
          <a
            href="https://github.com/PetterVargas/herramientas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href={coCreemosUrl}
            className="flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary/10 rounded-md px-3 py-2 font-bold transition-colors"
          >
            Co-Creemos
          </a>
        </div>
      )}
    </header>
  );
}
