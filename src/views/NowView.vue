<script setup lang="ts">
import { onActivated } from "vue";
import TeaserList, { Teaser } from "@/components/TeaserList.vue";
import { useTeasersStore } from "@/store/teasers";

const store = useTeasersStore();
function addToWatched(teaser: Teaser) {
  const teaserToSend: Teaser = {
    id: teaser.id,
    title: teaser.title,
    duration: teaser.duration,
    image: teaser.image,
  };
  if (!store.teasersWatched.some((teaser) => teaserToSend.id === teaser.id)) {
    fetch(process.env.VUE_APP_BASE_URI + "/jsonserver/watched", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teaserToSend),
    }).then((res) => {
      console.log(res);

      store.teasersWatched.push(teaserToSend);
    });
  }
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
    0.9 * Math.abs(posXStart - posXEnd) < Math.abs(posYStart - posYEnd) ||
    Math.abs(posYStart - posYEnd) > 100 ||
    Math.abs(posXStart - posXEnd) < 20
  ) {
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
      :teasers="store.teasersFiltered"
      btnPath="addWatched.svg"
      class="teaserListWrapper"
      @teaserClicked="(teaser, evt) => emit('openDetails', teaser, evt)"
      @addIconClicked="addToWatched"
    />
  </div>
</template>
