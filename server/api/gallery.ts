import { readdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'

export default defineEventHandler(async (event): Promise<string[]> => {
  const gallery = getQuery(event).gallery?.toString() ?? ''
  if (gallery.includes('..') || gallery.includes('/')) {
    throw createError({
      status: 400,
    })
  }

  const path = resolve(process.cwd(), 'public/images/galleries', gallery.toString())
  return (await readdir(path))
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
    .map(file => `/images/galleries/${gallery}/${file}`)
})
