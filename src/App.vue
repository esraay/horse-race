<template>
  <div id="app" class="main">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<style>
#app {
  text-align: center;
}
</style>
