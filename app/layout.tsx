import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@/components/google-analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "Herramientas · DivisionCero";
const siteDescription =
  "Herramientas gratuitas de Ciberseguridad para el día a día: generador de contraseñas, hash, QR, UUID, validador SPF, codificadores Base64/URL y más, por DivisionCero.";
const siteUrl = "https://herramientas.divisioncero.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s · Herramientas · DivisionCero",
  },
  description: siteDescription,
  keywords: [
    "herramientas de ciberseguridad",
    "generador de contraseñas",
    "generador de hash",
    "generador de QR",
    "generador de UUID",
    "validador SPF",
    "codificador Base64",
    "codificador URL",
    "DivisionCero",
  ],
  authors: [{ name: "DivisionCero", url: "https://divisioncero.com" }],
  creator: "DivisionCero",
  publisher: "DivisionCero",
  applicationName: siteName,
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
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
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#4dae84",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#4dae84",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
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
        <GoogleAnalytics />
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
