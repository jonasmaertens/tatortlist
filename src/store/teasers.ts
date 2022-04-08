import { defineStore } from "pinia";

export const useTeasersStore = defineStore("teasers", {
  state: () => ({ teasersWatched: [], teasersNow: [] }),
});
