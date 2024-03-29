import { defineNuxtConfig } from "nuxt";

const lifecycle = process.env.npm_lifecycle_event;

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://at.alicdn.com/t/c/font_3605429_dg1rgdv7o7.css",
        },
        {
          rel: "stylesheet",
          href: "https://font.sec.miui.com/font/css?family=MiSans:400,500,700:Chinese_Simplify,Latin&display=swap",
        },
      ],
    },
    
  },
  css: ['normalize.css/normalize.css', '@/assets/global.scss'],
})
