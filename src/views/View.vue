<template>
  <div>
    <div class="d-flex justify-content-between m-3">
      <div><h2>🐎 Horse Races</h2></div>
      <button class="btn btn-primary" @click="generateProgram()" :disabled="isRunning">
        Generate Program
      </button>
    </div>

    <div class="row">
      <div class="col-3">
        <div class="card">
          <div class="card-body">
            <HorseList />
          </div>
        </div>
      </div>

      <div class="col-5">
        <div class="card race">
          <div class="card-body">
            <Race />
          </div>
        </div>
      </div>

      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <Results />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Race from "@/components/Race.vue";
import HorseList from "@/components/HorseList.vue";
import Results from "@/components/Results.vue";
import { mapGetters, mapActions } from "vuex";

@Component({
  components: {
    Race,
    HorseList,
    Results,
  },
  computed: {
    ...mapGetters(["getCount"]),
  },
  methods: {
    ...mapActions(["generateProgram"]),
    generateProgram() {
      this.$store.dispatch("generateProgram");
    },
  },
})
export default class Home extends Vue {
  get races() {
    return this.$store.state.races;
  }
  get isRunning() {
    return this.$store.state.isRunning;
  }
}
</script>
<style scoped>
.main-inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-body {
  flex: 1;
}
</style>