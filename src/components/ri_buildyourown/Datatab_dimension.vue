<template>
  <div class="bgGrey font-16 q-pt-md" align="center">
    <div style="width: 90%; margin: auto">
      <div class="row items-center">
        <div class="font-12" align="left">
          <div class="font-30"><b>Dimension</b></div>
          <div class="">Select a dimension to see detail</div>
        </div>
        <div style="width: 450px">
          <q-select
            class="inputSelectClass"
            dark
            dense
            v-model="selected"
            :style="{ background: colorSelected }"
            :options="dimensionOptions"
            @update:model-value="changeDimension()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { serverSetup } from "../../pages/server";

import axios from "axios";

const router = useRouter();
const { serverData } = serverSetup();

const props = defineProps({
  input: {
    type: Object,
    required: true,
  },
  partner: {
    type: Array,
    required: true,
  },
  reporting: {
    type: Array,
    required: true,
  },
  localID: {
    type: String,
    required: true,
  },
});

const dimensionName = ref([
  "Trade and investment",
  "Financial markets",
  "Value chains",
  "Infrastructure and connectivity",
  "Movement of people",
  "Regulatory cooperation",
  "Digital economy",
]);

const dimensionColor = ref([
  "#64C1E8",
  "#D85B63",
  "#D680AD",
  "#88643A",
  "#C0BA80",
  "#FDC47D",
  "#EA3B46",
]);
const dimensionOptions = ref([]);

const yourGroupName = ref("Your group");
const dimPick = ref([]);
const firstHalfPeriod = ref("");
const secondHalfPeriod = ref("");
const countAllPair = ref(0);
const report = ref([]);
const partner = ref([]);
const selected = ref(0);
const colorSelected = ref("");
const dimensionIndex = ref(0);
const allDimensionData = ref([]);

const indicatorStr = ref([]);

onMounted(() => {
  checkYourName();
});

const checkYourName = () => {
  if (props.reporting.length == 1) {
    yourGroupName.value = props.input.reporting[0].label;
  }
  loadData();
};

const loadData = async () => {
  dimensionOptions.value = [];
  report.value = props.reporting;
  partner.value = props.partner;
  dimPick.value = props.input.dimensionPicked;
  if (props.input.year.min == props.input.year.max - 1) {
    firstHalfPeriod.value = props.input.year.min;
    secondHalfPeriod.value = props.input.year.max;
  } else {
    let diffYear = Math.floor(
      (props.input.year.max - props.input.year.min) / 2
    );
    firstHalfPeriod.value =
      props.input.year.min + "-" + (props.input.year.min + diffYear);
    secondHalfPeriod.value =
      props.input.year.max - diffYear + "-" + props.input.year.max;
  }
  dimPick.value.forEach((x) => {
    dimensionOptions.value.push(dimensionName.value[x - 1]);
  });
  allDimensionData.value = [];
  let data = {
    type: props.input.type,
  };
  let url = serverData.value + "ri/dimension_data.php";
  let res = await axios.post(url, JSON.stringify(data));
  allDimensionData.value = res.data;
  countAllPair.value = 0;
  report.value.forEach((report) => {
    partner.value.forEach((partner) => {
      if (report != partner) {
        countAllPair.value++;
      }
    });
  });

  selected.value = dimensionOptions.value[0];
  changeDimension();
};

const changeDimension = async () => {
  dimensionIndex.value = dimensionName.value.indexOf(selected.value);
  colorSelected.value = dimensionColor.value[dimensionIndex.value];
  dimensionIndex.value++;
  loadAllChart();
};

const loadAllChart = () => {
  setIndexChart();
  console.log("work here");
};

const setIndexChart = async () => {
  indicatorStr.value =
    allDimensionData.value[dimensionIndex.value - 1].indicator;
  let dataTemp = {
    input: props.input,
    partner: partner.value,
    reporting: report.value,
    index: dimensionIndex.value,
    indicator: indicatorStr.value,
  };
  console.log(dataTemp);
  let url = serverData.value + "ri/build_index_datatab.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  let result = res.data;
  console.log(result);
};
</script>

<style lang="scss" scoped>
.bgGrey {
  background: #ededed;
  height: 950px;
}
.inputSelectClass {
  background: #2d9687;
  padding-left: 14px;
  width: 400px;
  color: white;
  height: 40px;
  font-size: 24px;
}
</style>
