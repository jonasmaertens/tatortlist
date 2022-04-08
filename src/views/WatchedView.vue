<script lang="ts">
import { defineComponent } from "vue";
import WatchedHeader from "@/components/WatchedHeader.vue";
import TeaserList, { Teaser } from "@/components/TeaserList.vue";

export default defineComponent({
  name: "WatchedView",
  components: {
    WatchedHeader,
    TeaserList,
  },
  props: {
    teasersWatched: Object as () => Array<Teaser>,
  },
  activated() {
    console.log("Switched to WatchedVieww");
  },
});
</script>
<template>
  <div class="watched">
    <WatchedHeader class="header" />
    <TeaserList :teasers="teasersWatched" class="teaserListWrapper" />
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
