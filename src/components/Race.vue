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
        <!-- Green number box -->
        <div class="horse">
          <img
            tabindex="1"
            :src="`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25183210-1dfc-48ec-a0ec-73cf51de7798/d9wj681-da9662ca-2506-46d5-8fd4-0eaaaf080fcb.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI1MTgzMjEwLTFkZmMtNDhlYy1hMGVjLTczY2Y1MWRlNzc5OFwvZDl3ajY4MS1kYTk2NjJjYS0yNTA2LTQ2ZDUtOGZkNC0wZWFhYWYwODBmY2IuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qPizcspw6FurdDTpPP6hiA-IpRflGx6EKsR-grk6gFM`"
            alt="Running Horse"
            style="filter: saturate(4);"
            :style="{
              filter: `hue-rotate(${colorHueMapping[horse.color]}deg)`,
            }"
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

  private colorHueMapping: { [key: string]: number } = {
    red: 0,
    blue: 210,
    green: 120,
    orange: 30,
    purple: 270,
    pink: 330,
    brown: 15,
    gray: 0,
    cyan: 180,
    magenta: 300,
    yellow: 60,
    lime: 75,
    olive: 105,
    maroon: 360,
    navy: 240,
    teal: 180,
    indigo: 240,
    violet: 270,
    crimson: 0,
    turquoise: 180,
  };

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

              horseImage.src = "https://clipart-library.com/img/1495357.gif";
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
    const horseRefs = this.$refs as { [key: string]: HTMLElement[] };

    this.$store.commit("setActiveRace");
    this.isAnimating = true;
    this.tweens.forEach((tween, index) => {
      const horseElement =
        horseRefs[`horse-${index}`][0]?.querySelector(".horse");
      const horseImage = horseElement?.querySelector("img") as HTMLImageElement;
              horseImage.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/25183210-1dfc-48ec-a0ec-73cf51de7798/d9wj681-da9662ca-2506-46d5-8fd4-0eaaaf080fcb.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI1MTgzMjEwLTFkZmMtNDhlYy1hMGVjLTczY2Y1MWRlNzc5OFwvZDl3ajY4MS1kYTk2NjJjYS0yNTA2LTQ2ZDUtOGZkNC0wZWFhYWYwODBmY2IuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.qPizcspw6FurdDTpPP6hiA-IpRflGx6EKsR-grk6gFM";
      tween.play();
      tween.restart();
    });
  }

  stopAnimation() {
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
  z-index: 1; /* Ensure the number box is above the horse */
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
