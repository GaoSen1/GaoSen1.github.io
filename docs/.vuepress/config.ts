import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchPlugin } from "@vuepress/plugin-search";

// import MK from 'markdown-it'
// import UE from 'markdown-it-disable-url-encode'
// MK().use(UE)

export default defineUserConfig({
  base: "/",

  dest: "./dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "A blog demo for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "博客演示",
      description: "vuepress-theme-hope 的博客演示",
    },
  },

  theme,

  shouldPrefetch: false,

  plugins: [
    searchPlugin({
      // ...

      locales: {
        "/zh/": {
          placeholder: "搜索",
        },
      },
    }),

  ]
});
