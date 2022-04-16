<script setup lang="ts">
import { useTeasersStore } from "@/store/teasers";
import { ref } from "vue";

const store = useTeasersStore();
const filtersOpen = ref(false);
function resetFilters() {
  store.filters = {
    watched: true,
    team: [],
    city: [],
    after: "",
  };
}
</script>
<template>
  <div class="header">
    <img src="../assets/svg/tatortText.svg" class="logo" />
    <Transition name="expand">
      <div class="filters" v-show="filtersOpen">
        <div class="control">
          <input
            type="checkbox"
            v-model="store.filters.watched"
            id="watched"
            class="control__input"
          />
          <label for="watched" class="control__label">Nur ungesehene</label>
        </div>
        <label for="teams">Teams</label>
        <select
          multiple
          size="6"
          v-model="store.filters.team"
          id="teams"
          class="select"
        >
          <option v-for="team in store.teams" :value="team" :key="team">
            {{ team }}
          </option>
        </select>
        <label for="city">Städte</label>
        <select
          multiple
          size="1"
          v-model="store.filters.city"
          id="city"
          class="select"
        >
          <option v-for="city in store.cities" :value="city" :key="city">
            {{ city }}
          </option>
        </select>
        <label for="datepicker">Neuer als</label>
        <input
          type="date"
          class="input"
          v-model="store.filters.after"
          id="datepicker"
        />
        <button class="button" @click="resetFilters">Zurücksetzen</button>
      </div>
    </Transition>
    <div class="filterIconWrapper" @click="filtersOpen = !filtersOpen">
      <img src="../assets/svg/filter.svg" class="filterIcon" />
    </div>
  </div>
</template>
<style scoped>
.header {
  text-align: center;
  padding: 12px;
  color: white;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: repeat(2, max-content);
}

.logo {
  height: 35px;
  margin: 10px auto;
  grid-area: 1 / 2 / 2 / 3;
}

select {
  width: 100%;
}

.filters {
  grid-area: 2 / 1 / 3 / 4;
  text-align: left;
  overflow: hidden;
}

.filterIconWrapper {
  grid-area: 1 / 3 / 2 / 4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.filterIcon {
  height: 40px;
}

.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.3s;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0em;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 16em;
}
</style>
