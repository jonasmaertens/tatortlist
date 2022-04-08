<script setup lang="ts">
import { onActivated } from "vue";
import WatchedHeader from "@/components/WatchedHeader.vue";
import TeaserList from "@/components/TeaserList.vue";
import { useTeasersStore } from "@/store/teasers";

const store = useTeasersStore();
onActivated(() => {
  console.log("Switched to NowView");
});
</script>
<template>
  <div class="now">
    <WatchedHeader class="header" />
    <TeaserList :teasers="store.teasersNow" class="teaserListWrapper" />
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
