<script setup lang="ts">
interface Tab {
  name: string;
  path: string;
}
const emit = defineEmits(["closeDetails"]);
defineProps({
  tabs: Object as () => Array<Tab>,
});
</script>

<template>
  <nav class="tabBar">
    <router-link
      class="tabBarLink"
      v-for="tab in tabs"
      :key="tab.name"
      :to="tab.path"
      @click="emit('closeDetails')"
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
  z-index: 10;
  box-shadow: 0px -6px 30px 0px #000000;
}

.tabBarLink {
  flex: 1;
  font-size: 0.8em;
  padding: 0.5em;
  color: rgb(187, 187, 187);
  background-color: rgb(0, 14, 41, 0.5);
}

.tabBarLink.router-link-active {
  color: white;
  background-color: rgba(0, 14, 41);
}
</style>
