<template>
  <div>
    <div v-show="!showData" class="text-center text-h5">
      <div class="text-black q-pt-md">
        <b
          >Where do {{ dataInput.exportingName }} economies contribute the most
          towards export production ({{ dataInput.sectorName }})?</b
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
        <div style="line-height: 50px" class="q-pl-lg" v-show="showNoData">
          No data available
        </div>
        <div style="line-height: 50px" class="q-pl-lg" v-show="showSmallExport">
          Graph unavailable due to negligible export values
        </div>
      </div>
    </div>
    <div v-show="showData">
      <div id="container2">Graph2</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { serverSetup } from "../../pages/server.js";

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
  year: "",
  sectorName: "",
});
const showData = ref(true);
const showNoData = ref(false);
const showSmallExport = ref(false);
const totalSmall = ref("");
const totalLarge = ref("");
const region = ref("");
const exportISOList = ref([]);
const exportNameList = ref([]);
const chart2AsiaPacific = ref([]);
const chart2Europe = ref([]);
const chart2NorthAmerica = ref([]);
const chart2LatinAmerica = ref([]);
const chart2RestOfTheWorld = ref([]);
const chart2DrillDown = ref([]);

const calculateSum = (data, expCountry, area) => {
  return data.reduce(
    (acc, curr) => {
      if (curr.exp_country === expCountry && curr.area === area) {
        acc.y += parseFloat(curr.share);
        acc.value += parseFloat(curr.value);
      }
      return acc;
    },
    { y: 0, value: 0 }
  );
};

const loadData = async () => {
  showData.value = true;
  showNoData.value = false;
  showSmallExport.value = false;
  region.value = "";
  exportISOList.value = [];
  exportNameList.value = [];
  chart2AsiaPacific.value = [];
  chart2Europe.value = [];
  chart2NorthAmerica.value = [];
  chart2LatinAmerica.value = [];
  chart2RestOfTheWorld.value = [];
  chart2DrillDown.value = [];

  let url0 = serverData.value + "va/getEcoList.php";
  let res0 = await axios.get(url0);
  let countryData = res0.data;
  let exportingData = countryData.filter(
    (x) => x.iso == dataInput.value.exportingISO
  );

  if (exportingData.length > 0) {
    region.value = exportingData[0].region;
    let groupData = countryData.filter((x) => x.region == region.value);
    exportISOList.value = groupData.map((x) => x.iso);
    exportNameList.value = groupData.map((x) => x.economic);
  } else {
    let urlA = serverData.value + "cc/getEcoGroup.php";
    let resA = await axios.get(urlA);
    let groupData = resA.data.filter(
      (x) => x.iso == dataInput.value.exportingISO
    );
    region.value = groupData[0].economyGroup;
    exportISOList.value = groupData[0].ecoList
      .split(", ")
      .map((country) => country.trim());
    exportNameList.value = exportISOList.value
      .map((isoCode) => {
        const country = countryData.find((country) => country.iso === isoCode);
        return country ? country.economic : null;
      })
      .filter((name) => name !== null);
  }

  let dataTemp = {
    exp_country: exportISOList.value,
    exp_sector: dataInput.value.sectorName,
    year: dataInput.value.year,
  };

  let url = serverData.value + "/va/forwardSector1.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  let dataResult = res.data;
  if (dataResult.length == 0) {
    showNoData.value = true;
    showData.value = false;
    console.log("No data avaialble");
    return;
  }

  dataResult.forEach((item) => {
    const country = countryData.find(
      (country) => country.iso === item.imp_country
    );
    if (country) {
      item.area = country.area;
    } else {
      item.area = "Rest of the world"; // กรณีไม่พบข้อมูลที่ตรงกัน
    }
  });

  const promises = exportISOList.value.map(async (expCountry, index) => {
    let dataTemp = {
      exp_country: expCountry,
      imp_country: "WLD",
      exp_sector: dataInput.value.sectorName,
      year: dataInput.value.year,
    };
    let url = serverData.value + "/va/strloaddata1.php";
    let res = await axios.post(url, JSON.stringify(dataTemp));

    if (res.data.length > 0) {
      let totalExport = Number(res.data[0].total_exports);

      {
        let temp = calculateSum(dataResult, expCountry, "Asia-Pacific");
        let tempInput = {
          drilldown: exportNameList.value[index] + " - Asia-Pacific",
          name: exportNameList.value[index],
          value: Number(temp.value.toFixed(2)),
          y: Number(((temp.value / totalExport) * 100).toFixed(2)),
        };
        chart2AsiaPacific.value.push(tempInput);
        let tempDrillDown = dataResult.filter(
          (x) => x.exp_country == expCountry && x.area == "Asia-Pacific"
        );
        let dataDrillDown = [];
        let dataInside = [];
        dataDrillDown.id = tempInput.drilldown;
        dataDrillDown.name = tempInput.name;
        dataDrillDown.type = "pie";
        tempDrillDown.forEach((dataRaw) => {
          let countryNameDrill = "";
          let countryNameData = countryData.find(
            (country) => country.iso === dataRaw.imp_country
          );
          if (countryNameData) {
            countryNameDrill = countryNameData.economic;
          } else {
            countryNameDrill = "Rest of the world"; // กรณีไม่พบข้อมูลที่ตรงกัน
          }
          let tempInput = {
            name: countryNameDrill,
            value: Number(Number(dataRaw.value).toFixed(2)),
            y: Number(Number((dataRaw.value / totalExport) * 100).toFixed(2)),
          };
          dataInside.push(tempInput);
        });
        dataDrillDown.data = dataInside;
        chart2DrillDown.value.push(dataDrillDown);
      }

      {
        let temp = calculateSum(dataResult, expCountry, "Europe");
        let tempInput = {
          drilldown: exportNameList.value[index] + " - Europe",
          name: exportNameList.value[index],
          value: Number(temp.value.toFixed(2)),
          y: Number(((temp.value / totalExport) * 100).toFixed(2)),
        };
        chart2Europe.value.push(tempInput);

        let tempDrillDown = dataResult.filter(
          (x) => x.exp_country == expCountry && x.area == "Europe"
        );
        let dataDrillDown = [];
        let dataInside = [];
        dataDrillDown.id = tempInput.drilldown;
        dataDrillDown.name = tempInput.name;
        dataDrillDown.type = "pie";
        tempDrillDown.forEach((dataRaw) => {
          let countryNameDrill = "";
          let countryNameData = countryData.find(
            (country) => country.iso === dataRaw.imp_country
          );
          if (countryNameData) {
            countryNameDrill = countryNameData.economic;
          } else {
            countryNameDrill = "Rest of the world"; // กรณีไม่พบข้อมูลที่ตรงกัน
          }
          let tempInput = {
            name: countryNameDrill,
            value: Number(Number(dataRaw.value).toFixed(2)),
            y: Number(Number((dataRaw.value / totalExport) * 100).toFixed(2)),
          };
          dataInside.push(tempInput);
        });
        dataDrillDown.data = dataInside;
        chart2DrillDown.value.push(dataDrillDown);
      }

      {
        let temp = calculateSum(dataResult, expCountry, "North America");
        let tempInput = {
          drilldown: exportNameList.value[index] + " - North America",
          name: exportNameList.value[index],
          value: Number(temp.value.toFixed(2)),
          y: Number(((temp.value / totalExport) * 100).toFixed(2)),
        };
        chart2NorthAmerica.value.push(tempInput);

        let tempDrillDown = dataResult.filter(
          (x) => x.exp_country == expCountry && x.area == "North America"
        );
        let dataDrillDown = [];
        let dataInside = [];
        dataDrillDown.id = tempInput.drilldown;
        dataDrillDown.name = tempInput.name;
        dataDrillDown.type = "pie";
        tempDrillDown.forEach((dataRaw) => {
          let countryNameDrill = "";
          let countryNameData = countryData.find(
            (country) => country.iso === dataRaw.imp_country
          );
          if (countryNameData) {
            countryNameDrill = countryNameData.economic;
          } else {
            countryNameDrill = "Rest of the world"; // กรณีไม่พบข้อมูลที่ตรงกัน
          }
          let tempInput = {
            name: countryNameDrill,
            value: Number(Number(dataRaw.value).toFixed(2)),
            y: Number(Number((dataRaw.value / totalExport) * 100).toFixed(2)),
          };
          dataInside.push(tempInput);
        });
        dataDrillDown.data = dataInside;
        chart2DrillDown.value.push(dataDrillDown);
      }

      {
        let temp = calculateSum(dataResult, expCountry, "Latin America");
        let tempInput = {
          drilldown: exportNameList.value[index] + " - Latin America",
          name: exportNameList.value[index],
          value: Number(temp.value.toFixed(2)),
          y: Number(((temp.value / totalExport) * 100).toFixed(2)),
        };
        chart2LatinAmerica.value.push(tempInput);

        let tempDrillDown = dataResult.filter(
          (x) => x.exp_country == expCountry && x.area == "Latin America"
        );
        let dataDrillDown = [];
        let dataInside = [];
        dataDrillDown.id = tempInput.drilldown;
        dataDrillDown.name = tempInput.name;
        dataDrillDown.type = "pie";
        tempDrillDown.forEach((dataRaw) => {
          let countryNameDrill = "";
          let countryNameData = countryData.find(
            (country) => country.iso === dataRaw.imp_country
          );
          if (countryNameData) {
            countryNameDrill = countryNameData.economic;
          } else {
            countryNameDrill = "Rest of the world"; // กรณีไม่พบข้อมูลที่ตรงกัน
          }
          let tempInput = {
            name: countryNameDrill,
            value: Number(Number(dataRaw.value).toFixed(2)),
            y: Number(Number((dataRaw.value / totalExport) * 100).toFixed(2)),
          };
          dataInside.push(tempInput);
        });
        dataDrillDown.data = dataInside;
        chart2DrillDown.value.push(dataDrillDown);
      }

      {
        let temp = calculateSum(dataResult, expCountry, "Rest of the world");
        let tempInput = {
          drilldown: exportNameList.value[index] + " - Rest of the world",
          name: exportNameList.value[index],
          value: Number(temp.value.toFixed(2)),
          y: Number(((temp.value / totalExport) * 100).toFixed(2)),
        };
        chart2RestOfTheWorld.value.push(tempInput);

        let tempDrillDown = dataResult.filter(
          (x) => x.exp_country == expCountry && x.area == "Rest of the world"
        );
        let dataDrillDown = [];
        let dataInside = [];
        dataDrillDown.id = tempInput.drilldown;
        dataDrillDown.name = tempInput.name;
        dataDrillDown.type = "pie";
        tempDrillDown.forEach((dataRaw) => {
          let countryNameDrill = "";
          let countryNameData = countryData.find(
            (country) => country.iso === dataRaw.imp_country
          );
          if (countryNameData) {
            countryNameDrill = countryNameData.economic;
          } else {
            countryNameDrill = "Rest of the world"; // กรณีไม่พบข้อมูลที่ตรงกัน
          }
          let tempInput = {
            name: countryNameDrill,
            value: Number(Number(dataRaw.value).toFixed(2)),
            y: Number(Number((dataRaw.value / totalExport) * 100).toFixed(2)),
          };
          dataInside.push(tempInput);
        });
        dataDrillDown.data = dataInside;
        chart2DrillDown.value.push(dataDrillDown);
      }
    }
  });
  await Promise.all(promises);
  chart2DrillDown.value = chart2DrillDown.value.map((item) => {
    return {
      ...item,
      data: item.data.filter((dataItem) => dataItem.y !== 0),
    };
  });

  setTimeout(() => {
    var chart = Highcharts.chart(
      "container2",
      {
        chart: {
          type: "column",
          height: (9 / 16) * 100 + "%", // 16:9 ratio
          style: { fontFamily: "roboto" },
          events: {
            drilldown: function (e) {
              chart.setTitle({
                text: `Where does ${e.point.name} contribute the most towards export production (${dataInput.value.sectorName})?`,
              });
              chart.setSubtitle({
                text: "",
              });
            },
            drillup: function (e) {
              chart.xAxis[0].update(
                {
                  categories: exportNameList.value,
                  labels: {
                    rotation: -90,
                  },
                  type: "category",
                },
                true
              ); // redraw the chart with updated xAxis categories
              chart.setTitle({
                text: `Where do ${region.value} economies contribute the most towards export production (${dataInput.value.sectorName})?`,
              });
              chart.setSubtitle({
                text: "Click on a bar to see the individual economies associated with a region.",
              });
            },
          },
        },
        xAxis: {
          labels: {
            rotation: -90,
          },
          type: "category",
        },
        credits: {
          enabled: false,
        },
        title: {
          style: {
            fontSize: "24px",
          },

          text: `Where do ${region.value} economies contribute the most towards export production (${dataInput.value.sectorName})?`,
        },
        subtitle: {
          style: {
            fontSize: "16px",
          },

          text: `Click on a bar to see the individual economies associated with a region.`,
        },
        yAxis: {
          min: 0,
          title: {
            text: `% of gross exports to ${dataInput.value.importingName}`,
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
        legend: {
          useHTML: true,
          itemStyle: {
            fontSize: "14px",
            fontWeight: "medium",
            fontFamily: "roboto",
            color: "#00000",
          },
          align: "right",
          verticalAlign: "middle",
          width: 200,
          itemMarginTop: 25,
          symbolHeight: 15,
          symbolWidth: 50,
          symbolRadius: 0,
        },
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
              enabled: false,
            },
          },
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
            title: {
              style: { fontSize: "12px" },
            },
            subtitle: {
              style: { fontSize: "8px" },
            },
            legend: {
              width: 120,
              itemMarginTop: 20,
              symbolWidth: 10,
              symbolHeight: 10,
              symbolRadius: 0,

              itemStyle: {
                fontSize: "7px",
                fontWeight: "medium",
                fontFamily: "roboto",
                color: "#00000",
              },
            },
            yAxis: [
              {
                title: {
                  text: `% of gross exports to ${dataInput.value.importingName}`,
                  style: { fontSize: "6px" },
                },
                labels: {
                  style: { fontSize: "6px" },
                },
              },
            ],
            xAxis: [
              {
                labels: {
                  style: { fontSize: "6px" },
                },
                type: "category",
              },
            ],
          },
        },

        tooltip: {
          formatter: function () {
            if (
              this.series.name == "Asia-Pacific" ||
              this.series.name == "Europe" ||
              this.series.name == "Latin America" ||
              this.series.name == "North America" ||
              this.series.name == "Rest of the world"
            ) {
              if (this.point.value >= 1000) {
                let tempNumber = (this.point.value / 1000).toFixed(1);
                return `<b>${this.point.name}</b><br>${this.series.name}<br>Value: $${tempNumber} billion<br>Share: ${this.y}%`;
              } else {
                let tempNumber = this.point.value.toFixed(1);
                return `<b>${this.point.name}</b><br>${this.series.name}<br>Value: $${tempNumber} million<br>Share: ${this.y}%`;
              }
            } else {
              if (this.point.value >= 1000) {
                let tempNumber = (this.point.value / 1000).toFixed(1);
                return `<b>${this.point.name}</b><br>Value: $${tempNumber} billion<br>Share: ${this.y}%`;
              } else {
                let tempNumber = this.point.value.toFixed(1);
                return `<b>${this.point.name}</b><br>Value: $${tempNumber} million<br>Share: ${this.y}%`;
              }
            }
          },
        },

        series: [
          {
            name: "Asia-Pacific",
            data: chart2AsiaPacific.value,
            color: "#2381B8",
          },
          {
            name: "Europe",
            data: chart2Europe.value,
            color: "#EB1E63",
          },
          {
            name: "North America",
            data: chart2NorthAmerica.value,
            color: "#f99704",
          },
          {
            name: "Latin America",
            data: chart2LatinAmerica.value,
            color: "#2D9687",
          },
          {
            name: "Rest of the world",
            data: chart2RestOfTheWorld.value,
            color: "#9C26B3",
          },
        ],
        drilldown: {
          activeDataLabelStyle: {
            color: "white",
            textShadow: "0 0 2px black, 0 0 2px black",
          },
          showInLegend: false,
          series: chart2DrillDown.value,
        },
      },
      (Highcharts.Tick.prototype.drillable = function () {})
    );
  }, 1);
};

const showCountryName = (x, countryData) => {
  let countryNameText = "";
  if (x.imp_country == "RoW") {
    countryNameText = "Rest of the World";
  } else {
    let dataFind = countryData.filter((datax) => datax.iso == x.imp_country);
    countryNameText = dataFind[0].economic;
  }
  return countryNameText;
};

watch(
  () => ({
    exportingISO: props.dataSend.exportingISO,
    exportingName: props.dataSend.exportingName,
    year: props.dataSend.year,
    sectorName: props.dataSend.sectorName,
  }),
  (newVal, oldVal) => {
    if (
      newVal.exportingISO.length > 0 &&
      newVal.year.length > 0 &&
      newVal.sectorName.length > 0
    ) {
      dataInput.value.exportingISO = props.dataSend.exportingISO;
      dataInput.value.exportingName = props.dataSend.exportingName;
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
