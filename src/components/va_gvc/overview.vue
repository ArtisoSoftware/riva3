<template>
  <div>
    <div style="font-size: 35px; font-weight: 400" class="text-center q-pt-md">
      {{ exportingName }}'s GVC relationships: Overview
    </div>
    <div
      class="row q-px-lg items-center q-pt-md"
      style="width: 1000px; margin: auto"
    >
      <div class="col text-center">
        <div>
          <div class="txtGreen">
            <b>Foreign production consumed by the importer</b>
          </div>
          <div class="txtGreen"><b>(Backward linkages)</b></div>
          <div class="q-pt-md txtGreen">
            Share: {{ output.backward.share }}% of {{ exportingName }}'s gross
            exports
          </div>
          <div class="txtGreen">
            value: ${{ output.backward.value }} billion
          </div>
        </div>
        <div class="row items-center justify-center" style="height: 200px">
          <img
            src="../../../public/images/greencon.png"
            :style="{ width: sizeCon.backward + 'px' }"
            alt=""
          />
        </div>
      </div>
      <div
        style="width: 300px; font-size: 35px; font-weight: 400"
        class="text-center"
      >
        {{ exportingName }}
      </div>
      <div class="col text-center">
        <div class="txtRed">
          <div><b>Domestic production used in the importer's exports</b></div>
          <div><b>(Forward linkages)</b></div>
          <div class="q-pt-md">
            Share: {{ output.forward.share }}% of {{ exportingName }}'s gross
            exports
          </div>
          <div>value: ${{ output.forward.value }} billion</div>
        </div>
        <div class="row items-center justify-center" style="height: 200px">
          <img
            src="../../../public/images/redcon.png"
            alt=""
            :style="{ width: sizeCon.forward + 'px' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { serverSetup } from "../../pages/server.js";
const { serverData } = serverSetup();

const props = defineProps({
  dataSend: {
    type: Object,
    required: true,
  },
});
const exportingName = ref("");
const exportingISO = ref("");
const year = ref("");
const output = ref({
  backward: {
    share: 0,
    value: 0,
  },
  forward: {
    share: 0,
    value: 0,
  },
});
const sizeCon = ref({
  backward: 300,
  forward: 300,
});

const loadData = async () => {
  let dataTemp = {
    exp_country: exportingISO.value,
    year: Number(year.value),
  };
  let url = serverData.value + "va/gvcloaddata1.php";
  let res = await axios.post(url, JSON.stringify(dataTemp));
  let backData = res.data.filter((x) => x.var == "Backward linkages");
  output.value.backward.share = Number(backData[0].share * 100).toFixed(0);
  output.value.backward.value = Number(backData[0].value / 1000).toFixed(2);
  let forData = res.data.filter((x) => x.var == "Forward linkages");
  output.value.forward.share = Number(forData[0].share * 100).toFixed(0);
  output.value.forward.value = Number(forData[0].value / 1000).toFixed(2);
  if (output.value.forward.value > output.value.backward.value) {
    let ratio = output.value.backward.value / output.value.forward.value;
    sizeCon.value.backward = 300 * ratio;
    sizeCon.value.forward = 300;
  } else {
    let ratio = output.value.forward.value / output.value.backward.value;
    sizeCon.value.backward = 300;
    sizeCon.value.forward = 300 * ratio;
  }
};

watch(
  () => ({
    exportingISO: props.dataSend.exportingISO,
    exportingName: props.dataSend.exportingName,
    year: props.dataSend.year,
  }),
  (newVal, oldVal) => {
    if (
      newVal.exportingISO.length > 0 &&
      newVal.exportingName.length > 0 &&
      newVal.year.length > 0
    ) {
      exportingISO.value = props.dataSend.exportingISO;
      exportingName.value = props.dataSend.exportingName;
      year.value = props.dataSend.year;
      loadData();
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.txtGreen {
  color: #2d9687;
}
.txtRed {
  color: #eb1e63;
}
</style>
