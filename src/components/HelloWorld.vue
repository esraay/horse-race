<template>
  <div>
    <h2>Hello from the HelloWorld Component!</h2>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {}
</script>
