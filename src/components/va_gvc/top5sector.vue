<template>
  <div>
    <div v-show="!showData" class="text-center text-h5">
      <div class="text-black q-pt-md">
        <b>GVC relationships: top 5 exporting sectors</b>
      </div>
      <div class="q-py-xl row justify-center">
        <div>
          <img
            src="../../../public/images/warning.png"
            alt=""
            style="height: 50px"
          />
        </div>
        <div style="line-height: 50px" class="q-pl-lg">No data available</div>
      </div>
    </div>
    <div v-show="showData">
      <div
        style="font-size: 35px; font-weight: 400"
        class="text-center q-pt-md"
      >
        GVC relationships: top 5 exporting sectors
      </div>
      <div class="text-center">
        Click on a sector to see the top 5 partner of {{ exportingName }} in
        each sector
      </div>
      <div
        class="row justify-center q-pt-md items-center"
        style="width: 1200px; margin: auto"
      >
        <div class="col text-center">
          <div class="txtGreen text-right">
            <b>Largest backward linked sectors</b>
          </div>
          <div
            class="q-mt-md"
            style="width: 100%; height: 430px"
            v-if="!isShowGraphBack"
          >
            <div
              class="row q-mb-sm"
              v-for="(item, index) in backwardFinal"
              :key="index"
            >
              <div
                style="width: 100%; position: relative"
                class="row justify-end"
              >
                <div style="width: 100%" class="row justify-end">
                  <div
                    class="barGreen cursor-pointer"
                    :style="{ width: item.widthRatio + '%' }"
                    @click="showDetailBack(exportingISO, item)"
                  ></div>
                </div>
                <div
                  class="q-py-sm text-right q-px-sm text-black cursor-pointer"
                  style="position: absolute"
                  @click="showDetailBack(exportingISO, item)"
                >
                  {{ item.sectorName }}
                </div>
                <div
                  class="text-right q-px-sm text-black cursor-pointer"
                  style="position: absolute; top: 30px"
                  @click="showDetailBack(exportingISO, item)"
                >
                  {{ item.share }}%, ${{ item.value }}B
                </div>
              </div>
            </div>
            <div class="text-right"><b>Sector</b></div>
            <div class="text-right" style="font-size: 12px">
              Share of foreign value-added in {{ exportingName }}'s sectoral
              gross exports (%)
            </div>
            <div class="text-right" style="font-size: 12px">
              Foreign value-added ($)
            </div>
          </div>
          <div
            class="q-mt-md"
            style="width: 100%; height: 430px"
            v-if="isShowGraphBack"
          >
            <div
              style="
                width: 100%;
                height: 345px;
                border: 1px solid black;
                border-radius: 10px;
              "
              id="backwardEconomy"
            >
              Graph
            </div>
            <div class="q-pt-md">
              <q-btn
                label="Back to main chart"
                no-caps
                outline
                @click="isShowGraphBack = false"
              />
            </div>
          </div>
        </div>

        <div
          style="width: 300px; font-size: 35px; font-weight: 400"
          class="text-center"
        >
          {{ exportingName }}
        </div>
        <div class="col text-center">
          <div class="txtRed text-left">
            <b>Largest forward linked sectors</b>
          </div>
          <div class="text-left q-mt-md" style="width: 100%; height: 430px">
            <div
              class="q-mt-md"
              style="width: 100%; height: 430px"
              v-if="!isShowGraphForward"
            >
              <div
                class="row q-mb-sm"
                v-for="(item, index) in forwardFinal"
                :key="index"
              >
                <div
                  style="width: 100%; position: relative"
                  class="row justify-start"
                >
                  <div style="width: 100%" class="row justify-start">
                    <div
                      class="barRed cursor-pointer"
                      :style="{ width: item.widthRatio + '%' }"
                      @click="showDetailForward(exportingISO, item)"
                    ></div>
                  </div>
                  <div
                    class="q-py-sm text-right q-px-sm text-black cursor-pointer"
                    style="position: absolute"
                    @click="showDetailForward(exportingISO, item)"
                  >
                    {{ item.sectorName }}
                  </div>
                  <div
                    class="text-right q-px-sm text-black cursor-pointer"
                    style="position: absolute; top: 30px"
                    @click="showDetailForward(exportingISO, item)"
                  >
                    {{ item.share }}%, ${{ item.value }}B
                  </div>
                </div>
              </div>
              <div class="text-left"><b>Sector</b></div>
              <div class="text-left" style="font-size: 12px">
                Share of {{ exportingName }}'s sectoral gross exports used in
                further export production (%)
              </div>
              <div class="text-left" style="font-size: 12px">
                Contribution to partner exports ($)
              </div>
            </div>
            <div
              class="q-mt-md"
              style="width: 100%; height: 430px"
              v-if="isShowGraphForward"
            >
              <div
                style="
                  width: 100%;
                  height: 345px;
                  border: 1px solid black;
                  border-radius: 10px;
                "
                id="forwardEconomy"
              >
                Graph
              </div>
              <div class="q-pt-md text-center">
                <q-btn
                  label="Back to main chart"
                  no-caps
                  outline
                  @click="isShowGraphForward = false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { serverSetup } from "../../pages/server.js";
import { countryName } from "../../pages/countryName.js";
const { serverData } = serverSetup();

const props = defineProps({
  dataSend: {
    type: Object,
    required: true,
  },
});

const exportingName = ref("");
const exportingISO = ref("");
const year = ref("");
const backwardFinal = ref([]);
const isShowGraphBack = ref(false);
const forwardFinal = ref([]);
const isShowGraphForward = ref(false);
const sectorList = ref([]);
const showData = ref(true);

const loadData = async () => {
  showData.value = true;
  sectorList.value = [];
  let resSector = await axios.get(serverData.value + "va/getSector.php");

  resSector.data.forEach((x) => {
    if (x.shortname) {
      let tempData = {
        name: x.name,
        shortname: x.shortname,
      };
      sectorList.value.push(tempData);
    }
  });
  backwardFinal.value = [];
  forwardFinal.value = [];
  let dataTemp = {
    exp_country: exportingISO.value,
    year: Number(year.value),
  };
  let url = serverData.value + "va/gvcloaddata2.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  if (res.data.length == 0) {
    console.log("No data available");
    showData.value = false;
    return;
  }
  let backwardData = res.data.filter((x) => x.var == "Backward linkages");
  backwardData.sort((a, b) => Number(a.value) - Number(b.value));
  backwardData.forEach((item) => {
    let shortName = sectorList.value.filter((x) => x.name == item.exp_sector);

    let temp = {
      fullName: item.exp_sector,
      sectorName: shortName[0].shortname,
      share: (Number(item.share) * 100).toFixed(2),
      value: Number(item.value / 1000).toFixed(2),
      widthRatio: (Number(item.value) / Number(backwardData[4].value)) * 100,
    };
    backwardFinal.value.push(temp);
  });
  let forwardData = res.data.filter((x) => x.var == "Forward linkages");
  forwardData.sort((a, b) => Number(a.value) - Number(b.value));
  forwardData.forEach((item) => {
    console.log(item.exp_sector);
    let shortName = sectorList.value.filter((x) => x.name == item.exp_sector);

    let temp = {
      fullName: item.exp_sector,
      sectorName: shortName[0].shortname,
      share: (Number(item.share) * 100).toFixed(2),
      value: Number(item.value / 1000).toFixed(2),
      widthRatio: (Number(item.value) / Number(forwardData[4].value)) * 100,
    };
    forwardFinal.value.push(temp);
  });
};

const showDetailBack = async (eco, item) => {
  let tempSend = {
    exp_country: eco,
    year: Number(year.value),
    sector: item.fullName,
  };
  console.log(tempSend);
  let url = serverData.value + "va/gvcloaddata2a.php";
  let res = await axios.post(url, JSON.stringify(tempSend));

  let result = res.data
    .filter((x) => x.var == "Backward linkages")
    .sort((a, b) => Number(b.value) - Number(a.value));
  isShowGraphBack.value = true;
  let setColor = ["#E41A1C", "#377EB8", "#4DAF4A", "#FF7F00", "#984EA3"];
  let datax = [
    result[0].source_country,
    result[1].source_country,
    result[2].source_country,
    result[3].source_country,
    result[4].source_country,
  ];
  let dataxFullName = [
    countryName(datax[0])[0].country,
    countryName(datax[1])[0].country,
    countryName(datax[2])[0].country,
    countryName(datax[3])[0].country,
    countryName(datax[4])[0].country,
  ];
  let datay = [];
  for (let i = 0; i < 5; i++) {
    let valueData = Number(Number(result[i].value).toFixed(0));
    datay.push(valueData);
  }

  setTimeout(() => {
    Highcharts.chart("backwardEconomy", {
      chart: {
        type: "column",
      },
      title: {
        text: item.sectorName,
      },
      subtitle: {
        text: `${item.share}%, $${item.value}B`,
      },

      xAxis: {
        categories: datax,
      },
      yAxis: {
        title: {
          text: "Foreign value-added ($)",
        },
      },
      series: [
        {
          data: datay,
          colorByPoint: true,
          colors: setColor,
          dataLabels: {
            enabled: true,
            formatter: function () {
              return `$${Highcharts.numberFormat(this.y, 0)}M`;
            },
            style: {
              fontWeight: "bold",
              color: "#000000",
            },
            verticalAlign: "bottom", // Adjust this if necessary
            align: "center", // Align labels in the center of the bars
          },
        },
      ],
      plotOptions: {
        column: {
          colors: setColor,
        },
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        useHTML: true, // Enable HTML in the tooltip
        formatter: function () {
          return `<span style="color:${setColor[this.point.index]}"><b>${
            dataxFullName[this.point.index]
          }</b></span>: $${Highcharts.numberFormat(this.y, 0)}M`;
        },
      },
      exporting: {
        enabled: false,
      },
    });
  }, 0);
};

const showDetailForward = async (eco, item) => {
  let tempSend = {
    exp_country: eco,
    year: Number(year.value),
    sector: item.fullName,
  };
  let url = serverData.value + "va/gvcloaddata2a.php";
  let res = await axios.post(url, JSON.stringify(tempSend));
  let result = res.data
    .filter((x) => x.var == "Forward linkages")
    .sort((a, b) => Number(b.value) - Number(a.value));
  let setColor = ["#E41A1C", "#377EB8", "#4DAF4A", "#FF7F00", "#984EA3"];
  let datax = [
    result[0].imp_country,
    result[1].imp_country,
    result[2].imp_country,
    result[3].imp_country,
    result[4].imp_country,
  ];
  let dataxFullName = [
    countryName(datax[0])[0].country,
    countryName(datax[1])[0].country,
    countryName(datax[2])[0].country,
    countryName(datax[3])[0].country,
    countryName(datax[4])[0].country,
  ];
  let datay = [];
  for (let i = 0; i < 5; i++) {
    let valueData = Number(Number(result[i].value).toFixed(0));
    datay.push(valueData);
  }

  isShowGraphForward.value = true;

  setTimeout(() => {
    Highcharts.chart("forwardEconomy", {
      chart: {
        type: "column",
      },
      title: {
        text: item.sectorName,
      },
      subtitle: {
        text: `${item.share}%, $${item.value}B`,
      },

      xAxis: {
        categories: datax,
      },
      yAxis: {
        title: {
          text: "Contribution to partner exports ($)",
        },
      },
      series: [
        {
          data: datay,
          colorByPoint: true,
          colors: setColor,
          dataLabels: {
            enabled: true,
            formatter: function () {
              return `$${Highcharts.numberFormat(this.y, 0)}M`;
            },
            style: {
              fontWeight: "bold",
              color: "#000000",
            },
            verticalAlign: "bottom", // Adjust this if necessary
            align: "center", // Align labels in the center of the bars
          },
        },
      ],
      plotOptions: {
        column: {
          colors: setColor,
        },
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        useHTML: true, // Enable HTML in the tooltip
        formatter: function () {
          return `<span style="color:${setColor[this.point.index]}"><b>${
            dataxFullName[this.point.index]
          }</b></span>: $${Highcharts.numberFormat(this.y, 0)}M`;
        },
      },
      exporting: {
        enabled: false,
      },
    });
  }, 0);
};

watch(
  () => ({
    exportingISO: props.dataSend.exportingISO,
    exportingName: props.dataSend.exportingName,
    year: props.dataSend.year,
  }),
  (newVal, oldVal) => {
    if (
      newVal.exportingISO.length > 0 &&
      newVal.exportingName.length > 0 &&
      newVal.year.length > 0
    ) {
      exportingISO.value = props.dataSend.exportingISO;
      exportingName.value = props.dataSend.exportingName;
      year.value = props.dataSend.year;
      loadData();
    } else {
      showData.value = false;
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.txtGreen {
  color: #2d9687;
}
.txtRed {
  color: #eb1e63;
}
.barGreen {
  height: 60px;
  background-color: #2d9687;
  color: black;
}
.barRed {
  height: 60px;
  background-color: #eb1e63;
  color: black;
}
</style>
