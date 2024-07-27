<template>
  <div style="background-color: #7a7a7a">
    <div class="mainApp">
      <div><RIHeader :menu="3" /></div>
      <div>
        <input-section
          @start-btn="startBtn"
          @reset-start-btn="resetStartBtn"
          @change-integration-type="changeIntegrationType"
          @localID="getLocalID"
        />
      </div>
      <div v-if="showResultAfterStartBtn">
        <hr />
        <div style="font-size: 24px" class="text-center q-py-md">
          {{ fourBarName }}
          <span class="text-green"
            ><b>{{ scoreFinal }}</b></span
          >
        </div>
        <hr />
        <RI_disaggregation
          @change-disaggregation="changeDisaggraegation"
          :disaggregation="disaggregation"
        />

        <div v-show="disaggregation == 'dimension'">
          <div>
            <LineChartDimension
              :input="input2"
              :partner="countryPartnerList"
              :reporting="countryReportList"
              :localID="localID"
            />
            <dimension-tab
              :input="input2"
              :partner="countryPartnerList"
              :reporting="countryReportList"
              :localID="localID"
            ></dimension-tab>
          </div>
        </div>
      </div>
      <footerMain />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import RIHeader from "../components/RI_header.vue";
import inputSection from "../components/ri_buildyourown/InputSection.vue";
import RI_disaggregation from "../components/RI_disaggregation.vue";
import LineChartDimension from "../components/ri_buildyourown/LineChartDimension.vue";
import dimensionTab from "../components/ri_buildyourown/Datatab_dimension.vue";
import footerMain from "../components/footer2.vue";
import { serverSetup } from "./server";
import axios from "axios";

const { serverData } = serverSetup();
const input = ref({
  partner: [],
  reporting: [],
  year: {
    min: 2012,
    max: 2020,
  },
  type: "Sustainable",
  dimensionPicked: [1, 2, 3, 4, 5, 6, 7],
});
const input2 = ref({});
const localID = ref("");
const disaggregation = ref("dimension");
const showResultAfterStartBtn = ref(false);
const countryReportList = ref([]);
const countryPartnerList = ref([]);

const startBtn = (value) => {
  countryReportList.value = value.countryReportList;
  countryPartnerList.value = value.countryPartnerList;
  input.value = value.input;
  input2.value = input.value;
  input2.value.disaggregation = disaggregation.value;
  showResultAfterStartBtn.value = true;
  calFourBarChart();
};

const getLocalID = (value) => {
  localID.value = value;
};

const resetStartBtn = () => {
  showResultAfterStartBtn.value = false;
};

const changeIntegrationType = (integrationType) => {
  input.value.type = integrationType;
  input2.value = input.value;
  input2.value.disaggregation = disaggregation.value;
};

///integration score
const fourBarName = ref("");
const scoreFinal = ref(0);

onMounted(() => {
  input2.value = input.value;
  input2.value.disaggregation = disaggregation.value;
});

const calFourBarChart = async () => {
  let reportLabel = "Your group";
  if (input.value.reporting.length == 1) {
    reportLabel = input.value.reporting[0].label;
  }
  let partnerLabel = "with your gorup of partners";
  if (input.value.partner.length == 1) {
    partnerLabel = input.value.partner[0].label;
  }
  fourBarName.value =
    reportLabel +
    "'s " +
    input.value.type.toLowerCase() +
    " integration score with " +
    partnerLabel +
    " in " +
    input.value.year.max +
    " was ";

  let dataSend = {
    reporting: countryReportList.value,
    partner: countryPartnerList.value,
    year: input.value.year.max,
    type: input.value.type,
    dimension: input.value.dimensionPicked,
  };

  let url = serverData.value + "ri/build_score.php";
  let res = await axios.post(url, JSON.stringify(dataSend));
  let rawData = res.data;
  let dimPass = input.value.dimensionPicked.length / 2;
  let score = 0;
  let countPair = 0;

  dataSend.reporting.forEach((reporting) => {
    dataSend.partner.forEach((partner) => {
      let sum = 0;
      let dataTemp = rawData.filter(
        (x) => x.reporter == reporting && x.partner == partner
      );

      if (dataTemp.length >= dimPass) {
        dataTemp.forEach((eachDim) => {
          sum += Number(eachDim.score);
        });
        sum /= dataTemp.length;
        countPair++;
      } else {
        sum = 0;
      }
      score += sum;
    });
  });
  score /= countPair;
  scoreFinal.value = score.toFixed(2);
};

//Change disaggregation
const changeDisaggraegation = (type) => {
  disaggregation.value = type;
};
</script>

<style lang="scss" scoped>
.mainApp {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  background-color: #fff;
}
</style>
