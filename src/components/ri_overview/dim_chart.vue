<template>
  <div>
    <div
      class="text-black"
      style="font-weight: 400; font-size: 18px; width: 600px; margin: auto"
      align="center"
    >
      <div v-if="ecoName == 'Asia-Pacific'">
        How have different integration dimensions in {{ ecoName }} progressed
        across periods?<br />
        Conventional and sustainable integration ({{ year1 }} vs {{ year2 }})
      </div>
      <div v-if="ecoName != 'Asia-Pacific'">
        How have different dimensions in {{ ecoName }}'s integration with
        Asia-Pacific progressed across periods?<br />
        Conventional and sustainable integration (2010-14 vs 2015-19)
      </div>

      <div class="row justify-center" style="font-size: 16px">
        <div>
          <div v-for="n in 7" :key="n" style="width: 200px">
            <div
              v-if="!dataCI[n * 2 - 2] || !dataCI[n * 2 - 2].score"
              class="row q-pt-sm"
            >
              <div class="q-px-sm">No data available</div>
              <div class="bgBlue" style="width: 8px"></div>
            </div>
            <div v-else class="row justify-end q-pt-sm">
              <div
                v-if="dataCI[n * 2 - 2].score > 0.15"
                class="bgBlue q-pr-sm text-right"
                :style="{ width: dataCI[n * 2 - 2].score * 200 + 'px' }"
              >
                {{ dataCI[n * 2 - 2].score.toFixed(2) }}
              </div>
              <div v-else class="row justify-end">
                <div class="q-px-sm">
                  {{ dataCI[n * 2 - 2].score.toFixed(2) }}
                </div>

                <div class="bgBlue" style="width: 8px"></div>
              </div>
            </div>
            <div
              v-if="!dataCI[n * 2 - 1] || !dataCI[n * 2 - 1].score"
              class="row q-pt-xs"
              style="padding-bottom: 14px"
            >
              <div class="q-px-sm">No data available</div>
              <div class="bgDarkBlue" style="width: 8px"></div>
            </div>
            <div
              v-else
              class="row justify-end q-pt-xs"
              style="padding-bottom: 14px"
            >
              <div
                v-if="dataCI[n * 2 - 1].score > 0.15"
                class="bgDarkBlue q-pr-sm text-right"
                :style="{ width: dataCI[n * 2 - 1].score * 200 + 'px' }"
              >
                {{ dataCI[n * 2 - 1].score.toFixed(2) }}
              </div>
              <div v-else class="row justify-end">
                <div class="q-px-sm">
                  {{ dataCI[n * 2 - 1].score.toFixed(2) }}
                </div>
                <div class="bgDarkBlue" style="width: 8px"></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <img src="../../../public/images/dimicon.svg" alt="" />
        </div>

        <div>
          <div v-for="n in 7" :key="n" style="width: 200px">
            <div
              v-if="!dataSI[n * 2 - 2] || !dataSI[n * 2 - 2].score"
              class="row q-pt-sm"
            >
              <div class="q-px-sm">No data available</div>
              <div class="bgOrange" style="width: 8px"></div>
            </div>
            <div v-else class="row q-pt-sm">
              <div
                v-if="dataSI[n * 2 - 2].score > 0.15"
                class="bgOrange q-pr-sm text-right"
                :style="{ width: dataSI[n * 2 - 2].score * 200 + 'px' }"
              >
                {{ dataSI[n * 2 - 2].score.toFixed(2) }}
              </div>
              <div v-else class="row">
                <div class="bgOrange" style="width: 8px"></div>
                <div class="q-px-sm">
                  {{ dataSI[n * 2 - 2].score.toFixed(2) }}
                </div>
              </div>
            </div>
            <div
              v-if="!dataSI[n * 2 - 1] || !dataSI[n * 2 - 1].score"
              class="row q-pt-xs"
              style="padding-bottom: 14px"
            >
              <div class="q-px-sm">No data available</div>
              <div class="bgDarkOrange" style="width: 8px"></div>
            </div>
            <div v-else class="row q-pt-xs" style="padding-bottom: 14px">
              <div
                v-if="dataSI[n * 2 - 1].score > 0.15"
                class="bgDarkOrange q-pr-sm text-right"
                :style="{ width: dataSI[n * 2 - 1].score * 200 + 'px' }"
              >
                {{ dataSI[n * 2 - 1].score.toFixed(2) }}
              </div>
              <div v-else class="row">
                <div class="bgDarkOrange" style="width: 8px"></div>
                <div class="q-px-sm">
                  {{ dataSI[n * 2 - 1].score.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row" style="width: 600px; margin: auto; font-size: 14px">
        <div class="col row">
          <div class="row">
            <div class="box1"></div>
            <div class="q-pl-md">{{ year1 }} Conventional Integration</div>
          </div>
          <div class="row">
            <div class="box2"></div>
            <div class="q-pl-md">{{ year2 }} Conventional Integration</div>
          </div>
        </div>
        <div style="widows: 50px"></div>
        <div class="col row">
          <div class="row">
            <div class="box3"></div>
            <div class="q-pl-md">{{ year1 }} Sustainable Integration</div>
          </div>
          <div class="row">
            <div class="box4"></div>
            <div class="q-pl-md">{{ year2 }} Sustainable Integration</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  dataSI: {
    type: Array,
    required: false,
  },
  dataCI: {
    type: Array,
    required: false,
  },
  ecoName: {
    type: String,
    required: false,
  },
});
const year1 = ref("2010-2015");
const year2 = ref("2016-2021");
</script>

<style lang="scss" scoped>
.bgBlue {
  background-color: #1f81b8;
  height: 30px;
  color: white;
  line-height: 30px;
}
.bgDarkBlue {
  background-color: #113f5a;
  height: 30px;
  color: white;
  line-height: 30px;
}
.bgOrange {
  background-color: #f5b283;
  height: 30px;
  color: white;
  line-height: 30px;
}
.bgDarkOrange {
  background-color: #c55a0f;
  height: 30px;
  color: white;
  line-height: 30px;
}
.box1 {
  width: 20px;
  height: 20px;
  background-color: #1f81b8;
}
.box2 {
  width: 20px;
  height: 20px;
  background-color: #113f5a;
}
.box3 {
  width: 20px;
  height: 20px;
  background-color: #f5b283;
}
.box4 {
  width: 20px;
  height: 20px;
  background-color: #c55a0f;
}
</style>
