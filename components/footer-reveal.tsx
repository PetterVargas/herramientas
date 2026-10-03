/**
 * Efecto "cortina" del footer (inspirado en amplitude.com): el wordmark está
 * fijo al fondo del viewport y solo es visible dentro de este contenedor
 * recortado, así que al seguir haciendo scroll el contenido de arriba se
 * levanta y lo va descubriendo. Solo CSS, sin JavaScript.
 */
export function FooterReveal({ text = "DivisionCero" }: { text?: string }) {
  return (
    <div aria-hidden="true" className="footer-reveal">
      <div className="footer-reveal-inner">
        <span className="footer-reveal-text">{text}</span>
      </div>
    </div>
  );
}
