<script setup lang="ts">
import TabBar from "./components/TabBar.vue";
import { Teaser } from "./components/TeaserList.vue";
import { useTeasersStore } from "./store/teasers";
import { ref, onMounted } from "vue";

const store = useTeasersStore();
const tabs = ref([
  {
    name: "Now",
    path: "/",
  },
  {
    name: "Watched",
    path: "/watched",
  },
]);
onMounted(() => {
  fetchTeasersWatched();
  fetchTeasersNow();
});
function openDetails(teaser: Teaser) {
  console.log(teaser);
}

function fetchTeasersWatched() {
  fetch("http://localhost:5000/jsonserver/watched")
    .then((response) => response.json())
    .then((teasers) => {
      store.teasersWatched = teasers;
      console.log(JSON.parse(JSON.stringify(store.teasersWatched)));
    });
}
function fetchTeasersNow() {
  fetch("http://localhost:5000/api/now")
    .then((response) => response.json())
    .then((teasers) => {
      store.teasersNow = teasers;
      console.log(JSON.parse(JSON.stringify(store.teasersNow)));
    });
}
</script>

<template>
  <div id="container">
    <router-view class="content" v-slot="{ Component }">
      <keep-alive>
        <component
          :is="Component"
          @openDetails="openDetails"
          :teasersNow="store.teasersNow"
          :teasersWatched="store.teasersWatched"
        />
      </keep-alive>
    </router-view>
    <TabBar :tabs="tabs" />
  </div>
</template>

<style>
@import "./assets/css/betterCSS.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  width: 100%;
}

#container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content {
  flex: 1;
  overflow: hidden;
}
</style>
