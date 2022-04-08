<script lang="ts">
import { defineComponent } from "vue";
import WatchedHeader from "@/components/WatchedHeader.vue";
import TeaserList, { Teaser } from "@/components/TeaserList.vue";

export default defineComponent({
  name: "NowView",
  components: {
    WatchedHeader,
    TeaserList,
  },
  props: {
    teasersNow: Object as () => Array<Teaser>,
  },
  activated() {
    console.log("Switched to NowView");
  },
});
</script>
<template>
  <div class="now">
    <WatchedHeader class="header" />
    <TeaserList :teasers="teasersNow" class="teaserListWrapper" />
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
