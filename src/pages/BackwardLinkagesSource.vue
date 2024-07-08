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
              class=""
            />

            <div style="width: 30px"></div>
            <div><yearSelect @update="getYear" /></div>
          </div>
          <div class="row justify-center" style="padding-top: 5px">
            <EcoSelect
              label="Importing economy"
              @update:selected="getImportInput"
              class=""
            />

            <div style="width: 30px"></div>
            <div>
              <EcoSelect
                label="Source economy"
                @update:selected="getSourceInput"
                class=""
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
              How is foreign value-added distributed across Australia's
              exporting sectors?
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
const showInputText = ref(true);
const router = useRouter();
const getYear = (value) => {
  inputData.value.year = value;
};
const getExportInput = (selected) => {
  inputData.value.exportingName = selected.name;
  inputData.value.exportingISO = selected.iso;
};

const getImportInput = (selected) => {
  inputData.value.importingName = selected.name;
  inputData.value.importingISO = selected.iso;
};

const getSourceInput = (selected) => {
  inputData.value.sourceName = selected.name;
  inputData.value.sourceISO = selected.iso;
};
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
      console.log(inputData.value);
    } else {
      showInputText.value = true;
    }
  },
  { deep: true }
);

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
</style>
