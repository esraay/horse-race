<template>
  <div>
    <div class="row">
      <button @click="startAnimation" class="col-6 btn btn-success">
        Start
      </button>
      <button @click="stopAnimation" class="col-6 btn btn-danger">Stop</button>
    </div>

    <div class="horse-container mt-1">
      <div
        v-for="(horse, index) in horses"
        :key="index"
        :ref="`horse-${index}`"
        class="horse-row"
      >
        <div class="horse-number">{{ index + 1 }}</div>
        <div class="horse">
          <img
            tabindex="1"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Muybridge_race_horse_~_big_transp.gif"
            alt="Running Horse"
          />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <h6 class="text-danger">
        {{ races[activeRace].order }}. LAP - {{ races[activeRace].length }}m
      </h6>
      <h6 class="text-danger">FINISH</h6>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { gsap } from "gsap";
import { mapActions, mapMutations } from "vuex";

@Component({
  methods: {
    ...mapMutations(["setActiveRace"]),
    ...mapActions(["updateResult", "generateProgram"]),
  },
})
export default class RunningHorse extends Vue {
  private tweens: gsap.core.Tween[] = [];
  public isAnimating = false;

  mounted() {
    this.$store.dispatch("generateProgram");
    this.setupAnimations();
  }

  get horses() {
    return this.$store.state.races[this.$store.state.activeRace].selectedHorses;
  }
  get races() {
    return this.$store.state.races;
  }
  get activeRace() {
    return this.$store.state.activeRace;
  }

  private setupAnimations() {
    this.$nextTick(() => {
      const horseRefs = this.$refs as { [key: string]: HTMLElement[] };

      this.horses.forEach((horse: any, index: number) => {
        const horseElement =
          horseRefs[`horse-${index}`][0]?.querySelector(".horse");
        const horseImage = horseElement?.querySelector(
          "img"
        ) as HTMLImageElement;

        if (horseElement) {
          const containerWidth =
            this.$el.querySelector(".horse-container")?.clientWidth || 0;
          const horseWidth = horseElement.clientWidth;

          const maxCondition = 100;
          const minDuration = 2;
          const maxDuration = 10;
          const duration =
            minDuration +
            (1 - horse.condition / maxCondition) * (maxDuration - minDuration);

          const tween = gsap.to(horseElement, {
            x: containerWidth - horseWidth,
            duration: duration,
            ease: "linear",
            paused: true,
            onComplete: () => {
              this.saveRaceResults(index);
              if (!this.isAnimating) {
                gsap.set(horseElement, { x: 0 });
              }
              horseImage.src = "https://i.hizliresim.com/mykq60p.jpeg";
            },
          });

          this.tweens.push(tween);
        }
      });
    });
  }

  private saveRaceResults(index: number | undefined) {
    this.$store.dispatch("updateResult", index);
  }

  startAnimation() {
    this.$store.commit("setIsRunning");
    const horseRefs = this.$refs as { [key: string]: HTMLElement[] };
    this.$store.dispatch("setActiveRace");
    this.isAnimating = true;
    this.tweens.forEach((tween, index) => {
      const horseElement =
        horseRefs[`horse-${index}`][0]?.querySelector(".horse");
      const horseImage = horseElement?.querySelector("img") as HTMLImageElement;
      horseImage.src =
        "https://upload.wikimedia.org/wikipedia/commons/7/7b/Muybridge_race_horse_~_big_transp.gif";
      tween.play();
      tween.restart();
    });
  }

  stopAnimation() {
    this.$store.commit("setIsRunning");
    this.isAnimating = false;
    this.tweens.forEach((tween) => tween.pause());
  }
}
</script>

<style scoped>
.horse-container {
  position: relative;
  height: 600px;
  overflow: hidden;
  border-right: 3px solid #D22B2B;
}

.horse-row {
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid black;
}

.horse-number {
  width: 50px;
  height: 50px;
  background-color: #5d8d59;
  color: white;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 5px;
  z-index: 1;
}

.horse {
  position: absolute;
  left: 0;
  width: 50px;
  height: 50px;
}

.horse img {
  width: 50px;
  height: 50px;
}
</style>
