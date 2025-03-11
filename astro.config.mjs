import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://astroship.web3templates.com",
  output: 'server',
  integrations: [tailwind(), mdx(), sitemap(), icon(), react()],

  vite: {
    ssr: {
      noExternal: ["astro", "@astrojs/"],
    },
  },

  adapter: vercel()
});