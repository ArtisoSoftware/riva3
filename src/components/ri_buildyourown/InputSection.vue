<template>
  <div style="color: #757575">
    <div class="row">
      <div class="col">
        <div class="row q-px-xl q-py-md">
          <div class="col">
            <div class="font20"><b>Integration type</b></div>
            <div class="font14">Select the desired type of integration</div>
          </div>
          <div class="col">
            <q-radio
              v-model="input.type"
              val="Sustainable"
              label="Sustainable integration"
              color="secondary"
              @update:model-value="changeInputTypeSustainable()"
            />
          </div>
          <div class="col">
            <q-radio
              v-model="input.type"
              val="Conventional"
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
            Please select one, many or a pre-selected group of reporting
            economies of interest.
          </div>
          <div>
            <q-select
              v-model="selectedValueReport"
              :options="formattedOptionsReport"
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
                    v-if="
                      !scope.opt.disable && /^[A-Z]{3}$/.test(scope.opt.value)
                    "
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
            Please select one, many or a pre-selected group of reporting
            economies of interest.
          </div>
          <div>
            <q-select
              v-model="selectedValuePartner"
              :options="formattedOptionsPartner"
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
                    v-if="
                      !scope.opt.disable && /^[A-Z]{3}$/.test(scope.opt.value)
                    "
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
        <div class="q-my-md dashBorder q-pa-md q-mx-xl">
          <div><b>Selected reporting economy(ies)</b></div>
          <div class="row">
            <div v-for="(item, index) in countryReportList" :key="index">
              <q-chip color="grey-4" :label="item" />
            </div>
          </div>
        </div>
        <div class="q-my-md dashBorder q-pa-md q-mx-xl">
          <div><b>Selected partner economy(ies)</b></div>
          <div class="row">
            <div v-for="(item, index) in countryPartnerList" :key="index">
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
      <div style="width: 480px; color: #757575; background-color: #ededed">
        <!-- dimenison Icon -->
        <div class="q-pa-md">
          <div class="title">
            {{ input.type }} Integration dimensions (all included)
          </div>
          <div>
            Select dimensions of interest. Hover to reveal included indicators.
          </div>
          <div v-if="input.type == 'Conventional'">
            <div class="row justify-center q-pt-md">
              <div>
                <q-img
                  src="../../../public/images/dimension01.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[0] === 1,
                    iconUnSelected: selectedDim[0] !== 1,
                  }"
                  @click="changeSelected(0)"
                >
                  <q-tooltip>
                    <div>Trade and investement integration</div>
                    <div>- Exports to GDP</div>
                    <div>- Imports to GDP</div>
                    <div>- Import tarriffs</div>
                    <div>- FDI inflows to GDP</div>
                    <div>- FDI outflows to GDP</div>
                  </q-tooltip>
                </q-img>
              </div>
              <div style="width: 20px"></div>

              <div>
                <q-img
                  src="../../../public/images/dimension02.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[1] === 1,
                    iconUnSelected: selectedDim[1] !== 1,
                  }"
                  @click="changeSelected(1)"
                >
                  <q-tooltip>
                    <div>Financial markets integration</div>
                    <div>- Cross-border portfolio to GDP</div>
                    <div>- Deposit rates dispersion</div>
                    <div>- Share price index correlation</div>
                  </q-tooltip>
                </q-img>
              </div>
              <div style="width: 20px"></div>
              <div>
                <q-img
                  src="../../../public/images/dimension03.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[2] === 1,
                    iconUnSelected: selectedDim[2] !== 1,
                  }"
                  @click="changeSelected(2)"
                >
                  <q-tooltip>
                    <div>Value chains integration</div>
                    <div>- Export complementarity index</div>
                    <div>- Value Chains participation Index</div>
                    <div>- Intermediate goods exports to GDP</div>
                    <div>- Intermediate goods imports to GDP</div>
                  </q-tooltip>
                </q-img>
              </div>
            </div>
            <div class="row justify-center q-pt-md">
              <div>
                <q-img
                  src="../../../public/images/dimension04.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[3] === 1,
                    iconUnSelected: selectedDim[3] !== 1,
                  }"
                  @click="changeSelected(3)"
                >
                  <q-tooltip>
                    <div>Infrastructure and connectivity integration</div>
                    <div>- Liner shipping connectivity index</div>
                    <div>- Trade facilitation implement</div>
                    <div>- Average internet quality</div>
                    <div>- Average trade cost</div>
                  </q-tooltip>
                </q-img>
              </div>
              <div style="width: 20px"></div>

              <div>
                <q-img
                  src="../../../public/images/dimension05.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[4] === 1,
                    iconUnSelected: selectedDim[4] !== 1,
                  }"
                  @click="changeSelected(4)"
                >
                  <q-tooltip>
                    <div>Movement of people integration</div>
                    <div>- Stock of emigrants per capita</div>
                    <div>- Stock of immigrants per capita</div>
                    <div>- Remittances outflow to GDP</div>
                    <div>- Remittances inflow to GDP</div>
                  </q-tooltip>
                </q-img>
              </div>
              <div style="width: 20px"></div>
              <div>
                <q-img
                  src="../../../public/images/dimension06.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[5] === 1,
                    iconUnSelected: selectedDim[5] !== 1,
                  }"
                  @click="changeSelected(5)"
                >
                  <q-tooltip>
                    <div>Regulatory cooperation integration</div>
                    <div>- Signed FTA</div>
                    <div>- Signed IIA (Yes/No)</div>
                    <div>- Embassy (yes/No)</div>
                    <div>- Trade regulatory similarity</div>
                    <div></div>
                  </q-tooltip>
                </q-img>
              </div>
            </div>
            <div class="row justify-center q-pt-md">
              <div>
                <q-img
                  src="../../../public/images/dimension07.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[6] === 1,
                    iconUnSelected: selectedDim[6] !== 1,
                  }"
                  @click="changeSelected(6)"
                >
                  <q-tooltip>
                    <div>Digital economy integration</div>
                    <div>- ICT goods exports to GDP</div>
                    <div>- ICT goods imports to GDP</div>
                    <div>- Tariffs on ICT imports</div>
                    <div>- Avg. share using digital financial services</div>
                    <div>- Avg. share of online shoppers</div>
                    <div>- Digital Trade regulatory similarity</div>
                  </q-tooltip>
                </q-img>
              </div>
              <div style="width: 20px"></div>

              <div style="width: 120px"></div>
              <div style="width: 20px"></div>
              <div style="width: 120px"></div>
            </div>
          </div>
          <div v-else>
            <div class="row justify-center q-pt-md">
              <div>
                <q-img
                  src="../../../public/images/dimension01.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[0] === 1,
                    iconUnSelected: selectedDim[0] !== 1,
                  }"
                  @click="changeSelected(0)"
                >
                  <q-tooltip>
                    <div>Trade and investement integration</div>
                    <div>- Environmental goods exports to GDP</div>
                    <div>- Environmental goods imports to GDP</div>
                    <div>- Tariffs on environmental goods imports</div>
                    <div>- Employment created by DVA</div>
                  </q-tooltip>
                </q-img>
              </div>
              <div style="width: 20px"></div>

              <div>
                <q-img
                  src="../../../public/images/dimension02.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[1] === 1,
                    iconUnSelected: selectedDim[1] !== 1,
                  }"
                  @click="changeSelected(1)"
                >
                  <q-tooltip>
                    <div>Financial markets integration</div>
                    <div>- Real exchange rate volatility</div>
                    <div>- Avg. financial development index score</div>
                    <div>- Volatility weighted correlation of share price</div>
                  </q-tooltip>
                </q-img>
              </div>
              <div style="width: 20px"></div>
              <div>
                <q-img
                  src="../../../public/images/dimension03.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[2] === 1,
                    iconUnSelected: selectedDim[2] !== 1,
                  }"
                  @click="changeSelected(2)"
                >
                  <q-tooltip>
                    <div>Value chains integration</div>
                    <div>
                      - Environmental goods export complementarity index
                    </div>
                    <div>- Sustainable Value Chain participation index</div>
                    <div>- Exports of intermediates per unit of CO2</div>
                  </q-tooltip>
                </q-img>
              </div>
            </div>
            <div class="row justify-center q-pt-md">
              <div>
                <q-img
                  src="../../../public/images/dimension04.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[3] === 1,
                    iconUnSelected: selectedDim[3] !== 1,
                  }"
                  @click="changeSelected(3)"
                >
                  <q-tooltip>
                    <div>Infrastructure and connectivity integration</div>
                    <div>- Avg. rural access to electricity</div>
                    <div>- Sustainable trade facilitation implementation</div>
                    <div>- Avg. share of Internet users</div>
                  </q-tooltip>
                </q-img>
              </div>
              <div style="width: 20px"></div>

              <div>
                <q-img
                  src="../../../public/images/dimension05.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[4] === 1,
                    iconUnSelected: selectedDim[4] !== 1,
                  }"
                  @click="changeSelected(4)"
                >
                  <q-tooltip>
                    <div>Movement of people integration</div>
                    <div>- Avg. outward remittances per immigrant</div>
                    <div>- Avg. inward remittances per emigrant</div>
                  </q-tooltip>
                </q-img>
              </div>
              <div style="width: 20px"></div>
              <div>
                <q-img
                  src="../../../public/images/dimension06.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[5] === 1,
                    iconUnSelected: selectedDim[5] !== 1,
                  }"
                  @click="changeSelected(5)"
                >
                  <q-tooltip>
                    <div>Regulatory cooperation integration</div>
                    <div>- Sustainable FTA score</div>
                    <div>- Sustainable IIA score</div>
                    <div>- Avg. rule of law index score</div>
                    <div>- SDG trade regulatory distance from partners</div>
                    <div></div>
                  </q-tooltip>
                </q-img>
              </div>
            </div>
            <div class="row justify-center q-pt-md">
              <div>
                <q-img
                  src="../../../public/images/dimension07.svg"
                  alt=""
                  :class="{
                    iconDimension: selectedDim[6] === 1,
                    iconUnSelected: selectedDim[6] !== 1,
                  }"
                  @click="changeSelected(6)"
                >
                  <q-tooltip>
                    <div>Digital economy integration</div>
                    <div>- Avg. secure Internet servers</div>
                    <div>- Avg. share of households with Internet access</div>
                    <div>
                      - Avg. share of females with mobile or formal bank account
                    </div>
                    <div>- Avg. share of female online shoppers</div>
                  </q-tooltip>
                </q-img>
              </div>
              <div style="width: 20px"></div>

              <div style="width: 120px"></div>
              <div style="width: 20px"></div>
              <div style="width: 120px"></div>
            </div>
          </div>
        </div>
        <!-- data available -->
        <div class="q-pa-md">
          <div class="text-h6">Data availability</div>
          <div class="q-pb-md">
            Based on your selection, this group’s integration score will be
            based on
          </div>
          <div class="q-px-md" align="center">
            <div
              class="notShowCircular"
              v-if="!dataAvailCircleChart.isShowChart"
            >
              <div style="height: 40%"></div>
              <div class="" align="center" style="width: 80%">
                Select your desired group of economies to<br />
                check data availability.
              </div>
            </div>
            <div class="showCircular" v-else>
              <q-circular-progress
                show-value
                font-size="36px"
                :value="dataAvailCircleChart.score"
                size="200px"
                :thickness="0.36"
                color="orange"
                track-color="grey-5"
              >
                {{ dataAvailCircleChart.score }}%
              </q-circular-progress>
            </div>
            <div class="q-pa-md text-center">
              of all possible reporter-partner pairs.
            </div>
            <div
              v-if="dataAvailCircleChart.isShowChart"
              class="cursor-pointer text-center"
              @click="goToDataAvail"
            >
              <u> Click here to see this group's availabilitiy matrix</u>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="warnDialog.show" persistent>
      <q-card class="missDia">
        <div class="text-h6 text-center">Missing data</div>
        <hr />
        <div class="q-px-md">
          The following economies were excluded from your selection due to lack
          of data:
        </div>
        <div class="q-px-md">Reporting ecomomy(ies)</div>
        <div class="row q-px-md q-py-xs">
          <div v-for="(item, index) in warnDialog.reporting" :key="index">
            <q-chip color="grey-4" :label="showCountryName(item)" />
          </div>
        </div>
        <div class="q-px-md">Partner ecomomy(ies)</div>
        <div class="row q-px-md q-py-xs">
          <div v-for="(item, index) in warnDialog.partner" :key="index">
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
import { serverSetup, yearInputShow } from "../../pages/server";
import { useRouter } from "vue-router";
import { LocalStorage } from "quasar";
import { countryGroupListRiva2 } from "../../pages/countryGroupList";
import axios from "axios";
import countryData from "../../assets/countryAll.json";
import { Notify } from "quasar";

const { serverData } = serverSetup();
const { yearInput } = yearInputShow();

const selectedValuePartner = ref(null);
const selectedValueReport = ref(null);
const formattedOptionsReport = ref([]);
const formattedOptionsPartner = ref([]);

const countryListReport = ref([]);
const countryFullListReport = ref([]);
const countryFullListNameReport = ref([]);
const countryReportList = ref([]);

const countryListPartner = ref([]);
const countryFullListPartner = ref([]);
const countryFullListNamePartner = ref([]);
const countryPartnerList = ref([]);

const warnDialog = ref({
  reporting: [],
  partner: [],
});
const router = useRouter();
const input = ref({
  partner: [],
  reporting: [],
  year: {
    min: yearInput.value.min,
    max: yearInput.value.max,
  },
  type: "Sustainable",
  dimensionPicked: [1, 2, 3, 4, 5, 6, 7],
});

const periodSetup = ref({
  min: yearInput.value.min,
  max: yearInput.value.max,
});

const dataAvailCircleChart = ref({
  score: 0,
  isShowChart: false,
});

const dataTemp = ref([]);
const emit = defineEmits([
  "change-integration-type",
  "start-btn",
  "reset-start-btn",
  "change-dimension",
  "localID",
]);

//Dimension
const selectedDim = ref([1, 1, 1, 1, 1, 1, 1]);
const changeSelected = (index) => {
  if (selectedDim.value[index] == 1) {
    selectedDim.value[index] = 0;
  } else {
    selectedDim.value[index] = 1;
  }

  input.value.dimensionPicked = [];
  selectedDim.value.forEach((item, index) => {
    if (item == 1) {
      input.value.dimensionPicked.push(index + 1);
    }
  });
  emit("reset-start-btn");
  checkDataAvailability();
};
//input
const changeInputTypeSustainable = () => {
  emit("change-integration-type", "Sustainable");
  input.value.reporting = [];
  input.value.partner = [];
  countryReportList.value = [];
  countryPartnerList.value = [];
  dataAvailCircleChart.value.isShowChart = false;
  selectedValueReport.value = null;
  selectedValuePartner.value = null;
  emit("reset-start-btn");
  loadCountry();
};
const changeInputTypeConventional = () => {
  emit("change-integration-type", "Conventional");
  input.value.reporting = [];
  input.value.partner = [];
  countryReportList.value = [];
  countryPartnerList.value = [];
  dataAvailCircleChart.value.isShowChart = false;
  selectedValueReport.value = null;
  selectedValuePartner.value = null;
  emit("reset-start-btn");
  loadCountry();
};
const loadCountry = async () => {
  const tableReport = ref("");
  const tablePartner = ref("");
  if (input.value.type == "sustainable") {
    tableReport.value = "ri_eco_build_reporter_sus";
    tablePartner.value = "ri_eco_build_partner_sus";
  } else {
    tableReport.value = "ri_eco_build_reporter_con";
    tablePartner.value = "ri_eco_build_partner_con";
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

onMounted(() => {
  loadCountry();
});

const selectCountryGroupReport = async () => {
  countryListReport.value = [];
  countryReportList.value = [];
  dataAvailCircleChart.score;
  countryFullListNameReport.value = [];
  input.value.reporting = selectedValueReport.value;
  selectedValueReport.value.forEach((x) => {
    countryListReport.value = [
      ...new Set([
        ...countryGroupListRiva2(x.value),
        ...countryListReport.value,
      ]),
    ];
  });
  countryFullListReport.value = [...countryListReport.value];
  countryFullListNameReport.value = countryFullListReport.value
    .map((isoCode) => {
      const country = countryData.find((country) => country.iso === isoCode);
      return country ? country.country : null;
    })
    .filter((name) => name !== null);
  countryFullListNameReport.value.sort();
  countryReportList.value = [...countryFullListNameReport.value];
  checkDataAvailability();
  emit("reset-start-btn");
};
const selectCountryGroupPartner = async () => {
  countryListPartner.value = [];
  countryPartnerList.value = [];
  countryFullListPartner.value = [];
  countryFullListNamePartner.value = [];
  input.value.partner = selectedValuePartner.value;
  selectedValuePartner.value.forEach((x) => {
    countryListPartner.value = [
      ...new Set([
        ...countryGroupListRiva2(x.value),
        ...countryListPartner.value,
      ]),
    ];
  });
  countryFullListPartner.value = [...countryListPartner.value];
  countryFullListNamePartner.value = countryFullListPartner.value
    .map((isoCode) => {
      const country = countryData.find((country) => country.iso === isoCode);
      return country ? country.country : null;
    })
    .filter((name) => name !== null);
  countryFullListNamePartner.value.sort();
  countryPartnerList.value = [...countryFullListNamePartner.value];
  checkDataAvailability();
  emit("reset-start-btn");
};

const checkDataAvailability = () => {
  if (
    countryReportList.value.length > 0 &&
    countryPartnerList.value.length > 0 &&
    input.value.dimensionPicked.length > 0
  ) {
    showDataCircle(true);
  } else {
    showDataCircle(false);
  }
};

const showDataCircle = async (show) => {
  if (show) {
    let countScore = 0;
    let total = 0;
    let dataSend = {
      partner: countryFullListPartner.value,
      reporting: countryFullListReport.value,
      type: input.value.type,
      dimension: input.value.dimensionPicked,
    };
    let dimLenght = input.value.dimensionPicked.length;
    let url = serverData.value + "ri/build_circle.php";
    let res = await axios.post(url, JSON.stringify(dataSend));
    dataTemp.value = res.data;
    if (dataTemp.value.length > 0) {
      dataTemp.value = dataTemp.value.filter((x) => x.dimall >= dimLenght / 2);
    }
    dataSend.partner.forEach((partner) => {
      dataSend.reporting.forEach((reporting) => {
        let tempTable = dataTemp.value.filter(
          (x) => x.reporting == reporting && x.partner == partner
        );
        if (tempTable.length != 0) {
          countScore++;
        }
        if (reporting != partner) {
          total++;
        }
      });
    });
    if (total == 0) {
      dataAvailCircleChart.value.score = 0;
    } else {
      dataAvailCircleChart.value.score = Number(
        ((countScore / total) * 100).toFixed(0)
      );
    }
  }

  dataAvailCircleChart.value.isShowChart = show;
};

//Missing Data dialog
const backMissDataBtn = () => {
  warnDialog.value.show = false;
};

const btnStarttMissData = () => {
  if (warnDialog.value.reporting.length > 0) {
    countryFullListReport.value = countryFullListReport.value.filter(
      (country) => !warnDialog.value.reporting.includes(country)
    );
    countryReportList.value = countryFullListReport.value.map((isoCode) => {
      const country = countryData.find((country) => country.iso === isoCode);
      return country ? country.country : null;
    });
  }
  if (warnDialog.value.partner.length > 0) {
    countryFullListPartner.value = countryFullListPartner.value.filter(
      (country) => !warnDialog.value.partner.includes(country)
    );
    countryPartnerList.value = countryFullListPartner.value.map((isoCode) => {
      const country = countryData.find((country) => country.iso === isoCode);
      return country ? country.country : null;
    });
  }
  checkDataAvailability();
  emit("start-btn", {
    input: input.value,
    countryPartnerList: countryFullListPartner.value,
    countryReportList: countryFullListReport.value,
  });
  warnDialog.value.show = false;
};
//run
const clearAllBtn = () => {
  selectedValueReport.value = null;
  selectedValuePartner.value = null;
  countryReportList.value = [];
  countryPartnerList.value = [];
  dataAvailCircleChart.value.isShowChart = false;
  emit("reset-start-btn");
};
const localID = ref("");
const btnStartSpec = () => {
  if (input.value.year.min == input.value.year.max) {
    Notify.create({
      message: "Start and end year can not be the same.",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
  }
  if (input.value.dimensionPicked.length == 0) {
    Notify.create({
      message: "Please select one dimension.",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
  }
  if (
    countryFullListPartner.value.length > 0 &&
    countryFullListNameReport.value.length > 0
  ) {
    checkCountryNoData();
    localID.value = generateRandomId();
    const storageObject = {
      id: localID.value,
      group: "buildyourown",
      type: input.value.type,
      partner: selectedValuePartner.value,
      reporter: selectedValueReport.value,
    };
    LocalStorage.set("dataAvail", JSON.stringify(storageObject));
    emit("localID", localID.value);
  } else {
    Notify.create({
      message: "Please select Reporting economy and Partner economy.",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
  }
};

const checkCountryNoData = () => {
  warnDialog.value.reporting = [];
  warnDialog.value.partner = [];
  const reportingSet = new Set(dataTemp.value.map((item) => item.reporting));
  countryListReport.value.forEach((country) => {
    if (!reportingSet.has(country)) {
      warnDialog.value.reporting.push(country);
    }
  });
  const partnerSet = new Set(dataTemp.value.map((item) => item.partner));
  countryListPartner.value.forEach((country) => {
    if (!partnerSet.has(country)) {
      warnDialog.value.partner.push(country);
    }
  });

  if (
    warnDialog.value.partner.length > 0 ||
    warnDialog.value.reporting.length > 0
  ) {
    warnDialog.value.show = true;
  } else {
    emit("start-btn", {
      input: input.value,
      countryPartnerList: countryFullListPartner.value,
      countryReportList: countryFullListReport.value,
    });
  }
};

const showCountryName = (code) => {
  const result = countryData.filter((x) => x.iso == code);
  return result[0].country;
};
// data Available
const generateRandomId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const goToDataAvail = () => {
  router.push("/ridataavail/id=" + localID.value);
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: 500;
}
.iconDimension {
  width: 120px;
  border: 3px solid #2d9687;
  cursor: pointer;
}
.iconUnSelected {
  width: 120px;
  border: 3px solid #ededed;
  cursor: pointer;
  opacity: 0.5;
}
.showCircular {
  margin: auto;
  height: 240px;
  line-height: 240px;
}
.notShowCircular {
  margin: auto;

  height: 240px;
  border: 1px dashed #cbcbcb;
}
.dashBorder {
  border: 1px dashed #757575;
  height: 190px;
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
</style>
