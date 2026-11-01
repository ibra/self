import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import { postDefaults } from "./src/lib/post-defaults.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://ibra.pk",
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [postDefaults],
    extendDefaultPlugins: true,
  },
});
