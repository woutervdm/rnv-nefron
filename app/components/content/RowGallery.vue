<script setup lang="ts">
const props = defineProps<{
  folder: string
}>()

interface Image {
  name: string
  path: string
}

const galleries =
  Object.entries(import.meta.glob('@/assets/galleries/**', {
    eager: true,
  })).reduce((perFolder: Record<string, Image[]>, [name, { default: path }]) => {
    const folder = name.split('/')[3] ?? ''
    return {
      ...perFolder,
      [folder]: [
        ...perFolder[folder] ?? [],
        {
          name,
          path,
        }
      ]
    }
  }, {})

const images = computed<Image[]>(() => galleries[props.folder] ?? [])
</script>

<template>
  <v-row>
    <v-col
      v-for="(image, index) of images"
      :key="index"
    >
      <pre>{{ image.path }}</pre>
      <nuxt-img :src="image.name" :alt="image.name" />
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
img {
  width: 100%;
}
</style>
