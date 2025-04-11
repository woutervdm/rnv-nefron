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
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-04-11',
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
