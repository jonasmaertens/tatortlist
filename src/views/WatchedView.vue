<script setup lang="ts">
import { onActivated } from "vue";
import TeaserList, { Teaser } from "@/components/TeaserList.vue";
import { useTeasersStore } from "@/store/teasers";

const store = useTeasersStore();
function removeFromWatched(teaser: Teaser) {
  fetch(process.env.VUE_APP_BASE_URI + "/jsonserver/watched/" + teaser.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
    store.teasersWatched.splice(store.teasersWatched.indexOf(teaser), 1);
  });
}
function touchStart(touchEvent: TouchEvent) {
  if (touchEvent.changedTouches.length !== 1) {
    return;
  }
  const posXStart = touchEvent.changedTouches[0].clientX;
  const posYStart = touchEvent.changedTouches[0].clientY;
  addEventListener(
    "touchend",
    (touchEvent) => touchEnd(touchEvent, posXStart, posYStart),
    { once: true }
  );
}
function touchEnd(
  touchEvent: TouchEvent,
  posXStart: number,
  posYStart: number
) {
  if (touchEvent.changedTouches.length !== 1) {
    return;
  }
  const posXEnd = touchEvent.changedTouches[0].clientX;
  const posYEnd = touchEvent.changedTouches[0].clientY;
  if (1.5 * Math.abs(posXStart - posXEnd) < Math.abs(posYStart - posYEnd)) {
    return;
  }
  if (posXStart < posXEnd) {
    emit("rightSwipe");
  } else if (posXStart > posXEnd) {
    return;
  }
}
onActivated(() => {
  console.log("Switched to WatchedVieww");
});
const emit = defineEmits(["rightSwipe", "openDetails"]);
</script>
<template>
  <div class="watched" @touchstart="touchStart">
    <TeaserList
      :teasers="store.teasersWatched"
      btnPath="removeWatched.svg"
      class="teaserListWrapper"
      @addIconClicked="removeFromWatched"
    />
  </div>
</template>
