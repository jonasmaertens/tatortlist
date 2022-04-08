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
  getters: {
    teasersNowNew: (state) =>
      state.teasersNow.filter((teaser) => {
        return !state.teasersWatched.find(
          (teaserWatched) => teaserWatched.title == teaser.title
        );
      }),
  },
});
