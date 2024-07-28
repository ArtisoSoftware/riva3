<template>
  <div style="background-color: #7a7a7a; color: rgb(117, 117, 117)">
    <div class="mainApp">
      <ri-header :menu="0"></ri-header>
      <input-rep @country="countryInput" />

      <div class="row">
        <div class="col-6 q-pa-md">
          <line-chart
            :data="input"
            :ecoName="ecoName"
            :si="lineSI"
            :ci="lineCI"
          />
        </div>
        <div class="col-6 q-pa-md">
          <dim-chart
            :data="input"
            :ecoName="ecoName"
            :data1="dimYearSI1"
            :data2="dimYearSI2"
            :data3="dimYearCI1"
            :data4="dimYearCI2"
          />
        </div>
      </div>
      <div class="text-h6" align="center">
        <div v-if="ecoName == 'Asia-Pacific'">
          Which Asia-Pacific economies were most integrated with the rest of the
          region in {{ yearEnd }}? - Stylized honeycomb map of the Asia-Pacific
          region
        </div>
        <div v-if="ecoName != 'Asia-Pacific'">
          Which Asia-Pacific economies were most integrated with
          {{ ecoName }} in {{ yearEnd }}? – Sylized honeycomb map of the
          Asia-Pacific region
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import riHeader from "../components/RI_header.vue";
import inputRep from "../components/ri_overview/select_reporter.vue";
import lineChart from "../components/ri_overview/line_chart.vue";
import dimChart from "../components/ri_overview/dim_chart.vue";

import { ref, onMounted } from "vue";
import { serverSetup, yearInputShow } from "./server";
import { countryGroupListRiva2 } from "./countryGroupList.js";
import axios from "axios";

const { serverData } = serverSetup();
const { yearInput } = yearInputShow();

const yearStart = ref(0);
const yearEnd = ref(0);
const yearHL = ref(0);
const yearHH = ref(0);

const input = ref([]);
const ecoName = ref("");

const dimFinalSI = ref([]);
const dimYearSI = ref([]);
const dimYearSI1 = ref([]);
const dimYearSI2 = ref([]);

const dimFinalCI = ref([]);
const dimYearCI = ref([]);
const dimYearCI1 = ref([]);
const dimYearCI2 = ref([]);

const lineSI = ref([]);
const lineCI = ref([]);

const partner = ref([
  "AFG",
  "ARM",
  "ASM",
  "AZE",
  "COK",
  "FJI",
  "FSM",
  "GEO",
  "GUM",
  "IRN",
  "KAZ",
  "KGZ",
  "KIR",
  "MDV",
  "MHL",
  "MNP",
  "NCL",
  "NIU",
  "NRU",
  "PAK",
  "PLW",
  "PYF",
  "SLB",
  "TJK",
  "TKM",
  "TLS",
  "TON",
  "TUR",
  "TUV",
  "UZB",
  "VUT",
  "WSM",
  "PNG",
  "RUS",
  "KHM",
  "IDN",
  "PHL",
  "LAO",
  "BTN",
  "NPL",
  "BGD",
  "IND",
  "LKA",
  "MMR",
  "THA",
  "AUS",
  "NZL",
  "BRN",
  "MYS",
  "SGP",
  "VNM",
  "MAC",
  "PRK",
  "HKG",
  "MNG",
  "CHN",
  "KOR",
  "JPN",
]);
const countryInput = (inputData) => {
  input.value = inputData.countryOutput;
  ecoName.value = inputData.ecoName;

  loadDimCal();
  loadDimLeft();
  loadLineChart();
};

//start Dim chart

const loadDimCal = async () => {
  let input2 = {
    year: {
      min: yearInput.value.min,
      max: yearInput.value.max,
    },
    type: "Sustainable",
  };

  let data6 = {
    input: input2,
    partnerMap: partner.value,
    reportMap: input.value,
  };
  let url6 = serverData.value + "ri/overview_intra_index_by_dimension.php";
  let res6 = await axios.post(url6, JSON.stringify(data6));
  let dimRaw = res6.data;

  dimFinalSI.value = [];
  for (let dimCount = 1; dimCount <= 7; dimCount++) {
    for (
      let yearCount = yearStart.value;
      yearCount <= yearEnd.value;
      yearCount++
    ) {
      let dimTemp = dimRaw.filter(
        (data) =>
          Number(data.dimension) == dimCount && Number(data.year) == yearCount
      );

      let dimTemp2 =
        dimTemp.reduce((a, b) => a + Number(b.score), 0) / dimTemp.length;
      let dataTemp = {
        dimension: dimCount,
        score: dimTemp2,
        year: yearCount,
      };
      dimFinalSI.value.push(dataTemp);
    }
  }

  dimYearSI.value = [];
  for (let dimCount = 1; dimCount <= 7; dimCount++) {
    let dimTemp1 = dimFinalSI.value.filter(
      (x) => x.year <= yearHL.value && x.dimension == dimCount
    );
    let dimFinal1 = dimTemp1.reduce((a, b) => a + b.score, 0) / dimTemp1.length;
    let temp1 = {
      dimension: dimCount,
      score: dimFinal1,
      year: yearStart.value + "-" + yearHL.value,
    };
    dimYearSI.value.push(temp1);

    let dimTemp2 = dimFinalSI.value.filter(
      (x) => x.year >= yearHH.value && x.dimension == dimCount
    );
    let dimFinal2 = dimTemp2.reduce((a, b) => a + b.score, 0) / dimTemp2.length;
    let temp2 = {
      dimension: dimCount,
      score: dimFinal2,
      year: yearHH.value + "-" + yearEnd.value,
    };

    dimYearSI.value.push(temp2);
  }

  {
    let temp1 = dimYearSI.value.filter(
      (x) => x.year == yearStart.value + "-" + yearHL.value
    );
    temp1.sort((a, b) => a.dimension - b.dimension);
    dimYearSI1.value = temp1.map((x) => Number(x.score.toFixed(2)));
  }
  {
    let temp1 = dimYearSI.value.filter(
      (x) => x.year == yearHH.value + "-" + yearEnd.value
    );

    temp1.sort((a, b) => a.dimension - b.dimension);
    dimYearSI2.value = temp1.map((x) => Number(x.score.toFixed(2)));
  }
};

const loadDimLeft = async () => {
  let input2 = {
    year: {
      min: yearStart.value,
      max: yearEnd.value,
    },
    type: "Conventional",
  };
  let data6 = {
    input: input2,
    partnerMap: partner.value,
    reportMap: input.value,
  };
  let url6 = serverData.value + "ri/overview_intra_index_by_dimension.php";
  let res6 = await axios.post(url6, JSON.stringify(data6));
  let dimRaw = res6.data;

  dimFinalCI.value = [];
  for (let dimCount = 1; dimCount <= 7; dimCount++) {
    for (
      let yearCount = yearStart.value;
      yearCount <= yearEnd.value;
      yearCount++
    ) {
      let dimTemp = dimRaw.filter(
        (data) =>
          Number(data.dimension) == dimCount && Number(data.year) == yearCount
      );

      let dimTemp2 =
        dimTemp.reduce((a, b) => a + Number(b.score), 0) / dimTemp.length;
      let dataTemp = {
        dimension: dimCount,
        score: dimTemp2,
        year: yearCount,
      };
      dimFinalCI.value.push(dataTemp);
    }
  }
  dimYearCI.value = [];
  for (let dimCount = 1; dimCount <= 7; dimCount++) {
    let dimTemp1 = dimFinalCI.value.filter(
      (x) => x.year <= yearHL.value && x.dimension == dimCount
    );
    let dimFinal1 = dimTemp1.reduce((a, b) => a + b.score, 0) / dimTemp1.length;
    let temp1 = {
      dimension: dimCount,
      score: dimFinal1,
      year: yearStart.value + "-" + yearHL.value,
    };
    dimYearCI.value.push(temp1);

    let dimTemp2 = dimFinalCI.value.filter(
      (x) => x.year >= yearHH.value && x.dimension == dimCount
    );

    let dimFinal2 = dimTemp2.reduce((a, b) => a + b.score, 0) / dimTemp2.length;
    let temp2 = {
      dimension: dimCount,
      score: dimFinal2,
      year: yearHH.value + "-" + yearEnd.value,
    };

    dimYearCI.value.push(temp2);
  }
  {
    let temp1 = dimYearCI.value.filter(
      (x) => x.year == yearStart.value + "-" + yearHL.value
    );
    temp1.sort((a, b) => a.dimension - b.dimension);
    dimYearCI1.value = temp1.map((x) => Number(x.score.toFixed(2)));
  }
  {
    let temp1 = dimYearCI.value.filter(
      (x) => x.year == yearHH.value + "-" + yearEnd.value
    );

    temp1.sort((a, b) => a.dimension - b.dimension);
    dimYearCI2.value = temp1.map((x) => Number(x.score.toFixed(2)));
  }
};
//End dim chart

//Start line chart
const loadLineChart = async () => {
  let partnerInput = [];
  let countryPartyTemp = [];
  let iso = ["escap"];
  let countryReportListAP = [];
  iso.forEach((isoData) => {
    let tempList = countryGroupListRiva2(isoData);
    countryPartyTemp = countryPartyTemp.concat(tempList);
  });
  partnerInput = [...new Set(countryPartyTemp)];
  partnerInput.forEach((item) => {
    let temp = {
      label: item,
    };
    countryReportListAP.push(temp);
  });

  let dataSend = {
    countryPartnerList: countryReportListAP,
    reportMap: input.value,
    partnerMap: partnerInput,

    input: {
      year: {
        min: yearStart.value,
        max: yearEnd.value,
      },
      type: "Sustainable",
    },
  };
  let url7 =
    serverData.value + "ri/overview_intra_eco_integration_by_country.php";
  let res7 = await axios.post(url7, JSON.stringify(dataSend));
  let dimRaw7 = res7.data;
  dimRaw7 = dimRaw7.filter((x) => x.lastValue != 0);
  lineSI.value = [];
  let countYear = yearEnd.value - yearStart.value + 1;
  for (let i = 1; i <= countYear; i++) {
    lineSI.value.push(0);
  }

  dimRaw7.forEach((x) => {
    for (let i = 0; i < countYear; i++) {
      lineSI.value[i] += x.data[i];
    }
  });

  lineSI.value = lineSI.value.map((x) =>
    Number((x / dimRaw7.length).toFixed(2))
  );

  let dataSendCI = {
    countryPartnerList: countryReportListAP,
    reportMap: input.value,
    partnerMap: partnerInput,

    input: {
      year: {
        min: yearStart.value,
        max: yearEnd.value,
      },
      type: "Conventional",
    },
  };
  let url7C =
    serverData.value + "ri/overview_intra_eco_integration_by_country.php";
  let res7C = await axios.post(url7C, JSON.stringify(dataSendCI));
  let dimRaw7C = res7C.data;
  dimRaw7C = dimRaw7C.filter((x) => x.lastValue != 0);
  lineCI.value = [];
  let countYearCI = yearEnd.value - yearStart.value + 1;
  for (let i = 1; i <= countYearCI; i++) {
    lineCI.value.push(0);
  }

  dimRaw7C.forEach((x) => {
    for (let i = 0; i < countYearCI; i++) {
      lineCI.value[i] += x.data[i];
    }
  });

  lineCI.value = lineCI.value.map((x) =>
    Number((x / dimRaw7C.length).toFixed(2))
  );
};

//End line chart

onMounted(() => {
  // Refresh the page on first load to ensure meta tag change
  sessionStorage.removeItem("reloaded2");
  if (!sessionStorage.getItem("reloaded")) {
    sessionStorage.setItem("reloaded", "true");
    location.reload();
  }

  yearStart.value = yearInput.value.min;
  yearEnd.value = yearInput.value.max;
  yearHL.value = Math.floor((yearStart.value + yearEnd.value) / 2);
  yearHH.value = Math.ceil((yearStart.value + yearEnd.value) / 2);
});
</script>

<style lang="scss" scoped>
.mainApp {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  background-color: #fff;
}
</style>
