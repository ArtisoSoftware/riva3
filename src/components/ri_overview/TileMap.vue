<template>
  <div>
    <div>{{ dataScore }}</div>
    <div
      ref="chartContainer"
      :style="{ width: '500px', height: '500px' }"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

export default {
  name: "HighchartsTilemap",
  props: {
    tilemapData: {
      type: Array,
      required: true,
    },
    dataScore: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartContainer = ref(null);
    const partner = ref([
      "AFG",
      "ARM",
      "ASM",
      "AZE",
      "COK",
      "FJI",
      "FSM",
      "GEO",
      "GUM",
      "IRN",
      "KAZ",
      "KGZ",
      "KIR",
      "MDV",
      "MHL",
      "MNP",
      "NCL",
      "NIU",
      "NRU",
      "PAK",
      "PLW",
      "PYF",
      "SLB",
      "TJK",
      "TKM",
      "TLS",
      "TON",
      "TUR",
      "TUV",
      "UZB",
      "VUT",
      "WSM",
      "PNG",
      "RUS",
      "KHM",
      "IDN",
      "PHL",
      "LAO",
      "BTN",
      "NPL",
      "BGD",
      "IND",
      "LKA",
      "MMR",
      "THA",
      "AUS",
      "NZL",
      "BRN",
      "MYS",
      "SGP",
      "VNM",
      "MAC",
      "PRK",
      "HKG",
      "MNG",
      "CHN",
      "KOR",
      "JPN",
    ]);
    let chart = null;

    const getMergedData = () => {
      return props.tilemapData
        .filter((country) => partner.value.includes(country.alpha3))
        .map((country) => {
          const score = props.dataScore.find(
            (score) => score.partner === country.alpha3
          );
          return {
            ...country,
            value: score ? parseFloat(score.avg_score).toFixed(2) : "0",
            color: score ? null : "#E0E0E0", // ถ้าไม่มี score ให้ใช้สีพิเศษ
          };
        });
    };

    const createChart = () => {
      const mergedData = getMergedData();

      chart = Highcharts.chart(chartContainer.value, {
        chart: {
          type: "tilemap",
          inverted: true,
          width: 500,
          height: 500,
        },
        title: {
          text: "Average Scores by Country",
        },
        xAxis: {
          visible: false,
        },
        yAxis: {
          visible: false,
        },
        colorAxis: {
          dataClasses: [
            {
              from: 0,
              to: 0.2,
              color: "#F9EDB3",
              name: "< 0.2",
            },
            {
              from: 0.2,
              to: 0.4,
              color: "#FFC428",
              name: "0.2 - 0.4",
            },
            {
              from: 0.4,
              to: 0.6,
              color: "#FF7987",
              name: "0.4 - 0.6",
            },
            {
              from: 0.6,
              to: 1,
              color: "#FF2371",
              name: "> 0.6",
            },
            {
              from: -0.1, // ข้อมูลพิเศษ
              to: 0.1,
              color: "#E0E0E0",
              name: "No data available",
            },
          ],
        },
        series: [
          {
            data: mergedData,
            dataLabels: {
              enabled: true,
              formatter: function () {
                return this.point.value === "0"
                  ? this.point.alpha3
                  : this.point.alpha3;
              },
            },
            name: "Average Score",
            states: {
              hover: {
                color: "#a4edba",
              },
            },
            tooltip: {
              headerFormat: "",
              pointFormatter: function () {
                return this.value === "0"
                  ? `No data available for <b>${this.name}</b>`
                  : `The average score for <b>${this.name}</b> is <b>${this.value}</b>`;
              },
            },
          },
        ],
      });
    };

    const destroyChart = () => {
      if (chart) {
        chart.destroy();
        chart = null;
      }
    };

    onMounted(createChart);

    watch(
      () => props.dataScore,
      () => {
        destroyChart();
        createChart();
      },
      { deep: true }
    );

    onBeforeUnmount(destroyChart);

    return {
      chartContainer,
    };
  },
};
</script>

<style scoped></style>
