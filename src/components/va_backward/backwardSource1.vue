<template>
  <div>
    <div v-show="showData">
      <div id="container3">graph1 - {{ dataSend }}</div>
      <div
        id="custom-legend"
        style="max-height: 200px; overflow-y: auto; margin-top: 20px"
      >
        <div class="row q-px-lg q-pb-md justify-center">
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #2f978b"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">Agriculture</div>
          </div>
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #9a25b1"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">Mining</div>
          </div>
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #8d243b"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">Construction</div>
          </div>
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #fa9908"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">Utilities</div>
          </div>
        </div>
        <div class="row q-px-lg q-pb-md justify-center">
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #f34336"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">
              Manufacturing Low tech
            </div>
          </div>
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #c3165b"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">
              Manufacturing High and medium tech
            </div>
          </div>
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #5e6dc1"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">
              Services Trade and repair
            </div>
          </div>
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #3f50b8"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">Serives Tourism</div>
          </div>
        </div>
        <div class="row q-px-lg q-pb-md justify-center">
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #3949ab"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">
              Services Transport
            </div>
          </div>
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #1565c0"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">Services ICT</div>
          </div>
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #19227d"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">
              Services-Property and business
            </div>
          </div>
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #43a7f5"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">
              Services Financial
            </div>
          </div>
        </div>
        <div class="row q-px-lg q-pb-md justify-center">
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #2088e7"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">
              Services Public and welfare
            </div>
          </div>
          <div class="row" style="width: 300px">
            <div
              style="width: 30px; height: 30px; background-color: #1564c0"
            ></div>
            <div class="q-pl-md" style="line-height: 30px">
              Services Private household
            </div>
          </div>
          <div class="row" style="width: 300px"></div>
          <div class="row" style="width: 300px"></div>
        </div>
      </div>
    </div>
    <div v-show="!showData" class="text-center text-h5">
      <div class="text-black q-pt-md">
        <b
          >How is {{ dataInput.sourceName }}'s value-added in
          {{ dataInput.exportingName }}'s exports to
          {{ dataInput.importingName }} distributed across sectors?</b
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
  importingISO: "",
  importingName: "",
  sourceISO: "",
  sourceName: "",
  year: "",
});

const showData = ref(true);
const showNoData = ref(false);
const showSmallExport = ref(false);
const chartRef = ref(null);

const totalLarge = ref("");

const loadData = async () => {
  if (chartRef.value?.destroy) {
    chartRef.value.destroy(); // Destroy the previous chart instance
    chartRef.value = null;
  }
  showData.value = true;
  showNoData.value = false;
  showSmallExport.value = false;
  // let url0 = serverData.value + "va/getEcoList.php";
  // let res0 = await axios.get(url0);
  // let countryData = res0.data;
  let dataTemp = {
    exp_country: dataInput.value.exportingISO,
    imp_country: dataInput.value.importingISO,
    source_country: dataInput.value.sourceISO,
    year: dataInput.value.year,
  };

  // let url1 = serverData.value + "va/getSector.php";
  // let res1 = await axios.get(url1);
  // let sectionData = res1.data;

  let url = serverData.value + "/va/backwardSource1.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  let dataResult = res.data.sort((a, b) => Number(b.value) - Number(a.value));

  if (dataResult.length == 0) {
    showNoData.value = true;
    showData.value = false;
    console.log("No data avaialble");
    return;
  }
  let dataTemp2 = {
    exp_country: dataInput.value.exportingISO,
    imp_country: dataInput.value.importingISO,
    exp_sector: "All sectors",
    year: dataInput.value.year,
  };
  let url2 = serverData.value + "/va/strloaddata1.php";
  let res2 = await axios.post(url2, JSON.stringify(dataTemp2));
  totalLarge.value = res2.data[0].total_exports;
  if (Number(totalLarge.value) > 1000) {
    totalLarge.value =
      (Number(totalLarge.value) / 1000).toFixed(2) + " billion";
  } else {
    totalLarge.value = Number(totalLarge.value).toFixed(2) + " million";
  }

  let topResult1 =
    dataResult[0].exp_sector +
    " (" +
    (Number(dataResult[0].share) * 100).toFixed(2) +
    "%)";
  let topResult2 =
    dataResult[1].exp_sector +
    " (" +
    (Number(dataResult[1].share) * 100).toFixed(2) +
    "%)";
  let topResult3 =
    dataResult[2].exp_sector +
    " (" +
    (Number(dataResult[2].share) * 100).toFixed(2) +
    "%)";
  let topResult4 =
    dataResult[3].exp_sector +
    " (" +
    (Number(dataResult[3].share) * 100).toFixed(2) +
    "%)";
  let topResult5 =
    dataResult[4].exp_sector +
    " (" +
    (Number(dataResult[4].share) * 100).toFixed(2) +
    "%)";

  let exportValue = Number(dataResult[0]["totalvalue"]);
  if (exportValue > 1000) {
    exportValue = (exportValue / 1000).toFixed(2) + " billion";
  } else {
    exportValue = exportValue.toFixed(2) + " million";
  }
  let getData = [];
  getData.push({ id: "A", name: "Agriculture", color: "#2F978B" });
  getData.push({ id: "B", name: "Mining", color: "#9A25B1" });
  getData.push({ id: "C", name: "Construction", color: "#8D243B" });
  getData.push({ id: "D", name: "Utilities", color: "#FA9908" });
  getData.push({ id: "E", name: "Low tech", color: "#F34336" });
  getData.push({ id: "F", name: "High and medium tech", color: "#C3165B" });
  getData.push({ id: "G", name: "Trade and repair service", color: "#5E6DC1" });
  getData.push({ id: "H", name: "Tourism", color: "#3F50B8" });
  getData.push({ id: "I", name: "Transport service", color: "#3949AB" });
  getData.push({ id: "J", name: "ICT service", color: "#1565C0" });
  getData.push({ id: "K", name: "Property service", color: "#19227D" });
  getData.push({ id: "L", name: "Financial service", color: "#43A7F5" });
  getData.push({
    id: "M",
    name: "Public and welfare service",
    color: "#2088E7",
  });
  getData.push({
    id: "N",
    name: "Private household service",
    color: "#1564C0",
  });

  res.data.forEach((x) => {
    let percentData = Number((Number(x.share) * 100).toFixed(2));
    let nameData = x.exp_sector + " (" + percentData + "%)";
    let valueData = (Number(x.value) * 100).toFixed(2);
    let valuePrecentData = (Number(x.share) * 100).toFixed(2);
    let parentData = "A";

    if (x.exp_sector == "Agriculture, hunting, forestry, and fishing") {
      parentData = "A";
    } else if (x.exp_sector == "Food, beverages, and tobacco") {
      parentData = "E";
    } else if (x.exp_sector == "Basic metals and fabricated metal") {
      parentData = "F";
    } else if (
      x.exp_sector == "Pulp, paper, paper products, printing, and publishing"
    ) {
      parentData = "E";
    } else if (x.exp_sector == "Mining and quarrying") {
      parentData = "B";
    } else if (x.exp_sector == "Textiles and textile products") {
      parentData = "E";
    } else if (x.exp_sector == "Leather, leather products, and footwear") {
      parentData = "E";
    } else if (x.exp_sector == "Wood and products of wood and cork") {
      parentData = "E";
    } else if (x.exp_sector == "Coke, refined petroleum, and nuclear fuel") {
      parentData = "F";
    } else if (x.exp_sector == "Chemicals and chemical products") {
      parentData = "F";
    } else if (x.exp_sector == "Rubber and plastics") {
      parentData = "E";
    } else if (x.exp_sector == "Other nonmetallic minerals") {
      parentData = "F";
    } else if (x.exp_sector == "Machinery, nec") {
      parentData = "F";
    } else if (x.exp_sector == "Electrical and optical equipment") {
      parentData = "F";
    } else if (x.exp_sector == "Transport equipment") {
      parentData = "F";
    } else if (x.exp_sector == "Manufacturing, nec; recycling") {
      parentData = "E";
    } else if (x.exp_sector == "Construction") {
      parentData = "C";
    } else if (
      x.exp_sector ==
      "Sale, maintenance, and repair of motor vehicles and motorcycles; retail sale of fuel"
    ) {
      parentData = "G";
    } else if (
      x.exp_sector ==
      "Wholesale trade and commission trade, except of motor vehicles and motorcycles"
    ) {
      parentData = "G";
    } else if (
      x.exp_sector ==
      "Retail trade, except of motor vehicles and motorcycles; repair of household goods"
    ) {
      parentData = "G";
    } else if (x.exp_sector == "Hotels and restaurants") {
      parentData = "H";
    } else if (x.exp_sector == "Inland transport") {
      parentData = "I";
    } else if (x.exp_sector == "Water transport") {
      parentData = "I";
    } else if (x.exp_sector == "Air transport") {
      parentData = "I";
    } else if (
      x.exp_sector ==
      "Other supporting and auxiliary transport activities; activities of travel agencies"
    ) {
      parentData = "I";
    } else if (x.exp_sector == "Post and telecommunications") {
      parentData = "J";
    } else if (x.exp_sector == "Financial intermediation") {
      parentData = "L";
    } else if (x.exp_sector == "Real estate activities") {
      parentData = "K";
    } else if (
      x.exp_sector == "Renting of M&Eq and other business activities"
    ) {
      parentData = "K";
    } else if (
      x.exp_sector ==
      "Public administration and defense; compulsory social security"
    ) {
      parentData = "M";
    } else if (x.exp_sector == "Education") {
      parentData = "M";
    } else if (x.exp_sector == "Health and social work") {
      parentData = "M";
    } else if (
      x.exp_sector == "Other community, social, and personal services"
    ) {
      parentData = "M";
    } else if (x.exp_sector == "Private households with employed persons") {
      parentData = "N";
    }
    let tempInput = {
      name: nameData,
      value: Number(valueData),
      valuePrecent: Number(valuePrecentData),
      parent: parentData,
    };
    getData.push(tempInput);
  });

  setTimeout(() => {
    chartRef.value = Highcharts.chart("container3", {
      accessibility: {
        enabled: false,
      },
      chart: {
        height: (6 / 10) * 100 + "%", // 16:9 ratio
        style: { fontFamily: "roboto" },
      },
      series: [
        {
          legendType: "point",
          type: "treemap",
          layoutAlgorithm: "squarified",
          alternateStartingDirection: true,
          levels: [
            {
              level: 1,
              layoutAlgorithm: "squarified",
              dataLabels: {
                enabled: false,
                align: "left",
                verticalAlign: "top",
                style: {
                  fontSize: "15px",
                },
              },
            },
          ],
          data: [...getData],
          showInLegend: false, // ปิดการแสดงผล legend ใน Highcharts
        },
      ],
      credits: {
        enabled: false,
      },
      title: {
        style: {
          fontSize: "24px",
        },
        text: `How is ${dataInput.value.sourceName}'s value-added in ${dataInput.value.exportingName}'s exports to ${dataInput.value.importingName} distributed across sectors?`,
      },
      subtitle: {
        useHTML: true,
        style: {
          fontSize: "14px",
        },
        text: `Gross exports of ${dataInput.value.exportingName} to ${dataInput.value.importingName} amount to $${totalLarge.value} in ${dataInput.value.year}. Of these exports, $${exportValue} is imported content that comes from ${dataInput.value.sourceName}, mainly used in the following exporting sectors in ${dataInput.value.exportingName} : ${topResult1}, ${topResult2}, ${topResult3}, ${topResult4}, ${topResult5}<br/><br/>
          ${dataInput.value.exportingName}'s imported content from ${dataInput.value.sourceName} in exports to  ${dataInput.value.importingName} :  $${exportValue} / ${dataInput.value.exportingName}'s gross exports to ${dataInput.value.importingName} :   $${totalLarge.value}
          `,
        align: "left",
      },
      exporting: {
        allowHTML: true,
        useHTML: true,
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
        width: 1920,
        chartOptions: {
          chart: {
            height: (9 / 16) * 100 + "%",
          },
          legend: {
            enabled: true,
          },
          title: {
            style: { fontSize: "12px" },
          },
          subtitle: {
            style: { fontSize: "8px" },
          },
          series: [
            {
              dataLabels: {
                style: { fontSize: "6px" },
              },
            },
          ],
        },
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          let sectorShow = this.key.substring(0, this.key.indexOf("("));
          let percentShow = this.key.substring(
            this.key.indexOf("(") + 1,
            this.key.length - 1
          );

          let tempShowText = "";
          if (this.point.value >= 1000) {
            tempShowText = (this.point.value / 1000).toFixed(2) + " billion";
          } else {
            tempShowText = this.point.value.toFixed(2) + " million";
          }

          return `<div class='text-weight-bold'>${sectorShow}</div><div>Value : $${tempShowText}</div>
            <div>Share: ${percentShow}</div>`;
        },
      },
      events: {
        load: function () {
          const chart = this;
          const legendContainer = document.getElementById("custom-legend");
          chart.series[0].data.forEach(function (point) {
            const legendItem = document.createElement("div");
            legendItem.innerHTML = `
              <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <div style="width: 20px; height: 20px; background-color: ${point.color}; margin-right: 10px;"></div>
                <div>${point.name}</div>
              </div>
            `;
            legendContainer.appendChild(legendItem);
          });
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
    sourceISO: props.dataSend.sourceISO,
    sourceName: props.dataSend.sourceName,
  }),
  (newVal, oldVal) => {
    if (
      newVal.exportingISO.length > 0 &&
      newVal.importingISO.length > 0 &&
      newVal.year.length > 0 &&
      newVal.sourceISO.length > 0
    ) {
      dataInput.value.exportingISO = props.dataSend.exportingISO;
      dataInput.value.exportingName = props.dataSend.exportingName;
      dataInput.value.importingISO = props.dataSend.importingISO;
      dataInput.value.importingName = props.dataSend.importingName;
      dataInput.value.year = props.dataSend.year;
      dataInput.value.sourceISO = props.dataSend.sourceISO;
      dataInput.value.sourceName = props.dataSend.sourceName;
      showData.value = false;
      loadData();
    } else {
      showData.value = false;
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
#custom-legend {
  max-height: 200px; /* ความสูงสูงสุด */
  overflow-y: auto; /* เปิดการเลื่อนในแนวตั้ง */
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}
</style>
