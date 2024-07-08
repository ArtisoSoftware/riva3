<template>
  <div style="background-color: #7a7a7a">
    <div class="mainApp">
      <div><VAHeader /></div>
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
              @update:selected="handleSelected"
              class=""
            />

            <div style="width: 30px"></div>
            <div><yearSelect @update="getYear" /></div>
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
      <footerMain />
    </div>
  </div>
</template>

<script setup>
import VAHeader from "../components/VA_header.vue";
import yearSelect from "../components/YearSelect.vue";
import EcoSelect from "../components/EcoSelect.vue";
import footerMain from "../components/footer.vue";

import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const inputData = ref({
  exportingName: "",
  exportingISO: "",
  year: "",
});
const router = useRouter();
const showInputText = ref(true);
const getYear = (value) => {
  inputData.value.year = value;
};
const handleSelected = (selected) => {
  inputData.value.exportingName = selected.name;
  inputData.value.exportingISO = selected.iso;
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

watch(
  () => inputData.value,
  (newValue) => {
    if (newValue.exportingName && newValue.exportingISO) {
      showInputText.value = false;
    } else {
      showInputText.value = true;
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
.selectedMenu {
  color: #e2cd11;
}
</style>
