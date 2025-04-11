<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  img?: string
  align?: 'center' | 'start'
}>(), {
  align: 'start',
})
</script>

<template>
  <v-col
    :class="`item text-${align}`"
  >
    <v-responsive
      v-if="img"
      :aspect-ratio="1"
      width="100%"
    >
      <nuxt-img
        :src="img"
        :title="title"
        width="116"
        height="116"
        fit="cover"
      />
    </v-responsive>
    <h3 v-if="title">{{ title }}</h3>
    <slot />
  </v-col>
</template>

<style scoped lang="scss">
.item {
  h3 {
    line-height: 1.25em;
    min-height: 2.5em;
    margin: 0.5em;
    hyphens: auto;
  }

  img {
    width: 100%;
    height: 100%;
    margin-bottom: 0.5em;
  }
}
</style>
