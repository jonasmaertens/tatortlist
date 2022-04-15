<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

interface Tab {
  name: string;
  path: string;
  routename: string;
  svg: string;
}
const menu = ref<InstanceType<typeof HTMLElement> | null>(null);
const menuBorder = ref<InstanceType<typeof HTMLElement> | null>(null);
const emit = defineEmits(["closeDetails"]);
const route = useRoute();
defineProps({
  tabs: Object as () => Array<Tab>,
});
onMounted(() => {
  watch(route, () => {
    const el = document.querySelector(".menu__item." + String(route.name));
    console.log(el);
    if (el instanceof HTMLElement) {
      offsetMenuBorder(el);
    }
    console.log(route.name);
  });
  window.addEventListener("resize", () => {
    const el = document.querySelector(".menu__item." + String(route.name));
    console.log(el);
    if (el instanceof HTMLElement) {
      offsetMenuBorder(el);
    }
  });
});
function clickHandler() {
  emit("closeDetails");
}
function offsetMenuBorder(el: HTMLElement) {
  if (menuBorder.value && menu.value) {
    const offsetActiveItem = el.getBoundingClientRect();
    const left =
      Math.floor(
        offsetActiveItem.left -
          menu.value.offsetLeft -
          (menuBorder.value.offsetWidth - offsetActiveItem.width) / 2
      ) + "px";
    menuBorder.value.style.transform = `translate3d(${left}, 0 , 0)`;
  }
}
</script>

<template>
  <menu class="menu" ref="menu">
    <router-link
      :class="['menu__item', tab.routename]"
      active-class="active"
      style="--bgColorItem: #151947"
      v-for="tab in tabs"
      :key="tab.name"
      :to="tab.path"
      @click="(evt: Event) => clickHandler(evt)"
      v-html="tab.svg"
    >
    </router-link>
    <div class="menu__border" ref="menuBorder"></div>
  </menu>

  <div class="svg-container">
    <svg viewBox="0 0 202.9 45.5">
      <clipPath
        id="menu"
        clipPathUnits="objectBoundingBox"
        transform="scale(0.0049285362247413 0.021978021978022)"
      >
        <path
          d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
          c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
          c9.2,3.6,17.6,4.2,23.3,4H6.7z"
        />
      </clipPath>
    </svg>
  </div>
</template>

<style scoped>
.menu {
  filter: drop-shadow(0px -5px 25px black);
  margin: 0;
  display: flex;
  width: 100%;
  padding: 0 0.6em;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: #242b7b;
}

.menu__item {
  all: unset;
  flex-grow: 1;
  z-index: 100;
  display: flex;
  cursor: pointer;
  position: relative;
  border-radius: 50%;
  align-items: center;
  will-change: transform;
  justify-content: center;
  padding: 0.8em 0 0.8em;
  transition: transform var(--timeOut, 0.35s);
}

.menu__item::before {
  content: "";
  z-index: -1;
  width: 4em;
  height: 4em;
  border-radius: 50%;
  position: absolute;
  transform: scale(0);
  transition: background-color 0.35s, transform 0.35s;
}

.menu__item.active {
  transform: translate3d(0, -0.8em, 0);
}

.menu__item.active::before {
  transform: scale(1);
  background-color: var(--bgColorItem);
}

.menu__item >>> .icon {
  width: 2em;
  height: 2em;
}

.menu__item.active >>> .icon {
  animation: strok 1.2s reverse;
}

.menu__border {
  left: 0;
  bottom: 99%;
  width: 13em;
  height: 2.5em;
  position: absolute;
  clip-path: url(#menu);
  will-change: transform;
  background-color: #242b7b;
  transition: transform var(--timeOut, 0.35s);
}

.svg-container {
  width: 0;
  height: 0;
}
</style>
