<template>
  <div class="bgGrey font-16 q-pt-md text-center">
    <div style="width: 90%; margin: auto">
      <div class="row items-center">
        <div class="font-12" align="left">
          <div class="font-30"><b>Dimension</b></div>
          <div class="">Select a dimension to see detail</div>
        </div>
        <div class="q-px-md" style="width: 450px">
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
      <div class="q-pt-xl font-24" align="left">
        Which indicators are driving {{ selected.toLowerCase() }} Integration?
      </div>
      <div class="q-pt-sm">
        <q-card flat class="cardStyle">
          <q-tabs
            v-model="tab"
            class="text-grey"
            active-color="secondary"
            indicator-color="secondary"
            align="justify"
            narrow-indicator
            no-caps
            @click="changeTab()"
          >
            <q-tab name="economy" label="By economy" />
            <q-tab name="index" label="By indicator (and economy)" />
            <q-tab name="data" label="Indicator data availability" />
            <q-tab name="weight" label="Indicator weights in dimension" />
            <div
              class="font-12 cursor-pointer q-px-md"
              align="center"
              @click="goToURL()"
            >
              <u>Click here to see this group’s availability matrix</u>
            </div>
          </q-tabs>

          <q-separator />
          <q-tab-panels v-model="tab" animated style="background: #ededed">
            <q-tab-panel name="economy">
              <div class="q-px-xl" align="left">
                <div class="font-24 q-py-md">
                  Which economies are performing best in
                  {{ selected.toLowerCase() }} integration?
                </div>
              </div>
              <div class="economyOverflow">
                <div id="chartEconomy"></div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { LocalStorage } from "quasar";
import { serverSetup } from "../../pages/server";
import tableTab from "../ri_tableintab.vue";
import axios from "axios";
const { serverData } = serverSetup();
const props = defineProps({
  dataSend: Object,
});

const input = ref({
  disaggregation: "dimension",
  partner: [],
  reporting: [],
  type: "Sustainable",
  dimensionPicked: [
    { picked: false },
    { picked: false },
    { picked: false },
    { picked: false },
    { picked: false },
    { picked: false },
    { picked: false },
  ],
});

const data = ref([]);

const report = ref([]);
const selected = ref("");
const tab = ref("economy");
const colorSelected = ref("");
const yourGroupName = ref("Your group");
const dimensionOptions = ref([]);
const allDimensionData = ref([]);
const firstHalfPeriod = ref("");
const secondHalfPeriod = ref("");

const dimPick = ref([]);
const dimensionIndex = ref(1);
const countAllPair = ref(0);
const weightDataTemp = ref([]);
const showIndicatorChart = ref(false);
const indicatorName = ref("");
const indicatorIndex = ref(0);
const indicatorStr = ref([]);

const indicatorChart = ref({
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

const indexNoDataText = ref("");

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

watch(
  () => props.dataSend,
  (newValue) => {
    if (newValue) {
      data.value = props.dataSend.data;
      input.value = props.dataSend.input;
      report.value = props.dataSend.report;
      checkYourName();
    }
  }
);

const changeTab = () => {
  if (tab.value == "index") {
    loadIndexChart();
  } else if (tab.value == "data") {
    loadDataChart();
  } else if (tab.value == "weight") {
    loadWeightChart();
  } else {
    loadEconomyChart();
  }
};

const goToURL = () => {
  let dataGet = LocalStorage.getItem("dataAvail");
  let id = dataGet.key;
  window.open("#/ridataavail/" + id).focus;
};
const loadIndexChart = () => {
  console.log("work2");
};

const loadDataChart = () => {
  console.log("work3");
};

const loadWeightChart = () => {
  console.log("work4");
};

const loadEconomyChart = () => {
  Highcharts.chart("chartEconomy", {
    chart: {
      type: "bar",
      backgroundColor: "#EDEDED",
      marginLeft: 180,
      height: data.value.length > 9 ? data.value.length * 60 : 540,
    },

    title: {
      text: "",
    },
    xAxis: {
      categories: economyChart.value.catName,
      labels: {
        align: "right",

        formatter() {
          if (this.value == yourGroupName.value)
            return `<span style="color: #F99704; font-weight:bold;">${this.value}</span>`;
          else {
            return this.value;
          }
        },
      },
    },
    yAxis: {
      min: 0,
      max: 1,
      title: {
        text: "",
      },
      gridLineWidth: 0,
      minorGridLineWidth: 0,
    },
    tooltip: {
      shared: true,
      formatter: function () {
        let points = this.points;
        let pointsLength = points.length;
        let tooltipMarkup = pointsLength
          ? '<span style="font-size: 14px"><b>' +
            points[0].key +
            "</b></span><br/>"
          : "";
        let difData = Number((this.points[1].y - this.points[0].y).toFixed(2));
        let percentDif = Number(
          ((this.points[1].y - this.points[0].y) / this.points[0].y) * 100
        ).toFixed(2);
        let textDif = difData < 0 ? "decreased" : "increased";
        tooltipMarkup +=
          "Average index " +
          textDif +
          " by " +
          Math.abs(difData).toFixed(2) +
          " ( " +
          Math.abs(percentDif).toFixed(2) +
          "% )";

        return tooltipMarkup;
      },
    },
    plotOptions: {
      bar: {
        pointPadding: 0,
        borderWidth: 0,
        dataLabels: {
          align: "right",
          enabled: true,
          borderWidth: 0,
          inside: true,
          // format: "{y} %",
        },
      },
      series: {
        pointPadding: 0,
        borderWidth: 0,
        events: {
          legendItemClick: function (e) {
            e.preventDefault();
          },
        },
      },
    },
    legend: {
      align: "right",
      y: 50,
      verticalAlign: "top",
      layout: "vertical",
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            "viewFullscreen",
            "printChart",
            "separator",
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
            "separator",
            "downloadCSV",
            "downloadXLS",
            //"viewData",
          ],
        },
      },
    },
    credits: { enabled: false },
    series: economyChart.value.series,
  });
};

const checkYourName = () => {
  if (input.value.reporting.length == 1) {
    yourGroupName.value = input.value.reporting[0].label;
  }
  loadData();
};

const loadData = async () => {
  let dim = [];
  for (let i = 0; i < input.value.dimensionPicked.length; i++) {
    if (input.value.dimensionPicked[i].picked) dim.push(i + 1);
  }
  dimPick.value = dim;
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
  let dataInput = {
    type: input.value.type,
  };
  let url = serverData.value + "ri/dimension_icon.php";
  let res = await axios.post(url, JSON.stringify(dataInput));
  allDimensionData.value = res.data;
  dimensionOptions.value = input.value.dimensionPicked
    .filter((x) => x.picked)
    .map((x) => x.name);
  countAllPair.value = 0;
  report.value.forEach((report) => {
    data.value.forEach((partner) => {
      if (report.iso != partner.iso) {
        countAllPair.value++;
      }
    });
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

const setEconomyChart = async () => {
  let dataTemp = {
    input: input.value,
    partner: data.value,
    partnerMap: data.value.map((x) => x.iso),
    reportMap: report.value.map((x) => x.iso),
    dimension: selected.value,
    index: dimensionIndex.value,
  };
  let url = serverData.value + "ri/build_economychart_datatab_dimension.php";
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
const setWeightChart = async () => {
  weightDataTemp.value.sort((a, b) => b.data - a.data);
  weightChart.value.series[0].data = [];
  weightChart.value.catName = weightDataTemp.value.map((x) => x.catName);
  weightChart.value.catNameLower = weightDataTemp.value.map((x) => {
    return x.catName.charAt(0).toLowerCase() + x.catName.substring(1);
  });

  weightChart.value.series[0].data = weightDataTemp.value.map((x) =>
    Number((Number(x.data) * 100).toFixed(2))
  );

  weightChart.value.equalWeight = (
    100 / weightChart.value.series[0].data.length
  ).toFixed(2);
};

const setDataChart = async () => {
  let dataTemp = {
    input: input.value,
    partnerMap: data.value.map((x) => x.iso),
    reportMap: report.value.map((x) => x.iso),
    dimension: dimensionIndex.value,
  };

  let url = serverData.value + "ri/build_data_dimensiontab.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  let result = res.data;
  let tableTemp = [];
  let totalIndex = indicatorStr.value.length;
  weightDataTemp.value = [];
  for (let i = 1; i <= totalIndex; i++) {
    let indexCount =
      (result.filter((x) => Number(x.indicator) == i).length /
        countAllPair.value) *
      100;

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
  dataChart.value.catName = tableTemp.map((x) => x.catName);
  dataChart.value.catNameLower = tableTemp.map((x) => {
    return x.catName.charAt(0).toLowerCase() + x.catName.substring(1);
  });
  dataChart.value.series[0].data = tableTemp.map((x) =>
    Number(x.data.toFixed(2))
  );
};

const setIndexChart = async () => {
  indicatorStr.value =
    allDimensionData.value[dimensionIndex.value - 1].indicator;
  let dataTemp = {
    input: input.value,
    partnerMap: data.value.map((x) => x.iso),
    reportMap: report.value.map((x) => x.iso),
    index: dimensionIndex.value,
    indicator: indicatorStr.value,
  };

  let url = serverData.value + "ri/build_index_dimensiontab.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  let result = res.data;
  let resultNoData = result
    .filter((x) => x.data[0] == 0 && x.data[0] == 0)
    .map((x) => x.catName);
  indexNoDataText.value = "";
  if (resultNoData.length > 0) {
    indexNoDataText.value = "No available for ";
    for (let iLoop = 0; iLoop < resultNoData.length - 1; iLoop++) {
      indexNoDataText.value += resultNoData[iLoop];
    }
    if (resultNoData.length == 1) {
      indexNoDataText.value += resultNoData[0];
    } else {
      indexNoDataText.value += "and " + resultNoData[0];
    }
  }

  result = result.filter((x) => x.data[0] != 0 || x.data[0] != 0);
  result.sort((a, b) => b.dif - a.dif);

  // @ Youy group
  indexChart.value.series[0].data = [];
  indexChart.value.series[1].data = [];
  indexChart.value.series[0].name = firstHalfPeriod.value;
  indexChart.value.series[1].name = secondHalfPeriod.value;

  for (let k = 0; k < result.length; k++) {
    indexChart.value.series[0].data[k] = Number(result[k].data[0].toFixed(2));
    indexChart.value.series[1].data[k] = Number(result[k].data[1].toFixed(2));
    indexChart.value.catName[k] = result[k].catName;
  }
};
</script>

<style lang="scss" scoped>
.economyOverflow2 {
  width: 100%;
  height: 520px;
  overflow-y: auto;
}
.bgGrey {
  background: #ededed;
  height: 950px;
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
  font-size: 24px;
}
.cardStyle {
  background: #ededed;
  border: 1px solid #757575;
  height: 750px;
}
////////////
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
/////
#chartIndicator {
  min-height: 580px;
  width: 100%;
}
#chartEconomy {
  min-height: 540px;
  width: 100%;
}
#chartIndex {
  height: 420px;
  width: 100%;
}
#chartData,
#chartWeight {
  height: 510px;
  width: 100%;
}
</style>
