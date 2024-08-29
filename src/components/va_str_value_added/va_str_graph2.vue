<template>
  <div>
    <div v-show="!showData" class="text-center text-h5">
      <div class="text-black q-pt-md">
        <b
          >How does {{ dataSend.exportingName }}'s gross and value-added trade
          balance in {{ dataInput.sectorName }} with
          {{ dataSend.importingName }} differ?</b
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
      </div>
    </div>
    <div id="container2" v-show="showData"></div>
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
  year: "",
  sectorName: "",
});

const getData = ref({
  red: 0,
  blue: 0,
});

const showData = ref(true);
const showNoData = ref(false);

const loadData = async () => {
  showData.value = true;
  showNoData.value = false;
  let dataTemp = {
    exp_country: dataInput.value.exportingISO,
    imp_country: dataInput.value.importingISO,
    exp_sector: dataInput.value.sectorName,
    year: dataInput.value.year,
  };

  let url = serverData.value + "/va/strloaddata2.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  if (res.data.length == 0) {
    console.log("No data available");
    showData.value = false;
    showNoData.value = true;
    return;
  }
  let value1 = parseFloat(res.data[0]?.value);
  let value2 = parseFloat(res.data[1]?.value);

  if (!isNaN(value1) && !isNaN(value2)) {
    getData.value.red = Number(
      Number(
        Number(
          res.data.filter((x) => x.variable == "gross_trade_balance")[0].value
        )
      ).toFixed(2)
    );
    getData.value.blue = Number(
      Number(
        Number(
          res.data.filter((x) => x.variable == "value_added_trade_balance")[0]
            .value
        )
      ).toFixed(2)
    );
  } else {
    console.log("No data available");
    showData.value = false;
    showNoData.value = true;
    return;
  }
  // console.log(getData.value);
  Highcharts.chart("container2", {
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
    chart: {
      type: "column",
      height: (8 / 16) * 100 + "%", // 16:9 ratio
    },
    title: {
      style: {
        fontSize: "24px",
        fontFamily: "roboto",
      },
      text: `How does ${dataInput.value.exportingName}'s gross and value-added trade balance in ${dataInput.value.sectorName} with ${dataInput.value.importingName} differ?`,
    },
    xAxis: {
      categories: ["", ""],
    },
    yAxis: {
      title: {
        text: `% of gross exports to ${dataInput.value.importingName}`,
        style: {
          fontSize: "14px",
        },
      },
      style: { fontSize: "12px" },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Value-added trade balance",
        data: [getData.value.blue],
        color: "#2381B8",
      },
      {
        name: "Gross trade balance",
        data: [getData.value.red],
        color: "#EB1E63",
      },
    ],
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
              style: {
                fontSize: "6px", // ปรับขนาดตัวหนังสือที่นี่
              },
            },
          },
        ],
      },
    },
    tooltip: {
      useHTML: true,

      pointFormat:
        "<div class='text-weight-bold'>{series.name}</div><div> Value : {point.y}%</div>",
    },
  });
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
