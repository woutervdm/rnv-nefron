import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    'vuetify-nuxt-module',
    '@nuxt/image',
  ],
  devtools: { enabled: true },
  content: {
    renderer: {
      anchorLinks: false,
    },
  },
  compatibilityDate: '2026-03-13',
  vite: {
    optimizeDeps: {
      include: [
        'vue3-marquee',
      ],
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
