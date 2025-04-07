<script setup lang="ts">
defineProps<{
  title: string
  img: string
}>()
</script>

<template>
  <v-col class="item text-center">
    <v-responsive :aspect-ratio="1" width="100%">
      <nuxt-img
        :src="img"
        :title="title"
        width="116"
        height="116"
        fit="cover"
      />
    </v-responsive>
    <h3>{{ title }}</h3>
    <slot />
  </v-col>
</template>

<style scoped lang="scss">
.item {
  h3 {
    line-height: 1.25em;
    min-height: 2.5em;
    margin-top: 0.5em;
  }

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
