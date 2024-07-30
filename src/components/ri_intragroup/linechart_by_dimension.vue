<template>
  <div>LineChart</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { serverSetup } from "../../pages/server.js";

import axios from "axios";
const { serverData } = serverSetup();
const props = defineProps({
  data: {
    data: Array,
    required: false,
  },
  input: {
    type: Object,
    required: false,
  },
});

const menuSelectedId = ref(1);
const dimensionAll = ref([]);
const yourGroupName = ref("");
const ecoIntegrationChart = ref([]);

onMounted(async () => {
  let dataSend = {
    type: props.input.type,
  };
  let url2 = serverData.value + "ri/dimension_icon.php";
  let res2 = await axios.post(url2, JSON.stringify(dataSend));
  dimensionAll.value = res2.data;
  checkYourName();
  loadEcoIntegration();
  console.log("Work here");
});

const checkYourName = () => {
  if (props.input.partner.length == 1) {
    yourGroupName.value = props.input.partner[0].label;
  }
};

const loadEcoIntegration = async () => {
  ecoIntegrationChart.value = [];
  let data = {
    input: props.input,
    countryFullList: props.data,
    countryMap: props.data.map((x) => x.iso_),
  };
};
</script>

<style lang="scss" scoped>
.positiveText {
  color: #2d9687;
}
.negativeText {
  color: #d85b63;
}

.colorBox {
  width: 16px;
  height: 16px;
  border: 1px solid #757575;
}
.selectBoxDiv {
  border: 1px solid #757575;
}
.textSelected {
  color: #2d9687;
  font-weight: bold;
}
.lineGreenSelectedBox {
  height: 6px;
  background-color: #2d9687;
}
.borderMainBox {
  border: 1px solid #757575;
  height: 650px;
  width: 100%;
}
.borderRight {
  border-right: 1px solid #c4c4c4;
  height: 650px;
}
.checkBox {
  width: 20px;
  height: 20px;
}
.checkBoxGroup {
  width: 20px;
  height: 20px;
  border: 1px solid #757575;
}
</style>
