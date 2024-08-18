<template>
  <div id="container"></div>
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
  importingISO: "",
  importingName: "",
  year: "",
  sectorName: "",
});

const dataPercent = ref({
  blue: 0,
  sky: 0,
  purple: 0,
  green: 0,
  red: 0,
  orange: 0,
});
const dataGraph = ref([]);

const loadData = async () => {
  dataGraph.value = [];
  let dataTemp = {
    exp_country: dataInput.value.exportingISO,
    imp_country: dataInput.value.importingISO,
    exp_sector: dataInput.value.sectorName,
    year: dataInput.value.year,
  };
  let url = serverData.value + "/va/strloaddata1.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));

  {
    let dataFinal = res.data.filter((x) => x.var == "Final_directly_consumed");
    let sharePercent = Number((Number(dataFinal[0].share) * 100).toFixed(2));
    dataPercent.value.blue = sharePercent;
    let nameGraph = `Final domestic production<br>consumed by the importer (${sharePercent}%)`;
    let colorGraph = "#2381B8";
    let valueGraph = Number(Number(dataFinal[0].value).toFixed(2));
    let labelGraph = `Final output produced in ${dataInput.value.exportingName} -<br>consumed in ${dataInput.value.importingName}`;
    let dataAdd = {
      name: nameGraph,
      value: valueGraph,
      color: colorGraph,
      label: labelGraph,
    };
    dataGraph.value.push(dataAdd);
  }

  {
    let dataFinal = res.data.filter(
      (x) => x.var == "Intermediate_directly_consumed"
    );
    let sharePercent = Number((Number(dataFinal[0].share) * 100).toFixed(2));
    dataPercent.value.sky = sharePercent;
    let nameGraph = `Intermediate domestic production<br>consumed by the importer (${sharePercent}%)`;
    let colorGraph = "#37C9D2";
    let valueGraph = Number(Number(dataFinal[0].value).toFixed(2));
    let labelGraph = `Intermediate output produced in<br>${dataInput.value.exportingName} - consumed in<br>${dataInput.value.importingName}`;
    let dataAdd = {
      name: nameGraph,
      value: valueGraph,
      color: colorGraph,
      label: labelGraph,
    };
    dataGraph.value.push(dataAdd);
  }

  {
    let dataFinal = res.data.filter((x) => x.var == "Double_counted_exports");
    let sharePercent = Number((Number(dataFinal[0].share) * 100).toFixed(2));
    dataPercent.value.purple = sharePercent;
    let nameGraph = `Double counted (${sharePercent}%)`;
    let colorGraph = "#9C26B3";
    let valueGraph = Number(Number(dataFinal[0].value).toFixed(2));
    let labelGraph = "Double counted exports from<br>repeated border crossings";
    let dataAdd = {
      name: nameGraph,
      value: valueGraph,
      color: colorGraph,
      label: labelGraph,
    };
    dataGraph.value.push(dataAdd);
  }

  {
    let dataFinal = res.data.filter((x) => x.var == "Backward_linkages");
    let sharePercent = Number((Number(dataFinal[0].share) * 100).toFixed(2));
    dataPercent.value.green = sharePercent;
    let nameGraph = `Foreign production consumed by<br>the importer (${sharePercent}%)`;
    let colorGraph = "#2D9687";
    let valueGraph = Number(Number(dataFinal[0].value).toFixed(2));
    let labelGraph = `Produced abroad (used in<br>${dataInput.value.exportingName} - consumed in<br>${dataInput.value.importingName}`;
    let dataAdd = {
      name: nameGraph,
      value: valueGraph,
      color: colorGraph,
      label: labelGraph,
    };
    dataGraph.value.push(dataAdd);
  }

  {
    let dataFinal = res.data.filter((x) => x.var == "Forward_linkages");
    let sharePercent = Number((Number(dataFinal[0].share) * 100).toFixed(2));
    dataPercent.value.red = sharePercent;
    let nameGraph = `Domestic production used in<br>the importer's exports (${sharePercent}%)`;
    let colorGraph = "#EB1E63";
    let valueGraph = Number(Number(dataFinal[0].value).toFixed(2));
    let labelGraph = `Produced in ${dataInput.value.exportingName} - used in<br>${dataInput.value.importingName}'s exports`;
    let dataAdd = {
      name: nameGraph,
      value: valueGraph,
      color: colorGraph,
      label: labelGraph,
    };
    dataGraph.value.push(dataAdd);
  }

  {
    let dataFinal = res.data.filter((x) => x.var == "Forward_linkages2");
    let sharePercent = Number((Number(dataFinal[0].share) * 100).toFixed(2));
    dataPercent.value.orange = sharePercent;
    let nameGraph = `Domestic production that returns<br>via the importer's exports (${sharePercent}%)`;
    let colorGraph = "#F99704";
    let valueGraph = Number(Number(dataFinal[0].value).toFixed(2));
    let labelGraph = `Produced in ${dataInput.value.exportingName} - used in<br>${dataInput.value.importingName}'s exports consumed in<br>${dataInput.value.exportingName}`;
    let dataAdd = {
      name: nameGraph,
      value: valueGraph,
      color: colorGraph,
      label: labelGraph,
    };
    dataGraph.value.push(dataAdd);
  }

  let exportValue = res.data[0].total_exports;
  if (exportValue > 1000) {
    exportValue = (Number(exportValue) / 100).toFixed(2) + " billion";
  } else {
    exportValue = exportValue + " million";
  }

  let dataTemp2 = {
    exp_country: dataInput.value.exportingISO,
    imp_country: "WLD",
    exp_sector: dataInput.value.sectorName,
    year: dataInput.value.year,
  };
  let res2 = await axios.post(url, JSON.stringify(dataTemp2));
  let exportValueWorld = res2.data[0].total_exports;
  if (exportValueWorld > 1000) {
    exportValueWorld = (Number(exportValueWorld) / 100).toFixed(2) + " billion";
  } else {
    exportValueWorld = exportValueWorld + " million";
  }

  setTimeout(() => {
    Highcharts.chart("container", {
      chart: {
        height: (9 / 16) * 100 + "%", // 16:9 ratio
        style: { fontFamily: "roboto" },
      },
      series: [
        {
          type: "treemap",
          layoutAlgorithm: "strip",
          data: dataGraph.value,
          showInLegend: true,
          legendType: "point",
          enabled: true,
          dataLabels: {
            enabled: true,
            formatter: function () {
              if (this.point.options.name.includes("Intermediate")) {
                if (dataPercent.value.sky > 1) {
                  return this.point.options.name;
                } else {
                  return "";
                }
              } else if (
                this.point.options.name.includes("Final domestic production")
              ) {
                if (dataPercent.value.blue > 1) {
                  return this.point.options.name;
                } else {
                  return "";
                }
              } else if (
                this.point.options.name.includes("Domestic production used")
              ) {
                if (dataPercent.value.red > 1) {
                  return this.point.options.name;
                } else {
                  return "";
                }
              } else if (
                this.point.options.name.includes(
                  "Domestic production that returns"
                )
              ) {
                if (dataPercent.value.orange > 1) {
                  return this.point.options.name;
                } else {
                  return "";
                }
              } else if (this.point.options.name.includes("Double counted")) {
                if (dataPercent.value.purple > 1) {
                  return this.point.options.name;
                } else {
                  return "";
                }
              } else if (
                this.point.options.name.includes("Foreign production consumed")
              ) {
                if (dataPercent.value.green > 1) {
                  return this.point.options.name;
                } else {
                  return "";
                }
              }
            },
          },
        },
      ],
      credits: {
        enabled: false,
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
              fontSize: "7px",
              fontWeight: "medium",
              fontFamily: "roboto",
              color: "#00000",
            },
          },
          series: [
            {
              dataLabels: {
                enabled: true,
                style: {
                  fontSize: "7px", // ขนาดฟอนต์ที่ใช้ในกราฟเมื่อ export
                },
              },
            },
          ],
          title: {
            style: { fontSize: "12px" },
          },
          subtitle: {
            style: { fontSize: "8px" },
          },
        },
      },
      title: {
        style: {
          fontSize: "24px",
        },
        text:
          "How are " +
          dataInput.value.exportingName +
          "'s exports of " +
          dataInput.value.sectorName +
          " to " +
          dataInput.value.importingName +
          " produced and utilised?",
      },
      subtitle: {
        text: `${dataInput.value.exportingName}'s gross exports to ${dataInput.value.importingName}: $${exportValue} / ${dataInput.value.exportingName}'s gross exports to World: $${exportValueWorld}`,
        align: "left",
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
        width: 350,
        itemMarginTop: 20,
        symbolWidth: 50,
        symbolHeight: 15,
        symbolRadius: 0,

        labelFormatter: function () {
          return this.label;
        },
      },
      tooltip: {
        useHTML: true,
        pointFormatter: function () {
          if (this.name.includes("Intermediate domestic")) {
            return `<div class='text-weight-bold'>Intermediate output produced in ${
              dataInput.value.exportingName
            } - consumed in ${dataInput.value.importingName}</div><div>Share: ${
              dataPercent.value.sky
            }%</div><div>Value: $${
              this.value >= 1000
                ? (this.value / 1000).toFixed(2) + " billion"
                : this.value + " million"
            } </div>`;
          } else if (this.name.includes("Final domestic")) {
            return `<div class='text-weight-bold'>Final output produced in ${
              dataInput.value.exportingName
            } - consumed in ${dataInput.value.importingName}</div><div>Share: ${
              dataPercent.value.blue
            }%</div><div>Value: $${
              this.value >= 1000
                ? (this.value / 1000).toFixed(2) + " billion"
                : this.value + " million"
            } </div>`;
          } else if (this.name.includes("Domestic production used")) {
            return `<div class='text-weight-bold'>Produced in ${
              dataInput.value.exportingName
            } - used in ${
              dataInput.value.importingName
            }'s exports</div><div>Share: ${
              dataPercent.value.red
            }%</div><div>Value: $${
              this.value >= 1000
                ? (this.value / 1000).toFixed(2) + " billion"
                : this.value + " million"
            } </div>`;
          } else if (this.name.includes("Domestic production that")) {
            return `<div class='text-weight-bold'>Produced in ${
              dataInput.value.exportingName
            } - used in  ${dataInput.value.importingName} exports consumed in ${
              dataInput.value.exportingName
            }</div><div>Share: ${dataPercent.value.orange}%</div><div>Value: $${
              this.value >= 1000
                ? (this.value / 1000).toFixed(2) + " billion"
                : this.value + " million"
            } </div>`;
          } else if (this.name.includes("Double counted")) {
            return `<div class='text-weight-bold'>Double counted exports from repeated border crossing</div><div>Share: ${
              dataPercent.value.purple
            }%</div><div>Value: $${
              this.value >= 1000
                ? (this.value / 1000).toFixed(2) + " billion"
                : this.value + " million"
            }</div>`;
          } else {
            return `<div class='text-weight-bold'>Produced abroad (used in ${
              dataInput.value.exportingName
            }'s exports) - consumed in ${
              dataInput.value.importingName
            }</div><div>Share: ${dataPercent.value.green}%</div><div>Value: $${
              this.value >= 1000
                ? (this.value / 1000).toFixed(2) + " billion"
                : this.value + " million"
            } </div>`;
          }
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
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped></style>
