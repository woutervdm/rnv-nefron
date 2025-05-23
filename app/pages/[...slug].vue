<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const subfolders = computed(() => (navigation?.value ?? [])
  .toSorted(({ path: a }, { path: b }) => b.length - a.length)
  .find(({ path }) => route.path.startsWith(path))?.children ?? [])

onMounted(() => {
  if (!page.value && subfolders.value.length > 0) {
    // goto first subpage
    navigateTo(subfolders.value?.[0]?.path)
  }
})

function open(value: ContentNavigationItem | null) {
  navigateTo(value?.path)
}
</script>

<template>
  <v-container class="fill-height align-start">
    <v-row>
      <v-col
        v-if="subfolders.length > 0"
        cols="3"
        class="d-none d-sm-block"
      >
        <v-list
          density="compact"
          color="red"
        >
          <v-list-item
            v-for="{ title, path } of subfolders"
            :key="path"
            :title="title"
            :to="path"
          />
        </v-list>
      </v-col>
      <v-col
        v-if="subfolders.length > 0"
        cols="12"
        class="d-sm-none"
      >
        <v-select
          :items="subfolders"
          :model-value="subfolders.find(({ path }) => route.path === path)"
          return-object
          @update:modelValue="open"
        />
      </v-col>
      <v-col class="content">
        <content-renderer
          v-if="page"
          :value="page"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
@use 'sass:map';
@use 'vuetify/settings';

.content {
  :deep(a) {
    text-decoration: underline;
    color: red;
  }

  :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
    color: red;
  }

  :deep(p:not(:last-child)) {
    margin-bottom: 1em;
  }

  :deep(ul) {
    margin-bottom: 1em;
  }

  :deep(li) {
    list-style-position: inside;
  }

  :deep(iframe) {
    max-width: 100%;

    @media #{map.get(settings.$display-breakpoints, 'xs')} {
      max-width: calc(100% + 32px);
      margin-left: -16px;
      margin-right: -16px;
    }
  }
}
</style>
