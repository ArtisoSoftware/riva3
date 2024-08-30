<template>
  <div>
    <div v-show="!showData" class="text-center text-h5">
      <div class="text-black q-pt-md">
        <b
          >Where does {{ dataInput.exportingName }} contribute the most towards
          export production ({{ dataInput.sectorName }})?</b
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
    <div class="row" v-show="showData">
      <div id="container1" class="col"></div>
      <div style="width: 200px">
        <div style="padding-top: 170px">
          <div style="padding-left: 30px">
            <div class="row">
              <div
                style="width: 15px; height: 15px; background-color: #2381b8"
              ></div>
              <div style="padding-left: 15px">Asia-Pacific</div>
            </div>
            <div class="row q-pt-lg">
              <div
                style="width: 15px; height: 15px; background-color: #eb1e63"
              ></div>
              <div style="padding-left: 15px">Europe</div>
            </div>
            <div class="row q-pt-lg">
              <div
                style="width: 15px; height: 15px; background-color: #f99704"
              ></div>
              <div style="padding-left: 15px">North America</div>
            </div>
            <div class="row q-pt-lg">
              <div
                style="width: 15px; height: 15px; background-color: #2d9687"
              ></div>
              <div style="padding-left: 15px">Latin America</div>
            </div>
            <div class="row q-pt-lg">
              <div
                style="width: 15px; height: 15px; background-color: #9c26b3"
              ></div>
              <div style="padding-left: 15px">Rest of the world</div>
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

const loadData = async () => {
  showData.value = true;
  showNoData.value = false;
  showSmallExport.value = false;
  let getData = [];
  let url0 = serverData.value + "va/getEcoList.php";
  let res0 = await axios.get(url0);
  let countryData = res0.data;

  let dataTemp = {
    exp_country: dataInput.value.exportingISO,
    exp_sector: dataInput.value.sectorName,
    year: dataInput.value.year,
  };

  let url = serverData.value + "/va/forwardSector1.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  let dataResult = res.data;
  dataResult.sort((a, b) => Number(b.value) - Number(a.value));

  if (dataResult.length == 0) {
    showNoData.value = true;
    showData.value = false;
    console.log("No data avaialble");
    return;
  }
  totalSmall.value = dataResult[0].totalvalue;
  if (Number(totalSmall.value) > 1000) {
    totalSmall.value =
      (Number(totalSmall.value) / 1000).toFixed(2) + " billion";
  } else {
    totalSmall.value = Number(totalSmall.value).toFixed(2) + " million";
  }

  let dataTemp2 = {
    exp_country: dataInput.value.exportingISO,
    imp_country: "WLD",
    exp_sector: dataInput.value.sectorName,
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

  let maxImport1 =
    showCountryName(dataResult[0], countryData) +
    "(" +
    (Number(dataResult[0].share) * 100).toFixed(2) +
    "%)";
  let maxImport2 =
    showCountryName(dataResult[1], countryData) +
    "(" +
    (Number(dataResult[1].share) * 100).toFixed(2) +
    "%)";
  let maxImport3 =
    showCountryName(dataResult[2], countryData) +
    "(" +
    (Number(dataResult[2].share) * 100).toFixed(2) +
    "%)";
  let maxImport4 =
    showCountryName(dataResult[3], countryData) +
    "(" +
    (Number(dataResult[3].share) * 100).toFixed(2) +
    "%)";
  let maxImport5 =
    showCountryName(dataResult[4], countryData) +
    "(" +
    (Number(dataResult[4].share) * 100).toFixed(2) +
    "%)";

  let subTitleGraph = `Gross exports of ${dataInput.value.exportingName} in ${dataInput.value.sectorName} to World amount to $${totalLarge.value} in ${dataInput.value.year}. Of these exports, $${totalSmall.value} is ${dataInput.value.exportingName}'s contribution to export production in other economies, mainly ${maxImport1}, ${maxImport2}, ${maxImport3}, ${maxImport4} and ${maxImport5}. <br/><br/> ${dataInput.value.exportingName}'s contribution to export production: $${totalSmall.value} / ${dataInput.value.exportingName}'s gross exports to World: $${totalLarge.value}`;

  getData.push({
    id: "A",
    name: "Asia-Pacific",
    color: "#2381B8",
  });

  getData.push({
    id: "B",
    name: "Europe",
    color: "#EB1E63",
  });

  getData.push({
    id: "C",
    name: "North America",
    color: "#F99704",
  });

  getData.push({
    id: "D",
    name: "Latin America",
    color: "#2D9687",
  });

  getData.push({ id: "E", name: "Rest of the world", color: "#9C26B3" });

  dataResult.forEach((x) => {
    let countryNameText = "";
    let parentData = "";
    if (x.imp_country == "RoW") {
      countryNameText = "Rest of the World";
      parentData = "E";
    } else {
      let dataFind = countryData.filter((datax) => datax.iso == x.imp_country);
      countryNameText = dataFind[0].economic;
      if (dataFind[0].area == "Asia-Pacific") {
        parentData = "A";
      } else if (dataFind[0].area == "Europe") {
        parentData = "B";
      } else if (dataFind[0].area == "North America") {
        parentData = "C";
      } else if (dataFind[0].area == "Latin America") {
        parentData = "D";
      }
    }
    let share = (Number(x.share) * 100).toFixed(2);
    let temp = {
      name: countryNameText + "(" + share + "%)",
      parent: parentData,
      value: Number(Number(x.value).toFixed(2)),
      percent: Number(share),
    };
    getData.push(temp);
  });

  setTimeout(() => {
    Highcharts.chart("container1", {
      chart: {
        height: (9 / 12) * 100 + "%", // 16:9 ratio
        style: { fontFamily: "roboto" },
      },
      series: [
        {
          type: "treemap",
          layoutAlgorithm: "squarified",
          alternateStartingDirection: true,
          levels: [
            {
              level: 1,
              // layoutAlgorithm: "sliceAndDice",
              dataLabels: {
                enabled: false,
                align: "left",
                verticalAlign: "top",
                style: {
                  fontSize: "15px",
                  fontWeight: "bold",
                },
              },
            },
          ],

          data: getData,
          showInLegend: false,
          legendType: "point",
        },
      ],
      title: {
        style: {
          fontSize: "24px",
        },
        text: `Where does ${dataInput.value.exportingName} contribute the most towards export production (${dataInput.value.sectorName})?`,
      },
      subtitle: {
        useHTML: true,
        style: {
          fontSize: "14px",
        },
        text: subTitleGraph,
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        useHTML: true,
        pointFormatter: function () {
          return (
            "<div> <span class='text-bold'>" +
            this.name +
            "</span>" +
            "<br>" +
            "Value: $" +
            this.value +
            " million" +
            "</div>"
          );
        },
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
        width: "1920px",
        chartOptions: {
          chart: {
            events: {
              load: function () {
                this.legend.update({
                  width: 120,
                  labelFormatter: function () {
                    if (this.name == "Europe") {
                      return '<div style="padding-bottom:5px;"><table><tr><td><div style="width: 10px;height: 10px;background-color: #eb1e63;"></div></td><td style="padding-left:10px;font-size:6px;white-space:nowrap">Europe</td></tr></table></div>';
                    } else if (this.name == "Latin America") {
                      return '<div style="padding-bottom:5px;"><table><tr><td><div style="width: 10px;height: 10px;background-color: #2D9687;"></div></td><td style="padding-left:10px;font-size:6px;white-space:nowrap">Latin America</td></tr></table></div>';
                    } else if (this.name == "North America") {
                      return '<div style="padding-bottom:5px;"><table><tr><td><div style="width: 10px;height: 10px;background-color: #F99704;"></div></td><td style="padding-left:10px;font-size:6px;white-space:nowrap">North America</td></tr></table></div>';
                    } else if (this.name == "Asia-Pacific") {
                      return '<div style="padding-bottom:5px;"><table><tr><td><div style="width: 10px;height: 10px;background-color: #2381B8;"></div></td><td style="padding-left:10px;font-size:6px;white-space:nowrap">Asia-Pacific</td></tr></table></div>';
                    } else if (this.name == "Rest of the world") {
                      return '<div style="padding-bottom:5px;"><table><tr><td><div style="width: 10px;height: 10px;background-color: #9C26B3;"></div></td><td style="padding-left:10px;font-size:6px;white-space:nowrap">Rest of the world</td></tr></table></div>';
                    }
                  },
                });
              },
            },
          },

          series: [
            {
              dataLabels: {
                style: { fontSize: "6px" },
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
    });
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
