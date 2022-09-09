import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://at.alicdn.com/t/c/font_3605429_gv8plgsz04.css' },
        { rel: 'stylesheet', href: 'https://font.sec.miui.com/font/css?family=MiSans:400,500,700:Chinese_Simplify,Latin&display=swap' }
      ]
    }
  },
  css: ['normalize.css/normalize.css', '@/assets/global.scss', '@/assets/markdown.scss'],
})
