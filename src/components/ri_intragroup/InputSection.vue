<template>
  <div style="color: #757575">
    <div class="row q-px-xl q-py-md">
      <div class="col">
        <div class="font20"><b>Integration type</b></div>
        <div class="font14">Select the desired type of integration</div>
      </div>
      <div class="col">
        <q-radio
          v-model="input.type"
          val="sustainable"
          label="Sustainable integration"
          color="secondary"
          @update:model-value="changeInputTypeSustainable()"
        />
      </div>
      <div class="col">
        <q-radio
          v-model="input.type"
          val="conventional"
          label="Conventional integration"
          color="secondary"
          @update:model-value="changeInputTypeConventional()"
        />
      </div>
    </div>
    <div class="q-px-xl">
      <div class="font20"><b>Period</b></div>
      <div>
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
    </div>
    <div class="q-px-xl">
      <div class="font20"><b>Economies</b></div>
      <div>
        Please select two or more economies of interest or a pre-selected group
      </div>
      <div>
        <q-select
          v-model="selectedValue"
          :options="formattedOptions"
          map-options
          emit-value
          option-label="label"
          option-value="value"
          style="width: 100%"
          multiple
          use-chips
          stack-label
          filled
          @update:model-value="selectCountryGroup"
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
      <div class="q-my-md dashBorder q-pa-md">
        <div><b>Selected economies</b></div>
        <div class="row">
          <div v-for="(item, index) in countryFullListName" :key="index">
            <q-chip color="grey-4" :label="item" />
          </div>
        </div>
      </div>
      <div class="row justify-center q-py-md">
        <div>
          <q-btn
            label="Clear all"
            outline
            no-caps
            class="btnClear"
            @click="clearAllBtn"
          />
        </div>
        <div style="width: 30px"></div>
        <div>
          <q-btn
            label="Start"
            no-caps
            color="secondary"
            class="btnStart"
            @click="btnStartSpec"
          />
        </div>
      </div>
    </div>
    <q-dialog v-model="isExceptDia" persistent>
      <q-card class="missDia">
        <div class="text-h6 text-center">Missing data</div>
        <hr />
        <div class="q-px-md">
          The following economies were excluded from your selection due to lack
          of data:
        </div>
        <div class="q-px-md">Ecomomy(ies)</div>
        <div class="row q-px-md q-py-md">
          <div v-for="(item, index) in exceptCountry" :key="index">
            <q-chip color="grey-4" :label="showCountryName(item)" />
          </div>
        </div>
        <div class="row justify-center q-mb-md">
          <div>
            <q-btn
              label="Back"
              outline
              no-caps
              class="btnClear"
              @click="backMissDataBtn"
            />
          </div>
          <div style="width: 30px"></div>
          <div>
            <q-btn
              label="Start"
              no-caps
              color="secondary"
              class="btnStart"
              @click="btnStarttMissData"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { serverSetup, yearInputShow } from "../../pages/server";
import { countryGroupListRiva2 } from "../../pages/countryGroupList";
import countryData from "../../assets/countryAll.json";
import { LocalStorage } from "quasar";

const { serverData } = serverSetup();

const selectedValue = ref(null);
const formattedOptions = ref([]);
const { yearInput } = yearInputShow();

const input = ref({
  type: "sustainable",
  year: {
    min: yearInput.value.min,
    max: yearInput.value.max,
  },
  partner: [],
});
const periodSetup = ref({
  min: yearInput.value.min,
  max: yearInput.value.max,
});

const countryList = ref([]);
const countryListName = ref([]);
const countryFullList = ref([]);
const countryFullListName = ref([]);
const isExceptDia = ref(false);
const exceptCountry = ref([]);

//input economics
const loadCountry = async () => {
  const table = ref("");
  countryListName.value = [];
  if (input.value.type == "sustainable") {
    table.value = "ri_eco_intra_sus";
  } else {
    table.value = "ri_eco_intra_con";
  }
  const dataSend = {
    table: table.value,
  };
  const url = serverData.value + "ri/getEcoDataGroup.php";
  const res = await axios.post(url, JSON.stringify(dataSend));

  formattedOptions.value = res.data.map((option) => ({
    id: option.id,
    label: option.name,
    value: option.iso,
    disable: option.disable,
  }));
};

const getFlagUrl = (iso) => {
  return `images/flags/${iso}.png`;
};

const selectCountryGroup = () => {
  countryList.value = [];
  selectedValue.value.forEach((x) => {
    countryList.value = [
      ...new Set([...countryGroupListRiva2(x), ...countryList.value]),
    ];
  });
  countryFullList.value = countryList.value;
  countryFullListName.value = countryFullList.value
    .map((isoCode) => {
      const country = countryData.find((country) => country.iso === isoCode);
      return country ? country.country : null;
    })
    .filter((name) => name !== null);
  dataAvail(countryFullList.value);

  // console.log(countryFullListName.value);
  // กรองรายการ countryList เพื่อเอาเฉพาะค่าที่มีใน formattedOptions
  countryList.value = countryList.value.filter((code) =>
    formattedOptions.value.some((option) => option.value === code)
  );

  countryListName.value = countryList.value.map((code) => {
    const country = formattedOptions.value.find(
      (option) => option.value === code
    );
    return country ? country.label : null;
  });
  input.value.partner = countryList.value;
  countryListName.value = countryListName.value.filter((name) => name !== null);
};

onMounted(() => {
  loadCountry();
});

// emit การเปลี่ยน intgration
const emit = defineEmits([
  "change-integration-type",
  "start",
  "score",
  "localID",
]);
const changeInputTypeSustainable = () => {
  emit("change-integration-type", "Sustainable");
  selectedValue.value = null;
  loadCountry();
};
const changeInputTypeConventional = () => {
  emit("change-integration-type", "Conventional");
  selectedValue.value = null;
  loadCountry();
};

//Result

const btnStartSpec = () => {
  exceptCountry.value = countryFullList.value.filter(
    (code) => !countryList.value.includes(code)
  );
  if (exceptCountry.value.length > 0) {
    isExceptDia.value = true;
  } else {
    emit("start", input.value);
  }
};
const showCountryName = (code) => {
  const result = countryData.filter((x) => x.iso == code);

  return result[0].country;
};
const clearAllBtn = () => {
  selectedValue.value = null;
  countryList.value = [];
  countryListName.value = [];
  countryFullListName.value = [];
  dataAvail([]);
};
const backMissDataBtn = () => {
  isExceptDia.value = false;
};
const btnStarttMissData = () => {
  countryFullListName.value = countryListName.value;
  dataAvail(input.value.partner);
  isExceptDia.value = false;
  emit("start", input.value);
};
const dataAvail = async (eco) => {
  console.log(eco);
  let score = 0;
  if (eco.length > 0) {
    let dataSend = {
      economic: eco,
      type: input.value.type,
    };
    const url = serverData.value + "ri/intra_circle.php";
    const res = await axios.post(url, JSON.stringify(dataSend));
    score = res.data;
  }
  emit("score", score);
  const id = generateRandomId();
  const storageObject = {
    id: id,
    group: "intraGroup",
    type: input.value.type,
    partner: selectedValue.value,
    reporter: selectedValue.value,
  };
  LocalStorage.set("intraCircleData", JSON.stringify(storageObject));
  emit("localID", id);
};

const generateRandomId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
</script>

<style lang="scss" scoped>
.font20 {
  font-size: 20px;
  color: #757575;
}
.font14 {
  font-size: 14px;
  color: #757575;
}
.dashBorder {
  border: 1px dashed #757575;
  height: 300px;
  overflow-y: auto;
}
.btnClear {
  width: 240px;
  font-size: 20px;
}
.btnStart {
  width: 240px;
  font-size: 20px;
}
.missDia {
  width: 100%;
  max-width: 600px;
}
</style>
