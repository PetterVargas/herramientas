import { Globe, MessageCircle } from 'lucide-react';
import { principalWebsiteUtm } from '@/lib/tools';

export function Footer() {
  return (
    <footer className="border-t bg-card py-12 text-secondary-foreground">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Company Info Column - Left Side */}
          <div className="col-span-12 md:col-span-4">
            <p className="text-sm mb-6">
              <b>Ciberseguridad</b> creada por y para <b>LatAm</b>, aprendamos y aseguremos juntos. Creado por entusiastas de Ciberseguridad para CISO, CSO, CTO, CIO, SOC, CSIRT, SecOps, DevSecOps, DPO, CPO y mucho más...
            </p>
            <p className="text-xs">
              © Copyright 2026 DivisionCero
            </p>
            {/* System Status Badge */}
            <div className="mt-4">
              <a
                href="https://status.divisioncero.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium transition-colors hover:opacity-80"
                aria-label="Estado de los sistemas"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <span className="text-muted-foreground">
                  Estado de los sistemas
                </span>
              </a>
            </div>
            {/* Social Media Icons */}
            <div className="mt-4 flex flex-wrap gap-4">
              <a href="https://x.com/divisioncero" aria-label="X (formerly Twitter)" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://github.com/PetterVargas" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a href="https://linkedin.com/company/divisioncero" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://facebook.com/divisioncerocom" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com/divisioncero" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12c0 3.259.014 3.668.072 4.948.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://youtube.com/@divisioncero" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
              </a>
              <a href="https://tiktok.com/@divisioncero" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <div className="flex h-[18px] w-[18px] items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="18"
                    height="18"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </div>
              </a>
              <a href="https://discord.com/invite/RPxQTPBfvG" aria-label="Discord" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} className="text-secondary-foreground hover:text-primary transition-colors" />
              </a>
              <a href="https://petervargas.com" aria-label="Peter Vargas Website" target="_blank" rel="noopener noreferrer">
                <Globe size={18} className="text-secondary-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Spacer - Empty Column */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Navigation Columns - Right Side */}
          <div className="col-span-12 md:col-span-6 ml-auto grid grid-cols-3 gap-4">
            {/* Product Column */}
            <div className="flex flex-col gap-y-2.5">
              <h3 className="font-medium mb-4">Productos</h3>
              <ul className="space-y-2">
                <li><a href={`https://cyberacademy.divisioncero.com/?${principalWebsiteUtm}`} className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">CyberAcademy</a></li>
                <li><a href={`https://kudo.divisioncero.com/?${principalWebsiteUtm}`} className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">Framework Kudo</a></li>
                <li><a href={`https://divisioncero.com/home/empresas?${principalWebsiteUtm}`} className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">Ciberseguridad Empresarial</a></li>
                <li><a href="/" className="text-sm hover:underline">Herramientas</a></li>
              </ul>
            </div>

            {/* About Column */}
            <div className="flex flex-col gap-y-2.5">
              <h3 className="font-medium mb-4">Acerca de</h3>
              <ul className="space-y-2">
                <li><a href={`https://divisioncero.com/docs?${principalWebsiteUtm}`} className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">Documentación</a></li>
                <li><a href={`https://kudo.divisioncero.com/sgx/?${principalWebsiteUtm}`} className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">SGX</a></li>
                <li><a href={`https://cyberacademy.divisioncero.com/cyberusuario?${principalWebsiteUtm}`} className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">CyberUsuario</a></li>
                <li><a href={`https://cyberacademy.divisioncero.com/cyberguardian?${principalWebsiteUtm}`} className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">CyberGuardián</a></li>
                <li><a href={`https://divisioncero.com/blog/filosofia-divisioncero?${principalWebsiteUtm}`} className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">Filosofía</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="flex flex-col gap-y-2.5">
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="https://divisioncero.com/terminos-de-servicio" className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">Términos de Servicio</a></li>
                <li><a href="https://divisioncero.com/politica-de-privacidad" className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">Política de Privacidad</a></li>
                <li><a href="https://divisioncero.com/politica-de-cookies" className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">Política de Cookies</a></li>
                <li><a href="https://divisioncero.com/trust-center" className="text-sm hover:underline" target="_blank" rel="noopener noreferrer">Centro de Confianza</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
