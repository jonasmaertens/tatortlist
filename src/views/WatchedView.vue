<script setup lang="ts">
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
  if (
    0.9 * Math.abs(posXStart - posXEnd) > Math.abs(posYStart - posYEnd) &&
    Math.abs(posYStart - posYEnd) < 50 &&
    Math.abs(posXStart - posXEnd) > 20
  ) {
    if (posXStart < posXEnd) {
      emit("swipe", "/");
    }
  }
}
const emit = defineEmits(["swipe", "openDetails"]);
</script>
<template>
  <div class="right" @touchstart="touchStart">
    <TeaserList
      :teasers="store.teasersWatched"
      :icons="[{ svg: 'removeWatched.svg', event: 'removeIconClicked' }]"
      class="teaserListWrapper"
      @iconClicked="removeFromWatched"
    />
  </div>
</template>
