<template>
  <div class="bgGrey font-16 q-pt-md" align="center">
    <div class="" style="width: 90%; margin: auto">
      <div class="q-py-xl row items-center">
        <div class="font-12" align="left">
          <div class="font-30"><b>Dimension</b></div>
          <div class="">Select a specific dimension</div>
        </div>
        <div class="" style="width: 550px">
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
import { serverSetup } from "../../pages/server.js";
const { serverData } = serverSetup();
import axios from "axios";

const props = defineProps({
  dataGet: {
    type: Object,
    require: true,
  },
});

const input = ref({
  type: "",
  year: {
    min: 0,
    max: 0,
  },
});
const countryFullList = ref([]);
const yourGroupName = ref("");
const firstHalfPeriod = ref(0);
const secondHalfPeriod = ref(0);
const allDimensionData = ref([]);
const dimensionOptions = ref([]);
const selected = ref("");
const colorSelected = ref("");
const dimensionIndex = ref(0);

const indicatorStr = ref([]);
const indexChart = ref({
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
const weightDataTemp = ref([]);
const dataChart = ref({
  catName: [],
  catNameLower: [],
  series: [
    {
      name: "data available",
      color: "#2381B8",
      data: [],
    },
  ],
});
const showAvail = ref(true);
const weightChart = ref({
  equalWeight: 1,
  catName: [],
  catNameLower: [],
  series: [
    {
      name: "weight",
      color: "#2381B8",
      data: [],
    },
  ],
});
const economyChart = ref({
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

onMounted(() => {
  input.value = props.dataGet.input;
  countryFullList.value = props.dataGet.countryFullList;
  checkYourName();
});

const checkYourName = () => {
  if (input.value.partner.length == 1) {
    yourGroupName.value = input.value.partner[0].label;
  }
  loadData();
};
const loadData = async () => {
  if (input.value.year.min == input.value.year.max - 1) {
    firstHalfPeriod.value = input.value.year.min;
    secondHalfPeriod.value = input.value.year.max;
  } else {
    let diffYear = Math.floor(
      (input.value.year.max - input.value.year.min) / 2
    );
    firstHalfPeriod.value =
      input.value.year.min + "-" + (input.value.year.min + diffYear);
    secondHalfPeriod.value =
      input.value.year.max - diffYear + "-" + input.value.year.max;
  }
  allDimensionData.value = [];
  let data = {
    type: input.value.type,
  };
  let url = serverData.value + "ri/dimension_icon.php";
  let res = await axios.post(url, JSON.stringify(data));
  allDimensionData.value = res.data;
  allDimensionData.value.forEach((x) => {
    dimensionOptions.value.push(x.name);
  });
  selected.value = dimensionOptions.value[0];
  changeDimension();
};

const changeDimension = () => {
  for (let i = 0; i < allDimensionData.value.length; i++) {
    if (selected.value == allDimensionData.value[i].name) {
      colorSelected.value = allDimensionData.value[i].color;
      dimensionIndex.value = i + 1;
    }
  }
  loadAllChart();
};

const loadAllChart = async () => {
  await setIndexChart();
  await setDataChart();
  await setWeightChart();
  await setEconomyChart();
  changeTab();
};

const setIndexChart = async () => {
  indicatorStr.value =
    allDimensionData.value[dimensionIndex.value - 1].indicator;
  let dataTemp = {
    input: input.value,
    data: countryFullList.value,
    countryMap: countryFullList.value.map((x) => x.iso),
    index: dimensionIndex.value,
    indicator: indicatorStr.value,
  };
  let url = serverData.value + "ri/intra_index_dimensiontab.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  let result = res.data;
  result.sort((a, b) => b.dif - a.dif);
  indexChart.value.series[0].data = [];
  indexChart.value.series[1].data = [];
  indexChart.value.series[0].name = firstHalfPeriod.value;
  indexChart.value.series[1].name = secondHalfPeriod.value;
  for (let k = 0; k < result.length; k++) {
    indexChart.value.series[0].data[k] = result[k].data[0];
    indexChart.value.series[1].data[k] = result[k].data[1];
    indexChart.value.catName[k] = result[k].catName;
  }
};

const setDataChart = async () => {
  let dataTemp = {
    input: input.value,
    data: countryFullList.value,
    countryMap: countryFullList.value.map((x) => x.iso),
    dimension: dimensionIndex.value,
  };

  let url = serverData.value + "ri/intra_data_dimensiontab.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  let result = res.data;
  let tableTemp = [];
  let totalIndex = indicatorStr.value.length;
  weightDataTemp.value = [];

  for (let i = 1; i <= totalIndex; i++) {
    let indexCount =
      (result.filter((x) => Number(x.indicator) == i).length /
        (countryFullList.value.length * (countryFullList.value.length - 1))) *
      100;
    // console.log(indexCount);
    let tPush = {
      data: indexCount,
      catName: indicatorStr.value[i - 1],
    };
    tableTemp.push(tPush);

    let weightCount =
      result.filter((x) => Number(x.indicator) == i).length / result.length;
    let wPush = {
      data: weightCount,
      catName: indicatorStr.value[i - 1],
    };
    weightDataTemp.value.push(wPush);
  }

  tableTemp.sort((a, b) => b.data - a.data);
  // console.log(result);
  dataChart.value.catName = tableTemp.map((x) => x.catName);
  dataChart.value.catNameLower = tableTemp.map((x) => {
    return x.catName.charAt(0).toLowerCase() + x.catName.substring(1);
  });
  dataChart.value.series[0].data = tableTemp.map((x) => x.data);
  let checkAvailable = dataChart.value.series[0].data.filter((x) => x > 0);
  if (checkAvailable.length == 0) {
    showAvail.value = false;
  } else {
    showAvail.value = true;
  }
};

const setWeightChart = () => {
  weightDataTemp.value.sort((a, b) => b.data - a.data);
  weightChart.value.series[0].data = [];
  weightChart.value.catName = weightDataTemp.value.map((x) => x.catName);
  weightChart.value.catNameLower = weightDataTemp.value.map((x) => {
    return x.catName.charAt(0).toLowerCase() + x.catName.substring(1);
  });
  weightChart.value.series[0].data = weightDataTemp.value.map((x) => x.data);
  weightChart.value.equalWeight = (
    1 / weightChart.value.series[0].data.length
  ).toFixed(2);
};

const setEconomyChart = async () => {
  let dataTemp = {
    input: input.value,
    data: countryFullList.value,
    countryMap: countryFullList.value.map((x) => x.iso),
    dimension: selected.value,
    index: dimensionIndex.value,
  };

  let url = serverData.value + "ri/intra_economychart_datatab_dimension.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  let result = res.data;
  result.sort((a, b) => b.dif - a.dif);

  economyChart.value.series[0].data = [];
  economyChart.value.series[1].data = [];
  economyChart.value.series[0].name = firstHalfPeriod.value;
  economyChart.value.series[1].name = secondHalfPeriod.value;
  for (let k = 0; k < result.length; k++) {
    economyChart.value.series[0].data[k] = Number(
      Number(result[k].data[0]).toFixed(2)
    );
    economyChart.value.series[1].data[k] = Number(
      Number(result[k].data[1]).toFixed(2)
    );
    economyChart.value.catName[k] = result[k].country;
  }
};

const changeTab = () => {
  console.log("Working here");
};
</script>

<style lang="scss" scoped>
.bgGrey {
  background: #ededed;
  height: 1060px;
}
.textGrey {
  color: #757575;
}
.inputSelectClass {
  background: #2d9687;
  padding-left: 14px;
  width: 400px;
  color: white;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
}
.cardStyle {
  background: #ededed;
  border: 1px solid #757575;
  height: 750px;
}
//////////
.cardIndicator {
  max-width: 1200px;
  max-height: 800px;
  width: 1200px;
  height: 750px;
  background: #f7f7f7;
  z-index: 999999;
}
.chartincard {
  width: 100%;
  height: 580px;
  background: #c4c4c4;
  overflow-y: auto;
}
.bgDrop {
  background-color: rgba($color: #000000, $alpha: 0.6);
}
.economyOverflow {
  width: 100%;
  height: 540px;
  overflow-y: auto;
}
.economyOverflow2 {
  width: 100%;
  height: 520px;
  overflow-y: auto;
}
////
#chartIndicator {
  min-height: 580px;
  width: 100%;
}
#chartEconomy {
  min-height: 540px;
  width: 100%;
}
#chartIndex {
  height: 460px;
  width: 100%;
}
#chartData,
#chartWeight {
  height: 510px;
  width: 100%;
}
.noDataAvail {
  font-size: 32px;
  padding-top: 250px;
}

.btnOutGreen {
  cursor: pointer;
  width: 340px;
  height: 60px;
  line-height: 25px;
  border: 3px solid #2d9687;
  border-radius: 5px;
}
.btnOutGreenLeft {
  cursor: pointer;
  width: 340px;
  height: 60px;
  line-height: 55px;
  border: 3px solid #2d9687;
  border-radius: 5px;
}

.fontSubBtn {
  font-size: 10px;
}
.font-30 {
  font-size: 30px;
}
</style>
