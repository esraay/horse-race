<template>
  <div class="p-2">
    <div class="row bg-light"><h6 class="mt-1">Horse List (1-20)</h6></div>
    <div class="table-container">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Condition</th>
            <th scope="col">Color</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(horse, index) in horses"
            :key="index"
            :ref="`horse-${index}`"
            class="horse"
            :style="{ top: `${index * 60}px` }"
          >
            <td>{{horse.name}}</td>
            <td>{{horse.condition}}</td>
            <td>{{horse.color}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class HorseList extends Vue {
  get horses() {
    return this.$store.state.horses;
  }
}
</script>

<style scoped>
.table-container {
  max-width: 100%;
  max-height: 600px;
  overflow-x: auto;
}
.table {
  max-height: 60% !important;
  overflow-y: scroll;
}
</style>
