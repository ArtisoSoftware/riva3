<template>
  <div>test</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { serverSetup } from "../../pages/server";
import axios from "axios";

const router = useRouter();
const { serverData } = serverSetup();

const props = defineProps({
  input: {
    type: Object,
    required: true,
  },
  partner: {
    type: Array,
    required: true,
  },
  reporting: {
    type: Array,
    required: true,
  },
  localID: {
    type: String,
    required: true,
  },
});

const dimensionName = ref([
  "Trade and investment",
  "Financial markets",
  "Value chains",
  "Infrastructure and connectivity",
  "Movement of people",
  "Regulatory cooperation",
  "Digital economy",
]);

const dimensionColor = ref([
  "#64C1E8",
  "#D85B63",
  "#D680AD",
  "#88643A",
  "#C0BA80",
  "#FDC47D",
  "#EA3B46",
]);
const dimensionOptions = ref([]);

const yourGroupName = ref("Your group");
const dimPick = ref([]);
const firstHalfPeriod = ref("");
const secondHalfPeriod = ref("");
const countAllPair = 0;
const report = ref([]);
const partner = ref([]);
const selected = ref("");
onMounted(() => {
  checkYourName();
});

const checkYourName = () => {
  if (props.reporting.length == 1) {
    yourGroupName.value = props.input.reporting[0].label;
  }
  loadData();
};

const loadData = async () => {
  dimensionOptions.value = [];
  report.value = props.reporting;
  partner.value = props.partner;
  dimPick.value = props.input.dimensionPicked;
  if (props.input.year.min == props.input.year.max - 1) {
    firstHalfPeriod.value = props.input.year.min;
    secondHlafPeriod.value = props.input.year.max;
  } else {
    let diffYear = Math.floor(
      (props.input.year.max - props.input.year.min) / 2
    );
    firstHalfPeriod.value =
      props.input.year.min + "-" + (props.input.year.min + diffYear);
    secondHalfPeriod.value =
      props.input.year.max - diffYear + "-" + props.input.year.max;
  }
  dimPick.value.forEach((x) => {
    dimensionOptions.value.push(dimensionName.value[x - 1]);
  });
  countAllPair.value = 0;
  report.value.forEach((report) => {
    partner.forEach((partner) => {
      if (report != partner) {
        countAllPair.value++;
      }
    });
  });
  selected.value = dimensionOptions.value[0];
  changeDimension();
};

const changeDimension = async () => {
  console.log("working here");
};
</script>

<style lang="scss" scoped></style>
