<template>
  <div style="background-color: #7a7a7a">
    <div class="mainApp">
      <div><RIHeader :menu="0" /></div>
      <div style="height: 700px">RI Overview</div>
      <footerMain />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import RIHeader from "../components/RI_header.vue";
import footerMain from "../components/footer2.vue";
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
