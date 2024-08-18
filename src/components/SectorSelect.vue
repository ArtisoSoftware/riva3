<template>
  <div style="height: 90px">
    <div style="font-size: 14px">Exporting sector</div>
    <div class="q-pt-xs">
      <q-select
        v-model="sectorSelected"
        :options="formattedOptions"
        dark
        filled
        option-label="label"
        option-value="value"
        color="white"
        class="selectShow"
        @update:model-value="updateSector"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
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
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { serverSetup } from "../pages/server.js";

const { serverData } = serverSetup();
const props = defineProps({
  initialValue: {
    type: String,
    required: false,
    default: "",
  },
});
const emit = defineEmits(["update:selected"]);
const sectorSelected = ref("");
const options = ref([]);
const formattedOptions = ref([]);
const loadOption = async () => {
  try {
    const url = serverData.value + "va/getSector.php";
    const res = await axios.get(url);
    options.value = res.data;
    formattedOptions.value = options.value.map((option) => ({
      label: option.name,
    }));
    if (props.initialValue) {
      sectorSelected.value = props.initialValue;
      updateSector(props.initialValue);
    }
  } catch (error) {
    console.error("Error loading options:", error);
  }
};

onMounted(() => {
  loadOption();
});

watch(
  () => props.initialValue,
  (newValue) => {
    if (newValue) {
      sectorSelected.value = newValue;
      updateSector(newValue);
    }
  }
);

const updateSector = (value) => {
  emit("update:selected", value.label); // Emit the select
};
</script>

<style lang="scss" scoped>
.selectShow {
  width: 350px;
}
</style>
