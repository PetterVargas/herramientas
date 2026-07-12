import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // El worker de Cloudflare no ejecuta el optimizador de imágenes de Next;
  // el único next/image del proyecto ya renderiza un data URL (QR) sin
  // optimizar, así que esto solo lo hace explícito a nivel de proyecto.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

void initOpenNextCloudflareForDev();
