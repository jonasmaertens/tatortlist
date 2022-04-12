<script setup lang="ts">
import { onActivated } from "vue";
import TeaserList, { Teaser } from "@/components/TeaserList.vue";
import { useTeasersStore } from "@/store/teasers";

const store = useTeasersStore();
function addToWatched(teaser: Teaser) {
  fetch(process.env.VUE_APP_BASE_URI + "/jsonserver/watched", {
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
    return;
  } else if (posXStart > posXEnd) {
    emit("leftSwipe");
  }
}
onActivated(() => {
  console.log("Switched to NowView");
});
const emit = defineEmits(["leftSwipe", "openDetails"]);
</script>
<template>
  <div class="now" @touchstart="touchStart">
    <TeaserList
      :teasers="store.teasersNowNew"
      btnPath="addWatched.svg"
      class="teaserListWrapper"
      @teaserClicked="(teaser, evt) => emit('openDetails', teaser, evt)"
      @addIconClicked="addToWatched"
    />
  </div>
</template>
