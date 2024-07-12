<template>
  <div style="background-color: #7a7a7a">
    <div class="mainApp">
      <div><RIHeader :menu="1" /></div>
      <div class="row">
        <div class="col">
          <inputSection @change-integration-type="changeIntegrationType" />
        </div>
        <div style="width: 480px">
          <dimensionIcon :integrationType="input.type" />
        </div>
      </div>

      <footerMain />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import RIHeader from "../components/RI_header.vue";
import inputSection from "../components/ri_intragroup/InputSection.vue";
import dimensionIcon from "../components/RI_dimension_icon.vue";
import footerMain from "../components/footer2.vue";

const input = ref({
  type: "Sustainable",
});

const changeIntegrationType = (integrationType) => {
  input.value.type = integrationType;
};
onMounted(() => {
  // Refresh the page on first load to ensure meta tag change
  sessionStorage.removeItem("reloaded2");
  if (!sessionStorage.getItem("reloaded")) {
    sessionStorage.setItem("reloaded", "true");
    location.reload();
  }
});
</script>

<style lang="scss" scoped>
.mainApp {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  background-color: #fff;
}
</style>
