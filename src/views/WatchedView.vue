<script lang="ts">
import { defineComponent } from "vue";
import WatchedHeader from "@/components/WatchedHeader.vue";

export default defineComponent({
  name: "WatchedView",
  components: {
    WatchedHeader,
  },
  mounted() {
    console.log("mounted");
  },
});
</script>
<template>
  <div class="watched">
    <WatchedHeader />
  </div>
</template>
