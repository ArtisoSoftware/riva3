<template>
  <div class="mainBg q-pa-md">
    <div class="row">
      <div class="title">
        {{ integrationType }} Integration dimensions (all included)
      </div>
      <div class="q-px-sm">
        <q-icon name="fas fa-question-circle" size="24px">
          <q-tooltip>
            In DigiSRII 2.0 all dimensions are included <br />by default. To
            peruse specific dimensions <br />
            head on to the section “Build you own”
          </q-tooltip>
        </q-icon>
      </div>
    </div>
    <div>Hover to reveal included indicators.</div>
    <div v-if="integrationType == 'Conventional'">
      <div class="row justify-center q-pt-md">
        <div>
          <q-img
            src="../../../public/images/dimension01.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[0] === 1,
              iconUnSelected: selectedDim[0] !== 1,
            }"
            @click="changeSelected(0)"
          >
            <q-tooltip>
              <div>Trade and investement integration</div>
              <div>- Exports to GDP</div>
              <div>- Imports to GDP</div>
              <div>- Import tarriffs</div>
              <div>- FDI inflows to GDP</div>
              <div>- FDI outflows to GDP</div>
            </q-tooltip>
          </q-img>
        </div>
        <div style="width: 20px"></div>

        <div>
          <q-img
            src="../../../public/images/dimension02.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[1] === 1,
              iconUnSelected: selectedDim[1] !== 1,
            }"
            @click="changeSelected(1)"
          >
            <q-tooltip>
              <div>Financial markets integration</div>
              <div>- Cross-border portfolio to GDP</div>
              <div>- Deposit rates dispersion</div>
              <div>- Share price index correlation</div>
            </q-tooltip>
          </q-img>
        </div>
        <div style="width: 20px"></div>
        <div>
          <q-img
            src="../../../public/images/dimension03.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[2] === 1,
              iconUnSelected: selectedDim[2] !== 1,
            }"
            @click="changeSelected(2)"
          >
            <q-tooltip>
              <div>Value chains integration</div>
              <div>- Export complementarity index</div>
              <div>- Value Chains participation Index</div>
              <div>- Intermediate goods exports to GDP</div>
              <div>- Intermediate goods imports to GDP</div>
            </q-tooltip>
          </q-img>
        </div>
      </div>
      <div class="row justify-center q-pt-md">
        <div>
          <q-img
            src="../../../public/images/dimension04.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[3] === 1,
              iconUnSelected: selectedDim[3] !== 1,
            }"
            @click="changeSelected(3)"
          >
            <q-tooltip>
              <div>Infrastructure and connectivity integration</div>
              <div>- Liner shipping connectivity index</div>
              <div>- Trade facilitation implement</div>
              <div>- Average internet quality</div>
              <div>- Average trade cost</div>
            </q-tooltip>
          </q-img>
        </div>
        <div style="width: 20px"></div>

        <div>
          <q-img
            src="../../../public/images/dimension05.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[4] === 1,
              iconUnSelected: selectedDim[4] !== 1,
            }"
            @click="changeSelected(4)"
          >
            <q-tooltip>
              <div>Movement of people integration</div>
              <div>- Stock of emigrants per capita</div>
              <div>- Stock of immigrants per capita</div>
              <div>- Remittances outflow to GDP</div>
              <div>- Remittances inflow to GDP</div>
            </q-tooltip>
          </q-img>
        </div>
        <div style="width: 20px"></div>
        <div>
          <q-img
            src="../../../public/images/dimension06.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[5] === 1,
              iconUnSelected: selectedDim[5] !== 1,
            }"
            @click="changeSelected(5)"
          >
            <q-tooltip>
              <div>Regulatory cooperation integration</div>
              <div>- Signed FTA</div>
              <div>- Signed IIA (Yes/No)</div>
              <div>- Embassy (yes/No)</div>
              <div>- Trade regulatory similarity</div>
              <div></div>
            </q-tooltip>
          </q-img>
        </div>
      </div>
      <div class="row justify-center q-pt-md">
        <div>
          <q-img
            src="../../../public/images/dimension07.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[6] === 1,
              iconUnSelected: selectedDim[6] !== 1,
            }"
            @click="changeSelected(6)"
          >
            <q-tooltip>
              <div>Digital economy integration</div>
              <div>- ICT goods exports to GDP</div>
              <div>- ICT goods imports to GDP</div>
              <div>- Tariffs on ICT imports</div>
              <div>- Avg. share using digital financial services</div>
              <div>- Avg. share of online shoppers</div>
              <div>- Digital Trade regulatory similarity</div>
            </q-tooltip>
          </q-img>
        </div>
        <div style="width: 20px"></div>

        <div style="width: 120px"></div>
        <div style="width: 20px"></div>
        <div style="width: 120px"></div>
      </div>
    </div>
    <div v-else>
      <div class="row justify-center q-pt-md">
        <div>
          <q-img
            src="../../../public/images/dimension01.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[0] === 1,
              iconUnSelected: selectedDim[0] !== 1,
            }"
            @click="changeSelected(0)"
          >
            <q-tooltip>
              <div>Trade and investement integration</div>
              <div>- Environmental goods exports to GDP</div>
              <div>- Environmental goods imports to GDP</div>
              <div>- Tariffs on environmental goods imports</div>
              <div>- Employment created by DVA</div>
            </q-tooltip>
          </q-img>
        </div>
        <div style="width: 20px"></div>

        <div>
          <q-img
            src="../../../public/images/dimension02.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[1] === 1,
              iconUnSelected: selectedDim[1] !== 1,
            }"
            @click="changeSelected(1)"
          >
            <q-tooltip>
              <div>Financial markets integration</div>
              <div>- Real exchange rate volatility</div>
              <div>- Avg. financial development index score</div>
              <div>- Volatility weighted correlation of share price</div>
            </q-tooltip>
          </q-img>
        </div>
        <div style="width: 20px"></div>
        <div>
          <q-img
            src="../../../public/images/dimension03.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[2] === 1,
              iconUnSelected: selectedDim[2] !== 1,
            }"
            @click="changeSelected(2)"
          >
            <q-tooltip>
              <div>Value chains integration</div>
              <div>- Environmental goods export complementarity index</div>
              <div>- Sustainable Value Chain participation index</div>
              <div>- Exports of intermediates per unit of CO2</div>
            </q-tooltip>
          </q-img>
        </div>
      </div>
      <div class="row justify-center q-pt-md">
        <div>
          <q-img
            src="../../../public/images/dimension04.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[3] === 1,
              iconUnSelected: selectedDim[3] !== 1,
            }"
            @click="changeSelected(3)"
          >
            <q-tooltip>
              <div>Infrastructure and connectivity integration</div>
              <div>- Avg. rural access to electricity</div>
              <div>- Sustainable trade facilitation implementation</div>
              <div>- Avg. share of Internet users</div>
            </q-tooltip>
          </q-img>
        </div>
        <div style="width: 20px"></div>

        <div>
          <q-img
            src="../../../public/images/dimension05.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[4] === 1,
              iconUnSelected: selectedDim[4] !== 1,
            }"
            @click="changeSelected(4)"
          >
            <q-tooltip>
              <div>Movement of people integration</div>
              <div>- Avg. outward remittances per immigrant</div>
              <div>- Avg. inward remittances per emigrant</div>
            </q-tooltip>
          </q-img>
        </div>
        <div style="width: 20px"></div>
        <div>
          <q-img
            src="../../../public/images/dimension06.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[5] === 1,
              iconUnSelected: selectedDim[5] !== 1,
            }"
            @click="changeSelected(5)"
          >
            <q-tooltip>
              <div>Regulatory cooperation integration</div>
              <div>- Sustainable FTA score</div>
              <div>- Sustainable IIA score</div>
              <div>- Avg. rule of law index score</div>
              <div>- SDG trade regulatory distance from partners</div>
              <div></div>
            </q-tooltip>
          </q-img>
        </div>
      </div>
      <div class="row justify-center q-pt-md">
        <div>
          <q-img
            src="../../../public/images/dimension07.svg"
            alt=""
            :class="{
              iconDimension: selectedDim[6] === 1,
              iconUnSelected: selectedDim[6] !== 1,
            }"
            @click="changeSelected(6)"
          >
            <q-tooltip>
              <div>Digital economy integration</div>
              <div>- Avg. secure Internet servers</div>
              <div>- Avg. share of households with Internet access</div>
              <div>
                - Avg. share of females with mobile or formal bank account
              </div>
              <div>- Avg. share of female online shoppers</div>
            </q-tooltip>
          </q-img>
        </div>
        <div style="width: 20px"></div>

        <div style="width: 120px"></div>
        <div style="width: 20px"></div>
        <div style="width: 120px"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  integrationType: {
    type: String,
    required: true,
  },
});
const selectedDim = ref([1, 1, 1, 1, 1, 1, 1]);

const emit = defineEmits(["select-dimension"]);

const changeSelected = (index) => {
  if (selectedDim.value[index] == 1) {
    selectedDim.value[index] = 0;
  } else {
    selectedDim.value[index] = 1;
  }
  emit("select-dimension", selectedDim.value);
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: 500;
}
.mainBg {
  color: #757575;
  background-color: #ededed;
}
.iconDimension {
  width: 120px;
  border: 3px solid #2d9687;
  cursor: pointer;
}
.iconUnSelected {
  width: 120px;
  border: 3px solid #ededed;
  cursor: pointer;
  opacity: 0.5;
}
</style>
