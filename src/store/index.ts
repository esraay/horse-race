import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export interface Horse {
  name: string;
  condition: number;
  color: string;
}
export interface Result {
  race: number,
  name: string,
  order: number
}
export interface Races {
  order: number,
  length: number,
  selectedHorses: Result[]
}
export interface State {
  horses: Horse[];
  result: Result[];
  races: Races[];
  activeRace: number;
  isRunning: boolean;
  isProgramCompleted: boolean;
}
const store = new Vuex.Store<State>({
  state: {
    horses: [
      { name: "Lightning", condition: 72, color: "red" },
      { name: "Thunder", condition: 53, color: "blue" },
      { name: "Storm", condition: 89, color: "green" },
      { name: "Blaze", condition: 41, color: "orange" },
      { name: "Shadow", condition: 64, color: "purple" },
      { name: "Spirit", condition: 25, color: "pink" },
      { name: "Comet", condition: 97, color: "brown" },
      { name: "Tornado", condition: 12, color: "gray" },
      { name: "Flash", condition: 85, color: "cyan" },
      { name: "Bolt", condition: 31, color: "magenta" },
      { name: "Fury", condition: 56, color: "yellow" },
      { name: "Vortex", condition: 18, color: "lime" },
      { name: "Cyclone", condition: 93, color: "olive" },
      { name: "Whirlwind", condition: 44, color: "maroon" },
      { name: "Phantom", condition: 67, color: "navy" },
      { name: "Blizzard", condition: 29, color: "teal" },
      { name: "Avalanche", condition: 90, color: "indigo" },
      { name: "Tsunami", condition: 22, color: "violet" },
      { name: "Inferno", condition: 78, color: "crimson" },
      { name: "Ember", condition: 35, color: "turquoise" }
    ],
    result: [],
    races: [{
      order: 1,
      length: 1200,
      selectedHorses: []
    }, {
      order: 2,
      length: 1400,
      selectedHorses: []
    },
    {
      order: 3,
      length: 1600,
      selectedHorses: []
    },
    {
      order: 4,
      length: 1800,
      selectedHorses: []
    },
    {
      order: 5,
      length: 2000,
      selectedHorses: []
    },
    {
      order: 6,
      length: 2200,
      selectedHorses: []
    }],
    activeRace: 0,
    isRunning: false,
    isProgramCompleted: false
  },
  mutations: {
    update(state, horse) {
      const resultList: string[] = [];
      state.result.map((r) => {
        if (r.name !== '') {
          resultList.push(r.name)
        }
      })
      state.result[resultList.length].name = horse.name;
    },
    setIsRunning(state) { state.isRunning = !state.isRunning },
    setSelectedHorses(state, raceData) {
      state.races[raceData.race.order - 1].selectedHorses = raceData.horses;
    },
    setEmptyResults(state, index) {
      Array.from({ length: 10 }, () => {
        state.result.push({ race: index + 1, name: '', order: 0 });
      })
    }
  },
  actions: {
    setActiveRace({state, commit}) {
      if (state.races.length === state.activeRace + 1) {
        state.activeRace = 0;
      } else {
        state.activeRace = state.activeRace + 1;
      }
    },
    updateResult({ state, commit }, index) {
      const result = {
        race: state.activeRace,
        name: state.races[state.activeRace].selectedHorses[index].name,
        order: state.result.length
      };
      commit('update', result);
    },
    generateProgram({ state, commit }) {
      const shuffledHorses = [...state.horses].sort(() => Math.random() - 0.5);
      state.races.map((race, index) => {
        const selectedHorses = shuffledHorses.slice(index + 4, 10 + index + 4);
        commit('setSelectedHorses', { horses: selectedHorses, race })
        commit('setEmptyResults', index)
      })
    }
  },
  getters: {
  }
});

export default store;