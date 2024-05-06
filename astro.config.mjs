import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://ibra.pk",
  integrations: [tailwind()],
  redirects: {
    "/spotify": "https://open.spotify.com/user/ktp184356k22k7pgpr97kbxe8",
  },
});
