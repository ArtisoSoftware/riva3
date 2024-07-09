<template>
  <div style="height: 90px">
    <div style="font-size: 14px">{{ label }}</div>
    <div class="q-pt-xs">
      <q-select
        v-model="selectedValue"
        :options="formattedOptions"
        map-options
        emit-value
        option-label="label"
        option-value="value"
        style="width: 350px"
        @update:model-value="updateValue"
        dark
        filled
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section
              avatar
              v-if="
                !scope.opt.disable &&
                scope.opt.id !== 0 &&
                !['RoW', 'RoLAC', 'TWN'].includes(scope.opt.value)
              "
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
        <template v-slot:selected-item="scope">
          <q-item v-if="scope.opt">
            <q-item-section
              avatar
              v-if="
                !scope.opt.disable &&
                scope.opt.id !== 0 &&
                !['RoW', 'RoLAC', 'TWN'].includes(scope.opt.value)
              "
            >
              <img
                :src="getFlagUrl(scope.opt.value)"
                alt="flag"
                style="width: 24px; height: 16px"
              />
            </q-item-section>
            <q-item-section>
              {{ scope.opt.label }}
            </q-item-section>
          </q-item>
        </template>
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
  label: {
    type: String,
    required: true,
  },
  initialValue: {
    type: String,
    required: false,
    default: "",
  },
});
const emit = defineEmits(["update:selected"]);
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

onMounted(async () => {
  await loadOption();
  if (props.initialValue) {
    selectedValue.value = props.initialValue;
    updateValue(props.initialValue);
  }
});

watch(
  () => props.initialValue,
  (newValue) => {
    if (newValue) {
      selectedValue.value = newValue;
      updateValue(newValue);
    }
  }
);

const selectedValue = ref(null);
const updateValue = (value) => {
  const selectedOption = options.value.find((option) => option.iso === value);

  if (selectedOption) {
    emit("update:selected", {
      name: selectedOption.name,
      iso: selectedOption.iso,
    }); // Emit the selected option's name and iso
  }
};
if (props.initialValue) {
  updateValue(props.initialValue);
}

const getFlagUrl = (iso) => {
  return `images/flags/${iso}.png`;
};
</script>

<style scoped>
.text-bold {
  font-weight: bold;
}
</style>
