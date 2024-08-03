<template>
  <div>spider</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { LocalStorage } from "quasar";
import { serverSetup } from "../../pages/server";
import axios from "axios";
const { serverData } = serverSetup();
const props = defineProps({
  dataSend: Object,
});
const data = ref([]);
const input = ref({
  partner: [{ disable: false, label: "", value: "" }],
  reporting: [{ disable: false, label: "", value: "" }],
  year: {
    min: 2000,
    max: 2001,
  },
  type: "Sustainable",
  disaggregation: "dimension",
  resultBy: "Reporter",
});
const report = ref([]);

const noIndicatorAvail = ref("");
const selected = ref({});
const noteForNoData = ref("");
const tempDimChart = ref([]);
const yourGroupName = ref("the reporting group");
const firstHalfLastPeriod = ref(0);
const secondHalfStartPeriod = ref(0);
const firstHalfPeriod = ref("");
const secondHalfPeriod = ref("");
const countryOptions = ref([]);
const selectDimension = ref(0);
const indicatorData = ref([]);
const dimShow = ref([]);

const dimensionChart = ref({
  catName: [],
  series: [
    {
      name: "",
      data: [],
      color: "#2381B8",
      type: "line",
      dashStyle: "Dash",
    },
    {
      name: "",
      data: [],
      color: "#13405A",
    },
  ],
});

const barChart = ref({
  catName: [],
  series: [
    {
      name: "",
      color: "#2381B8",
      data: [],
    },
    {
      name: "",
      color: "#13405A",
      data: [],
    },
  ],
});

watch(
  () => props.dataSend,
  async (newValue) => {
    if (newValue) {
      data.value = props.dataSend.data;
      input.value = props.dataSend.input;
      report.value = props.dataSend.report;
      await loadData();
      console.log("work1");
    }
  }
);

const loadData = async () => {
  countryOptions.value = data.value;
  selected.value = countryOptions.value[0];

  // check reporting group
  if (input.value.reporting.length == 1) {
    yourGroupName.value = input.value.reporting[0].label;
  }
  //set name series
  if (input.value.year.min == input.value.year.max - 1) {
    firstHalfPeriod.value = input.value.year.min;
    secondHalfPeriod.value = input.value.year.max;
    firstHalfLastPeriod.value = input.value.year.min;
    secondHalfStartPeriod.value = input.value.year.max;
  } else {
    let diffYear = Math.floor(
      (input.value.year.max - input.value.year.min) / 2
    );
    firstHalfPeriod.value =
      input.value.year.min + "-" + (input.value.year.min + diffYear);
    secondHalfPeriod.value =
      input.value.year.max - diffYear + "-" + input.value.year.max;
    firstHalfLastPeriod.value = input.value.year.min + diffYear;
    secondHalfStartPeriod.value = input.value.year.max - diffYear;
  }
  // set indicator
  indicatorData.value = [];
  let dataInput = {
    type: input.value.type,
  };
  let url = serverData.value + "ri/dimension_icon.php";
  let res = await axios.post(url, JSON.stringify(dataInput));
  indicatorData.value = res.data;
  let count = 1;
  indicatorData.value.forEach((x) => (x.index = count++));

  let datax = {
    input: input.value,
    countryPartnerList: data.value,
    countryReportList: report.value,
    reportMap: report.value.map((x) => x.iso),
    partnerMap: data.value.map((x) => x.iso),
  };

  let urlx = serverData.value + "ri/econ_intra_eco_integration_by_country.php";
  let resx = await axios.post(urlx, JSON.stringify(datax));

  let tempData = resx.data;
  tempData.sort((a, b) => b.lastValue - a.lastValue);
  let selectedTemp = countryOptions.value.filter(
    (x) => x.label == tempData[0].name
  );

  selected.value = selectedTemp[0];

  setDimensionChart();
};

const setDimensionChart = () => {
  console.log("work2");
};
</script>

<style lang="scss" scoped>
.bgGrey {
  width: 100%;
  background: #ededed;
  height: 1480px;
}
.listDimension {
  cursor: pointer;
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  width: 97%;
  border: solid #2d9687;
  border-width: 2px 2px 0px 2px;
}
.isPick {
  height: 100%;
  width: 97%;
  background: #2d9687;
  color: #ffffff;
}
.showBar {
  background: #dae7e5;
  width: 99.5%;
  height: 650px;
  border: 2px solid #2d9687;
  overflow-y: auto;
}
.legendBox {
  width: 24px;
  height: 16px;
  background: #eb1e63;
}
.inputSelectClass {
  background: #2d9687;
  padding-left: 10px;
  color: white;
  width: 500px;
  height: 40px;
  font-size: 24px;
}
#dimensionChart {
  height: 600px;
  width: 60%;
}
#spiderWeb {
  height: 600px;
}
#barChart {
  height: 360px;
  width: 95%;
}
</style>
