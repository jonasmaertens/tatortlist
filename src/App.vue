<script lang="ts">
import { defineComponent } from "vue";
import TabBar from "./components/TabBar.vue";
import { Teaser } from "./components/TeaserList.vue";
import { useTeasersStore } from "./store/teasers";

export default defineComponent({
  components: {
    TabBar,
  },
  data() {
    return {
      test: useTeasersStore(),
      teasersWatched: [],
      teasersNow: [],
      tabs: [
        {
          name: "Now",
          path: "/",
        },
        {
          name: "Watched",
          path: "/watched",
        },
      ],
    };
  },
  mounted() {
    this.fetchTeasersWatched();
    this.fetchTeasersNow();
  },
  methods: {
    openDetails(teaser: Teaser) {
      console.log(teaser);
    },
    fetchTeasersWatched() {
      fetch("http://localhost:5000/jsonserver/watched")
        .then((response) => response.json())
        .then((teasers) => {
          this.teasersWatched = teasers;
          console.log(JSON.parse(JSON.stringify(this.teasersWatched)));
        });
    },
    fetchTeasersNow() {
      fetch("http://localhost:5000/api/now")
        .then((response) => response.json())
        .then((teasers) => {
          this.teasersNow = teasers;
          console.log(JSON.parse(JSON.stringify(this.teasersNow)));
        });
    },
  },
});
</script>

<template>
  <div id="container">
    <router-view class="content" v-slot="{ Component }">
      <keep-alive>
        <component
          :is="Component"
          @openDetails="openDetails"
          :teasersNow="teasersNow"
          :teasersWatched="teasersWatched"
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
