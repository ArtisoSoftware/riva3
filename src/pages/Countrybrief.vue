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
            <div class="q-pt-md cursor-pointer" @click="goToStep5">
              Forward linkages
            </div>
          </div>
        </div>
        <div style="width: 5px">
          <div class="vl"></div>
        </div>
        <div class="col">
          <div class="text-center text-h6 q-py-sm">countrybrief</div>
          <div style="width: 350px; margin: auto">
            <EcoSelect
              label="Economy"
              @update:selected="getExportInput"
              initialValue=""
            />
          </div>
          <div style="width: 350px; margin: auto">
            <yearSelect @update="getYear" initialValue="" />
          </div>
          <div class="q-pt-md text-center">
            <q-btn
              label="Generate"
              no-caps
              class="btnGen"
              :disable="!isGen"
              @click="runGen()"
            />
          </div>
        </div>
      </div>
      <footerMain />
    </div>
  </div>
</template>

<script setup>
import VAHeader from "../components/VA_header.vue";
import footerMain from "../components/footerA.vue";
import yearSelect from "../components/YearSelect.vue";
import EcoSelect from "../components/EcoSelect2.vue";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { LocalStorage } from "quasar";

const router = useRouter();
const tinaLinkURL = ref("");
const shareContent = ref("");
const inputData = ref({
  exportingName: "",
  exportingISO: "",
  year: "",
});
const isGen = ref(false);

const getExportInput = (selected) => {
  inputData.value.exportingName = selected.name;
  inputData.value.exportingISO = selected.iso;
};

const getYear = (value) => {
  inputData.value.year = value;
};

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
const goToStep5 = () => {
  router.push("/forwardlinkages");
};

const runGen = () => {
  let data = {
    economyISO: inputData.value.exportingISO,
    economyName: inputData.value.exportingName,
    year: inputData.value.year,
  };
  LocalStorage.set("countryBrief", data);
  window.open("http://localhost:9000/#/countrydata");
};

watch(
  () => inputData.value,
  (newValue) => {
    if (newValue.exportingName && newValue.exportingISO && newValue.year) {
      isGen.value = true;
    }
  },
  { deep: true }
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
.btnGen {
  background-color: #e2cd11;
  width: 200px;
  color: black;
}
</style>
