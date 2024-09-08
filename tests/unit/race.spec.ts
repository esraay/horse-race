import { expect } from 'chai'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import View from '@/views/View.vue'
import HorseComponent from '@/components/Race.vue';
import Vuex, { Store } from 'vuex';
import { Horse, Result, Races, State } from '@/store/index'; // State tiplerinizi içe aktarın

const localVue = createLocalVue();
localVue.use(Vuex);

describe('View.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Horse Races Generate Program'
    const wrapper = shallowMount(View, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})

describe('Race.vue', () => {
  let store: Store<State>;
  let state: State;

  beforeEach(() => {
    state = {
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
      activeRace: 0
    };

    store = new Vuex.Store({
      state,
    } as any);
  });

  it('renders correctly with Vuex state', () => {
    const wrapper = shallowMount(HorseComponent, {
      store,
      localVue,
    });

    expect(wrapper.findAll('.horse-row').length).to.equal(state.races[0].selectedHorses.length);
  });

  it('should display horse number correctly', () => {
    const wrapper = shallowMount(HorseComponent, {
      store,
      localVue,
    });
    const horseNumbers = wrapper.findAll('.horse-number');
    expect(horseNumbers.length).to.equal(state.races[0].selectedHorses.length);

    horseNumbers.wrappers.forEach((wrapper, index) => {
      expect(wrapper.text()).to.equal((index + 1).toString());
    });
  });

  it('should start animation on start button click', async () => {
    const wrapper = shallowMount(HorseComponent, {
      store,
      localVue,
    });
    await wrapper.find('button.btn-success').trigger('click');
    expect(wrapper.vm.isAnimating).to.equal(true);
  });

  it('should stop animation on stop button click', async () => {
    const wrapper = shallowMount(HorseComponent, {
      store,
      localVue,
    });
    await wrapper.find('button.btn-danger').trigger('click');
    expect(wrapper.vm.isAnimating).to.equal(false);
  });
});