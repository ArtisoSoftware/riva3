<template>
  <div class="mainBg q-pa-md">
    <div class="text-h6">Data availability</div>
    <div class="q-pb-md">
      Based on your selection, this group’s integration score will be based on
    </div>
    <div class="q-px-md" align="center">
      <div class="notShowCircular" v-if="score == 0">
        <div style="height: 40%"></div>
        <div class="" align="center" style="width: 80%">
          Select your desired group of economies to<br />
          check data availability.
        </div>
      </div>
      <div class="showCircular" v-else>
        <q-circular-progress
          show-value
          font-size="36px"
          :value="score"
          size="200px"
          :thickness="0.36"
          color="orange"
          track-color="grey-5"
        >
          {{ score }}%
        </q-circular-progress>
      </div>
    </div>
    <div class="q-pa-md text-center">
      of all possible reporter-partner pairs.
    </div>
    <div
      v-if="score != 0"
      class="cursor-pointer text-center"
      @click="goToDataAvail"
    >
      <u> Click here to see this group's availabilitiy matrix</u>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  score: {
    type: Number,
    required: false,
  },
  localID: {
    type: String,
    required: false,
  },
});
const goToDataAvail = () => {
  router.push("/ridataavail/id=" + props.localID);
};
</script>

<style lang="scss" scoped>
.showCircular {
  margin: auto;
  height: 240px;
  line-height: 240px;
}
.notShowCircular {
  margin: auto;

  height: 240px;
  border: 1px dashed #cbcbcb;
}
.mainBg {
  color: #757575;
  background-color: #ededed;
}
</style>
