<template>
  <div style="background-color: #7a7a7a">
    <div class="mainApp">
      <div>
        <VAHeader :shareContent="shareContent" :tinaLink="tinaLinkURL" />
      </div>
      <!-- Menu -->
      <div class="menuMain row">
        <div style="width: 450px">
          <div style="font-size: 24px; padding-top: 14px" class="q-px-xl">
            <div class="q-pt-md selectedMenu">GVC relationships</div>
            <div class="q-pt-md cursor-pointer" @click="goToStep2">
              Structure of value added
            </div>
            <div class="q-pt-md cursor-pointer" @click="goToStep3">
              Participation in GVCs
            </div>
            <div class="q-pt-md cursor-pointer" @click="goToStep4">
              Backward linkages
            </div>
            <div class="q-pt-md cursor-pointer" @click="goToStep5">
              Forward linkages
            </div>
          </div>
        </div>
        <div style="width: 5px">
          <div class="vl"></div>
        </div>
        <div class="col">
          <div class="row justify-center" style="padding-top: 50px">
            <EcoSelect
              label="Exporting economy"
              @update:selected="getExport"
              :initialValue="exportingISO"
            />

            <div style="width: 30px"></div>
            <div><yearSelect @update="getYear" :initialValue="year" /></div>
          </div>
          <div
            class="text-white text-center q-pt-md"
            style="font-size: 16px"
            v-show="showInputText"
          >
            Please select input data from the dropdown menus above
          </div>
        </div>
      </div>
      <!-- Key question -->
      <div class="q-pa-lg" v-if="!showResult">
        <div>
          <div style="font-size: 20px">Key policy questions</div>
          <ul>
            <li>
              How much do imports from abroad play a role in an economy's export
              production? (backward linkages)
            </li>
            <li>
              Which exporting sectors in this economy rely the most on imported
              content from other economies? (backward linkages)
            </li>
            <li>
              Which economies contribute the most towards this economy's
              exports? (backward linkages)
            </li>
            <li>
              How much does an economy's value-added in exports contribute to
              export production in other economies? (forward linkages)
            </li>
            <li>
              Which exporting sectors is this economy contribute the most to
              export production in other economies? (forward linkages)
            </li>
            <li>
              Which economies are most dependent on this economy's exports for
              their own export production? (forward linkages)
            </li>
          </ul>
        </div>
      </div>
      <div v-if="showResult">
        <!-- <div class="q-pa-lg row justify-center" style="font-size: 20px">
          <div style="padding-top: 10px" class="q-pr-lg">Scoll to</div>
          <div class="q-pr-lg">
            <q-btn
              label="Overview"
              no-caps
              outline
              style="font-size: 20px; width: 260px"
            />
          </div>
          <div class="q-pr-lg">
            <q-btn
              label="By exporting sector"
              no-caps
              outline
              style="font-size: 20px; width: 260px"
            />
          </div>
          <div>
            <q-btn
              label="By partner economy"
              no-caps
              outline
              style="font-size: 20px; width: 260px"
            />
          </div>
        </div>
        <hr /> -->
        <div>
          <GvcOverview :dataSend="dataSend" />
        </div>

        <hr />
        <div id="pageSector">
          <top5sector :dataSend="dataSend" />
        </div>

        <hr />
        <div id="pageOverview">
          <top5Country :dataSend="dataSend" />
        </div>
      </div>
      <footerMain />
    </div>
  </div>
</template>

<script setup>
import VAHeader from "../components/VA_header.vue";
import yearSelect from "../components/YearSelect.vue";
import EcoSelect from "../components/EcoSelect.vue";
import footerMain from "../components/footer2.vue";
import GvcOverview from "../components/va_gvc/overview.vue";
import top5sector from "../components/va_gvc/top5sector.vue";
import top5Country from "../components/va_gvc/top5partner.vue";

import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const inputData = ref({
  exportingName: "",
  exportingISO: "",
  year: "",
});
const dataSend = ref({
  exportingName: "",
  exportingISO: "",
  year: "",
});
const router = useRouter();
const route = useRoute();
const showInputText = ref(true);
const showResult = ref(false);

// Get initial values from route params
const exportingISO = ref(route.params.iso || "");
const year = ref(route.params.year || "");

const getYear = (value) => {
  inputData.value.year = value;
  if (inputData.value.exportingISO != "") {
    dataSend.value = inputData.value;
  }
};
const getExport = (selected) => {
  inputData.value.exportingName = selected.name;
  inputData.value.exportingISO = selected.iso;
  dataSend.value = inputData.value;
  showResult.value = true;
};

const goToStep2 = () => {
  router.push("/structureofvalueadded");
};
const goToStep3 = () => {
  router.push("/participationingvcs");
};
const goToStep4 = () => {
  router.push("/backwardlinkages");
};
const goToStep5 = () => {
  router.push("/forwardlinkages");
};
//Share
const shareContent = ref("");
const tinaLinkURL = ref("");

// Scroll to section
const pageOverview = ref(null);

const scrollToSection = (sectionId) => {
  if (sectionId === "pageOverview" && pageOverview.value) {
    pageOverview.value.scrollIntoView({ behavior: "smooth" });
  }
};

watch(
  () => inputData.value,
  (newValue) => {
    if (newValue.exportingName && newValue.exportingISO) {
      showInputText.value = false;
      shareContent.value =
        "https://riva.negotiatetrade.org/#/gvcrelationships/" +
        inputData.value.exportingISO +
        "/" +
        inputData.value.year;
    } else {
      showInputText.value = true;
    }
  },
  { deep: true }
);

// Watch route params to update inputData
watch(route, (newRoute) => {
  if (newRoute.params.iso) {
    exportingISO.value = newRoute.params.iso;
    getExport({ name: "", iso: newRoute.params.iso });
  }
  if (newRoute.params.year) {
    year.value = newRoute.params.year;
    getYear(newRoute.params.year);
  }
});

onMounted(() => {
  if (exportingISO.value) {
    getExport({ name: "", iso: exportingISO.value });
  }
  if (year.value) {
    getYear(year.value);
  }
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
  max-width: 1400px !important;
  margin: auto;
  background-color: #fff;
}
.menuMain {
  background-color: #16222d;
  height: 310px;
  color: white;
}
.vl {
  width: 1px;
  height: 260px;
  border-left: 2px solid white;
  margin-top: 20px;
}
.selectedMenu {
  color: #e2cd11;
}
</style>
