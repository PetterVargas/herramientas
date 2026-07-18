import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Herramientas · DivisionCero",
  description: "Herramientas de Ciberseguridad para el día a día, por DivisionCero.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      type: "image/png",
    },
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/mstile-150x150.png",
        sizes: "150x150",
        type: "image/png",
      },
    ],
  },
};

// next-themes inyecta su propio script anti-parpadeo, pero en producción
// (render dinámico vía OpenNext/Cloudflare) ese script llega envuelto en una
// llamada a una función de deduplicación (`e(...)`) que nunca se define,
// lo que lanza un ReferenceError y aborta el script antes de aplicar la
// clase `dark`. El resultado: la página siempre pinta primero en modo claro
// y solo pasa a oscuro cuando React hidrata (parpadeo visible).
//
// Este script replica esa misma lógica, pero como elemento `<script>` literal
// renderizado directamente por este Server Component (no por next-themes ni
// por next/script, ambos afectados por el mismo envoltorio roto). Al no pasar
// por esa instrumentación, se sirve como script síncrono normal: se ejecuta
// primero y deja la clase correcta puesta aunque el script de next-themes
// falle justo después (silenciosamente, sin efecto visual).
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var root = document.documentElement;
    var stored = localStorage.getItem('theme') || 'system';
    var theme = stored === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : stored;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          id="theme-init"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-center" />
          <Navbar />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
