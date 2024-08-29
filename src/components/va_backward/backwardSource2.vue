<template>
  <div id="container4" v-show="showData">Graph2 - {{ dataSend }}</div>
  <div v-show="!showData" class="text-center text-h5">
    <div class="text-black q-pt-md">
      <b
        >How is {{ dataInput.sourceName }}'s value-added in
        {{ region }} economies' exports to
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

const region = ref("");
const exportISOList = ref([]);
const exportNameList = ref([]);
const exportISOListFinal = ref([]);
const exportNameListFinal = ref([]);
const agricultureData = ref([]);
const miningData = ref([]);
const constructionData = ref([]);
const utilitiesData = ref([]);
const lowtechData = ref([]);
const hightechData = ref([]);
const tradeRepairData = ref([]);
const tourismData = ref([]);
const transportData = ref([]);
const ictData = ref([]);
const propertyData = ref([]);
const financialData = ref([]);
const publicwData = ref([]);
const privatewData = ref([]);
const drilldownData = ref([]);

const loadData = async () => {
  showData.value = true;
  showNoData.value = false;
  showSmallExport.value = false;
  region.value = "";
  exportISOList.value = [];
  exportNameList.value = [];
  agricultureData.value = [];
  miningData.value = [];
  constructionData.value = [];
  utilitiesData.value = [];
  lowtechData.value = [];
  hightechData.value = [];
  tradeRepairData.value = [];
  tourismData.value = [];
  transportData.value = [];
  ictData.value = [];
  propertyData.value = [];
  financialData.value = [];
  publicwData.value = [];
  privatewData.value = [];
  exportISOListFinal.value = [];
  exportNameListFinal.value = [];
  drilldownData.value = [];

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
    imp_country: dataInput.value.importingISO,
    source_country: dataInput.value.sourceISO,
    year: dataInput.value.year,
  };
  let url = serverData.value + "/va/backwardSource1.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  let dataResult = res.data;
  if (dataResult.length == 0) {
    showNoData.value = true;
    showData.value = false;
    console.log("No data avaialble");
    return;
  }
  //ทำการ update exportISOList ที่มี จริง
  exportISOListFinal.value = dataResult.map((x) => x.exp_country);
  exportISOListFinal.value = [...new Set(exportISOListFinal.value)];
  exportNameListFinal.value = [];
  exportISOListFinal.value.forEach((x) => {
    let temp = countryData.filter((y) => y.iso == x);
    exportNameListFinal.value.push(temp[0].economic);
  });

  let url4 = serverData.value + "/va/getSector.php";
  let res4 = await axios.get(url4);
  let sectorData = res4.data;
  console.log(sectorData);

  const promises = exportISOListFinal.value.map(async (expCountry) => {
    let dataTemp3 = {
      exp_country: expCountry,
      imp_country: dataInput.value.importingISO,
      exp_sector: "All sectors",
      year: dataInput.value.year,
    };
    let url3 = serverData.value + "/va/strloaddata1.php";
    let res3 = await axios.post(url3, JSON.stringify(dataTemp3));
    let totalExport = res3.data[0].total_exports;
    let dataRaw = dataResult.filter((x) => x.exp_country == expCountry);
    let countryName = countryData.filter((x) => x.iso == expCountry);
    countryName = countryName[0].economic;

    {
      let sectionDetail = sectorData
        .filter((item) => item.sectiongroup === "Agriculture")
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Agriculutre",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Agriculutre",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };
      agricultureData.value.push(tempInput);
    }

    {
      let sectionDetail = sectorData
        .filter((item) => item.sectiongroup === "Mining")
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Mining",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Mining",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };
      miningData.value.push(tempInput);
    }

    {
      let sectionDetail = sectorData
        .filter((item) => item.sectiongroup === "Construction")
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Construction",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Construction",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };
      constructionData.value.push(tempInput);
    }

    {
      let sectionDetail = sectorData
        .filter((item) => item.sectiongroup === "Utilities")
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Utilities",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Utilities",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };
      utilitiesData.value.push(tempInput);
    }

    {
      let sectionDetail = sectorData
        .filter((item) => item.sectiongroup === "Manufacturing Low tech")
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Manufacturing-Low tech",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Manufacturing-Low tech",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };

      lowtechData.value.push(tempInput);
    }

    {
      let sectionDetail = sectorData
        .filter(
          (item) => item.sectiongroup === "Manufacturing High and medium tech"
        )
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Manufacturing-High and medium tech",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Manufacturing-High and medium tech",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };
      hightechData.value.push(tempInput);
    }

    {
      let sectionDetail = sectorData
        .filter((item) => item.sectiongroup === "Services Trade and repair")
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Services-Trade and repair",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Services-Trade and repair",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };
      tradeRepairData.value.push(tempInput);
    }

    {
      let sectionDetail = sectorData
        .filter((item) => item.sectiongroup === "Services Tourism")
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Services-Tourism",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Services-Tourism",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };
      tourismData.value.push(tempInput);
    }

    {
      let sectionDetail = sectorData
        .filter((item) => item.sectiongroup === "Services Transport")
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Services-Transport",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Services-Transport",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };
      transportData.value.push(tempInput);
    }

    {
      let sectionDetail = sectorData
        .filter((item) => item.sectiongroup === "Services ICT")
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Services-ICT",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Services-ICT",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };
      ictData.value.push(tempInput);
    }

    {
      let sectionDetail = sectorData
        .filter(
          (item) => item.sectiongroup === "Services Property and business"
        )
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Services-Property and business",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Services-Property and business",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };
      propertyData.value.push(tempInput);
    }

    {
      let sectionDetail = sectorData
        .filter((item) => item.sectiongroup === "Services-Financial")
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Services-Financial",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Services-Financial",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };
      financialData.value.push(tempInput);
    }

    {
      let sectionDetail = sectorData
        .filter((item) => item.sectiongroup === "Services Public and welfare")
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Services-Public and welfare",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Services-Public and welfare",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };
      publicwData.value.push(tempInput);
    }

    {
      let sectionDetail = sectorData
        .filter((item) => item.sectiongroup === "Services Private household")
        .map((item) => item.name);
      let filteredData = dataRaw.filter((item) =>
        sectionDetail.includes(item.exp_sector)
      );
      let dataDeteil = [];
      filteredData.forEach((item) => {
        let sectorNameDetail = item.exp_sector;
        let valueDetail = Number(Number(item.value).toFixed(2));
        let yDetail = Number(
          ((Number(item.value) / Number(totalExport)) * 100).toFixed(2)
        );
        let tempDetail = {
          name: sectorNameDetail,
          value: valueDetail,
          y: yDetail,
        };
        dataDeteil.push(tempDetail);
      });
      let tempInput2 = {
        data: dataDeteil,
        id: countryName + "+Services-Private household",
        type: "pie",
      };
      drilldownData.value.push(tempInput2);
      let totalValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.value),
        0
      );
      let yData = Number(
        ((Number(totalValue) / Number(totalExport)) * 100).toFixed(2)
      );
      let tempInput = {
        drilldown: countryName + "+Services-Private household",
        name: countryName,
        value: Number(Number(totalValue).toFixed(2)),
        y: yData,
      };
      privatewData.value.push(tempInput);
    }
  });

  // Wait for all the promises to resolve
  await Promise.all(promises);
  drilldownData.value = drilldownData.value.map((item) => {
    return {
      ...item,
      data: item.data.filter((dataItem) => dataItem.y !== 0),
    };
  });
  console.log("agricultureData", agricultureData.value);
  console.log("miningData", miningData.value);
  console.log("constructionData", constructionData.value);
  console.log("utilitiesData", utilitiesData.value);
  console.log("lowtechData", lowtechData.value);
  console.log("hightechData", hightechData.value);
  console.log("tradeRepairData", tradeRepairData.value);
  console.log("tourismData", tourismData.value);
  console.log("transportData", transportData.value);
  console.log("ictData", ictData.value);
  console.log("propertyData", propertyData.value);
  console.log("financialData", financialData.value);
  console.log("publicwData", publicwData.value);
  console.log("privatewData", privatewData.value);
  console.log("drilldownData", drilldownData.value);

  // console.log(countryData);

  // console.log(exportISOListFinal.value);
  // console.log(exportNameListFinal.value);
  // console.log("region: ", region.value);
  // console.log("exportISOList: ", exportISOList.value);
  // console.log("exportNameList: ", exportNameList.value);
  // console.log("dataResult: ", dataResult);

  console.log("Loading");

  var chart2 = Highcharts.chart(
    "container4",
    {
      chart: {
        type: "column",
        height: (9 / 16) * 100 + "%", // 16:9 ratio
        events: {
          drilldown: function (e) {
            chart2.setTitle({
              text: `How is ${dataInput.value.sourceName}'s value-added in ${e.point.name}'s exports to ${dataInput.value.importingName} distributed across sectors?`,
            });
            chart2.setSubtitle({
              text: "",
            });
          },
          drillup: function (e) {
            chart2.setTitle({
              text: `How is ${dataInput.value.sourceName}'s value-added in ${region.value} economies' exports to ${dataInput.value.importingName} distributed across sectors?`,
            });
            chart2.setSubtitle({
              text: "Click on a bar to see the individual economies associated with a region.",
            });
            chart2.xAxis[0].setCategories(exportNameListFinal.value);
          },
        },
      },
      title: {
        style: {
          fontSize: "24px",
          fontFamily: "roboto",
        },

        text: `How is ${dataInput.value.sourceName}'s value-added in ${region.value} economies' exports to ${dataInput.value.importingName} distributed across sectors?`,
      },
      subtitle: {
        style: {
          fontSize: "16px",
          fontFamily: "roboto",
        },

        text: `Click on a bar to see the individual sectors associated with a sector group`,
      },
      credits: {
        enabled: false,
      },

      xAxis: {
        labels: {
          rotation: -90,
        },
        type: "category",
        categories: exportNameListFinal.value,
      },

      plotOptions: {
        column: {
          stacking: "normal",
          dataLabels: {
            enabled: false,
          },
        },
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
        width: 1920,
        chartOptions: {
          legend: {
            width: 200,
            symbolWidth: 10,
            symbolHeight: 10,
            itemMarginTop: 2,
            symbolRadius: 0,
            layout: "vertical",
            align: "right",
            verticalAlign: "middle",
            itemStyle: {
              fontSize: "7px",
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
      legend: {
        useHTML: true,
        itemStyle: {
          fontSize: "14px",
          fontWeight: "medium",
          fontFamily: "roboto",
          color: "#00000",
        },
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
        itemDistance: 10,
        width: 300,
        itemMarginTop: 25,
        symbolHeight: 15,
        symbolWidth: 50,
        symbolRadius: 0,
      },

      series: [
        {
          name: "Agriculture",
          data: agricultureData.value,
          color: "#2F978B",
        },
        {
          name: "Mining",
          data: miningData.value,
          color: "#9A25B1",
        },
        {
          name: "Construction",
          data: constructionData.value,
          color: "#8D243B",
        },
        {
          name: "Utilities",
          data: utilitiesData.value,
          color: "#FA9908",
        },
        {
          name: "Manufacturing-Low tech",
          data: lowtechData.value,
          color: "#F34336",
        },
        {
          name: "Manufacturing-High and medium tech",
          data: hightechData.value,
          color: "#C3165B",
        },
        {
          name: "Services-Trade and repair",
          data: tradeRepairData.value,
          color: "#5E6DC1",
        },
        {
          name: "Services-Tourism",
          data: tourismData.value,
          color: "#3F50B8",
        },
        {
          name: "Services-Transport",
          data: transportData.value,
          color: "#3949AB",
        },
        {
          name: "Services-ICT",
          data: ictData.value,
          color: "#1565C0",
        },
        {
          name: "Services-Property and business",
          data: propertyData.value,
          color: "#19227D",
        },
        {
          name: "Services-Financial",
          data: financialData.value,
          color: "#43A7F5",
        },
        {
          name: "Services-Public and welfare",
          data: publicwData.value,
          color: "#2088E7",
        },
        {
          name: "Services-Private household",
          data: privatewData.value,
          color: "#1564C0",
        },
      ],

      drilldown: {
        activeDataLabelStyle: {
          color: "white",
          textShadow: "0 0 2px black, 0 0 2px black",
        },
        showInLegend: false,
        series: drilldownData.value,
      },
      tooltip: {
        useHTML: true,
        headerFormat: "",
        pointFormatter: function () {
          let textShow = "";
          if (this.value >= 1000) {
            textShow = (this.value / 1000).toFixed(2) + " billion";
          } else {
            textShow = this.value.toFixed(2) + " million";
          }
          if (this.category >= 0) {
            return (
              "<div> <span class='text-bold'>" +
              this.name +
              "</span><br>" +
              this.series.name +
              "<br>" +
              " Value: $" +
              textShow +
              "<br> Share: " +
              this.y +
              "%</div>"
            );
          } else {
            return (
              "<div> <span class='text-bold'>" +
              this.name +
              "</span>" +
              "<br>" +
              " Value: $" +
              textShow +
              "<br> Share: " +
              this.y +
              "%</div>"
            );
          }
        },
      },
    },
    (Highcharts.Tick.prototype.drillable = function () {})
  );
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
      loadData();
    } else {
      showData.value = false;
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped></style>
