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
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { serverSetup, yearInputShow } from "../../pages/server.js";
import axios from "axios";

const { yearInput } = yearInputShow();
const { serverData } = serverSetup();

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

onMounted(() => {
  periodSetup.value.min = yearInput.value.min;
  periodSetup.value.max = yearInput.value.max;
  loadCountry();
  console.log("work here");
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

const changeInputTypeSustainable = () => {};

const changeInputTypeConventional = () => {};
</script>

<style lang="scss" scoped></style>
