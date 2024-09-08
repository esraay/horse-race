<template>
  <div class="row main-inner">
    <div>
      <div class="card">
        <div class="card-body">
          <HorseList />
        </div>
      </div>
    </div>

    <div>
      <div class="card">
        <div class="card-body">
          <Race />
        </div>
      </div>
    </div>

    <div>
      <div class="card">
        <div class="card-body">
          <Results />
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
}
</script>

<style scoped>
.main-inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 sütunlu bir grid */
  gap: 1rem; /* Kartlar arasında boşluk */
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%; /* Kartın tüm yüksekliğini kapsar */
}

.card-body {
  flex: 1; /* Kartın içeriği büyütülür */
}
</style>