<script setup lang="ts">
import { useTeasersStore } from "@/store/teasers";

export interface Teaser {
  id: string;
  title: string;
  duration: number;
  image: string;
}
const store = useTeasersStore();
const emit = defineEmits(["teaserClicked", "addIconClicked"]);
defineProps({
  teasers: Object as () => Array<Teaser>,
  btnPath: String,
});
function convertDur(secs: number): string {
  return (
    Math.floor(secs / 3600).toString() +
    ":" +
    Math.floor((secs % 3600) / 60).toString()
  );
}
</script>
<template>
  <div class="teaserListWrapper">
    <TransitionGroup class="teaserList" tag="ol" name="list">
      <li
        @click="(evt) => emit('teaserClicked', teaser, evt)"
        v-for="teaser in teasers"
        :key="teaser.id"
        class="teaserItem"
      >
        <img :src="teaser.image.split('{width}')[0] + '400'" />
        <div class="text">
          <h2>{{ teaser.title }}</h2>
          <h3>{{ convertDur(teaser.duration) }}</h3>
          <img
            :src="require(`../assets/svg/${btnPath}`)"
            class="svgIcon"
            @click.stop="emit('addIconClicked', teaser)"
          />
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.teaserListWrapper,
.teaserList,
.teaserItem {
  width: 100%;
}

.teaserList {
  margin: 0;
  padding: 0 1em;
}
.teaserItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  margin-bottom: 1em;
  background-color: #f1f1f1;
  box-shadow: 5px 5px 5px 0px rgb(0 0 0 / 50%);
}

.teaserItem img {
  width: 50%;
}

.text {
  margin-left: 8px;
  margin-top: 6px;
  padding-right: 8px;
  flex: 1;
  text-align: left;
  position: relative;
}

.text h2 {
  font-size: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.text h3 {
  font-size: 0.8em;
}

.text > .svgIcon {
  padding: 5px;
  width: 2.2em;
  height: 2.2em;
  cursor: pointer;
  box-sizing: content-box;
  position: absolute;
  left: -10px;
  bottom: 5px;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(80px);
}

.list-leave-active {
  position: absolute;
}

@media screen and (max-width: 435px) {
  .text {
    font-size: 0.9em;
  }
}

@media screen and (max-width: 395px) {
  .text {
    font-size: 0.8em;
  }
}

@media screen and (max-width: 355px) {
  .text {
    font-size: 0.7em;
  }
}
</style>
