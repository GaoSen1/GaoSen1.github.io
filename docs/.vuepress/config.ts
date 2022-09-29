import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  lang: "zh-CN",

  base: "/",

  dest: "docs/.vuepress/dist",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "GaoSen",
      description: "海压竹枝低复举，风吹山角晦还明。",
    },
    "/en/": {
      lang: "en-US",
      title: "GaoSen",
      description: "The sea lowers the branches, with the branches are still straight; The wind blows over the corner, and then becomes bright.",
    },
    
  },

  theme,

  shouldPrefetch: false,

  plugins: [
    searchPlugin({
      // ...

      locales: {
        "/": {
          placeholder: "搜索",
        },
      },
    }),

  ]
});
