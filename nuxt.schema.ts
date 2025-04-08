import { field, group } from '@nuxt/content/preview'

export default defineNuxtSchema({
  appConfig: {
    header: group({
      title: 'Header',
      description: 'Header settings',
      icon: 'i-mdi-page-layout-header',
      fields: {
        marquee: field({
          type: 'string',
          title: 'Marquee',
          default: '',
        }),
      }
    })
  }
})
