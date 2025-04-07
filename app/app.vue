<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('content')
    .order('stem', 'ASC')
})

provide('navigation', navigation)
</script>

<template>
  <v-app>
    <c-header />
    <nuxt-page />
    <c-footer />
  </v-app>
</template>
