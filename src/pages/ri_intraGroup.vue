<template>
  <div style="background-color: #7a7a7a">
    <div class="mainApp">
      <div><RIHeader :menu="1" /></div>
      <footerMain />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import RIHeader from "../components/RI_header.vue";
import footerMain from "../components/footer2.vue";
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
</script>

<style lang="scss" scoped>
.mainApp {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  background-color: #fff;
}
</style>
