<template>
  <div style="background-color: #7a7a7a">
    <div class="mainApp">
      <div><RIHeader :menu="0" /></div>
      <div>
        <div class="row justify-center q-pt-lg">
          <div>
            <div class="font-20 q-pt-sm">Select a group or single economy</div>
            <div>To overview integration with Asia-Pacific Region</div>
          </div>
          <div class="q-pl-lg"><EcoSelect @update:selected="getEco" /></div>
        </div>
        <div v-if="dimCI">
          <dimChart :dataSI="dimSI" :dataCI="dimCI" :ecoName="ecoName" />
        </div>
      </div>

      <footerMain />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import RIHeader from "../components/RI_header.vue";
import EcoSelect from "../components/ri_overview/EcoSelect.vue";
import footerMain from "../components/footer2.vue";
import dimChart from "../components/ri_overview/dim_chart.vue";
import { countryGroupListRiva2 } from "./countryGroupList.js";
import { serverSetup, yearInputShow } from "./server";
import { useQuasar } from "quasar";
import { isEqual } from "lodash";

import axios from "axios";
const $q = useQuasar();
const { serverData } = serverSetup();
const { yearInput } = yearInputShow();
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
const reporter = ref([]);
const input = ref({
  year: {
    min: yearInput.value.min,
    max: yearInput.value.max,
  },
  type: "Sustainable",
});
const dimSI = ref([]);
const dimCI = ref([]);
const ecoName = ref("");
const getEco = (selected) => {
  if (!isEqual(reporter.value, countryGroupListRiva2(selected.iso))) {
    reporter.value = countryGroupListRiva2(selected.iso);
    ecoName.value = selected.name;
    loadDimCal();
  }
};

const loadDimCal = async () => {
  $q.loading.show();
  const dataInputSustainable = {
    input: { ...input.value, type: "Sustainable" },
    partnerMap: partner.value,
    reportMap: reporter.value,
  };
  const dataInputConventional = {
    input: { ...input.value, type: "Conventional" },
    partnerMap: partner.value,
    reportMap: reporter.value,
  };
  const url = serverData.value + "ri/overview_line_chart.php";

  try {
    const [resSustainable, resConventional] = await Promise.all([
      axios.post(url, JSON.stringify(dataInputSustainable)),
      axios.post(url, JSON.stringify(dataInputConventional)),
    ]);
    dimSI.value = resSustainable.data;
    dimCI.value = resConventional.data;
    console.log(dimSI.value);
    console.log(dimCI.value);
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    $q.loading.hide();
  }
};

onMounted(() => {
  // Refresh the page on first load to ensure meta tag change
  sessionStorage.removeItem("reloaded2");
  if (!sessionStorage.getItem("reloaded")) {
    sessionStorage.setItem("reloaded", "true");
    location.reload();
  }
});
</script>

<style lang="scss" scoped>
.mainApp {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  background-color: #fff;
}
.font-20 {
  font-size: 20px;
}
</style>
