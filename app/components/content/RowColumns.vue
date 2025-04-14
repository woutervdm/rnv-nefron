<script setup lang="ts">
const props = defineProps<{
  cols?: number | string
  sm?: number | string
}>()
provide('cols', typeof props.cols === 'string' ? parseInt(props.cols) : props.cols)
provide('sm', typeof props.sm === 'string' ? parseInt(props.sm) : props.sm)
</script>

<template>
  <v-row align="start">
    <slot />
  </v-row>
</template>
