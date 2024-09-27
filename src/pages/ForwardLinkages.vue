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
            <div class="q-pt-md cursor-pointer" @click="goToStep2">
              Structure of value added
            </div>
            <div class="q-pt-md cursor-pointer" @click="goToStep3">
              Participation in GVCs
            </div>
            <div class="q-pt-md cursor-pointer" @click="goToStep4">
              Backward linkages
            </div>
            <div class="q-pt-md selectedMenu">Forward linkages</div>
          </div>
        </div>
        <div style="width: 5px">
          <div class="vl"></div>
        </div>
        <div class="col">
          <div class="row q-pt-md row justify-center" style="font-size: 20px">
            <q-radio
              v-model="modeCal"
              val="1"
              label="Select by exporting sector"
              color="yellow-8"
              @update:model-value="changeMode"
              dark
            />
            <div style="width: 30px"></div>
            <q-radio
              v-model="modeCal"
              val="2"
              label="Select by importing economy"
              color="yellow-8"
              @update:model-value="changeMode"
              dark
            />
          </div>
          <div class="row justify-center" style="padding-top: 10px">
            <EcoSelect
              label="Exporting economy"
              @update:selected="getExport"
              :initialValue="exportingISO"
            />

            <div style="width: 30px"></div>
            <div><yearSelect @update="getYear" :initialValue="year" /></div>
          </div>
          <div class="row justify-center" style="padding-top: 5px">
            <SectorSelect @update:selected="getSector" :initialValue="sector" />
            <div style="width: 380px"></div>
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
          <div style="font-size: 20px">
            Key policy questions (Select by exporting sector)
          </div>
          <ul>
            <li>
              Where does
              {{
                inputData.exportingName == ""
                  ? "economy"
                  : inputData.exportingName
              }}
              contribute the most towards export production?
            </li>
            <li>How does this compare across economies in the same region?</li>
          </ul>
        </div>
      </div>
      <hr />
      <!-- FlowChart -->
      <div>
        <div class="text-center q-pt-md" style="font-size: 20px">
          Where does {{ showExportText }} contribute towards export production?
        </div>
        <div class="text-center">
          Some part of {{ showExportText }}'s gross exports consist of
          intermediate inputs that are used by the direct importer to produce
          exports for third economies.
        </div>
        <div class="row justify-center q-pt-md">
          <div class="q-pt-sm text-center" style="width: 200px">
            Exporting economy
          </div>
          <div style="width: 50px" class="text-center">
            <img
              src="../../public/images/right-arrow.svg"
              alt=""
              style="width: 40px"
            />
          </div>
          <div class="q-pt-sm text-center" style="width: 200px">
            Exporting sector
          </div>
          <div class="q-pt-sm text-center" style="width: 70px">:</div>
          <div class="q-pt-sm text-center" style="width: 200px">
            Importing economy
          </div>
          <div style="width: 50px" class="text-center">
            <img
              src="../../public/images/right-arrow.svg"
              alt=""
              style="width: 40px"
            />
          </div>
          <div class="q-pt-sm text-center" style="width: 200px">
            Third economies
          </div>
        </div>
        <div style="height: 60px" class="row justify-center">
          <div style="width: 200px" class="text-center">
            {{ inputData.exportingName }}
          </div>
          <div style="width: 50px"></div>
          <div class="text-center" style="width: 200px">
            {{ inputData.sectorName }}
          </div>
          <div style="width: 70px"></div>
          <div class="text-center" style="width: 200px">All</div>
          <div class="" style="width: 50px"></div>
          <div class="text-center" style="width: 200px"></div>
        </div>
      </div>
      <!-- Show result -->
      <div v-if="showResult">
        <hr />
        <forwardSector1 :dataSend="dataSend" />
        <hr />
        <forwardSector2 :dataSend="dataSend" />
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
import forwardSector1 from "src/components/va_forward/forwardSector1.vue";
import forwardSector2 from "src/components/va_forward/forwardSector2.vue";

import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LocalStorage } from "quasar";
//input
const modeCal = ref("1");
const inputData = ref({
  exportingName: "",
  exportingISO: "",
  year: "",
  sectorName: "",
});
const showInputText = ref(true);
const shareContent = ref("");
const showResult = ref(false);
const tinaLinkURL = ref("");
const router = useRouter();
const route = useRoute();

// Get initial values from route params
const exportingISO = ref(route.params.exp || "");
const year = ref(route.params.year || "");
const sector = ref(route.params.sector || "");

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
const getExport = (selected) => {
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

//Share

watch(
  () => inputData.value,
  (newValue) => {
    if (
      newValue.exportingName &&
      newValue.exportingISO &&
      newValue.sectorName
    ) {
      showInputText.value = false;
      shareContent.value =
        "https://riva.negotiatetrade.org/#/forwardlinkages/" +
        inputData.value.exportingISO +
        "/" +
        inputData.value.sectorName +
        "/" +
        inputData.value.year;
      runGraph();
    } else {
      showInputText.value = true;
    }
  },
  { deep: true }
);

const dataSend = ref({
  exportingName: "",
  exportingISO: "",
  year: "",
  sectorName: "",
});
const runGraph = () => {
  dataSend.value = inputData.value;
  showResult.value = true;
};

// Watch route params to update inputData
watch(route, (newRoute) => {
  if (newRoute.params.exp) {
    exportingISO.value = newRoute.params.exp;
    getExport({ name: "", iso: newRoute.params.exp });
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
    getExportInput({ name: "", iso: exportingISO.value });
  } else {
    let dataOld = LocalStorage.getItem("inputVA");
    if (dataOld != null) {
      if (dataOld.exportingISO) {
        exportingISO.value = dataOld.exportingISO;
      }
    }
  }
  if (sector.value) {
    getSectorInput({ sectorName: "", sectorID: sector.value });
  } else {
    let dataOld = LocalStorage.getItem("inputVA");
    if (dataOld != null) {
      if (dataOld.sector) {
        sector.value = dataOld.sector;
      }
    }
  }
  if (year.value) {
    getYear(year.value);
  } else {
    let dataOld = LocalStorage.getItem("inputVA");
    if (dataOld != null) {
      if (dataOld.year) {
        year.value = dataOld.year;
      }
    }
  }
});

//Menu
const goToStep1 = () => {
  router.push("/gvcrelationships");
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

const changeMode = () => {
  if (modeCal.value == 2) {
    router.push("/forwardlinkagesimport");
  }
};

//Chart
const showExportText = ref("an economy");
watch(
  () => inputData.value.exportingName,
  (newValue) => {
    if (newValue) {
      showExportText.value = newValue;
    } else {
      showExportText.value = "economy";
    }
  }
);
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
  height: 240px;
  border-left: 2px solid white;
  margin-top: 20px;
}
.selectedMenu {
  color: #e2cd11;
}
</style>
