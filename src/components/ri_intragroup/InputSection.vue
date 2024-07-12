<template>
  <div style="color: #757575">
    <div class="row q-px-xl q-py-md">
      <div class="col">
        <div class="font20"><b>Integration type</b></div>
        <div class="font14">Select the desired type of integration</div>
      </div>
      <div class="col">
        <q-radio
          v-model="input.type"
          val="Sustainable"
          label="Sustainable integration"
          color="secondary"
          @update:model-value="changeInputTypeSustainable()"
        />
      </div>
      <div class="col">
        <q-radio
          v-model="input.type"
          val="Conventional"
          label="Conventional integration"
          color="secondary"
          @update:model-value="changeInputTypeConventional()"
        />
      </div>
    </div>
    <div class="q-px-xl">
      <div class="font20"><b>Period</b></div>
      <div>
        <q-range
          v-model="input.year"
          marker-labels
          :min="periodSetup.min"
          :max="periodSetup.max"
          label-always
          markers
          style="width: 95%"
          color="secondary"
          @input="changeYear()"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const input = ref({
  type: "Sustainable",
  year: {
    min: 2010,
    max: 2021,
  },
  partner: [],
});
const periodSetup = ref({
  min: 2010,
  max: 2021,
});
const emit = defineEmits(["change-integration-type"]);

const changeInputTypeSustainable = () => {
  emit("change-integration-type", "Sustainable");
};

const changeInputTypeConventional = () => {
  emit("change-integration-type", "Conventional");
};
</script>

<style lang="scss" scoped>
.font20 {
  font-size: 20px;
  color: #757575;
}
.font14 {
  font-size: 14px;
  color: #757575;
}
</style>
