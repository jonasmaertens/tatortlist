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
    routename: "watchlist",
    svg: `<svg class="icon" viewBox="0 0 55 55" fill="white">
<path d="M42.5,31c-6.617,0-12,5.383-12,12s5.383,12,12,12s12-5.383,12-12S49.117,31,42.5,31z M42.5,53c-5.514,0-10-4.486-10-10   s4.486-10,10-10s10,4.486,10,10S48.014,53,42.5,53z"/>
	<path d="M48.5,42h-5v-5c0-0.553-0.447-1-1-1s-1,0.447-1,1v6c0,0.553,0.447,1,1,1h6c0.553,0,1-0.447,1-1S49.053,42,48.5,42z"/>
	<path d="M27.5,14h18c0.553,0,1-0.447,1-1s-0.447-1-1-1h-18c-0.553,0-1,0.447-1,1S26.947,14,27.5,14z"/>
	<path d="M27.5,28h18c0.553,0,1-0.447,1-1s-0.447-1-1-1h-18c-0.553,0-1,0.447-1,1S26.947,28,27.5,28z"/>
	<path d="M21.079,7.241c-0.418-0.358-1.05-0.313-1.409,0.108l-6.248,7.288L9.6,11.771c-0.441-0.331-1.068-0.243-1.399,0.2   c-0.332,0.441-0.242,1.068,0.2,1.399l4.571,3.429c0.179,0.135,0.39,0.2,0.599,0.2c0.283,0,0.563-0.119,0.76-0.35l6.857-8   C21.548,8.231,21.499,7.601,21.079,7.241z"/>
	<path d="M21.079,21.241c-0.418-0.359-1.05-0.312-1.409,0.108l-6.248,7.288L9.6,25.771c-0.441-0.331-1.068-0.243-1.399,0.2   c-0.332,0.441-0.242,1.068,0.2,1.399l4.571,3.429c0.179,0.135,0.39,0.2,0.599,0.2c0.283,0,0.563-0.119,0.76-0.35l6.857-8   C21.548,22.231,21.499,21.601,21.079,21.241z"/>
	<path d="M19.67,36.35l-6.248,7.287L9.6,40.771c-0.441-0.33-1.068-0.243-1.399,0.2c-0.332,0.441-0.242,1.068,0.2,1.399l4.571,3.429   c0.179,0.135,0.39,0.2,0.599,0.2c0.283,0,0.563-0.119,0.76-0.35l6.857-7.999c0.36-0.419,0.312-1.05-0.108-1.409   C20.661,35.883,20.029,35.929,19.67,36.35z"/>
	<path d="M42.324,0H12.676C5.962,0,0.5,5.462,0.5,12.176v29.648C0.5,48.538,5.962,54,12.676,54H27.5c0.553,0,1-0.447,1-1   s-0.447-1-1-1H12.676C7.064,52,2.5,47.436,2.5,41.824V12.176C2.5,6.564,7.064,2,12.676,2h29.648C47.936,2,52.5,6.564,52.5,12.176   V27c0,0.553,0.447,1,1,1s1-0.447,1-1V12.176C54.5,5.462,49.038,0,42.324,0z"/>
</svg>`,
  },
  {
    name: "Verfügbar",
    path: "/",
    routename: "now",
    svg: `<svg class="icon" viewBox="0 0 24 24" fill="white">
        <path
          d="M15 17C16.1046 17 17 16.1046 17 15C17 13.8954 16.1046 13 15 13C13.8954 13 13 13.8954 13 15C13 16.1046 13.8954 17 15 17Z"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM5 18V7H19V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18Z"
        />
      </svg>`,
  },
  {
    name: "Gesehen",
    path: "/watched",
    routename: "watched",
    svg: `<svg class="icon" viewBox="0 0 48 48" stroke="white" fill="transparent">
            <path d="M14 24L15.25 25.25M44 14L24 34L22.75 32.75" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 24L14 34L34 14" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `,
  },
]);
onMounted(() => {
  fetchTeasersWatched();
  fetchTeasersWatchlist();
  fetchTeasersNow();
  fetchTeasersAll();
});
function openDetails(teaser: Teaser, evt: PointerEvent) {
  //console.log(teaser, evt.clientY - 20);
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
      //console.log(JSON.parse(JSON.stringify(store.teasersWatched)));
    });
}
function fetchTeasersWatchlist() {
  fetch(process.env.VUE_APP_BASE_URI + "/jsonserver/watchlist")
    .then((response) => response.json())
    .then((teasers) => {
      store.teasersWatchlist = teasers;
      watchlistLoaded.value = true;
      console.log(JSON.parse(JSON.stringify(store.teasersWatchlist)));
    });
}
function fetchTeasersNow() {
  fetch(process.env.VUE_APP_BASE_URI + "/api/now")
    .then((response) => response.json())
    .then((teasers) => {
      store.teasersNow = teasers;
      nowLoaded.value = true;
      //console.log(JSON.parse(JSON.stringify(store.teasersNow)));
    });
}
function fetchTeasersAll() {
  fetch(process.env.VUE_APP_BASE_URI + "/api/all")
    .then((response) => response.json())
    .then((teasers) => {
      store.teasersAll = teasers;
      allLoaded.value = true;
      //console.log(JSON.parse(JSON.stringify(store.teasersAll)));
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
