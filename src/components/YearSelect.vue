<template>
  <div style="height: 90px">
    <div style="font-size: 14px">Year</div>
    <div class="q-pt-xs">
      <q-select
        v-model="yearSelect"
        :options="yearList"
        dark
        filled
        color="white"
        class="selectShow"
        @update:model-value="updateYear"
      />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, defineEmits } from "vue";
import { serverSetup } from "../pages/server.js";
const { serverData } = serverSetup();
const yearList = ref([]);
const yearSelect = ref("");
const loadYear = async () => {
  yearList.value = [];
  const url = serverData.value + "va/getYear.php";
  const res = await axios.get(url);
  res.data.forEach((x) => {
    yearList.value.push(x.year);
  });
  yearList.value.sort((a, b) => a.year - b.year);
  yearSelect.value = yearList.value[0];
  updateYear();
};

onMounted(() => loadYear());

const emit = defineEmits(["update"]);
const updateYear = () => {
  emit("update", yearSelect.value);
};
</script>

<style lang="scss" scoped>
.selectShow {
  width: 350px;
}
</style>
