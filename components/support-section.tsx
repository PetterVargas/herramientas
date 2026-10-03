import Image from 'next/image';

const QR_ALT = 'Código QR para suscribirse al canal de YouTube de DivisionCero';

/**
 * El tema se aplica con la clase `dark` en <html> (next-themes), así que se
 * alterna la imagen solo con CSS: ambas se sirven desde el HTML inicial y no
 * hay parpadeo ni desajuste de hidratación al cargar.
 * "dark"/"light" en el nombre del archivo indica el color de los módulos del QR.
 */
export function SupportSection() {
  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-20 sm:pb-28">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-6">Apóyanos</h2>
        <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-4">
          <Image
            src="/apoyanos/qr-suscription-youtube-dark.png"
            alt={QR_ALT}
            width={885}
            height={887}
            className="size-48 sm:size-56 dark:hidden"
          />
          <Image
            src="/apoyanos/qr-suscription-youtube-light.png"
            alt={QR_ALT}
            width={896}
            height={887}
            className="hidden size-48 sm:size-56 dark:block"
          />
        </div>
      </div>
    </section>
  );
}
