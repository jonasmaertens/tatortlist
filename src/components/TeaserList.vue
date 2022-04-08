<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

export interface Teaser {
  id: string;
  title: string;
  duration: number;
  image: string;
}

const emit = defineEmits(["teaserClicked"]);
defineProps({
  teasers: Object as () => Array<Teaser>,
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
    <ol class="teaserList">
      <li
        @click="emit('teaserClicked', teaser)"
        v-for="teaser in teasers"
        :key="teaser.id"
        class="teaserItem"
      >
        <img :src="teaser.image.split('{width}')[0] + '400'" />
        <div class="text">
          <h2>{{ teaser.title }}</h2>
          <h3>{{ convertDur(teaser.duration) }}</h3>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.teaserListWrapper,
.teaserList,
.teaserItem {
  width: 100%;
}

.teaserList {
  overflow-y: scroll;
  margin: 0;
  padding: 1.4em;
  height: 100%;
}

.teaserItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 1em;
  background-color: #bbebff;
}

.teaserItem img {
  width: 40%;
}

.text {
  margin-left: 8px;
  margin-top: 6px;
  padding-right: 8px;
  flex: 1;
  text-align: left;
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
</style>
