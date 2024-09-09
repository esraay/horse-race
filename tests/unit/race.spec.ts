import { expect } from 'chai';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import View from '@/views/View.vue';
import HorseComponent from '@/components/Race.vue';
import ResultsComponent from '@/components/Results.vue';
import HorseListComponent from '@/components/HorseList.vue';
import Vuex from 'vuex';
import storeConfig from '@/store/index';
import sinon from 'sinon';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('View.vue', () => {
  it('renders title and generate button correctly', () => {
    const msg = 'Horse Races Generate Program';
    const wrapper = shallowMount(View, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});

describe('Race.vue', () => {
  let store: any;

  beforeEach(() => {
    const actions = {
      generateProgram: sinon.spy(),
      updateResult: sinon.spy()
    };

    const mutations = {
      setActiveRace: sinon.spy()
    };
    store = new Vuex.Store({
      state: storeConfig.state,
      actions,
      mutations
    });

  });

  it('renders correctly with Vuex state', () => {
    const wrapper = shallowMount(HorseComponent, {
      store,
      localVue,
    });

    expect(wrapper.findAll('.horse-row').length).to.equal(store.state.races[0].selectedHorses.length);
  });

  it('should display horse number correctly', () => {
    const wrapper = shallowMount(HorseComponent, {
      store,
      localVue,
    });
    const horseNumbers = wrapper.findAll('.horse-number');
    expect(horseNumbers.length).to.equal(store.state.races[0].selectedHorses.length);

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

  it('should generate a program', async () => {
    await store.dispatch('generateProgram');
    expect(store.state.races.length).to.greaterThan(0);
  });
});

describe('Results.vue', () => {
  let store: any;

  beforeEach(() => {
    store = new Vuex.Store({
      state: storeConfig.state,
    });

  });
  it('should display races correctly', () => {
    const wrapper = shallowMount(ResultsComponent, {
      store,
      localVue,
    });

    expect(wrapper.findAll('.bg-info').length).to.equal(store.state.races.length * 2);
  });
  it('should display race info correctly', () => {
    const wrapper = shallowMount(ResultsComponent, {
      store,
      localVue,
    });
    const tableWrapper = wrapper.findAll('.bg-info');
    const race = store.state.races[0];
    expect(tableWrapper.wrappers[0].text()).to.equal(`${race.order}. LAP - ${race.length}m`);
  });
});

describe('HorseList.vue', () => {
  let store: any;

  beforeEach(() => {
    store = new Vuex.Store({
      state: storeConfig.state,
    });

  });
  it('should display horses correctly', () => {
    const wrapper = shallowMount(HorseListComponent, {
      store,
      localVue,
    });

    expect(wrapper.findAll('.horse').length).to.equal(store.state.horses.length);
  });
  it('should display horse info correctly', () => {
    const wrapper = shallowMount(HorseListComponent, {
      store,
      localVue,
    });
    const tableWrapper = wrapper.findAll('.horse');
    const horse = store.state.horses[0];
    expect(tableWrapper.wrappers[0].text()).to.equal(`${horse.name}${horse.condition}${horse.color}`);
  });
});