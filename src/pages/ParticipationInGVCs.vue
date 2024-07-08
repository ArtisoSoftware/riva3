<template>
  <div style="background-color: #7a7a7a">
    <div class="mainApp">
      <div><VAHeader /></div>
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
              class=""
            />

            <div style="width: 30px"></div>
            <div><yearSelect @update="getYear" /></div>
          </div>
          <div class="row justify-center" style="padding-top: 10px">
            <EcoSelect
              label="importing economy"
              @update:selected="getImportEco"
              class=""
            />

            <div style="width: 30px"></div>
            <div><SectorSelect @update:selected="getSector" /></div>
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
      <div style="font-size: 20px" class="q-pa-lg">
        <div>
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
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
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
  inputData.value.sectorName = selected.name;
  inputData.value.sectorID = selected.id;
};
const router = useRouter();

watch(
  () => inputData.value,
  (newValue) => {
    if (
      newValue.exportingName &&
      newValue.exportingISO &&
      newValue.importingISO &&
      newValue.importingName &&
      newValue.sectorID &&
      newValue.sectorName
    ) {
      showInputText.value = false;
      console.log(inputData.value);
    } else {
      showInputText.value = true;
    }
  },
  { deep: true }
);

const goToStep1 = () => {
  router.push("/gvcrelationships");
};
const goToStep2 = () => {
  router.push("/structureofvalueadded");
};
// const goToStep3 = () => {
//   router.push("/participationingvcs");
// };
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
