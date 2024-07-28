<template>
  <div>
    <div id="lineChart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { yearInputShow } from "../../pages/server.js";

const props = defineProps({
  ci: {
    type: Array,
    required: true,
  },
  si: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  ecoName: {
    type: String,
    required: true,
  },
});
const { yearInput } = yearInputShow();

const title = ref("");

const yearStart = ref("");
const yearEnd = ref("");

const regenChart = () => {
  console.log("test");

  if (props.ecoName.length > 0) {
    if (props.ecoName == "Asia-Pacific") {
      title.value = `How has ${props.ecoName}'s integration changed over the years?<br> Conventional and sustainable integration (${yearStart.value}-${yearEnd.value})`;
    } else {
      title.value = `How has ${props.ecoName}'s integration  with Asia-Pacific changed over the years?<br> Conventional and sustainable integration (${yearStart.value}-${yearEnd.value})`;
    }
    Highcharts.chart("lineChart", {
      chart: {
        height: 750,
      },
      title: {
        text: title.value,
      },

      yAxis: {
        title: {
          text: "Integration index",
        },
      },

      xAxis: {
        accessibility: {
          rangeDescription: "Range: " + yearStart.value + "to" + yearEnd.value,
        },
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
          },
          label: {
            connectorAllowed: false,
          },
          pointStart: yearStart.value,
        },
      },
      credits: {
        enabled: false,
      },

      exporting: {
        buttons: {
          contextButton: {
            menuItems: [
              "viewFullscreen",
              "printChart",
              "separator",
              "downloadPNG",
              "downloadJPEG",
              "downloadPDF",
              "downloadSVG",
              "separator",
              "downloadCSV",
              "downloadXLS",
              //"viewData",
            ],
          },
        },
      },
      series: [
        {
          name: "Sustainable integration",
          data: props.si,
          color: "#C55A0F",
        },
        {
          name: "Conventional  integration",
          data: props.ci,
          color: "#113F5A",
        },
      ],
    });
  }
};

onMounted(async () => {
  yearStart.value = yearInput.value.min;
  yearEnd.value = yearInput.value.max;
  await nextTick();
  console.log("mount");
  if (props.ecoName.length > 0) {
    regenChart();
  }
});

// ใช้ watch เฉพาะเมื่อ props ที่สำคัญมีการเปลี่ยนแปลง
watch(
  () => [props.ci, props.si, props.ecoName],
  () => {
    regenChart();
  }
);
</script>

<style lang="scss" scoped></style>
