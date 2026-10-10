import { SubscribeDialog } from '@/components/subscribe-dialog';

// Mismos colores y animación que el banner "rainbow" de fumadocs que usan
// divisioncero.com, kudo y cyberacademy, para que se vea igual en los 4 sitios.
const rainbowColors = [
  '#39b298',
  '#39b298',
  'transparent',
  '#39b298',
  'transparent',
  '#39b298',
  'transparent',
];

const rainbowGradient = `repeating-linear-gradient(70deg, ${[...rainbowColors, rainbowColors[0]]
  .map((color, i) => `${color} ${(i * 50) / rainbowColors.length}%`)
  .join(', ')})`;

/**
 * Banner superior (encima del navbar). No es sticky: al hacer scroll se va y
 * el navbar queda fijo arriba como antes.
 */
export function AnnouncementBanner() {
  return (
    <div className="relative isolate flex h-12 items-center justify-center overflow-hidden bg-background px-4 text-center text-sm font-medium">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 animate-moving-banner"
        style={{
          maskImage:
            'linear-gradient(to bottom,white,transparent), radial-gradient(circle at top center, white, transparent)',
          maskComposite: 'intersect',
          backgroundImage: rainbowGradient,
          backgroundSize: '200% 100%',
          filter: 'saturate(2)',
        }}
      />
      <SubscribeDialog>🚀 Suscríbete a DivisionCero 👀</SubscribeDialog>
    </div>
  );
}
