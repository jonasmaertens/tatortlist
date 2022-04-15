import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NowView from "../views/NowView.vue";
import WatchedView from "@/views/WatchedView.vue";
import WatchlistView from "@/views/WatchlistView.vue";
import { useTeasersStore } from "@/store/teasers";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "now",
    component: NowView,
  },
  {
    path: "/watched",
    name: "watched",
    component: WatchedView,
  },
  {
    path: "/watchlist",
    name: "watchlist",
    component: WatchlistView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const store = useTeasersStore();
  console.log(`${String(from.name)} -> ${String(to.name)}`);
  if (to.name === "now") {
    if (from.name === "watched") {
      store.nowPos = "left";
    } else if (from.name === "watchlist") {
      store.nowPos = "right";
    }
  } else if (to.name === "watched") {
    if (from.name === "now") {
      store.nowPos = "left";
    }
  } else if (to.name === "watchlist") {
    if (from.name === "now") {
      store.nowPos = "right";
    }
  }
});

export default router;
