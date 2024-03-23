<script setup lang="ts">
import TabBar from "./components/TabBar.vue";
import { Teaser } from "./components/TeaserList.vue";
import { useTeasersStore } from "./store/teasers";
import { ref, onMounted, Ref } from "vue";
import WatchedHeader from "@/components/WatchedHeader.vue";
import TeaserDetails from "@/components/TeaserDetails.vue";
import LoaderOverlay from "./components/LoaderOverlay.vue";

let nowLoaded = ref(false);
let watchedLoaded = ref(false);
let watchlistLoaded = ref(false);
let allLoaded = ref(false);
let detailsOpen = ref(false);
let lastClickPos = ref("center");
let teaserDetail: Ref<Teaser> = ref({
  id: "1",
  title: "title",
  image: "image",
  duration: 1,
});
const store = useTeasersStore();
const tabs = ref([
  {
    name: "Watchlist",
    path: "/watchlist",
  },
  {
    name: "Verfügbar",
    path: "/",
  },
  {
    name: "Gesehen",
    path: "/watched",
  },
]);
onMounted(() => {
  fetchTeasersWatched();
  fetchTeasersWatchlist();
  fetchTeasersNow();
  fetchTeasersAll();
});
function openDetails(teaser: Teaser, evt: PointerEvent) {
  lastClickPos.value = evt.clientY - 20 + "px";
  detailsOpen.value = true;
  teaserDetail.value = teaser;
}
function closeDetails() {
  detailsOpen.value = false;
}
function fetchTeasersWatched() {
  fetch(process.env.VUE_APP_BASE_URI + "/jsonserver/watched")
    .then((response) => response.json())
    .then((teasers) => {
      store.teasersWatched = teasers;
      watchedLoaded.value = true;
    });
}
function fetchTeasersWatchlist() {
  fetch(process.env.VUE_APP_BASE_URI + "/jsonserver/watchlist")
    .then((response) => response.json())
    .then((teasers) => {
      store.teasersWatchlist = teasers;
      watchlistLoaded.value = true;
    });
}
function fetchTeasersNow() {
  fetch(process.env.VUE_APP_BASE_URI + "/api/now")
    .then((response) => response.json())
    .then((teasers) => {
      store.teasersNow = teasers;
      nowLoaded.value = true;
    });
}
function fetchTeasersAll() {
  fetch(process.env.VUE_APP_BASE_URI + "/api/all")
    .then((response) => response.json())
    .then((teasers) => {
      store.teasersAll = teasers;
      allLoaded.value = true;
    });
}
</script>

<template>
  <div id="container">
    <WatchedHeader class="header" />
    <div class="contentWrapper">
      <router-view v-slot="{ Component }" class="content">
        <Transition name="slide">
          <keep-alive>
            <component
              :is="Component"
              @openDetails="openDetails"
              @swipe="(target:string) => $router.push(target)"
            />
          </keep-alive>
        </Transition>
      </router-view>
    </div>
    <TabBar :tabs="tabs" @closeDetails="closeDetails" />
    <Transition name="scale">
      <TeaserDetails
        v-if="detailsOpen"
        :teaser="teaserDetail"
        class="teaserDetails"
        @close="closeDetails"
        :style="{ 'transform-origin': 'center ' + lastClickPos }"
      />
    </Transition>
  </div>
  <LoaderOverlay v-if="!watchedLoaded || !nowLoaded || !allLoaded" />
</template>

<style>
@import "./assets/css/betterCSS.css";
@import "./assets/css/slide.css";
.scale-enter-active,
.scale-leave-active {
  transition: transform 0.1s;
  transform-origin: bottom;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(1, 0.2);
}

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
  width: 100%;
  background-color: #242b7b;
  overflow: hidden;
}

.contentWrapper {
  flex: 1;
  overflow: hidden;
  width: 100%;
  position: relative;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

.teaserDetails {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  background-color: #f1f1f1;
  box-shadow: 0px 0px 20px 4px rgb(0 0 0);
  text-align: left;
}
</style>
