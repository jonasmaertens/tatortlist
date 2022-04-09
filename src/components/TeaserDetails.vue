<script setup lang="ts">
import { Teaser } from "@/components/TeaserList.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
  teaser: Object as () => Teaser,
});
let desc = ref("");
let url = ref("");
function fetchTeaserDetails() {
  fetch(
    "https://api.ardmediathek.de/page-gateway/pages/ard/item/" +
      props.teaser?.id
  )
    .then((response) => response.json())
    .then((data) => data.widgets[0])
    .then((data) => {
      console.log(data);
      desc.value = data.synopsis;
      let mediaArray =
        data.mediaCollection.embedded._mediaArray[0]._mediaStreamArray;
      url.value = mediaArray.reduce(
        (prev: { _quality: number }, curr: { _quality: number }) => {
          if (typeof prev._quality === "string") {
            prev._quality = -1;
          }
          if (typeof curr._quality === "string") {
            curr._quality = -1;
          }
          return prev._quality > curr._quality ? prev : curr;
        },
        { _quality: 0 }
      )._stream;
    });
}
onMounted(() => {
  fetchTeaserDetails();
});
</script>
<template>
  <div class="teaserDetails">
    <h2>{{ props.teaser?.title }}</h2>
    <p>{{ desc }}</p>
    <video controls autoplay>
      <source :src="url" type="video/mp4" />
    </video>
  </div>
</template>
