<template>
  <div>
    <div class="row bg-light">
      <div class="col-6"><h5>Program</h5></div>
      <div class="col-6"><h5>Results</h5></div>
    </div>
    <div class="row">
      <div class="col-6">
        <div v-for="(race, index) in races" :key="index">
          <div class="bg-info row">
            <h6 class="mt-1">{{ race.order }}. LAP - {{ race.length }}m</h6>
          </div>
          <div>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Position</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(horse, horseIndex) in race.selectedHorses"
                  :key="horseIndex"
                  :ref="`horse-${horseIndex}`"
                  class="horse"
                  :style="{ top: `${horseIndex * 60}px` }"
                >
                  <td>{{ horseIndex + 1 }}</td>
                  <td>{{ horse.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-6 table-responsive">
        <div v-for="(race, index) in races" :key="index">
          <div class="bg-info row">
            <h6 class="mt-1">{{ race.order }}. LAP - {{ race.length }}m</h6>
          </div>
          <div>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Name</th>
                  <th scope="col">Race</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(horse, horseIndex) in result.slice(
                    index * 10,
                    index * 10 + 10
                  )"
                  :key="horseIndex"
                  :ref="`horse-${horseIndex}`"
                  class="horse"
                  :style="{ top: `${horseIndex * 60}px` }"
                >
                  <td>{{ horseIndex + 1 }}</td>
                  <td>{{ horse.name }}</td>
                  <td>{{ horse.race }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Results extends Vue {
  get horses() {
    return this.$store.state.horses;
  }
  get result() {
    return this.$store.state.result;
  }
  get races() {
    return this.$store.state.races;
  }
}
</script>

<style scoped>
.col-6 {
  border: 1px solid gray;
}

.table-responsive {
  height: 700px;
  overflow-y: visible;
}

th,
td {
  padding: 2px;
  text-align: left;
}
</style>
