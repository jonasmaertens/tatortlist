<script setup lang="ts">
import TabBar from "./components/TabBar.vue";
import { Teaser } from "./components/TeaserList.vue";
import { useTeasersStore } from "./store/teasers";
import { ref, onMounted, Ref } from "vue";
import WatchedHeader from "@/components/WatchedHeader.vue";
import TeaserDetails from "@/components/TeaserDetails.vue";

let detailsOpen = ref(false);
let teaserDetail: Ref<Teaser> = ref({
  id: "1",
  title: "title",
  image: "image",
  duration: 1,
});
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
  detailsOpen.value = true;
  teaserDetail.value = teaser;
}

function fetchTeasersWatched() {
  fetch(process.env.VUE_APP_BASE_URI + "/jsonserver/watched")
    .then((response) => response.json())
    .then((teasers) => {
      store.teasersWatched = teasers;
      console.log(JSON.parse(JSON.stringify(store.teasersWatched)));
    });
}
function fetchTeasersNow() {
  fetch(process.env.VUE_APP_BASE_URI + "/api/now")
    .then((response) => response.json())
    .then((teasers) => {
      store.teasersNow = teasers;
      console.log(JSON.parse(JSON.stringify(store.teasersNow)));
    });
}
</script>

<template>
  <div id="container">
    <WatchedHeader class="header" />
    <div class="contentWrapper">
      <router-view v-slot="{ Component }" class="content">
        <Transition name="fade">
          <keep-alive>
            <component
              :is="Component"
              @openDetails="openDetails"
              @leftSwipe="$router.push('/watched')"
              @rightSwipe="$router.push('/')"
            />
          </keep-alive>
        </Transition>
      </router-view>
    </div>
    <TabBar :tabs="tabs" />
    <TeaserDetails
      v-if="detailsOpen"
      :teaser="teaserDetail"
      class="teaserDetails"
    />
  </div>
</template>

<style>
@import "./assets/css/betterCSS.css";
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.4s;
}

.fade-enter-from.now,
.fade-leave-to.now {
  transform: translate(-100%, 0);
}

.fade-enter-to.now,
.fade-leave-from.now,
.fade-enter-to,
.fade-leave-from {
  transform: translate(0, 0);
}

.fade-enter-from.watched,
.fade-leave-to.watched {
  transform: translate(100%, 0);
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
  overflow: scroll;
}

.teaserDetails {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  background-color: #f1f1f1;
  box-shadow: 5px 5px 5px 0px rgb(0 0 0 / 50%);
}
</style>
