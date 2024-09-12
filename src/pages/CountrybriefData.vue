<template>
  <div style="background-color: #7a7a7a; height: 3260px">
    <div
      class="bg-white q-pb-md"
      style="
        width: 1200px;
        height: fit-content;
        margin: auto;
        background: white;
      "
    >
      <div ref="content">
        <div class="printPage text-white">
          <div
            style="background: #04284d; width: 100%; height: 140px"
            class="q-pt-md"
          >
            <div style="padding-top: 5px; padding-left: 20px" class="row">
              <div class="col-1" style="width: 150px">
                <img
                  src="../../public/images/unescaplogo.svg"
                  style="height: 50px"
                  alt=""
                />
              </div>
              <div class="col-2"></div>
              <div class="col">
                <div class="row justify-center">
                  <div>
                    <img
                      src="../../public/images/logobig2.png"
                      width="190px"
                      alt
                    />
                  </div>
                  <div>
                    <div class="font-16 q-pt-xs">
                      <span>REGIONAL INTEGRATION</span>
                      AND
                    </div>
                    <div class="font-16" style="color: #e0d04e">
                      VALUE CHAIN ANALYZER
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div
                  class="q-pa-md row justify-center"
                  id="printSection"
                  align="right"
                >
                  <div>
                    <q-btn
                      no-caps
                      text-color="black"
                      @click="printBtn()"
                      style="background-color: white"
                      v-if="btnShow"
                    >
                      <div>
                        <span>print</span>
                      </div>
                    </q-btn>
                  </div>
                  <div>
                    <q-btn
                      @click="downloadPDF()"
                      class="q-mx-md"
                      no-caps
                      text-color="black"
                      style="background-color: white"
                      v-if="btnShow"
                    >
                      <div>
                        <span>PDF</span>
                      </div>
                    </q-btn>
                  </div>
                  <div>
                    <q-btn
                      no-caps
                      text-color="black"
                      style="background-color: white"
                      @click="isShowShare = true"
                      v-if="btnShow"
                    >
                      <div>
                        <span>Share</span>
                      </div>
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>
            <div align="center" style="font-size: 20px">
              Country brief: {{ dataSend.economyName }} : {{ dataSend.year }}
            </div>
          </div>
          <div
            class="q-py-sm text-bold bg-bar"
            style="
              width: 1000px;
              margin: 5px auto 5px auto;
              font-size: 16px;
              border-radius: 5px;
            "
            align="center"
          >
            <div>
              <span class="text-white"
                >Value-added structure of gross exports to the world by
                exporter</span
              >
              <span
                class="relative-position text-white"
                style="display: inline-block; top: -10px; font-size: 12px"
                >1-5</span
              >
              <span style="font-size: 15px"></span>
            </div>
          </div>
          <div class="q-mt-sm row justify-center q-px-md text-black">
            <div class="col q-px-sm" align="center">
              <div align="center" class="q-px-sm" style="height: 22px">
                <span class="text-bold" style="font-size: 16px">{{
                  fullRegion
                }}</span>
              </div>
              <div align="center" class>
                <i style="font-size: 14px">(% of gross exports)</i>
              </div>
              <div id="container2"></div>
            </div>
            <div class="col q-px-sm" align="center">
              <div align="center" class="q-px-sm" style="height: 22px">
                <span class="text-bold" style="font-size: 16px">{{
                  dataSend.economyName
                }}</span>
              </div>
              <div align="center" class>
                <i style="font-size: 14px">(% of gross exports)</i>
              </div>
              <div id="container1"></div>
            </div>
            <div class="col q-px-sm" align="center">
              <div align="center" class="q-px-sm" style="height: 22px">
                <span class="text-bold" style="font-size: 16px"
                  >All economies</span
                >
              </div>
              <div align="center" class>
                <i style="font-size: 14px">(% of gross exports)</i>
              </div>
              <div id="container3"></div>
            </div>
          </div>
          <div
            style="width: 1000px; margin: 0px auto 8px auto; font-size: 14px"
            align="left"
            class="text-black"
          >
            For more details on these indicators, please refer to the Notes
            section at the bottom of the page
          </div>
          <div
            class="q-py-sm text-bold bg-bar"
            style="
              width: 1000px;
              margin: 2px auto 2px auto;
              font-size: 16px;
              border-radius: 5px;
            "
            align="center"
          >
            <span class="text-white">
              {{ dataSend.economyName }}'s gross and value-added trade balance
              with the world
              <span style="font-size: 15px"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeMount, nextTick } from "vue";
import { LocalStorage } from "quasar";
import axios from "axios";
import { serverSetup } from "./server.js";
const { serverData } = serverSetup();
const dataSend = ref({
  economicISO: "",
  economicName: "",
  year: "",
});
const showError = ref(false);
const btnShow = ref(true);
const fullRegion = ref("");
const fullRegionISO = ref("");
const dataGrap1 = ref({
  foreignShare: 0, //สีม่วง
  foreignValue: 0,
  doubleShare: 0, //สีเขียว
  doubleValue: 0,
  usedInShare: 0, //สีแดง
  usedInValue: 0,
  returnShare: 0, //สีส้ม
  retrunValue: 0,
  comsumedShare: 0, //สีน้ำเงิน
  comsumedValue: 0,
});

const dataGrap2 = ref({
  foreignShare: 0, //สีม่วง
  foreignValue: 0,
  doubleShare: 0, //สีเขียว
  doubleValue: 0,
  usedInShare: 0, //สีแดง
  usedInValue: 0,
  returnShare: 0, //สีส้ม
  retrunValue: 0,
  comsumedShare: 0, //สีน้ำเงิน
  comsumedValue: 0,
});

const dataGrap3 = ref({
  foreignShare: 0, //สีม่วง
  foreignValue: 0,
  doubleShare: 0, //สีเขียว
  doubleValue: 0,
  usedInShare: 0, //สีแดง
  usedInValue: 0,
  returnShare: 0, //สีส้ม
  retrunValue: 0,
  comsumedShare: 0, //สีน้ำเงิน
  comsumedValue: 0,
});
const yearLow = ref("");

const contentYellowList = ref([]);

const loadData = async () => {
  let ecoList = [];
  let ecoGroupName = "";
  let url = serverData.value + "va/getEco.php";
  let res = await axios.get(url);
  ecoList = res.data;
  ecoGroupName = ecoList.filter((x) => x.iso == dataSend.value.economyISO)[0]
    .group;
  fullRegion.value = ecoGroupName;
  let tempGroupISO = ecoList.filter((x) => x.name == ecoGroupName);
  fullRegionISO.value = tempGroupISO[0].iso;
  // console.log("fullRegionISO: ", fullRegionISO.value);
  // console.log("fullRegion: ", fullRegion.value);
  // console.log("ecoList", ecoList);
  //grap1 in section1
  {
    let dataTemp2 = {
      exp_country: fullRegionISO.value,
      imp_country: "WLD",
      exp_sector: "All sectors",
      year: dataSend.value.year,
    };

    let url2 = serverData.value + "/va/strloaddata1.php";
    let res2 = await axios.post(url2, JSON.stringify(dataTemp2));
    // console.log(res2.data);

    {
      let dataFilter = res2.data.filter((x) => x.var == "Backward_linkages");
      dataGrap1.value.foreignShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap1.value.foreignValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res2.data.filter(
        (x) => x.var == "Double_counted_exports"
      );
      dataGrap1.value.doubleShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap1.value.doubleValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res2.data.filter((x) => x.var == "Forward_linkages");
      dataGrap1.value.usedInShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap1.value.usedInValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res2.data.filter((x) => x.var == "Forward_linkages2");
      dataGrap1.value.returnShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap1.value.retrunValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res2.data.filter(
        (x) =>
          x.var == "Intermediate_directly_consumed" ||
          x.var == "Final_directly_consumed"
      );
      dataGrap1.value.comsumedShare =
        Number((dataFilter[0].share * 100).toFixed(2)) +
        Number((dataFilter[1].share * 100).toFixed(2));
      dataGrap1.value.comsumedValue =
        Number(Number(dataFilter[0].value).toFixed(2)) +
        Number(Number(dataFilter[1].value).toFixed(2));
    }

    await nextTick();
    chart1();
  }
  //Chart 2 in Section1
  {
    let dataTemp3 = {
      exp_country: dataSend.value.economyISO,
      imp_country: "WLD",
      exp_sector: "All sectors",
      year: dataSend.value.year,
    };

    let url3 = serverData.value + "/va/strloaddata1.php";
    let res3 = await axios.post(url3, JSON.stringify(dataTemp3));

    {
      let dataFilter = res3.data.filter((x) => x.var == "Backward_linkages");
      dataGrap2.value.foreignShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap2.value.foreignValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter(
        (x) => x.var == "Double_counted_exports"
      );
      dataGrap2.value.doubleShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap2.value.doubleValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter((x) => x.var == "Forward_linkages");
      dataGrap2.value.usedInShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap2.value.usedInValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter((x) => x.var == "Forward_linkages2");
      dataGrap2.value.returnShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap2.value.retrunValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter(
        (x) =>
          x.var == "Intermediate_directly_consumed" ||
          x.var == "Final_directly_consumed"
      );
      dataGrap2.value.comsumedShare =
        Number((dataFilter[0].share * 100).toFixed(2)) +
        Number((dataFilter[1].share * 100).toFixed(2));
      dataGrap2.value.comsumedValue =
        Number(Number(dataFilter[0].value).toFixed(2)) +
        Number(Number(dataFilter[1].value).toFixed(2));
    }

    chart2();
  }

  //grap3 in section1
  {
    let dataTemp3 = {
      exp_country: "WLD",
      imp_country: "WLD",
      exp_sector: "All sectors",
      year: dataSend.value.year,
    };

    let url3 = serverData.value + "/va/strloaddata1.php";
    let res3 = await axios.post(url3, JSON.stringify(dataTemp3));
    // console.log(res2.data);

    {
      let dataFilter = res3.data.filter((x) => x.var == "Backward_linkages");
      dataGrap3.value.foreignShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap3.value.foreignValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter(
        (x) => x.var == "Double_counted_exports"
      );
      dataGrap3.value.doubleShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap3.value.doubleValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter((x) => x.var == "Forward_linkages");
      dataGrap3.value.usedInShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap3.value.usedInValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter((x) => x.var == "Forward_linkages2");
      dataGrap3.value.returnShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap3.value.retrunValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter(
        (x) =>
          x.var == "Intermediate_directly_consumed" ||
          x.var == "Final_directly_consumed"
      );
      dataGrap3.value.comsumedShare =
        Number((dataFilter[0].share * 100).toFixed(2)) +
        Number((dataFilter[1].share * 100).toFixed(2));
      dataGrap3.value.comsumedValue =
        Number(Number(dataFilter[0].value).toFixed(2)) +
        Number(Number(dataFilter[1].value).toFixed(2));
    }

    await nextTick();
    chart3();
  }

  {
    //หาว่าข้อมูลปีที่เก่าที่สุดของประเทศนี้
    let url4 = serverData.value + "va/getYear.php";
    let res4 = await axios.get(url4);
    let yearList = res4.data.sort((a, b) => Number(a.year) - Number(b.year));
    yearLow.value = "";
    for (let yearData of yearList) {
      let dataTempYear = {
        exp_country: dataSend.value.economyISO,
        imp_country: "WLD",
        exp_sector: "All sectors",
        year: yearData.year,
      };
      let urlYear = serverData.value + "va/strloaddata2.php";
      let resYear = await axios.post(urlYear, JSON.stringify(dataTempYear));

      let resultYear = resYear.data;

      if (resultYear.length != 0 && yearLow.value == "") {
        yearLow.value = yearData.year;
      }
    }
    // console.log("yearLow", yearLow.value);
  }
  let modeShow = 1;
  {
    if (dataSend.value.year == yearLow.value) {
      modeShow = 1; // แสดงกราฟเดียวใน section 2
    } else {
      modeShow = 2; // แสดงกราฟสองอันใน section 2
      let dataTempYear = {
        exp_country: dataSend.value.economyISO,
        imp_country: "WLD",
        exp_sector: "All sectors",
        year: dataSend.value.year,
      };
      let urlYear = serverData.value + "va/strloaddata2.php";
      let resYear = await axios.post(urlYear, JSON.stringify(dataTempYear));
      console.log(resYear);
    }
  }
};

const chart1 = () => {
  Highcharts.chart("container2", {
    chart: {
      type: "pie",
      borderRadius: 5,
      height: 400,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    legend: {
      padding: 30,
      alignColumns: false,
      width: 350,
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          // format: "<b>{point.percentage:.1f}</b> %",
          formatter: function () {
            if (this.point.percentage > 1.5) {
              return Highcharts.numberFormat(this.point.percentage, 1) + "%";
            }
          },
          distance: -50,
          color: "black",
        },
        showInLegend: true,
        borderWidth: 1,
        size: 200,
      },
    },

    tooltip: {
      formatter: function () {
        if (this.point.options.total >= 1000) {
          let tempNumber = (this.point.options.total / 1000).toFixed(1);
          return `<b>${this.point.name}</b><br>
              Share: ${this.y}%<br>
              Value:  $${tempNumber} billion`;
        } else {
          let tempNumber = this.point.options.total.toFixed(1);
          return `<b>${this.point.name}</b><br>
              Share: ${this.y}%<br>
              Value:  $${tempNumber} million`;
        }
      },
    },

    series: [
      {
        name: "Browsers",
        colorByPoint: true,
        data: [
          {
            name: "Foreign production consumed by the importer",
            y: dataGrap1.value.foreignShare,
            total: dataGrap1.value.foreignValue,
            color: "#9034AD",
          },
          {
            name: "Double counted",
            y: dataGrap1.value.doubleShare,
            total: dataGrap1.value.doubleValue,
            color: "#4E9487",
          },
          {
            name: "Domestic production used in the <Br> importer's exports",
            y: dataGrap1.value.usedInShare,
            total: dataGrap1.value.usedInValue,
            color: "#D83964",
          },
          {
            name: "Domestic production that returns via <br> the importer's exports",
            y: dataGrap1.value.returnShare,
            total: dataGrap1.value.retrunValue,
            color: "#EB9B38",
          },
          {
            name: "Domestic production consumed by the importer",
            y: dataGrap1.value.comsumedShare,
            total: dataGrap1.value.comsumedValue,
            color: "#4080B3",
          },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  });
};

const chart2 = () => {
  Highcharts.chart("container1", {
    chart: {
      type: "pie",
      borderRadius: 5,
      height: 400,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    legend: {
      padding: 30,
      alignColumns: false,
      width: 350,
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          // format: "<b>{point.percentage:.1f}</b> %",
          formatter: function () {
            if (this.point.percentage > 1.5) {
              return Highcharts.numberFormat(this.point.percentage, 1) + "%";
            }
          },
          distance: -50,
          color: "black",
        },
        showInLegend: true,
        borderWidth: 1,
        size: 200,
      },
    },

    tooltip: {
      formatter: function () {
        if (this.point.options.total >= 1000) {
          let tempNumber = (this.point.options.total / 1000).toFixed(1);
          return `<b>${this.point.name}</b><br>
              Share: ${this.y}%<br>
              Value:  $${tempNumber} billion`;
        } else {
          let tempNumber = this.point.options.total.toFixed(1);
          return `<b>${this.point.name}</b><br>
              Share: ${this.y}%<br>
              Value:  $${tempNumber} million`;
        }
      },
    },

    series: [
      {
        name: "Browsers",
        colorByPoint: true,
        data: [
          {
            name: "Foreign production consumed by the importer",
            y: dataGrap2.value.foreignShare,
            total: dataGrap2.value.foreignValue,
            color: "#9034AD",
          },
          {
            name: "Double counted",
            y: dataGrap2.value.doubleShare,
            total: dataGrap2.value.doubleValue,
            color: "#4E9487",
          },
          {
            name: "Domestic production used in the <Br> importer's exports",
            y: dataGrap2.value.usedInShare,
            total: dataGrap2.value.usedInValue,
            color: "#D83964",
          },
          {
            name: "Domestic production that returns via <br> the importer's exports",
            y: dataGrap2.value.returnShare,
            total: dataGrap2.value.retrunValue,
            color: "#EB9B38",
          },
          {
            name: "Domestic production consumed by the importer",
            y: dataGrap2.value.comsumedShare,
            total: dataGrap2.value.comsumedValue,
            color: "#4080B3",
          },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  });
};

const chart3 = () => {
  Highcharts.chart("container3", {
    chart: {
      type: "pie",
      borderRadius: 5,
      height: 400,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    legend: {
      padding: 30,
      alignColumns: false,
      width: 350,
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          // format: "<b>{point.percentage:.1f}</b> %",
          formatter: function () {
            if (this.point.percentage > 1.5) {
              return Highcharts.numberFormat(this.point.percentage, 1) + "%";
            }
          },
          distance: -50,
          color: "black",
        },
        showInLegend: true,
        borderWidth: 1,
        size: 200,
      },
    },

    tooltip: {
      formatter: function () {
        if (this.point.options.total >= 1000) {
          let tempNumber = (this.point.options.total / 1000).toFixed(1);
          return `<b>${this.point.name}</b><br>
              Share: ${this.y}%<br>
              Value:  $${tempNumber} billion`;
        } else {
          let tempNumber = this.point.options.total.toFixed(1);
          return `<b>${this.point.name}</b><br>
              Share: ${this.y}%<br>
              Value:  $${tempNumber} million`;
        }
      },
    },

    series: [
      {
        name: "Browsers",
        colorByPoint: true,
        data: [
          {
            name: "Foreign production consumed by the importer",
            y: dataGrap3.value.foreignShare,
            total: dataGrap3.value.foreignValue,
            color: "#9034AD",
          },
          {
            name: "Double counted",
            y: dataGrap3.value.doubleShare,
            total: dataGrap3.value.doubleValue,
            color: "#4E9487",
          },
          {
            name: "Domestic production used in the <Br> importer's exports",
            y: dataGrap3.value.usedInShare,
            total: dataGrap3.value.usedInValue,
            color: "#D83964",
          },
          {
            name: "Domestic production that returns via <br> the importer's exports",
            y: dataGrap3.value.returnShare,
            total: dataGrap3.value.retrunValue,
            color: "#EB9B38",
          },
          {
            name: "Domestic production consumed by the importer",
            y: dataGrap3.value.comsumedShare,
            total: dataGrap3.value.comsumedValue,
            color: "#4080B3",
          },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  });
};

onBeforeMount(() => {
  let dataInput = LocalStorage.getItem("countryBrief");
  if (dataInput == null) {
    showError.value = true;
  } else {
    dataSend.value = dataInput;
    loadData();
    // console.log("dataSend: ", dataSend.value);
  }
});
</script>

<style lang="scss" scoped>
.bg-bar {
  background-image: linear-gradient(to right, #6e6b6b, #a5a1a1);
}
</style>
