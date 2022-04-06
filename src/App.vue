<script lang="ts">
import { defineComponent } from "vue";
import TabBar from "./components/TabBar.vue";

export default defineComponent({
  components: {
    TabBar,
  },
  data() {
    return {
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
      teasers: {},
    };
  },
});
</script>

<template>
  <div id="container">
    <router-view class="content" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <TabBar :tabs="tabs"/>
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
}
</style>
