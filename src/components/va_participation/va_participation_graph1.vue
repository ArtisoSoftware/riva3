<template>
  <div>
    <div v-show="!showData" class="text-center text-h5">
      <div class="text-black q-pt-md q-px-lg">
        <b
          >How much of {{ dataSend.exportingName }}'s exports of
          {{ dataSend.sectorName }} to {{ dataSend.importingName }} are GVC
          related compared across {{ groupName }} economics?</b
        >
      </div>
      <div class="q-py-xl row justify-center">
        <div>
          <img
            src="../../../public/images/warning.png"
            alt=""
            style="height: 50px"
          />
        </div>
        <div
          style="line-height: 50px"
          class="q-pl-lg text-black"
          v-show="showNoData"
        >
          No data available
        </div>
        <div
          style="line-height: 50px"
          class="q-pl-lg text-black"
          v-show="showSmallExport"
        >
          Graph unavailable due to negligible export values
        </div>
      </div>
    </div>
    <div id="container3" v-show="showData"></div>
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
const dataInput = ref({
  exportingISO: "",
  exportingName: "",
  importingISO: "",
  importingName: "",
  year: "",
  sectorName: "",
});
const dataGraph = ref([]);
const SkyOutput = ref([]);
const blueOutput = ref([]);
const purpleOutput = ref([]);
const redOutput = ref([]);
const orangeOutput = ref([]);
const greenOutput = ref([]);
const showData = ref(true);
const showNoData = ref(false);
const showSmallExport = ref(false);
const groupName = ref("");

const loadData = async () => {
  showData.value = true;
  showNoData.value = false;
  showSmallExport.value = false;
  dataGraph.value = [];
  SkyOutput.value = [];
  blueOutput.value = [];
  purpleOutput.value = [];
  redOutput.value = [];
  orangeOutput.value = [];
  greenOutput.value = [];
  let url0 = serverData.value + "/va/getEco.php";
  let res0 = await axios.get(url0);
  let temp0 = res0.data.filter((x) => x.iso == dataInput.value.exportingISO);
  groupName.value = temp0[0].group;
  let dataTemp = {
    exp_country: dataInput.value.exportingISO,
    imp_country: dataInput.value.importingISO,
    exp_sector: dataInput.value.sectorName,
    year: dataInput.value.year,
  };
  let url = serverData.value + "/va/strloaddata3.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  console.log(res.data);

  if (res.data == null) {
    console.log("No data available");
    showData.value = false;
    showNoData.value = true;
    return;
  }
  if (res.data.reduce((sum, item) => sum + parseFloat(item.value), 0) == 0) {
    console.log("Graph unavailable due to negligible export values");
    showData.value = false;
    showSmallExport.value = true;
    return;
  }
  let resultFromDatabase = res.data;
  let regionData = res.data[0].group;
  let countryListISO = [...new Set(resultFromDatabase.map((x) => x.iso))];
  let countryListName = [];
  countryListISO.forEach((x) => {
    countryListName.push(countryName(x)[0].country);
    {
      let dataAdd = resultFromDatabase.filter(
        (y) => y.var == "Final_directly_consumed" && y.iso == x
      );
      blueOutput.value.push({
        value: dataAdd[0].value,
        y: dataAdd[0].percentData,
      });
    }

    {
      let dataAdd = resultFromDatabase.filter(
        (y) => y.var == "Intermediate_directly_consumed" && y.iso == x
      );
      SkyOutput.value.push({
        value: dataAdd[0].value,
        y: dataAdd[0].percentData,
      });
    }

    {
      let dataAdd = resultFromDatabase.filter(
        (y) => y.var == "Double_counted_exports" && y.iso == x
      );
      purpleOutput.value.push({
        value: dataAdd[0].value,
        y: dataAdd[0].percentData,
      });
    }

    {
      let dataAdd = resultFromDatabase.filter(
        (y) => y.var == "Forward_linkages" && y.iso == x
      );
      redOutput.value.push({
        value: dataAdd[0].value,
        y: dataAdd[0].percentData,
      });
    }

    {
      let dataAdd = resultFromDatabase.filter(
        (y) => y.var == "Forward_linkages2" && y.iso == x
      );
      orangeOutput.value.push({
        value: dataAdd[0].value,
        y: dataAdd[0].percentData,
      });
    }

    {
      let dataAdd = resultFromDatabase.filter(
        (y) => y.var == "Backward_linkages" && y.iso == x
      );
      greenOutput.value.push({
        value: dataAdd[0].value,
        y: dataAdd[0].percentData,
      });
    }
  });

  // console.log(countryListName);
  // console.log(redOutput.value);
  setTimeout(() => {
    Highcharts.chart("container3", {
      chart: {
        type: "column",
        height: (9 / 16) * 100 + "%", // 16:9 ratio
      },
      title: {
        style: {
          fontSize: "24px",
          fontFamily: "roboto",
        },
        text: `How much of ${dataInput.value.exportingName}'s exports of ${dataInput.value.sectorName} to ${dataInput.value.importingName} are GVC related compared across ${regionData} economies?`,
      },
      xAxis: {
        labels: {
          rotation: -90,
          style: {
            fontSize: "14px",
          },
        },

        categories: countryListName,
      },
      yAxis: {
        min: 0,

        title: {
          text: `% of gross exports to ${dataInput.value.importingName}`,
          style: {
            fontSize: "14px",
          },
          stackLabels: {
            enabled: false,
            style: {
              fontWeight: "bold",
              color:
                // theme
                (Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
                "gray",
            },
          },
        },
      },
      tooltip: {
        useHTML: true,
        headerFormat: "<b>{point.x}</b><br/>",

        // pointFormat: "<div>{series.name}</div><div>Share: {point.y}%</div><div>Value: " + this + "</div>",

        pointFormatter: function () {
          return (
            // "<div> <span class=''>" + this.series.name + "</span>" +
            // "<br>" +
            // "Share: $" +
            // this.y +
            // "%" +
            // "</div>"

            `<div>
                <span>
                  ${this.series.name}
                </span>
                <br>
                Share : ${this.y}%
                <br>
                Value : $${this.options.value}
              </div>`
          );
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: `Domestic production used in<br> the importer's exports`,
          data: redOutput.value,
          color: "#EB1E63",
        },
        {
          name: `Domestic production that returns <br> via the importer's exports`,
          data: orangeOutput.value,
          color: "#f99704",
        },
        {
          name: "Double counted exports from <br>repeated border crossings",
          data: purpleOutput.value,
          color: "#9C26B3",
        },
        {
          name: `Foreign production consumed <br> by the importer`,
          data: greenOutput.value,
          color: "#2D9687",
        },
      ],
      plotOptions: {
        column: {
          stacking: "normal",
          dataLabels: {
            enabled: false,
          },
        },
      },
      legend: {
        useHTML: true,
        itemStyle: {
          fontSize: "14px",
          fontWeight: "medium",
          fontFamily: "roboto",
          color: "#00000",
        },
        width: 350,
        layout: "vertical",
        enabled: true,
        align: "right",
        verticalAlign: "middle",
        itemMarginTop: 25,
        symbolHeight: 15,
        symbolWidth: 50,
        symbolRadius: 0,
      },
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [
              "downloadPNG",
              "downloadJPEG",
              "separator",
              "downloadCSV",
              "downloadXLS",
            ],
          },
        },
        width: "1920px",
        chartOptions: {
          legend: {
            width: 120,
            itemMarginTop: 5,
            symbolWidth: 10,
            symbolHeight: 10,
            symbolRadius: 0,

            itemStyle: {
              fontSize: "6px",
              fontWeight: "medium",
              fontFamily: "roboto",
              color: "#00000",
            },
          },
          title: {
            style: { fontSize: "12px" },
          },
          subtitle: {
            style: { fontSize: "8px" },
          },
          // yAxis: [
          //   {
          //     title: {
          //       text: `% of gross exports to ${this.importingSelected.label}`,
          //       style: {
          //         fontSize: "16px"
          //       }
          //     }
          //   }
          // ],
          xAxis: [
            {
              categories: countryListName,
              labels: {
                rotation: -45,
                style: { fontSize: "6px" },
              },
            },
          ],
          yAxis: {
            min: 0,
            max: 100,
            title: {
              text: `% of gross exports to ${dataInput.value.importingName}`,
              style: {
                fontSize: "6px",
              },
            },
            labels: {
              style: {
                fontSize: "6px", // ปรับขนาดตัวหนังสือที่นี่
              },
            },
          },
        },
      },
    });
  }, 1);
};

watch(
  () => ({
    exportingISO: props.dataSend.exportingISO,
    exportingName: props.dataSend.exportingName,
    importingName: props.dataSend.importingName,
    importingISO: props.dataSend.importingISO,
    year: props.dataSend.year,
    sectorName: props.dataSend.sectorName,
  }),
  (newVal, oldVal) => {
    if (
      newVal.exportingISO.length > 0 &&
      newVal.importingISO.length > 0 &&
      newVal.year.length > 0 &&
      newVal.sectorName.length > 0
    ) {
      dataInput.value.exportingISO = props.dataSend.exportingISO;
      dataInput.value.exportingName = props.dataSend.exportingName;
      dataInput.value.importingISO = props.dataSend.importingISO;
      dataInput.value.importingName = props.dataSend.importingName;
      dataInput.value.year = props.dataSend.year;
      dataInput.value.sectorName = props.dataSend.sectorName;
      loadData();
    } else {
      showData.value = false;
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped></style>
