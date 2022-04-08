import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NowView from "../views/NowView.vue";
import WatchedView from "@/views/WatchedView.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
