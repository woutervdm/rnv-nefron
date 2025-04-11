<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const tabs = computed(() => (navigation?.value ?? []).map(({ title, path }) => ({ text: title, to: path })))

const { header } = useAppConfig()

const Vue3Marquee = defineAsyncComponent(async () => (await import('vue3-marquee')).Vue3Marquee)
</script>

<template>
  <v-container class="py-0 c-header">
    <header>
      <v-responsive
        :aspect-ratio="960 / 176"
      >
        <div class="d-flex flex-column justify-center fill-height">
          <nuxt-link to="/"><h1>NefroN</h1></nuxt-link>
          <p>Regionale Nierpatiënten Vereniging</p>
        </div>
      </v-responsive>
    </header>
    <v-tabs
      :items="tabs"
      color="red"
      class="my-5"
    />
    <div
      v-if="header.marquee"
      class="marquee"
    >
      <client-only>
        <vue3-marquee>
          {{ header.marquee }}
        </vue3-marquee>
      </client-only>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
.c-header {
  header {
    background: url('~/assets/header.png') no-repeat center center;
    background-size: contain;
  }

  a {
    text-decoration: none;
  }

  h1 {
    color: red;
  }

  .marquee {
    color: red;
    min-height: 1.5em;
  }
}
</style>
