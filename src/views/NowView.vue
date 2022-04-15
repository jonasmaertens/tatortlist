<script setup lang="ts">
import TeaserList, { Teaser } from "@/components/TeaserList.vue";
import { useTeasersStore } from "@/store/teasers";

const store = useTeasersStore();
function addTeaserHandler(teaser: Teaser, evt: string) {
  if (evt === "addWatched") {
    addToWatched(teaser);
  } else if (evt === "addWatchlist") {
    addToWatchlist(teaser);
  }
}
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
function addToWatchlist(teaser: Teaser) {
  const teaserToSend: Teaser = {
    id: teaser.id,
    title: teaser.title,
    duration: teaser.duration,
    image: teaser.image,
  };
  if (!store.teasersWatchlist.some((teaser) => teaserToSend.id === teaser.id)) {
    fetch(process.env.VUE_APP_BASE_URI + "/jsonserver/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teaserToSend),
    }).then((res) => {
      console.log(res);

      store.teasersWatchlist.push(teaserToSend);
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
    0.9 * Math.abs(posXStart - posXEnd) > Math.abs(posYStart - posYEnd) &&
    Math.abs(posYStart - posYEnd) < 50 &&
    Math.abs(posXStart - posXEnd) > 20
  ) {
    if (posXStart > posXEnd) {
      emit("swipe", "/watched");
    } else if (posXStart < posXEnd) {
      emit("swipe", "/watchlist");
    }
  }
}
const emit = defineEmits(["swipe", "openDetails"]);
</script>
<template>
  <div :class="store.nowPos" @touchstart="touchStart">
    <TeaserList
      :teasers="store.teasersFiltered"
      :icons="[
        { svg: 'seen.svg', event: 'addWatched' },
        { svg: 'addWatched.svg', event: 'addWatchlist' },
      ]"
      class="teaserListWrapper"
      @teaserClicked="(teaser, evt) => emit('openDetails', teaser, evt)"
      @iconClicked="addTeaserHandler"
    />
  </div>
</template>
