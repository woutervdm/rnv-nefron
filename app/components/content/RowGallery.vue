<script setup lang="ts">
const img = useImage()
const { xs } = useDisplay()

const props = defineProps<{
  gallery: string
}>()

const { data, error } = await useFetch('/api/gallery', {
  query: {
    gallery: props.gallery,
  },
  default: () => [],
})

const images = computed(() => data.value?.map(url => ({
  thumbnail: img(url, {
    width: 400,
    height: 400,
    fit: 'cover',
  }),
  url,
})))

const zoomedImage = ref<number>(0)
const dialog = ref(false)

function open(index: number) {
  zoomedImage.value = index < 0
    ? (images.value.length + index)
    : index % images.value.length
  dialog.value = true
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="xs"
  >
    <v-card class="position-relative">
      <v-img
        v-if="images[zoomedImage]"
        :src="images[zoomedImage]?.url"
      />
      <v-btn
        icon="mdi-close"
        location="right top"
        position="absolute"
        class="d-sm-none mt-5 mr-5"
        @click="dialog = false"
      />
      <v-btn
        position="absolute"
        icon="mdi-arrow-left"
        location="left center"
        class="ml-3"
        @click="open(zoomedImage - 1)"
      />
      <v-btn
        position="absolute"
        icon="mdi-arrow-right"
        location="right center"
        class="mr-3"
        @click="open(zoomedImage + 1)"
      />
    </v-card>
  </v-dialog>
  <v-row>
    <v-alert
      v-if="error"
      color="warning"
    >
      {{ error.message }}
    </v-alert>
    <v-col
      v-for="(image, index) of images"
      :key="index"
      cols="6"
      sm="3"
    >
      <v-card
        @click="open(index)"
      >
        <v-img
          :aspect-ratio="1"
          :src="image.thumbnail"
          :alt="image.thumbnail"
          fit="cover"
        />
      </v-card>
    </v-col>
  </v-row>
</template>
