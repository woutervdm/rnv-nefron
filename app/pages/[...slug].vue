<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

const navigation = inject('navigation')

const subfolders = computed(() => (navigation.value ?? [])
  .toSorted(({ path: a }, { path: b }) => b.length - a.length)
  .find(({ path }) => route.path.startsWith(path))?.children ?? [])
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
          :model-value="route.path"
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
.content :deep {
  a {
    text-decoration: underline;
    color: red;
  }

  h1, h2, h3, h4, h5, h6 {
    color: red;
  }

  p:not(:last-child) {
    margin-bottom: 1em;
  }

  ul {
    margin-bottom: 1em;
  }

  li {
    list-style-position: inside;
  }
}
</style>
