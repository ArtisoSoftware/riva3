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
              label="Importing economy"
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
      <div class="q-pa-lg" v-show="!isShowDup">
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
        <hr />
        <div class="font-20 text-center q-pt-md">
          Exporter's gross exports to importer can be divided into 6 parts,
        </div>
        <div class="font-20 text-center q-pb-md">
          depending on where they come from and how they are used:
        </div>
        <div class="row justify-center">
          <img
            src="../../public/images/strflowchart.svg"
            alt=""
            style="width: 80%"
          />
        </div>
        <div v-if="showResult">
          <hr />
          <strGraph1 :dataSend="dataSend" />
          <hr />
          <strGraph2 :dataSend="dataSend" />
          <hr />
          <strGraph3 :dataSend="dataSend" />
        </div>
      </div>
      <div class="q-pa-lg" v-show="isShowDup">
        <div class="sorryDiv row items-center">
          <div class="col-4 q-pa-md text-center">
            <q-icon
              name="fa-solid fa-triangle-exclamation"
              size="126px"
              color="warning"
            />
          </div>
          <div class="col">
            <div class="text-h5">Sorry, this page isn't available</div>
            <div>
              The exporting economy cannot be the same as the importing economy.
            </div>
          </div>
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
import footerMain from "../components/footerA.vue";
import strGraph1 from "../components/va_str_value_added/va_str_graph1.vue";
import strGraph2 from "../components/va_str_value_added/va_str_graph2.vue";
import strGraph3 from "../components/va_str_value_added/va_str_graph3.vue";
import { countryGroupListRiva2 } from "./countryGroupList";
import { useRouter, useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import { LocalStorage } from "quasar";
const inputData = ref({
  exportingName: "",
  exportingISO: "",
  importingName: "",
  importingISO: "",
  year: "",
  sectorName: "",
});
const exportingFullISO = ref([]);
const importingFullISO = ref([]);
const showInputText = ref(true);
const showResult = ref(false);
const tinaLinkURL = ref("");
const getYear = (value) => {
  inputData.value.year = value;
  let dataOld = LocalStorage.getItem("inputVA");
  if (dataOld == null) {
    let tempInput = {
      exportingISO: "",
      exportingName: "",
      importingISO: "",
      importingName: "",
      sourceISO: "",
      sourceName: "",
      year: value,
      sector: "",
    };
    LocalStorage.set("inputVA", tempInput);
  } else {
    dataOld.year = inputData.value.year;
    LocalStorage.set("inputVA", dataOld);
  }
};
const getExportEco = (selected) => {
  inputData.value.exportingName = selected.name;
  inputData.value.exportingISO = selected.iso;
  let dataOld = LocalStorage.getItem("inputVA");
  if (dataOld == null) {
    let tempInput = {
      exportingISO: inputData.value.exportingISO,
      exportingName: inputData.value.exportingName,
      importingISO: "",
      importingName: "",
      sourceISO: "",
      sourceName: "",
      year: "",
      sector: "",
    };
    LocalStorage.set("inputVA", tempInput);
  } else {
    dataOld.exportingISO = inputData.value.exportingISO;
    dataOld.exportingName = inputData.value.exportingName;
    LocalStorage.set("inputVA", dataOld);
  }
};
const getImportEco = (selected) => {
  inputData.value.importingName = selected.name;
  inputData.value.importingISO = selected.iso;
  let dataOld = LocalStorage.getItem("inputVA");
  if (dataOld == null) {
    let tempInput = {
      exportingISO: "",
      exportingName: "",
      importingISO: inputData.value.importingISO,
      importingName: inputData.value.importingName,
      sourceISO: "",
      sourceName: "",
      year: "",
      sector: "",
    };
    LocalStorage.set("inputVA", tempInput);
  } else {
    dataOld.importingISO = inputData.value.importingISO;
    dataOld.importingName = inputData.value.importingName;
    LocalStorage.set("inputVA", dataOld);
  }
};
const getSector = (selected) => {
  inputData.value.sectorName = selected;
  let dataOld = LocalStorage.getItem("inputVA");
  if (dataOld == null) {
    let tempInput = {
      exportingISO: "",
      exportingName: "",
      importingISO: "",
      importingName: "",
      sourceISO: "",
      sourceName: "",
      year: "",
      sector: inputData.value.sectorName,
    };
    LocalStorage.set("inputVA", tempInput);
  } else {
    dataOld.sector = inputData.value.sectorName;
    LocalStorage.set("inputVA", dataOld);
  }
};
const router = useRouter();
const route = useRoute();

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
      newValue.sectorName
    ) {
      showInputText.value = false;
      shareContent.value =
        "https://riva.negotiatetrade.org/#/structureofvalueadded/" +
        inputData.value.exportingISO +
        "/" +
        inputData.value.importingISO +
        "/" +
        inputData.value.sectorName +
        "/" +
        inputData.value.year;
      tinaLinkURL.value =
        "https://tina.trade/app/dashboard/" +
        inputData.value.exportingISO +
        "-" +
        inputData.value.importingISO +
        "/current-trade";

      checkDuplicated();
    } else {
      showInputText.value = true;
    }
  },
  { deep: true }
);

//check export & import duplicated or not
const isShowDup = ref(false);
const checkDuplicated = () => {
  isShowDup.value = false;
  exportingFullISO.value = countryGroupListRiva2(inputData.value.exportingISO);
  importingFullISO.value = countryGroupListRiva2(inputData.value.importingISO);
  if (
    exportingFullISO.value.length == 1 &&
    importingFullISO.value.length == 1
  ) {
    if (importingFullISO.value[0] == exportingFullISO.value[0]) {
      isShowDup.value = true;
      return;
    }
  }

  runGraph();
};

//run component
const dataSend = ref({
  exportingName: "",
  exportingISO: "",
  importingName: "",
  importingISO: "",
  year: "",
  sectorName: "",
});
const runGraph = () => {
  dataSend.value = inputData.value;
  showResult.value = true;
};
// Watch route params to update inputData
watch(
  () => route.params,
  (newParams) => {
    if (newParams.exp) {
      exportingISO.value = newParams.exp;
      // getExportEco({ name: "", iso: newParams.exp });
    }
    if (newParams.imp) {
      importingISO.value = newParams.imp;
      // getImportEco({ name: "", iso: newParams.imp });
    }
    if (newParams.sector) {
      // inputData.value.sectorName = newParams.sector;
      sector.value = route.params.sector;
      // getSector(newParams.sector);
    }
    if (newParams.year) {
      year.value = newParams.year;
      // getYear(newParams.year);
    }
    showInputText.value = false;
    showResult.value = true;
  }
);
// Get initial values from route params

const exportingISO = ref("");
const importingISO = ref("");
const year = ref("");
const sector = ref("");

onMounted(() => {
  exportingISO.value = route.params.exp || "";
  if (exportingISO.value == "") {
    let dataOld = LocalStorage.getItem("inputVA");
    if (dataOld != null) {
      if (dataOld.exportingISO) {
        exportingISO.value = dataOld.exportingISO;
      }
    }
  }
  importingISO.value = route.params.imp || "";
  if (importingISO.value == "") {
    let dataOld = LocalStorage.getItem("inputVA");
    if (dataOld != null) {
      if (dataOld.importingISO) {
        importingISO.value = dataOld.importingISO;
      }
    }
  }
  year.value = route.params.year || "";
  if (year.value == "") {
    let dataOld = LocalStorage.getItem("inputVA");
    if (dataOld != null) {
      if (dataOld.year) {
        year.value = dataOld.year;
      }
    }
  }
  // inputData.value.sectorName = route.params.sector || "";
  sector.value = route.params.sector || "";
  if (sector.value == "") {
    let dataOld = LocalStorage.getItem("inputVA");
    if (dataOld != null) {
      if (dataOld.sector) {
        sector.value = dataOld.sector;
      }
    }
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
.sorryDiv {
  width: 700px;
  height: 250px;
  margin: auto;
  border: 2px solid #16222d;
  border-radius: 5px;
}
</style>
