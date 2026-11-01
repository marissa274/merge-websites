import vinext from "vinext";
import { defineConfig } from "vite";
import { configureToolEnvironment } from "./scripts/tool-environment.mjs";

export default defineConfig(async () => {
  configureToolEnvironment(process.cwd());
  const { cloudflare } = await import("@cloudflare/vite-plugin");
  return {
    server: {
      host: "127.0.0.1",
      port: 5173,
      ...(process.env.CODEX_SANDBOX === "seatbelt"
        ? { watch: { useFsEvents: false, usePolling: true } } : {}),
    },
    plugins: [vinext(), cloudflare({
      configPath: "./wrangler.jsonc",
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
      persistState: { path: ".wrangler/state" },
      remoteBindings: false,
      tunnel: false,
      inspectorPort: false,
    })],
  };
});
