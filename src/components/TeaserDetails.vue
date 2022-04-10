<script setup lang="ts">
import { Teaser } from "@/components/TeaserList.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
  teaser: Object as () => Teaser,
});
const emit = defineEmits(["close"]);
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
    <div class="relativeContainer">
      <video controls :src="url" type="video/mp4"></video>
      <h2>{{ props.teaser?.title }}</h2>
      <p>{{ desc }}</p>
      <p class="closeButton" @click.stop="emit('close')">×</p>
    </div>
  </div>
</template>
<style scoped>
video {
  width: 100%;
}
h2 {
  margin: 10px;
  font-weight: bold;
}
p {
  margin-left: 10px;
}
.teaserDetails {
  background-color: #000e29;
  color: #fff;
}

.relativeContainer {
  position: relative;
}
.closeButton {
  position: absolute;
  font-size: 52px;
  width: 30px;
  right: 0;
  top: 0;
  height: 30px;
  line-height: 30px;
  margin: 0;
  padding: 10px;
  box-sizing: content-box;
  border-radius: 50%;
  background: radial-gradient(26px circle at center, #00000052, transparent);
}
.arrow {
  border: solid rgb(255, 255, 255);
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}
.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
</style>
