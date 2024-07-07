<template>
  <div style="background-color: #7a7a7a">
    <div class="mainApp">
      <div><VAHeader /></div>
      <div class="menuMain row">
        <div style="width: 450px">
          <div style="font-size: 24px" class="q-px-xl">
            <div class="q-pt-md selectedMenu">GVC relationships</div>
            <div class="q-pt-md">Structure of value added</div>
            <div class="q-pt-md">Participation in GVCs</div>
            <div class="q-pt-md">Backward linkages</div>
            <div class="q-pt-md">Forward linkages</div>
          </div>
        </div>
        <div style="width: 5px">
          <div class="vl"></div>
        </div>
        <div class="col">
          <div class="row">
            <EcoSelect label="Exporting economy" />
            <yearSelect @update="getYear" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VAHeader from "../components/VA_header.vue";
import yearSelect from "../components/YearSelect.vue";
import EcoSelect from "../components/EcoSelect.vue";

const getYear = (value) => {
  console.log(value);
};
</script>

<style lang="scss" scoped>
.mainApp {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  background-color: #fff;
}
.menuMain {
  background-color: #16222d;
  height: 280px;
  color: white;
}
.vl {
  width: 1px;
  height: 240px;
  border-left: 2px solid white;
  margin-top: 20px;
}
.selectedMenu {
  color: #e2cd11;
}
</style>
