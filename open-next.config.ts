import { defineCloudflareConfig } from '@opennextjs/cloudflare';

const config = defineCloudflareConfig();

export default {
  ...config,
  // defineCloudflareConfig() no reenvía `buildCommand`, así que se agrega
  // aquí a mano: sin esto, @opennextjs/cloudflare cae a `pnpm build` para
  // compilar Next.js, pero ese script YA es `opennextjs-cloudflare build`,
  // provocando un bucle infinito de auto-invocación.
  buildCommand: "pnpm run next-build",
};
