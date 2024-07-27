<template>
  <div>
    <div ref="chartContainer"></div>
    {{ ecoName }}
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

// รับ props
const props = defineProps({
  lineSI: {
    type: Array,
    required: true,
  },
  lineCI: {
    type: Array,
    required: true,
  },
  yearStart: {
    type: Number,
    required: true,
  },
  yearEnd: {
    type: Number,
    required: true,
  },
  ecoName: {
    type: String,
    required: true,
  },
});

// สร้างค่า yearList
const yearList = ref([]);
for (let i = 0; i < props.lineSI.length; i++) {
  yearList.value.push(props.yearStart + i);
}
// console.log(yearList.value);

// สร้าง reference สำหรับ container ของกราฟ
const chartContainer = ref(null);

// ฟังก์ชันสร้างกราฟ
const createChart = () => {
  const title =
    props.ecoName === "Asia-Pacific"
      ? `How has Asia-Pacific's integration changed over the years?<br> Conventional and sustainable integration (${props.yearStart}-${props.yearEnd})`
      : `How has ${props.ecoName}'s integration with Asia-Pacific changed over the years?<br> Conventional and sustainable integration (${props.yearStart}-${props.yearEnd})`;

  Highcharts.chart(chartContainer.value, {
    chart: {
      type: "line",
      height: 750,
    },
    title: {
      text: title,
      useHTML: true,
    },
    xAxis: {
      categories: yearList.value,
      title: {
        text: "Year",
      },
    },
    yAxis: {
      title: {
        text: "Score",
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
        pointStart: props.yearStart,
      },
    },
    series: [
      {
        name: "Sustainable Integration",
        data: props.lineSI,
        color: "#C55A0F",
      },
      {
        name: "Conventional Integration",
        data: props.lineCI,
        color: "#113F5A",
      },
    ],
    credits: {
      enabled: false,
    },
  });
};

// สร้างกราฟเมื่อ component ถูก mount
onMounted(() => {
  createChart();
});

// อัพเดทกราฟเมื่อค่า props เปลี่ยนแปลง
watch(
  () => [props.lineSI, props.lineCI, props.yearStart, props.ecoName],
  ([newLineSI, newLineCI, newYearStart, newEcoName]) => {
    const newYearList = [];
    for (let i = 0; i < newLineSI.length; i++) {
      newYearList.push(newYearStart + i);
    }
    yearList.value = newYearList;
    createChart();
  },
  { deep: true }
);
</script>

<style scoped></style>
