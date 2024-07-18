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
      <div class="font20"><b>Reporting economy(ies)</b></div>
      <div>
        Please select one, many or a pre-selected group of reporting economies
        of interest.
      </div>
      <div>
        <q-select
          v-model="selectedValueReport"
          :options="formattedOptionsReport"
          map-options
          emit-value
          option-label="label"
          option-value="value"
          style="width: 100%"
          multiple
          use-chips
          stack-label
          filled
          @update:model-value="selectCountryGroupReport"
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
    </div>

    <div class="q-px-xl q-pt-md">
      <div class="font20"><b>Partner economy(ies)</b></div>
      <div>
        Please select one, many or a pre-selected group of reporting economies
        of interest.
      </div>
      <div>
        <q-select
          v-model="selectedValuePartner"
          :options="formattedOptionsPartner"
          map-options
          emit-value
          option-label="label"
          option-value="value"
          style="width: 100%"
          multiple
          use-chips
          stack-label
          filled
          @update:model-value="selectCountryGroupPartner"
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
    </div>
    <div class="row q-px-xl q-py-md">
      <div class="col">
        <div class="font20"><b>Disagregation results by</b></div>
      </div>
      <div class="col">
        <q-radio
          v-model="input.disagregation"
          val="partner"
          label="Partner"
          color="secondary"
        />
      </div>
      <div class="col">
        <q-radio
          v-model="input.disagregation"
          val="reporter"
          label="Reporter"
          color="secondary"
        />
      </div>
    </div>
    <div class="q-my-md dashBorder q-pa-md q-mx-xl">
      <div><b>Selected reporting economy(ies)</b></div>
      <div class="row">
        <div v-for="(item, index) in countryFullListNameReport" :key="index">
          <q-chip color="grey-4" :label="item" />
        </div>
      </div>
    </div>
    <div class="q-my-md dashBorder q-pa-md q-mx-xl">
      <div><b>Selected partner economy(ies)</b></div>
      <div class="row">
        <div v-for="(item, index) in countryFullListNamePartner" :key="index">
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
    <q-dialog v-model="isExceptDia" persistent>
      <q-card class="missDia">
        <div class="text-h6 text-center">Missing data</div>
        <hr />
        <div class="q-px-md">
          The following economies were excluded from your selection due to lack
          of data:
        </div>
        <div class="q-px-md">Reporting ecomomy(ies)</div>
        <div class="row q-px-md q-py-xs">
          <div v-for="(item, index) in exceptCountryReport" :key="index">
            <q-chip color="grey-4" :label="showCountryName(item)" />
          </div>
        </div>
        <div class="q-px-md">Partner ecomomy(ies)</div>
        <div class="row q-px-md q-py-xs">
          <div v-for="(item, index) in exceptCountryPartner" :key="index">
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
import { onMounted, ref } from "vue";
import { serverSetup, yearInputShow } from "../../pages/server";
import countryData from "../../assets/countryAll.json";
import { countryGroupListRiva2 } from "../../pages/countryGroupList";
import axios from "axios";
import { LocalStorage } from "quasar";
const { serverData } = serverSetup();
const { yearInput } = yearInputShow();
const selectedValueReport = ref(null);
const formattedOptionsReport = ref([]);

const selectedValuePartner = ref(null);
const formattedOptionsPartner = ref([]);

const countryListReport = ref([]);
const countryListNameReport = ref([]);
const countryFullListReport = ref([]);
const countryFullListNameReport = ref([]);

const countryListPartner = ref([]);
const countryListNamePartner = ref([]);
const countryFullListPartner = ref([]);
const countryFullListNamePartner = ref([]);
const countryEcoAllPartnersus = ref([]);
const countryEcoAllReportsus = ref([]);
const countryEcoAllPartnercon = ref([]);
const countryEcoAllReportcon = ref([]);

const isExceptDia = ref(false);
const exceptCountryReport = ref([]);
const exceptCountryPartner = ref([]);
const input = ref({
  type: "sustainable",
  year: {
    min: yearInput.value.min,
    max: yearInput.value.max,
  },
  partner: [],
  report: [],
  disagregation: "partner",
});

const periodSetup = ref({
  min: yearInput.value.min,
  max: yearInput.value.max,
});

const loadCountry = async () => {
  const tableReport = ref("");
  const tablePartner = ref("");
  if (input.value.type == "sustainable") {
    tableReport.value = "ri_eco_partner_reporter_sus";
    tablePartner.value = "ri_eco_partner_partner_sus";
  } else {
    tableReport.value = "ri_eco_partner_reporter_con";
    tablePartner.value = "ri_eco_partner_partner_con";
  }

  const url = serverData.value + "ri/getEcoDataGroup.php";

  const dataSendReport = {
    table: tableReport.value,
  };
  const resReport = await axios.post(url, JSON.stringify(dataSendReport));
  formattedOptionsReport.value = resReport.data.map((option) => ({
    id: option.id,
    label: option.name,
    value: option.iso,
    disable: option.disable,
  }));

  const dataSendPartner = {
    table: tablePartner.value,
  };
  const resPartner = await axios.post(url, JSON.stringify(dataSendPartner));
  formattedOptionsPartner.value = resPartner.data.map((option) => ({
    id: option.id,
    label: option.name,
    value: option.iso,
    disable: option.disable,
  }));
};

const getFlagUrl = (iso) => {
  return `images/flags/${iso}.png`;
};

const selectCountryGroupReport = () => {
  countryListReport.value = [];
  selectedValueReport.value.forEach((x) => {
    countryListReport.value = [
      ...new Set([...countryGroupListRiva2(x), ...countryListReport.value]),
    ];
  });
  countryFullListReport.value = [...countryListReport.value];
  countryFullListNameReport.value = countryFullListReport.value
    .map((isoCode) => {
      const country = countryData.find((country) => country.iso === isoCode);
      return country ? country.country : null;
    })
    .filter((name) => name !== null);

  dataAvail(countryFullListReport.value, countryFullListPartner.value);

  const countryCheck = ref([]);
  if (input.value.type === "sustainable") {
    countryCheck.value = countryEcoAllReportsus.value;
  } else {
    countryCheck.value = countryEcoAllReportcon.value;
  }

  const filteredCountryListReport = countryListReport.value.filter((country) =>
    countryCheck.value.includes(country)
  );

  // Assign the filtered result back to countryListReport
  countryListReport.value.length = 0;
  countryListReport.value.push(...filteredCountryListReport);

  countryListNameReport.value = countryListReport.value
    .map((isoCode) => {
      const country = countryData.find((country) => country.iso === isoCode);
      return country ? country.country : null;
    })
    .filter((name) => name !== null);
  input.value.report = countryListReport.value;
};

const selectCountryGroupPartner = () => {
  countryListPartner.value = [];
  selectedValuePartner.value.forEach((x) => {
    countryListPartner.value = [
      ...new Set([...countryGroupListRiva2(x), ...countryListPartner.value]),
    ];
  });
  countryFullListPartner.value = [...countryListPartner.value];

  countryFullListNamePartner.value = countryFullListPartner.value
    .map((isoCode) => {
      const country = countryData.find((country) => country.iso === isoCode);
      return country ? country.country : null;
    })
    .filter((name) => name !== null);
  dataAvail(countryFullListReport.value, countryFullListPartner.value);

  const countryCheck = ref([]);
  if (input.value.type === "sustainable") {
    countryCheck.value = countryEcoAllPartnersus.value;
  } else {
    countryCheck.value = countryEcoAllPartnercon.value;
  }

  // Filtered list stored in a separate variable
  const filteredCountryListPartner = countryListPartner.value.filter(
    (country) => countryCheck.value.includes(country)
  );

  // Assign the filtered result back to countryListPartner
  countryListPartner.value.length = 0;
  countryListPartner.value.push(...filteredCountryListPartner);

  countryListNamePartner.value = countryListPartner.value
    .map((isoCode) => {
      const country = countryData.find((country) => country.iso === isoCode);
      return country ? country.country : null;
    })
    .filter((name) => name !== null);
  input.value.partner = countryListPartner.value;
};

const dataAvail = async (report, partner) => {
  let score = 0;
  if (report.length > 0 && partner.length > 0) {
    let dataSend = {
      report: report,
      partner: partner,
      type: input.value.type,
    };

    const url = serverData.value + "ri/ecopartner_circle.php";
    const res = await axios.post(url, JSON.stringify(dataSend));
    score = res.data;
  }
  emit("score", score);
  const id = generateRandomId();
  const storageObject = {
    id: id,
    group: "ecopartner",
    type: input.value.type,
    partner: selectedValuePartner.value,
    reporter: selectedValueReport.value,
  };
  LocalStorage.set("intraCircleData", JSON.stringify(storageObject));
  emit("localID", id);
};

// emit การเปลี่ยน intgration
const emit = defineEmits([
  "change-integration-type",
  "start",
  "score",
  "localID",
]);
const changeInputTypeSustainable = () => {
  emit("change-integration-type", "Sustainable");
  selectedValueReport.value = null;
  selectedValuePartner.value = null;
  countryFullListNamePartner.value = [];
  countryListPartner.value = [];
  countryFullListNameReport.value = [];
  countryListReport.value = [];
  countryFullListReport.value = [];
  countryFullListPartner.value = [];
  emit("score", 0);
  loadCountry();
};
const changeInputTypeConventional = () => {
  emit("change-integration-type", "Conventional");
  selectedValueReport.value = null;
  selectedValuePartner.value = null;
  countryFullListNamePartner.value = [];
  countryListPartner.value = [];
  countryFullListNameReport.value = [];
  countryListReport.value = [];
  countryFullListReport.value = [];
  countryFullListPartner.value = [];
  emit("score", 0);
  loadCountry();
};

const showCountryName = (code) => {
  const result = countryData.filter((x) => x.iso == code);
  return result[0].country;
};

const clearAllBtn = () => {
  selectedValueReport.value = null;
  selectedValuePartner.value = null;
  countryListReport.value = [];
  countryListNameReport.value = [];
  countryFullListNameReport.value = [];
  countryListPartner.value = [];
  countryListNamePartner.value = [];
  countryFullListNamePartner.value = [];
  dataAvail([], []);
};

const backMissDataBtn = () => {
  isExceptDia.value = false;
};
const btnStarttMissData = () => {
  countryFullListNameReport.value = countryListNameReport.value;
  countryFullListNamePartner.value = countryListNamePartner.value;
  dataAvail(input.value.report, input.value.partner);
  isExceptDia.value = false;
  emit("start", input.value);
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

const btnStartSpec = () => {
  exceptCountryReport.value = countryFullListReport.value.filter(
    (code) => !countryListReport.value.includes(code)
  );
  exceptCountryPartner.value = countryFullListPartner.value.filter(
    (code) => !countryListPartner.value.includes(code)
  );
  if (
    exceptCountryReport.value.length > 0 ||
    exceptCountryPartner.value.length > 0
  ) {
    isExceptDia.value = true;
  } else {
    emit("start", input.value);
  }
};
onMounted(() => {
  loadCheckListCountry();
  loadCountry();
});

const loadCheckListCountry = async () => {
  const urlSus = serverData.value + "ri/getEcoPartnerSus.php";
  let resSus = await axios.get(urlSus);
  countryEcoAllPartnersus.value = resSus.data;
  const urlCon = serverData.value + "ri/getEcoPartnerCon.php";
  let resCon = await axios.get(urlCon);
  countryEcoAllPartnercon.value = resCon.data;
  const urlSus2 = serverData.value + "ri/getEcoReportSus.php";
  let resSus2 = await axios.get(urlSus2);
  countryEcoAllReportsus.value = resSus2.data;
  const urlCon2 = serverData.value + "ri/getEcoReportCon.php";
  let resCon2 = await axios.get(urlCon2);
  countryEcoAllReportcon.value = resCon2.data;
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
  height: 150px;
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
  max-width: 800px;
}
</style>
