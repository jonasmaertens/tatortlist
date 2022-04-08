<script setup lang="ts">
import { onActivated } from "vue";
import WatchedHeader from "@/components/WatchedHeader.vue";
import TeaserList, { Teaser } from "@/components/TeaserList.vue";
import { useTeasersStore } from "@/store/teasers";

const store = useTeasersStore();
function addToWatched(teaser: Teaser) {
  fetch("http://localhost:5000/jsonserver/watched", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teaser),
  }).then((res) => {
    console.log(res);
    store.teasersWatched.push(teaser);
  });
}
onActivated(() => {
  console.log("Switched to NowView");
});
</script>
<template>
  <div class="now">
    <WatchedHeader class="header" />
    <TeaserList
      :teasers="store.teasersNowNew"
      class="teaserListWrapper"
      @teaserClicked="addToWatched"
    />
  </div>
</template>
<style scoped>
.now {
  display: flex;
  flex-direction: column;
}

.teaserListWrapper {
  flex: 1;
  overflow: hidden;
}
</style>
