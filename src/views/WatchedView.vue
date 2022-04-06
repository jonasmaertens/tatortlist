<script lang="ts">
import { defineComponent } from "vue";
import WatchedHeader from "@/components/WatchedHeader.vue";
import TeaserList from "@/components/TeaserList.vue";

export default defineComponent({
  name: "WatchedView",
  components: {
    WatchedHeader,
  },
  data() {
    return {
      teasers: {}
    }
  }
  mounted() {
    this.fetchTeasers();
  },
  methods: {
    fetchTeasers() {
      fetch("/teasers.json")
        .then((response) => response.json())
        .then((teasers) => {
          this.teasers = teasers;
          console.log(this.teasers);
        });
    },
  },
});
</script>
<template>
  <div class="watched">
    <WatchedHeader class="header" />
    <TeaserList :teasers="teasers" class="teaserList" />
  </div>
</template>
<style scoped>
  .watched{
    display: flex;
    flex-direction: column;
  }

  .teaserList{
    flex: 1;
  }
</style>