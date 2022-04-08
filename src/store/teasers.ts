import { defineStore } from "pinia";

interface Teaser {
  id: string;
  title: string;
  duration: number;
  image: string;
}

const emptyTeaserList: Teaser[] = [];

export const useTeasersStore = defineStore("teasers", {
  state: () => ({
    teasersWatched: emptyTeaserList,
    teasersNow: emptyTeaserList,
  }),
});
