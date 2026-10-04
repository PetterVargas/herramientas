import { ExternalLink } from 'lucide-react';

/**
 * Sección "Pregúntale a la IA" del footer: abre ChatGPT, Claude o Google (AI Mode)
 * con una pregunta inicial sobre DivisionCero específica de cada proyecto.
 */
const providers = [
  { name: 'ChatGPT', url: (q: string) => `https://chatgpt.com/?q=${q}` },
  { name: 'Claude', url: (q: string) => `https://claude.ai/new?q=${q}` },
  { name: 'Google', url: (q: string) => `https://www.google.com/search?udm=50&q=${q}` },
];

export function AskAI({ prompt }: { prompt: string }) {
  const q = encodeURIComponent(prompt);
  return (
    <div className="mt-10 border-t pt-6 flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
      <h3 className="font-bold text-sm">Pregúntale a la IA</h3>
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
        {providers.map(({ name, url }) => (
          <li key={name}>
            <a
              href={url(q)}
              title={`Pregúntale a ${name} sobre DivisionCero`}
              className="text-sm hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pregúntale a <b>{name}</b> sobre DivisionCero
              <ExternalLink className="ml-1 inline-block size-3.5 align-[-0.125em]" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
