import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://at.alicdn.com/t/c/font_3605429_w4g74dtesvh.css' }
      ]
    }
  },
  css: ['normalize.css/normalize.css', '@/assets/global.css']
})
