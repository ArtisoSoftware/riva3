<template>
  <div style="background-color: #7a7a7a">
    <div class="mainApp">
      <div><RIHeader :menu="1" /></div>
      <div class="row">
        <div class="col">
          <input-section
            @reset-start-btn="resetStartBtn"
            @get-input="showDataAvailChart"
            @start-btn="startBtn"
            @change-integration-type="changeIntegrationType"
          />
        </div>

        <!-- dimension icon / data available circle -->

        <div style="background: #ededed; width: 480px">
          <!-- <dimensions-icon :type="input.type"></dimensions-icon> -->
          <!-- <circle-avail
            :score="dataAvailCircleChart.score"
            :isShowChart="dataAvailCircleChart.showChart"
          ></circle-avail> -->
        </div>
      </div>
      <footerMain />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import RIHeader from "../components/RI_header.vue";
import footerMain from "../components/footer2.vue";
import inputSection from "../components/ri_intragroup/input_section.vue";
import circleAvail from "../components/ri_intragroup/ri_economy_circle.vue";

const countryFullList = ref([]);
const input = ref({
  partner: [],
  year: {
    min: 2012,
    max: 2018,
  },
  type: "Sustainable",
  disaggregation: "dimension",
});
const showResultAfterStartBtn = ref(false);
const dataAvailCircleChart = ref({
  showChart: false,
  score: 0,
});
const fourBarName = ref("Your game");
const fourBarData = ref([]);

const resetStartBtn = () => {};

const showDataAvailChart = () => {};

const startBtn = () => {};

const changeIntegrationType = () => {};
</script>

<style lang="scss" scoped>
.mainApp {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  background-color: #fff;
}
</style>
