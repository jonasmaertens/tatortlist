<script setup lang="ts">
import { onActivated } from "vue";
import WatchedHeader from "@/components/WatchedHeader.vue";
import TeaserList, { Teaser } from "@/components/TeaserList.vue";
import { useTeasersStore } from "@/store/teasers";

const store = useTeasersStore();
function removeFromWatched(teaser: Teaser) {
  fetch("http://localhost:5000/jsonserver/watched/" + teaser.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
    store.teasersWatched.splice(store.teasersWatched.indexOf(teaser), 1);
  });
}
onActivated(() => {
  console.log("Switched to WatchedVieww");
});
</script>
<template>
  <div class="watched">
    <WatchedHeader class="header" />
    <TeaserList
      :teasers="store.teasersWatched"
      class="teaserListWrapper"
      @teaserClicked="removeFromWatched"
    />
  </div>
</template>
<style scoped>
.watched {
  display: flex;
  flex-direction: column;
}

.teaserListWrapper {
  flex: 1;
  overflow: hidden;
}
</style>
