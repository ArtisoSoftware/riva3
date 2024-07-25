<template>
  <div class="q-pa-md bg-white" style="width: 100%">
    <div class="row" style="height: 70px; font-size: 16px">
      <!-- menu1 -->
      <div
        class="col-2 selectBoxDiv q-pt-xs cursor-pointer"
        align="center"
        :class="{ textSelected: menuSelectedId == 1 }"
        @click="selectMenuId(1)"
      >
        <div style="height: 58px" class="q-pt-xs">
          Integration<br />across years
        </div>

        <div :class="{ lineGreenSelectedBox: menuSelectedId == 1 }"></div>
      </div>
      <!-- menu2 -->
      <div
        class="col-2 selectBoxDiv q-pt-xs cursor-pointer"
        align="center"
        @click="selectMenuId(2)"
        :class="{ textSelected: menuSelectedId == 2 }"
      >
        <div style="height: 58px" class="q-pt-xs">
          Integration<br />
          across periods
        </div>
        <div :class="{ lineGreenSelectedBox: menuSelectedId == 2 }"></div>
      </div>
      <!-- menu3 -->
      <div
        class="col-2 selectBoxDiv cursor-pointer"
        align="center"
        style="line-height: 63px"
        @click="selectMenuId(3)"
        :class="{ textSelected: menuSelectedId == 3 }"
      >
        Data availability
        <div :class="{ lineGreenSelectedBox: menuSelectedId == 3 }"></div>
      </div>
      <!-- menu4 -->
      <div
        class="col-2 selectBoxDiv cursor-pointer q-pt-xs"
        align="center"
        @click="selectMenuId(4)"
        :class="{ textSelected: menuSelectedId == 4 }"
      >
        <div style="height: 58px" class="q-pt-xs">
          Weights / <br />weight simulation
        </div>
        <div :class="{ lineGreenSelectedBox: menuSelectedId == 4 }"></div>
      </div>
      <!-- menu5 -->
      <div
        class="col selectBoxDiv cursor-pointer"
        align="center"
        style="line-height: 65px"
        @click="goToURL()"
      >
        <u>Click here to see this group's availablity matrix</u>
      </div>
    </div>
    <div class="borderMainBox">
      <!-- graph menu 1 -->
      <div v-show="menuSelectedId == 1">
        <div class="row">
          <div style="width: 400px" class="q-pa-md borderRight">
            <div class="font-24">Select dimensions of interest</div>
            <div class="font-14">
              In parenthesis, each economy's asymmetric
              {{ input.type.toLowerCase() }} integration index with this partner
              group in
              {{ input.year.max }}
            </div>
            <div class="q-pt-md">
              Click on each dimension to select/unselect it from the graph.
            </div>
            <div
              class="row q-py-sm cursor-pointer"
              @click="ecoIntegrationGroupToggleOnOff()"
            >
              <div
                class="checkBoxGroup"
                style="background-color: #f07435"
                v-show="ecoIntegrationGroupVisible"
              ></div>
              <div
                class="checkBoxGroup"
                v-show="!ecoIntegrationGroupVisible"
              ></div>
              <div class="q-pl-sm">
                Group average ({{ Number(ecoIntegrationAvg).toFixed(2) }})
              </div>
            </div>
            <div><hr /></div>
            <div>
              <div
                v-for="(item, index) in ecoIntegrationChart"
                :key="index"
                class="row"
              >
                <div
                  @click="ecoIntegrationToggleOnOff(index)"
                  class="cursor-pointer row q-py-sm"
                  style="width: 100%"
                  v-if="item.lastValue >= 0"
                >
                  <div
                    class="checkBox"
                    :style="{ backgroundColor: item.color }"
                    v-show="item.visible == true"
                  ></div>
                  <div
                    class="checkBox"
                    style="border: 1px solid #757575"
                    v-show="item.visible == false"
                  ></div>

                  <div class="q-pl-sm row">
                    <div style="max-width: 240px; display: inline-block">
                      {{ capitalize(item.name) }} ({{
                        Number(item.lastValue).toFixed(2)
                      }})
                    </div>
                  </div>
                </div>
                <div v-else class="row">
                  <div
                    class="checkBox"
                    :style="{ backgroundColor: 'grey' }"
                    v-show="item.visible == true"
                  ></div>
                  <div class="q-pl-sm row">
                    <div style="max-width: 250px; display: inline-block">
                      {{ capitalize(item.name) }} (No data available)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
const router = useRouter();
const { serverData } = serverSetup();
const menuSelectedId = ref(1);
const colorPattern = ref([
  "#64C1E8",
  "#D85B63",
  "#D680AD",
  "#88643A",
  "#C0BA80",
  "#FDC47D",
  "#EA3B46",
]);
const dimensionName = ref([
  "Trade and investment",
  "Financial markets",
  "Value chains",
  "Infrastructure and connectivity",
  "Movement of people",
  "Regulatory cooperation",
  "Digital economy",
]);

const selectMenuId = (value) => {
  menuSelectedId.value = value;
};
const goToURL = () => {
  router.push("/ridataavail/id=" + props.localID);
};
const capitalize = (s) => {
  if (s.length == 0) {
    return "";
  } else {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  }
};
//Menu 1 in by dimension
const ecoIntegrationAvg = ref(0);
const ecoIntegrationChart = ref([]);
const ecoIntegrationChartGroup = ref([]);
const ecoIntegrationPercentChange = ref(0);
const intergrationProgressList = ref([]);
const integrationProgressChartSeries1 = ref([]);
const integrationProgressChartSeries2 = ref([]);
const integrationProgressPlotChartGroup = ref([]);
const integrationProgressYearStart = ref("");
const integrationProgressYearEnd = ref("");
const ecoIntegrationGroupVisible = ref(true);
const ecoIntegration = ref([]);
const reporterData = ref(props.reporting.sort());
const partnerData = ref(props.partner.sort());

const loadEcoIntegration = async () => {
  ecoIntegration.value = [];
  let data = {
    input: props.input,
    reporting: reporterData.value,
    partner: partnerData.value,
  };
  let url = serverData.value + "ri/build_index_by_dimension.php";
  let res = await axios.post(url, JSON.stringify(data));
  let allData = res.data;
  let dimPass = props.input.dimensionPicked.length / 2;
  let allYear = props.input.year.max - props.input.year.min + 1;
  let tableTemp = [];
  data.reporting.forEach((reporter) => {
    let resultReportList = allData.filter(
      (result) => result.reporter == reporter
    );
    data.partner.forEach((partner) => {
      let resultReportPartnerList = resultReportList.filter(
        (result2) => result2.partner == partner
      );

      if (resultReportPartnerList.length >= dimPass * allYear) {
        for (let i = 0; i < resultReportPartnerList.length; i++) {
          tableTemp.push(resultReportPartnerList[i]);
        }
      }
    });
  });

  for (let i = 0; i < props.input.dimensionPicked.length; i++) {
    let indexDimension = props.input.dimensionPicked[i];
    let dataBeforePush = {
      name: dimensionName.value[indexDimension - 1],
      data: [],
      lastValue: 0,
    };
    for (let j = props.input.year.min; j <= props.input.year.max; j++) {
      let tempData = tableTemp.filter(
        (x) => x.dimension == indexDimension && x.year == j
      );
      let avgData =
        tempData.reduce((total, item) => {
          return total + Number(item.score);
        }, 0) / tempData.length;
      dataBeforePush.data.push(Number(avgData.toFixed(4)));
    }
    dataBeforePush.lastValue =
      dataBeforePush.data[dataBeforePush.data.length - 1];
    ecoIntegrationChart.value.push(dataBeforePush);
  }
  ecoIntegrationChart.value.forEach((item, index) => {
    ecoIntegrationChart.value[index].visible = true;
    ecoIntegrationChart.value[index].color = colorPattern.value[index];
  });

  let avgValue = [];
  let diffYear = props.input.year.max - props.input.year.min;

  for (let j = 0; j <= diffYear; j++) {
    let cYear = props.input.year.min + j;
    let tableFilterYear = tableTemp.filter((x) => x.year == cYear);

    let sumEachPair = 0;
    let countPair = 0;
    data.reporting.forEach((report) => {
      data.partner.forEach((partner) => {
        let tableEachPair = tableFilterYear.filter(
          (x) => x.reporter == report && x.partner == partner
        );
        if (tableEachPair.length > 0) {
          sumEachPair +=
            tableEachPair.reduce((sum, item) => sum + Number(item.score), 0) /
            tableEachPair.length;
          countPair++;
        }
      });
    });
    avgValue[j] = Number((sumEachPair / countPair).toFixed(4));
  }
  ecoIntegrationChartGroup.value = {
    name: "Group average",
    data: avgValue,
    lastValue: avgValue[diffYear],
    color: "#FF9616",
    visible: true,
    dashStyle: "dash",
  };
  ecoIntegrationAvg.value = ecoIntegrationChartGroup.value.lastValue;
  ecoIntegrationPercentChange.value = (
    ((avgValue[diffYear] - avgValue[0]) / avgValue[0]) *
    100
  ).toFixed(0);
  integrationProgressPrepareData();
};

const ecoIntegrationGroupToggleOnOff = () => {
  ecoIntegrationGroupVisible.value = !ecoIntegrationGroupVisible.value;
  ecoIntegrationChartGroup.value.visible =
    !ecoIntegrationChartGroup.value.visible;
};

const ecoIntegrationToggleOnOff = (index) => {
  ecoIntegrationChart.value[index]["visible"] =
    !ecoIntegrationChart.value[index]["visible"];
  ecoIntegrationChart.value.push("xxx");
  ecoIntegrationChart.value.pop();
};

const integrationProgressPrepareData = () => {
  integrationProgressMakeEcoList();
  integrationProgressMakeAvg();
  integrationProgressMakeAvgGroup();
  integrationProgressLegendChartName();
  intergrationProgressSubTitle();
};
const integrationProgressMakeEcoList = () => {
  intergrationProgressList.value = [];
  ecoIntegrationChart.value.forEach((item) => {
    let temp = [];
    temp = {
      name: item.name,
      lastValue: item.lastValue,
      visible: true,
    };
    intergrationProgressList.value.push(temp);
  });
};
const integrationProgressMakeAvg = () => {
  integrationProgressChartSeries1.value = [];
  integrationProgressChartSeries2.value = [];
  ecoIntegrationChart.value.forEach((item) => {
    let diffYearByTwo = Math.floor(
      (props.input.year.max - props.input.year.min) / 2
    );
    let arr1 = item.data.slice(0, diffYearByTwo + 1);
    let avg1 = Number(arr1.reduce((pc, cc) => pc + cc, 0)) / arr1.length;
    let arr2 = item.data.slice(item.data.length - diffYearByTwo - 1);
    let avg2 = Number(arr2.reduce((pc, cc) => pc + cc, 0)) / arr2.length;
    integrationProgressChartSeries1.value.push(Number(Number(avg1).toFixed(4)));
    integrationProgressChartSeries2.value.push(Number(Number(avg2).toFixed(4)));
  });
};

const integrationProgressMakeAvgGroup = () => {
  integrationProgressPlotChartGroup.value = [];
  let diffYearByTwo = Math.floor(
    (props.input.year.max - props.input.year.min) / 2
  );
  let arrGroup1 = ecoIntegrationChartGroup.value.data.slice(
    0,
    diffYearByTwo + 1
  );
  let arrGroup2 = ecoIntegrationChartGroup.value.data.slice(
    ecoIntegrationChartGroup.value.data.length - diffYearByTwo - 1
  );
  let avgGroup1 =
    Number(arrGroup1.reduce((pc, cc) => pc + cc, 0)) / arrGroup1.length;
  let avgGroup2 =
    Number(arrGroup2.reduce((pc, cc) => pc + cc, 0)) / arrGroup2.length;
  integrationProgressPlotChartGroup.value.push(Number(avgGroup1.toFixed(4)));
  integrationProgressPlotChartGroup.value.push(Number(avgGroup2.toFixed(4)));
};

const integrationProgressLegendChartName = () => {
  let diffYear = Math.floor((props.input.year.max - props.input.year.min) / 2);
  integrationProgressYearStart.value =
    props.input.year.min + "-" + (props.input.year.min + diffYear);
  integrationProgressYearEnd.value =
    props.input.year.max - diffYear + "-" + props.input.year.max;
};
const intergrationProgressSubTitle = () => {
  console.log("working");
};
onMounted(() => loadEcoIntegration());
</script>

<style lang="scss" scoped>
.selectBoxDiv {
  border: 1px solid #757575;
}
.textSelected {
  color: #2d9687;
  font-weight: bold;
}
.lineGreenSelectedBox {
  height: 6px;
  background-color: #2d9687;
}
.borderMainBox {
  border: 1px solid #757575;
  height: 650px;
  width: 100%;
}
.borderRight {
  border-right: 1px solid #c4c4c4;
  height: 650px;
}
.checkBoxGroup {
  width: 20px;
  height: 20px;
  border: 1px solid #757575;
}
.checkBox {
  width: 20px;
  height: 20px;
}
</style>
