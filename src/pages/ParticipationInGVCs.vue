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
            <div class="q-pt-md selectedMenu">Participation in GVCs</div>
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
      <div style="font-size: 20px" class="q-pa-lg" v-show="!isShowDup">
        <div v-show="!isShowDup">
          <div style="font-size: 24px">
            <b>Why does GVC participation matter?</b>
          </div>
          <div>
            GVC participation matters for development. GVCs support efficient
            production and technology diffusion, and access to capital and
            inputs thereby increasing productivity and income growth, and
            reducing poverty.
          </div>
          <div>
            In addition, recent developments in digital technology are set to
            support integration of SMEs into GVCs, further amplifying
            sustainable outcomes from participation.
          </div>
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
      <div v-if="showResult">
        <hr />
        <partGraph1 :dataSend="dataSend" />
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
import partGraph1 from "../components/va_participation/va_participation_graph1.vue";
import { useRouter, useRoute } from "vue-router";
import { countryGroupListRiva2 } from "./countryGroupList";
import { ref, watch, onMounted } from "vue";
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
  inputData.value.sectorName = selected;
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
        "https://riva.negotiatetrade.org/#/participationingvcs/" +
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

//Check export & import duplicated or not
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
watch(
  () => route.params,
  (newParams) => {
    // console.log(newParams);
    if (newParams.exp) {
      exportingISO.value = newParams.exp;
      // getExportEco({ name: "", iso: newParams.exp });
    }
    if (newParams.imp) {
      importingISO.value = newParams.imp;
      // getImportEco({ name: "", iso: newParams.imp });
    }
    if (newParams.sector) {
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
const exportingISO = ref("");
const importingISO = ref("");
const year = ref("");
const sector = ref("");

onMounted(() => {
  exportingISO.value = route.params.exp || "";
  importingISO.value = route.params.imp || "";
  year.value = route.params.year || "";
  sector.value = route.params.sector || "";
});

const goToStep1 = () => {
  router.push("/gvcrelationships");
};
const goToStep2 = () => {
  router.push("/structureofvalueadded");
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
