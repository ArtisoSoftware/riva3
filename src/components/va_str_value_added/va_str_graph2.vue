<template>
  <div id="container2">Graph2</div>
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
const dataInput = ref({
  exportingISO: "",
  exportingName: "",
  importingISO: "",
  importingName: "",
  year: "",
  sectorName: "",
});

const loadData = () => {
  console.log("loading");
};

watch(
  () => ({
    exportingISO: props.dataSend.exportingISO,
    exportingName: props.dataSend.exportingName,
    importingName: props.dataSend.importingName,
    importingISO: props.dataSend.importingISO,
    year: props.dataSend.year,
    sectorName: props.dataSend.sectorName,
  }),
  (newVal, oldVal) => {
    if (
      newVal.exportingISO.length > 0 &&
      newVal.importingISO.length > 0 &&
      newVal.year.length > 0 &&
      newVal.sectorName.length > 0
    ) {
      dataInput.value.exportingISO = props.dataSend.exportingISO;
      dataInput.value.exportingName = props.dataSend.exportingName;
      dataInput.value.importingISO = props.dataSend.importingISO;
      dataInput.value.importingName = props.dataSend.importingName;
      dataInput.value.year = props.dataSend.year;
      dataInput.value.sectorName = props.dataSend.sectorName;
      loadData();
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped></style>
