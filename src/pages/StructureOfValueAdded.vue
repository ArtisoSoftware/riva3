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
            <div class="q-pt-md cursor-pointer" @click="goToStep1">
              GVC relationships
            </div>
            <div class="q-pt-md selectedMenu">Structure of value added</div>
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
          <div class="row justify-center" style="padding-top: 35px">
            <EcoSelect
              label="Exporting economy"
              @update:selected="getExportEco"
              :initialValue="exportingISO"
            />

            <div style="width: 30px"></div>
            <div><yearSelect @update="getYear" :initialValue="year" /></div>
          </div>
          <div class="row justify-center" style="padding-top: 10px">
            <EcoSelect
              label="importing economy"
              @update:selected="getImportEco"
              :initialValue="importingISO"
            />

            <div style="width: 30px"></div>
            <div>
              <SectorSelect
                @update:selected="getSector"
                :initialValue="sector"
              />
            </div>
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
      <div class="q-pa-lg">
        <div>
          <div style="font-size: 20px">Key policy questions</div>
          <ul>
            <li>How is an economy's gross exports produced and utilised?</li>
            <li>
              How does this economy's value-added trade balance differ from its
              gross trade balance?
            </li>
            <li>
              How are gross exports produced and consumed across other economies
              in the same region?
            </li>
          </ul>
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
import SectorSelect from "../components/SectorSelect.vue";
import footerMain from "../components/footer.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
const inputData = ref({
  exportingName: "",
  exportingISO: "",
  importingName: "",
  importingISO: "",
  year: "",
  sectorName: "",
  sectorID: "",
});
const showInputText = ref(true);
const tinaLinkURL = ref("");
const getYear = (value) => {
  inputData.value.year = value;
};
const getExportEco = (selected) => {
  inputData.value.exportingName = selected.name;
  inputData.value.exportingISO = selected.iso;
};
const getImportEco = (selected) => {
  inputData.value.importingName = selected.name;
  inputData.value.importingISO = selected.iso;
};
const getSector = (selected) => {
  inputData.value.sectorID = selected.id;
  inputData.value.sectorName = selected.name;
};
const router = useRouter();
const route = useRoute();

// Get initial values from route params
const exportingISO = ref(route.params.exp || "");
const importingISO = ref(route.params.imp || "");
const year = ref(route.params.year || "");
const sector = ref(route.params.sector || "");

//Share
const shareContent = ref("");

watch(
  () => inputData.value,
  (newValue) => {
    if (
      newValue.exportingName &&
      newValue.exportingISO &&
      newValue.importingISO &&
      newValue.importingName &&
      newValue.sectorName &&
      newValue.sectorID
    ) {
      showInputText.value = false;
      shareContent.value =
        "https://riva.negotiatetrade.org/#/structureofvalueadded/" +
        inputData.value.exportingISO +
        "/" +
        inputData.value.importingISO +
        "/" +
        inputData.value.sectorID +
        "/" +
        inputData.value.year;
      tinaLinkURL.value =
        "https://tina.trade/app/dashboard/" +
        inputData.value.exportingISO +
        "-" +
        inputData.value.importingISO +
        "/current-trade";
      console.log(inputData.value);
    } else {
      showInputText.value = true;
    }
  },
  { deep: true }
);

// Watch route params to update inputData
watch(route, (newRoute) => {
  if (newRoute.params.exp) {
    exportingISO.value = newRoute.params.exp;
    getExportEco({ name: "", iso: newRoute.params.exp });
  }
  if (newRoute.params.imp) {
    importingISO.value = newRoute.params.imp;
    getImportEco({ name: "", iso: newRoute.params.imp });
  }
  if (newRoute.params.sector) {
    sectorID.value = newRoute.params.sector;
    getSector({ sectorName: "", sectorID: newRoute.params.sector });
  }
  if (newRoute.params.year) {
    year.value = newRoute.params.year;
    getYear(newRoute.params.year);
  }
});
onMounted(() => {
  if (exportingISO.value) {
    getExportEco({ name: "", iso: exportingISO.value });
  }
  if (importingISO.value) {
    getImportEco({ name: "", iso: importingISO.value });
  }
  if (sector.value) {
    getSector({ sectorName: "", sectorID: sector.value });
  }
  if (year.value) {
    getYear(year.value);
  }
});

const goToStep1 = () => {
  router.push("/gvcrelationships");
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
</script>

<style lang="scss" scoped>
.mainApp {
  width: 100%;
  max-width: 1400px;
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
