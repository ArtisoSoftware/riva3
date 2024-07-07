<template>
  <div style="height: 90px">
    <div style="font-size: 14px">Exporting sector</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { serverSetup } from "../pages/server.js";

const { serverData } = serverSetup();
const emit = defineEmits(["update:selected"]);
const options = ref([]);
const formattedOptions = ref([]);
const loadOption = async () => {
  try {
    const url = serverData.value + "va/getSector.php";
    const res = await axios.get(url);
    options.value = res.data;
    formattedOptions.value = options.value.map((option) => ({
      id: option.id,
      label: option.name,
      value: option.id,
      disable: option.disable,
    }));
  } catch (error) {
    console.error("Error loading options:", error);
  }
};

onMounted(() => {
  loadOption();
});
</script>

<style lang="scss" scoped></style>
