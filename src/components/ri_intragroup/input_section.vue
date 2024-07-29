<template>
  <div class="q-px-xl q-pt-xl">
    <div class="row">
      <div class="col-4">
        <div class="font-16"><b>Integration type</b></div>
        <div>Select the desired type of integration</div>
      </div>
      <div class="col-3">
        <q-radio
          v-model="input.type"
          val="Sustainable"
          label="Sustainable integration"
          color="secondary"
          @input="changeInputTypeSustainable()"
        />
      </div>
      <div class="col">
        <q-radio
          v-model="input.type"
          val="Conventional"
          label="Conventional integration"
          color="secondary"
          @input="changeInputTypeConventional()"
        />
      </div>
    </div>

    <br />
    <div class="font-16"><b>Period</b></div>
    <div class="q-pt-md" align="center">
      <q-range
        v-model="input.year"
        marker-labels
        :min="periodSetup.min"
        :max="periodSetup.max"
        label-always
        markers
        style="width: 95%"
        color="secondary"
        @input="changeYear()"
      />
    </div>
    <div class="q-pt-md font-16"><b>Economies</b></div>
    <div>
      Please select two or more economies of interest or a pre-selected group.
    </div>
    <div>
      <q-select
        v-model="input.partner"
        :options="countryIntraOption"
        style="width: 100%"
        multiple
        use-chips
        stack-label
        filled
        @update:model-value="showSelectedPartnerList()"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section
              avatar
              v-if="!scope.opt.disable && /^[A-Z]{3}$/.test(scope.opt.value)"
            >
              <img
                :src="getFlagUrl(scope.opt.value)"
                alt="flag"
                style="width: 24px; height: 16px"
              />
            </q-item-section>
            <q-item-section>
              {{ scope.opt.label }}
            </q-item-section></q-item
          ></template
        >
      </q-select>
    </div>
    <br />
    <div class="selectedPartner relative-position q-pa-sm">
      <div class="font-16"><b>Selected economies</b></div>
      <div class="q-pt-sm">
        <div class="row" style="width: 90%">
          <div
            class="countryTag q-mr-sm q-px-md q-mb-sm"
            v-for="(item, index) in countryFullList"
            :key="index"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
    <div class="q-py-lg row justify-evenly" align="center" style="width: 100%">
      <div class="clearAllBtnDiv" @click="clearAllBtn()">Clear all</div>
      <div class="startBtnDiv" @click="startBtn()">Start</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { serverSetup, yearInputShow } from "../../pages/server.js";
import { countryGroupListRiva2 } from "../../pages/countryGroupList";
import countryAllWorld from "../../assets/countryAll.json";
import axios from "axios";
import { useRoute } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import { LocalStorage } from "quasar";

const { yearInput } = yearInputShow();
const { serverData } = serverSetup();
const route = useRoute();
const input = ref({
  partner: [],
  year: {
    min: 2010,
    max: 2018,
  },
  type: "Sustainable",
  disaggregation: "dimension",
});

const periodSetup = ref({
  min: 2010,
  max: 2018,
});
const countryIntraOption = ref([]);
const countryFullList = ref([]);

const emit = defineEmits([
  "change-integration-type",
  "reset-start-btn",
  "get-input",
  "start-btn",
]);

onMounted(() => {
  periodSetup.value.min = yearInput.value.min;
  periodSetup.value.max = yearInput.value.max;
  loadCountry();
  loadPeriod();
  if (route.name == "riintragroup") {
    preLoad();
  }
});

const loadCountry = async () => {
  let table = "";
  countryIntraOption.value = [];
  if (input.value.type == "sustainable") {
    table = "ri_eco_intra_sus";
  } else {
    table = "ri_eco_intra_con";
  }
  const dataSend = {
    table: table,
  };
  const url = serverData.value + "ri/getEcoDataGroup.php";
  const res = await axios.post(url, JSON.stringify(dataSend));

  countryIntraOption.value = res.data.map((option) => ({
    label: option.name,
    value: option.iso,
    disable: option.disable,
  }));
};

const loadPeriod = () => {
  periodSetup.value.min = yearInput.value.min;
  periodSetup.value.max = yearInput.value.max;
  input.value.year.min = yearInput.value.min;
  input.value.year.max = yearInput.value.max;
};

const preLoad = () => {
  let partnerInput = {
    disable: false,
    label: "ASEAN",
    value: "asean",
  };
  input.value.partner.push(partnerInput);
  showSelectedPartnerList();
  console.log("Work here");
};

const showSelectedPartnerList = () => {
  resetStartBtn();
  countryFullList.value = [];
  let countryPartyTemp = [];
  let iso = input.value.partner.map((x) => x.value);
  iso.forEach((isoData) => {
    let tempList = countryGroupListRiva2(isoData);
    countryPartyTemp = countryPartyTemp.concat(tempList);
  });
  let test = [...new Set(countryPartyTemp)];
  test.forEach((x) => {
    let temp = countryAllWorld.filter((y) => y.iso == x);
    if (temp.length > 0) {
      let inputCountry = {
        label: temp[0].country,
        iso: temp[0].iso,
      };
      countryFullList.value.push(inputCountry);
    }
  });
  countryFullList.value.sort((a, b) => (a.label > b.label ? 1 : -1));
  checkDataAvailability();
};

const checkDataAvailability = () => {
  if (countryFullList.value.length >= 2) {
    let id = uuidv4();
    let saveData = {
      input: input.value,
      database: "DigiSRII",
      type: "Economy group",
      disaggregation: "Pair",
      key: id,
    };
    LocalStorage.clear();
    LocalStorage.set("dataAvail", saveData);
    emit("get-input", {
      showDataAvailChart: true,
      input: input.value,
      countryFullList: countryFullList.value,
    });
  } else {
    emit("get-input", {
      showDataAvailChart: false,
      input: input.value,
      countryFullList: countryFullList.value,
    });
  }
};

const changeInputTypeSustainable = () => {
  input.value.type = "Sustainable";
  emit("change-integration-type", "Sustainable");
  loadCountry();
  input.value.partner = [];
  countryFullList.value = [];
  resetStartBtn();
  checkDataAvailability();
};

const changeInputTypeConventional = () => {
  input.value.type = "Conventional";
  emit("change-integration-type", "Conventional");
  loadCountry();
  input.value.partner = [];
  countryFullList.value = [];
  resetStartBtn();
  checkDataAvailability();
};

const resetStartBtn = () => {
  emit("reset-start-btn");
};

const changeYear = () => {
  resetStartBtn();
  checkDataAvailability();
};

const getFlagUrl = (iso) => {
  return `images/flags/${iso}.png`;
};

const clearAllBtn = () => {
  console.log("work here");
};
const startBtn = () => {
  console.log("work here");
};
</script>

<style lang="scss" scoped>
.startBtnDiv {
  cursor: pointer;
  width: 280px;
  background-color: #2d9687;
  height: 45px;
  line-height: 45px;
  font-size: 20px;
  color: white;
  border-radius: 5px;
  border: 3px solid #2d9687;
}
.clearAllBtnDiv {
  cursor: pointer;
  width: 280px;
  height: 45px;
  line-height: 45px;
  font-size: 20px;
  color: #757575;
  border-radius: 5px;
  border: 3px solid #2d9687;
}

.countryTag {
  background-color: #dedede;
  color: #626262;
  display: inline;
  border-radius: 50px;
}

.selectedPartner {
  width: 98%;
  height: 440px;
  border: 1px dashed #c4c4c4;
  overflow-y: auto;
}
.warnMoreThan24 {
  color: #ee0202;
  font-size: 18px;
}
.warnBox {
  max-width: 850px;
  width: 750px;
}
</style>
