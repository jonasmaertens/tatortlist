import { defineStore } from "pinia";

interface Teaser {
  id: string;
  title: string;
  duration: number;
  image: string;
}

interface TeaserDetail {
  team: string;
  city: string;
  date: string;
}

interface FilterArray {
  watched: boolean;
  team: string[];
  city: string[];
  after: string;
}

function parseDate(date: string): Date {
  const [day, month, year] = date.split(".");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 12);
}

const emptyTeaserDetailObj: { [id: string]: TeaserDetail[] } = {};
const emptyTeaserArray: Teaser[] = [];
const emptyFilterArray: FilterArray = {
  watched: true,
  team: [
    "Batic und Leitmayr mit Kalli Hammermann",
    "Murot",
    "Eisner und Fellner",
    "Grandjean und Ott",
    "Janneke und Brix",
    "Odenthal und Stern",
    "Lannert und Bootz",
    "Borowski und Sahin",
    "Faber, Pawlak und Herzog",
    "Falke und Grosz",
    "Bonard und Karow",
    "Ballauf und Schenk",
    "Thiel und Boerne",
    "Schürk, Hölzer, Baumann und Heinrich",
    "Gorniak, Winkler und Schnabel",
    "Rubin und Karow",
    "Lindholm und Schmitz",
    "Faber, Bönisch, Pawlak und Herzog",
    "Lindholm",
    "Schürk und Hölzer",
    "Dorn und Lessing",
    "Faber, Bönisch, Dalay und Pawlak",
    "Tschiller und Gümer",
    "Faber, Bönisch und Krusenstern",
    "Sieland, Gorniak und Schnabel",
    "Borowski",
    "Faber, Bönisch und Dalay",
    "Odenthal, Kopper und Stern",
    "Borowski und Brandt",
    "Faber, Bönisch, Dalay und Kossik",
    "Lindholm und Borowski",
    "Odenthal und Kopper",
    "Falke und Lorenz",
    "Ballauf und Schenk mit Saalfeld und Keppler",
    "Saalfeld und Keppler mit Ballauf und Schenk",
    "Eisner",
    "Borowski und Jung",
    "Ballauf und Schenk mit Ehrlicher und Kain",
    "Ehrlicher und Kain mit Ballauf und Schenk",
    "Odenthal",
    "Wiegand",
  ],
  city: [],
  after: "2007-01-01",
};

export const useTeasersStore = defineStore("teasers", {
  state: () => ({
    teasersWatched: emptyTeaserArray,
    teasersWatchlist: emptyTeaserArray,
    teasersNow: emptyTeaserArray,
    teasersAll: emptyTeaserDetailObj,
    filters: emptyFilterArray,
    nowPos: "left",
  }),
  getters: {
    teasersNowNew: (state) =>
      state.teasersNow.filter((teaser) => {
        return !state.teasersWatched.find(
          (teaserWatched) =>
            teaserWatched.title.toLowerCase().trim() ==
            teaser.title.toLowerCase().trim()
        );
      }),
    teasersFiltered: (state) =>
      state.teasersNow
        .map((teaser) => {
          return {
            ...teaser,
            watched: state.teasersWatched.some(
              (teaserWatched) =>
                teaserWatched.title.toLowerCase().trim() ==
                teaser.title.toLowerCase().trim()
            ),
            team: Object.keys(state.teasersAll)
              .map((key) => key.toLowerCase())
              .includes(teaser.title.toLowerCase())
              ? Object.fromEntries(
                  Object.entries(state.teasersAll).map(([k, v]) => [
                    k.toLowerCase(),
                    v,
                  ])
                )[teaser.title.toLowerCase()].map(
                  (teaserDetail) => teaserDetail.team
                )
              : ["Unknown Team"],
            city: state.teasersAll[teaser.title]
              ? state.teasersAll[teaser.title].map(
                  (teaserDetail) => teaserDetail.city
                )
              : ["Unknown City"],
            date: state.teasersAll[teaser.title]
              ? state.teasersAll[teaser.title].map((teaserDetail) =>
                  parseDate(teaserDetail.date)
                )
              : [new Date(4000, 0, 0)],
          };
        })
        .filter(
          (teaser) =>
            (state.filters.watched ? !teaser.watched : true) &&
            (state.filters.team.length
              ? teaser.team.some((team) => state.filters.team.includes(team))
              : true) &&
            (state.filters.city.length
              ? teaser.city.some((city) => state.filters.city.includes(city))
              : true) &&
            (state.filters.after
              ? teaser.date.some((date) => date > new Date(state.filters.after))
              : true)
        ),
    teams(state) {
      return Array.from(
        new Set(
          Object.values(state.teasersNow)
            .flat()
            .map((teaser) =>
              Object.keys(state.teasersAll)
                .map((key) => key.toLowerCase())
                .includes(teaser.title.toLowerCase())
                ? Object.fromEntries(
                    Object.entries(state.teasersAll).map(([k, v]) => [
                      k.toLowerCase(),
                      v,
                    ])
                  )[teaser.title.toLowerCase()].map(
                    (teaserDetail) => teaserDetail.team
                  )[0]
                : "Unknown Team"
            )
        )
      ).sort();
    },
    cities: (state) =>
      Array.from(
        new Set(
          Object.values(state.teasersAll)
            .flat()
            .map((teaser) => teaser.city)
        )
      ).sort(),
  },
});
