<script lang="ts">
import { defineComponent } from "vue";

interface Tab {
  name: string;
  path: string;
}

export default defineComponent({
  name: "TabBar",
  props: {
    tabs: Object as () => Array<Tab>,
  },
});
</script>

<template>
  <nav class="tabBar">
    <router-link
      class="tabBarLink"
      v-for="tab in tabs"
      :key="tab.name"
      :to="tab.path"
      >{{ tab.name }}</router-link
    >
  </nav>
</template>

<style scoped>
.tabBar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 2em;
}

.tabBarLink {
  flex: 1;
  padding: 0.3em;
  color: white;
  background-color: rgb(0, 14, 41, 0.5);
}

.tabBarLink.router-link-active {
  background-color: rgba(0, 14, 41);
}
</style>
