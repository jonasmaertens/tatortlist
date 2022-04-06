<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TeaserList",
  props: {
    teasers: Array,
  },
  methods: {
    convertDur(secs: number): string {
      return (
        Math.floor(secs / 3600).toString() +
        ":" +
        Math.floor((secs % 3600) / 60).toString()
      );
    },
  },
});
</script>

<template>
  <div class="teaserListWrapper">
    <ol class="teaserList">
      <li v-for="teaser in teasers" :key="teaser.id" class="teaserItem">
        <img width="100px" :src="teaser.image.split('{width}')[0] + '400'" />
        <div class="text">
          <h2>{{ teaser.title }}</h2>
          <h3>{{ convertDur(teaser.duration) }}</h3>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.teaserListWrapper, .teaserList, .teaserItem{
    width: 100%;
}

.teaserItem{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.text{
    margin-left: 10px;
    flex: 1;
    text-align: left;
}
</style>
