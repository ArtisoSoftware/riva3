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
            <div class="q-pt-md selectedMenu">Backward linkages</div>
            <div class="q-pt-md cursor-pointer" @click="goToStep5">
              Forward linkages
            </div>
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
              label="Select by source economy"
              color="yellow-8"
              @update:model-value="changeMode"
              dark
            />
          </div>
          <div class="row justify-center" style="padding-top: 10px">
            <EcoSelect
              label="Exporting economy"
              @update:selected="getExportInput"
              :initialValue="exportingISO"
            />

            <div style="width: 30px"></div>
            <div><yearSelect @update="getYear" :initialValue="year" /></div>
          </div>
          <div class="row justify-center" style="padding-top: 5px">
            <EcoSelect
              label="Importing economy"
              @update:selected="getImportInput"
              :initialValue="importingISO"
            />

            <div style="width: 30px"></div>
            <div>
              <EcoSelect
                label="Source economy"
                @update:selected="getSourceInput"
                :initialValue="sourceISO"
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
          <div style="font-size: 20px">
            Key policy questions (select by source economy)
          </div>
          <ul>
            <li>
              How is foreign value-added distributed across
              {{
                inputData.exportingName == ""
                  ? "economy"
                  : inputData.exportingName
              }}'s exporting sectors?
            </li>
            <li>How does this compare across economies in the same region?</li>
          </ul>
        </div>
      </div>
      <hr />
      <!-- FlowChart -->
      <div>
        <div class="text-center q-pt-md" style="font-size: 20px">
          Where does imported content come from?
        </div>
        <div class="text-center">
          Some part of an {{ showExportText }}'s gross exports consist of
          imported inputs that originate in other source economies.
        </div>
        <div class="row justify-center q-pt-md">
          <div class="q-pt-sm text-center" style="width: 200px">
            Source economy
          </div>
          <div style="width: 50px" class="text-center">
            <img
              src="../../public/images/right-arrow.svg"
              alt=""
              style="width: 40px"
            />
          </div>
          <div class="q-pt-sm text-center" style="width: 200px">
            Exporting economy
          </div>
          <div class="q-pt-sm text-center" style="width: 70px">:</div>
          <div class="q-pt-sm text-center" style="width: 200px">
            Exporting sector
          </div>
          <div style="width: 50px" class="text-center">
            <img
              src="../../public/images/right-arrow.svg"
              alt=""
              style="width: 40px"
            />
          </div>
          <div class="q-pt-sm text-center" style="width: 200px">
            Importing economy
          </div>
        </div>
        <div style="height: 60px" class="row justify-center">
          <div class="text-center" style="width: 200px">
            {{ inputData.sourceName }}
          </div>
          <div style="width: 50px"></div>
          <div class="text-center" style="width: 200px">
            {{ inputData.exportingName }}
          </div>
          <div style="width: 70px"></div>
          <div class="text-center" style="width: 200px">All sectors</div>
          <div class="" style="width: 50px"></div>
          <div class="text-center" style="width: 200px">
            {{ inputData.importingName }}
          </div>
        </div>
      </div>
      <div v-if="showResult">
        <hr />
        <backwardSource1 :dataSend="dataSend" />
        <hr />
        <backwardSource2 :dataSend="dataSend" />
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
import footerMain from "../components/footerA.vue";
import backwardSource1 from "src/components/va_backward/backwardSource1.vue";
import backwardSource2 from "src/components/va_backward/backwardSource2.vue";
import { countryGroupListRiva2 } from "./countryGroupList";

import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LocalStorage } from "quasar";
//input
const modeCal = ref("2");
const inputData = ref({
  exportingName: "",
  exportingISO: "",
  year: "",
  importingName: "",
  importingISO: "",
  sourceName: "",
  sourceISO: "",
});
const exportingFullISO = ref([]);
const importingFullISO = ref([]);
const sourceFullISO = ref([]);
const showInputText = ref(true);
const tinaLinkURL = ref("");
const router = useRouter();
const route = useRoute();
const showResult = ref(false);

// Get initial values from route params
const exportingISO = ref(route.params.exp || "");
const importingISO = ref(route.params.imp || "");
const year = ref(route.params.year || "");
const sourceISO = ref(route.params.source || "");

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
const getExportInput = (selected) => {
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

const getImportInput = (selected) => {
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

const getSourceInput = (selected) => {
  inputData.value.sourceName = selected.name;
  inputData.value.sourceISO = selected.iso;
  let dataOld = LocalStorage.getItem("inputVA");
  if (dataOld == null) {
    let tempInput = {
      exportingISO: "",
      exportingName: "",
      importingISO: "",
      importingName: "",
      sourceISO: inputData.value.sourceISO,
      sourceName: inputData.value.sourceName,
      year: "",
      sector: "",
    };
    LocalStorage.set("inputVA", tempInput);
  } else {
    dataOld.sourceISO = inputData.value.sourceISO;
    dataOld.sourceName = inputData.value.sourceName;
    LocalStorage.set("inputVA", dataOld);
  }
};

//Share
const shareContent = ref("");
watch(
  () => inputData.value,
  (newValue) => {
    if (
      newValue.exportingName &&
      newValue.exportingISO &&
      newValue.importingName &&
      newValue.importingISO &&
      newValue.sourceName &&
      newValue.sourceISO
    ) {
      showInputText.value = false;
      shareContent.value =
        "https://riva.negotiatetrade.org/#/backwardlinkagessource/" +
        inputData.value.exportingISO +
        "/" +
        inputData.value.importingISO +
        "/" +
        inputData.value.sourceISO +
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

const isShowDup = ref(false);

const checkDuplicated = () => {
  isShowDup.value = false;
  exportingFullISO.value = countryGroupListRiva2(inputData.value.exportingISO);
  importingFullISO.value = countryGroupListRiva2(inputData.value.importingISO);
  sourceFullISO.value = countryGroupListRiva2(inputData.value.sourceISO);
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
  sourceName: "",
  sourceISO: "",
  year: "",
});

const runGraph = () => {
  dataSend.value = inputData.value;
  showResult.value = true;
};

// Watch route params to update inputData
watch(route, (newRoute) => {
  if (newRoute.params.exp) {
    exportingISO.value = newRoute.params.exp;
    getExportInput({ name: "", iso: newRoute.params.exp });
  }
  if (newRoute.params.imp) {
    importingISO.value = newRoute.params.imp;
    getImportInput({ name: "", iso: newRoute.params.imp });
  }
  if (newRoute.params.source) {
    sourceISO.value = newRoute.params.source;
    getSourceInput({ name: "", iso: newRoute.params.source });
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
  if (importingISO.value) {
    getImportInput({ name: "", iso: importingISO.value });
  } else {
    let dataOld = LocalStorage.getItem("inputVA");
    if (dataOld != null) {
      if (dataOld.importingISO) {
        importingISO.value = dataOld.importingISO;
      }
    }
  }
  if (sourceISO.value) {
    getSourceInput({ name: "", iso: sourceISO.value });
  } else {
    let dataOld = LocalStorage.getItem("inputVA");
    if (dataOld != null) {
      if (dataOld.sourceISO) {
        sourceISO.value = dataOld.sourceISO;
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
// const goToStep4 = () => {
//   router.push("/backwardlinkages");
// };
const goToStep5 = () => {
  router.push("/forwardlinkages");
};

const changeMode = () => {
  if (modeCal.value == 1) {
    router.push("/backwardlinkages");
  }
};

//Chart
const showExportText = ref("economy");
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
