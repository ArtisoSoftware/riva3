<template>
  <div>
    <div style="font-size: 12px">{{ label }}</div>
    <div class="q-pt-xs">
      <q-select
        v-model="selectedValue"
        :options="formattedOptions"
        dense
        map-options
        emit-value
        option-label="label"
        option-value="value"
        style="width: 350px"
        @update:model-value="updateValue"
        dark
        outlined
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section
              avatar
              v-if="!scope.opt.disable && scope.opt.id !== 0"
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { serverSetup } from "../pages/server.js";

const { serverData } = serverSetup();
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});

const options = ref([]);
const formattedOptions = ref([]);
const loadOption = async () => {
  try {
    const url = serverData.value + "va/getEco.php";
    const res = await axios.get(url);
    options.value = res.data;
    formattedOptions.value = options.value.map((option) => ({
      id: option.id,
      label: option.name,
      value: option.iso,
      disable: option.disable,
    }));
  } catch (error) {
    console.error("Error loading options:", error);
  }
};

onMounted(() => {
  loadOption();
});

const selectedValue = ref(null);
const updateValue = (value) => {
  const selectedOption = options.value.find((option) => option.iso === value);
  console.log("Selected Name:", selectedOption?.name);
  console.log("Selected ISO:", selectedOption?.iso);
};

const getFlagUrl = (iso) => {
  return `images/flags/${iso}.png`;
};
</script>

<style scoped>
.text-bold {
  font-weight: bold;
}
</style>
