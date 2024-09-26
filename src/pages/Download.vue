<template>
  <div style="background-color: #7a7a7a">
    <div class="mainApp">
      <div>
        <VAHeader :shareContent="shareContent" :tinaLink="tinaLinkURL" />
      </div>
      <div class="menuMain row">
        <div style="width: 450px">
          <div style="font-size: 24px; padding-top: 14px" class="q-px-xl">
            <div class="q-pt-md cursor-pointer" @click="goToStep1">
              GVC relationships
            </div>
            <div class="q-pt-md cursor-pointer" @click="goToStep2">
              Structure of value added
            </div>
            <div class="q-pt-md cursor-pointer" @click="goToStep3">
              Participation in GVCs
            </div>
            <div class="q-pt-md cursor-pointer" @click="goToStep4">
              Backward linkages
            </div>
            <div class="q-pt-md cursor-pointer" @click="goToStep5">
              Forward linkages
            </div>
          </div>
        </div>
        <div style="width: 5px">
          <div class="vl"></div>
        </div>
        <div class="col">
          <div class="text-center text-h6 q-py-sm">Download data</div>
          <div class="q-px-xl">
            <q-select
              v-model="indicator"
              :options="indicatorList"
              label="Indicator (select one)"
              emit-value
              map-options
              filled
              dark
              @update:model-value="changeIndicator()"
            />
          </div>
          <div class="q-px-xl q-pt-sm" v-show="showInput[0] == 1">
            <q-select
              multiple
              emit-value
              map-options
              label="Exporting economy"
              use-chips
              v-model="exp_country"
              :options="countryList"
              filled
              dark
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
          <div class="q-px-xl q-pt-sm" v-show="showInput[1] == 1">
            <q-select
              multiple
              emit-value
              map-options
              label="Importing economy"
              use-chips
              v-model="imp_country"
              :options="countryList"
              filled
              dark
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
          <div class="q-px-xl q-pt-sm" v-show="showInput[2] == 1">
            <q-select
              multiple
              emit-value
              map-options
              label="Source economy"
              use-chips
              v-model="source_country"
              :options="countryList"
              filled
              dark
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
          <div class="q-px-xl q-pt-sm" v-show="showInput[3] == 1">
            <q-select
              v-model="sector_input"
              use-chips
              :options="sectorList"
              label="Exporting sector"
              multiple
              filled
              dark
            />
          </div>
          <div class="q-px-xl q-pt-sm" v-show="showInput[4] == 1">
            <q-select
              v-model="year_input"
              use-chips
              :options="yearList"
              label="Year"
              multiple
              filled
              dark
            />
          </div>
          <div class="row justify-center q-py-md">
            <div>
              <q-btn
                class="btnclear"
                label="Clear all"
                no-caps
                outline
                @click="clearAll"
              />
            </div>
            <div style="width: 10px"></div>
            <div>
              <q-btn
                class="btngen"
                label="Download"
                no-caps
                @click="runBtn()"
              />
            </div>
          </div>
        </div>
      </div>
      <footerMain />
    </div>
  </div>
</template>

<script setup>
import VAHeader from "../components/VA_header.vue";
import footerMain from "../components/footerA.vue";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { serverSetup } from "./server.js";
import { Notify } from "quasar";
import axios from "axios";

const { serverData } = serverSetup();
const router = useRouter();
const tinaLinkURL = ref("");
const shareContent = ref("");
const indicator = ref("in_01");
const exp_country = ref([]);
const imp_country = ref([]);
const source_country = ref([]);
const year_input = ref([]);
const sector_input = ref([]);
const indicatorList = ref([
  {
    value: "in_01",
    label: "Structure of value added",
  },
  {
    value: "in_02",
    label: "Value-added trade balance",
  },
  {
    value: "in_03",
    label: "Gross trade balance",
  },
  {
    value: "in_04",
    label: "GVC participation",
  },
  {
    value: "in_05",
    label: "Backward linkages (by exporting sector)",
  },
  {
    value: "in_06",
    label: "Backward linkages (by source economy)",
  },
  {
    value: "in_07",
    label: "Forward linkages (by exporting sector)",
  },
  {
    value: "in_08",
    label: "Forward linakages (by importing economy)",
  },
  {
    value: "in_09",
    label: "Gross exports",
  },
]);
const yearList = ref([]);
const countryList = ref([]);
const sectorList = ref([]);

const inputQuery = ref({});

const showInput = ref([1, 1, 0, 1, 1]);
const resultCSV = ref([]);

const goToStep1 = () => {
  router.push("/gvcrelationships");
};
const goToStep2 = () => {
  router.push("/structureofvalueadded");
};
const goToStep3 = () => {
  router.push("/participationingvcs");
};
const goToStep4 = () => {
  router.push("/backwardlinkages");
};
const goToStep5 = () => {
  router.push("/forwardlinkages");
};

const loadCountry = async () => {
  countryList.value = [];
  let url = serverData.value + "va/getEco.php";
  let res = await axios.get(url);
  res.data.forEach((x) => {
    let tempInput = {
      label: x.name,
      value: x.iso,
      disable: x.disable,
    };
    countryList.value.push(tempInput);
  });
};
const loadYear = async () => {
  yearList.value = [];
  let url = serverData.value + "va/getYear.php";
  let res = await axios.get(url);
  res.data.forEach((x) => {
    yearList.value.push(Number(x.year));
  });
  yearList.value.sort();
};
const loadSector = async () => {
  sectorList.value = [];
  let url = serverData.value + "va/getSector.php";
  let res = await axios.get(url);
  res.data.forEach((x) => {
    sectorList.value.push(x.name);
  });
};
const changeIndicator = () => {
  if (indicator.value == "in_06") {
    showInput.value = [1, 1, 1, 0, 1];
  } else if (indicator.value == "in_07") {
    showInput.value = [1, 0, 0, 1, 1];
  } else if (indicator.value == "in_08") {
    showInput.value = [1, 1, 0, 0, 1];
  } else {
    showInput.value = [1, 1, 0, 1, 1];
  }
};

const clearAll = () => {
  exp_country.value = [];
  imp_country.value = [];
  source_country.value = [];
  year_input.value = [];
  sector_input.value = [];
};

const arraysEqual = (arr1, arr2) => {
  // ถ้า array มีขนาดไม่เท่ากันให้ return false ทันที
  if (arr1.length !== arr2.length) {
    return false;
  }

  // เรียงลำดับทั้งสอง array แล้วเปรียบเทียบสมาชิก
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  // เปรียบเทียบ array ที่ถูกเรียงแล้ว
  return sortedArr1.every((value, index) => value === sortedArr2[index]);
};

const convertToCSV = (objArray) => {
  const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  // สร้างหัวข้อคอลัมน์
  const headers = Object.keys(array[0]);
  str += headers.join(",") + "\r\n";

  // เพิ่มข้อมูลแต่ละแถว
  array.forEach((item) => {
    const line = headers
      .map((header) => {
        let field = item[header];
        // ถ้าฟิลด์มีเครื่องหมายจุลภาค, ขึ้นบรรทัดใหม่ หรือเครื่องหมายคำพูดคู่ ให้ใส่เครื่องหมายคำพูดคู่ครอบ
        if (typeof field === "string" && /[",\n]/.test(field)) {
          field = '"' + field.replace(/"/g, '""') + '"';
        }
        return field;
      })
      .join(",");
    str += line + "\r\n";
  });
  return str;
};
const runBtn = async () => {
  if (indicator.value == "in_06") {
    if (
      exp_country.value.length == 0 ||
      imp_country.value.length == 0 ||
      source_country.value.length == 0 ||
      year_input.value.length == 0
    ) {
      Notify.create({
        message: "Please fill in all the required fields completely.",
        color: "negative",
        icon: "fa-solid fa-circle-exclamation",
        position: "top",
      });
      return;
    }

    if (arraysEqual(exp_country.value, imp_country.value)) {
      Notify.create({
        message:
          "The exporting economy cannot be the same as the importing economy.",
        color: "negative",
        icon: "fa-solid fa-circle-exclamation",
        position: "top",
      });
      return;
    }
    inputQuery.value = {
      exp_country: exp_country.value,
      imp_country: imp_country.value,
      source_country: source_country.value,
      year: year_input.value,
    };
  } else if (indicator.value == "in_07") {
    if (
      exp_country.value.length == 0 ||
      sector_input.value.length == 0 ||
      year_input.value.length == 0
    ) {
      Notify.create({
        message: "Please fill in all the required fields completely.",
        color: "negative",
        icon: "fa-solid fa-circle-exclamation",
        position: "top",
      });
      return;
    }

    inputQuery.value = {
      exp_country: exp_country.value,
      exp_sector: sector_input.value,
      year: year_input.value,
    };
  } else if (indicator.value == "in_08") {
    if (
      exp_country.value.length == 0 ||
      imp_country.value.length == 0 ||
      year_input.value.length == 0
    ) {
      Notify.create({
        message: "Please fill in all the required fields completely.",
        color: "negative",
        icon: "fa-solid fa-circle-exclamation",
        position: "top",
      });
      return;
    }

    inputQuery.value = {
      exp_country: exp_country.value,
      imp_country: imp_country.value,
      year: year_input.value,
    };
  } else {
    if (
      exp_country.value.length == 0 ||
      imp_country.value.length == 0 ||
      sector_input.value.length == 0 ||
      year_input.value.length == 0
    ) {
      Notify.create({
        message: "Please fill in all the required fields completely.",
        color: "negative",
        icon: "fa-solid fa-circle-exclamation",
        position: "top",
      });
      return;
    }

    if (arraysEqual(exp_country.value, imp_country.value)) {
      Notify.create({
        message:
          "The exporting economy cannot be the same as the importing economy.",
        color: "negative",
        icon: "fa-solid fa-circle-exclamation",
        position: "top",
      });
      return;
    }
    inputQuery.value = {
      exp_country: exp_country.value,
      imp_country: imp_country.value,
      exp_sector: sector_input.value,
      year: year_input.value,
    };
  }

  //Stucture of value added
  if (indicator.value == "in_01") {
    resultCSV.value = [];
    let url = serverData.value + "/va/strloaddata1.php";
    let res = await axios.post(url, JSON.stringify(inputQuery.value));
    let result = res.data;
    exp_country.value.forEach((expC) => {
      imp_country.value.forEach((impC) => {
        sector_input.value.forEach((sectorC) => {
          year_input.value.forEach((yearC) => {
            let resultFilter = result.filter(
              (x) =>
                x.exp_country == expC &&
                x.imp_country == impC &&
                x.exp_sector == sectorC &&
                x.year == yearC
            );
            if (resultFilter.length > 0) {
              //Domestic production consumed by the importer
              let a1 = resultFilter.filter(
                (item) =>
                  item.var === "Intermediate_directly_consumed" ||
                  item.var === "Final_directly_consumed"
              );
              let a1Value = 0;
              if (a1.length > 0) {
                a1Value = a1.reduce(
                  (sum, item) => sum + parseFloat(item.value),
                  0
                );

                let a1Input = {
                  exporting_economy: expC,
                  importing_economy: impC,
                  exporting_sector: sectorC,
                  value: Number(a1Value.toFixed(2)),
                  indicator_name:
                    "Domestic production consumed by the importer",
                  unit: "$ US millions",
                };
                resultCSV.value.push(a1Input);
              }
              //Domestic production used in the importer's exports
              let a2 = resultFilter.filter(
                (item) => item.var === "Forward_linkages"
              );
              let a2Value = 0;
              if (a2.length > 0) {
                a2Value = Number(a2.map((z) => z.value)).toFixed(2);
                let a2Input = {
                  exporting_economy: expC,
                  importing_economy: impC,
                  exporting_sector: sectorC,
                  value: Number(a2Value),
                  indicator_name:
                    "Domestic production used in the importer's exports",
                  unit: "$ US millions",
                };
                resultCSV.value.push(a2Input);
              }
              //Domestic production that returns via the importer's exports
              let a3 = resultFilter.filter(
                (item) => item.var === "Forward_linkages2"
              );
              let a3Value = 0;
              if (a3.length > 0) {
                a3Value = Number(a3.map((z) => z.value)).toFixed(2);
                let a3Input = {
                  exporting_economy: expC,
                  importing_economy: impC,
                  exporting_sector: sectorC,
                  value: Number(a3Value),
                  indicator_name:
                    "Domestic production that returns via the importer's exports",
                  unit: "$ US millions",
                };
                resultCSV.value.push(a3Input);
              }
              //Double counted
              let a4 = resultFilter.filter(
                (item) => item.var === "Double_counted_exports"
              );
              let a4Value = 0;
              if (a4.length > 0) {
                a4Value = Number(a4.map((z) => z.value)).toFixed(2);
                let a4Input = {
                  exporting_economy: expC,
                  importing_economy: impC,
                  exporting_sector: sectorC,
                  value: Number(a4Value),
                  indicator_name: "Double counted",
                  unit: "$ US millions",
                };
                resultCSV.value.push(a4Input);
              }
              //Foreign production consumed by importer
              let a5 = resultFilter.filter(
                (item) => item.var === "Backward_linkages"
              );
              let a5Value = 0;
              if (a5.length > 0) {
                a5Value = Number(a5.map((z) => z.value)).toFixed(2);
                let a5Input = {
                  exporting_economy: expC,
                  importing_economy: impC,
                  exporting_sector: sectorC,
                  value: Number(a5Value),
                  indicator_name: "Foreign production consumed by importer",
                  unit: "$ US millions",
                };
                resultCSV.value.push(a5Input);
              }
            }
          });
        });
      });
    });
  }

  //Valued-added trade balance
  if (indicator.value == "in_02") {
    resultCSV.value = [];
    let url = serverData.value + "/va/strloaddata2.php";
    let res = await axios.post(url, JSON.stringify(inputQuery.value));
    let result1 = res.data.filter((x2) => x2.variable == "gross_trade_balance");
    result1.forEach((x1) => {
      let a1Input = {
        exporting_economy: x1.exp_country,
        importing_economy: x1.imp_country,
        exporting_sector: x1.exp_sector,
        value: Number((Number(x1.value) * 100).toFixed(2)),
        year: x1.year,
        indicator_name: "Gross trade balance as % of gross exports",
        unit: "% of gross exports to partner",
      };
      resultCSV.value.push(a1Input);
    });
  }
  //Gross trade balance
  if (indicator.value == "in_03") {
    resultCSV.value = [];
    let url = serverData.value + "/va/strloaddata1.php";
    let res = await axios.post(url, JSON.stringify(inputQuery.value));
    let result = res.data.filter((x3) => x3.var == "Final_directly_consumed");
    if (result.length > 0) {
      exp_country.value.forEach(async (expC) => {
        sector_input.value.forEach(async (sectorC) => {
          year_input.value.forEach(async (yearC) => {
            let tempQ = {
              exp_country: expC,
              imp_country: "WLD",
              exp_sector: sectorC,
              year: yearC,
            };
            let res2 = await axios.post(url, JSON.stringify(tempQ));
            let totalExport = 0;
            if (res2.data.length > 0) {
              totalExport = res2.data[0].value;
            }
            let resultFilter3 = result.filter(
              (x5) =>
                x5.exp_country == expC &&
                x5.exp_sector == sectorC &&
                x5.year == yearC
            );
            resultFilter3.forEach((x7) => {
              let tempInput7 = {
                exporting_economy: x7.exp_country,
                importing_economy: x7.imp_country,
                exporting_sector: x7.exp_sector,
                value: Number(Number(x7.total_exports).toFixed(2)),
                year: x7.year,
                indicator_name: "Gross trade balance in $US",
                unit: "$US millions",
              };
              resultCSV.value.push(tempInput7);
              let tempInput8 = {
                exporting_economy: x7.exp_country,
                importing_economy: x7.imp_country,
                exporting_sector: x7.exp_sector,
                value: Number(
                  ((Number(x7.total_exports) / totalExport) * 100).toFixed(2)
                ),
                year: x7.year,
                indicator_name: "Gross trade balance as % of gross exports",
                unit: "% of gross exports to partner",
              };
              resultCSV.value.push(tempInput8);
            });
          });
        });
      });
    }
  }
  //GVC participation
  if (indicator.value == "in_04") {
    resultCSV.value = [];
    let url = serverData.value + "/va/strloaddata1.php";
    let res = await axios.post(url, JSON.stringify(inputQuery.value));
    if (res.data.length > 0) {
      let result = res.data.filter(
        (x8) =>
          x8.var == "Backward_linkages" ||
          x8.var == "Double_counted_exports" ||
          x8.var == "Forward_linkages"
      );
      if (result.length > 0) {
        result.forEach((x9) => {
          let v1 = Number(x9.value).toFixed(2);
          let v2 = "";
          if (x9.var == "Backward_linkages") {
            v2 =
              "Foreign production consumed by the importer (backward linkages)";
          } else if (x9.var == "Forward_linkages") {
            v2 =
              "Domestic production used in the importer's exports (forward linkages)";
          } else {
            v2 = "Double counted";
          }
          let tempInput = {
            exporting_economy: x9.exp_country,
            importing_economy: x9.imp_country,
            exporting_sector: x9.exp_sector,
            value: Number(v1),
            year: x9.year,
            indicator_sub_name: v2,
            indicator_main_name: "GVC praticipation in $US",
            unit: "$US millions",
          };
          resultCSV.value.push(tempInput);
          let v3 = Number((Number(x9.share) * 100).toFixed(2));
          let tempInput2 = {
            exporting_economy: x9.exp_country,
            importing_economy: x9.imp_country,
            exporting_sector: x9.exp_sector,
            value: v3,
            year: x9.year,
            indicator_sub_name: v2,
            indicator_main_name: "GVC praticipation as % of gross exports",
            unit: "% of gross exports to partner",
          };
          resultCSV.value.push(tempInput2);
        });
      }
    }
  }
  //Backward linkages (by exporting sector)
  if (indicator.value == "in_05") {
    resultCSV.value = [];
    let url = serverData.value + "va/backwardSector1.php";
    let res = await axios.post(url, JSON.stringify(inputQuery.value));
    res.data.forEach((x4) => {
      let tempInput = {
        source_economy: x4.source_country,
        exporting_economy: x4.exp_country,
        importing_economy: x4.imp_country,
        exporting_sector: x4.exp_sector,
        value: Number(Number(x4.value).toFixed(2)),
        year: x4.year,
        indicator_name: "Backward linkages (by exporting sector)",
        unit: "$ US millions",
      };
      resultCSV.value.push(tempInput);
    });
  }
  //Backward linkages (by source economy)
  if (indicator.value == "in_06") {
    resultCSV.value = [];
    let url = serverData.value + "/va/backwardSource1.php";
    let res = await axios.post(url, JSON.stringify(inputQuery.value));
    if (res.data.length > 0) {
      let result = res.data;
      result.forEach((x6) => {
        let tempInput = {
          source_economy: x6.source_country,
          exporting_economy: x6.exp_country,
          importing_economy: x6.imp_country,
          exporting_sector: x6.exp_sector,
          value: Number(Number(x6.value).toFixed(2)),
          year: x6.year,
          indicator_name: "Backward linkages (by source economy)",
          unit: "$ US millions",
        };
        resultCSV.value.push(tempInput);
      });
    }
  }

  //Forward linkages (by exporting sector)
  if (indicator.value == "in_07") {
    resultCSV.value = [];
    let url = serverData.value + "/va/forwardSector1.php";
    let res = await axios.post(url, JSON.stringify(inputQuery.value));
    if (res.data.length > 0) {
      let result = res.data;
      result.forEach((x6) => {
        let tempInput = {
          exporting_economy: x6.exp_country,
          importing_economy: x6.imp_country,
          exporting_sector: x6.exp_sector,
          value: Number(Number(x6.value).toFixed(2)),
          year: x6.year,
          indicator_name: "Forward linkages (by exporting sector)",
          unit: "$ US millions",
        };
        resultCSV.value.push(tempInput);
      });
    }
  }

  //Forward linkages (by exporting economy)
  if (indicator.value == "in_08") {
    resultCSV.value = [];
    let url = serverData.value + "/va/forwardImport1.php";
    let res = await axios.post(url, JSON.stringify(inputQuery.value));
    if (res.data.length > 0) {
      let result = res.data;
      result.forEach((x6) => {
        let tempInput = {
          exporting_economy: x6.exp_country,
          importing_economy: x6.imp_country,
          exporting_sector: x6.exp_sector,
          value: Number(Number(x6.value).toFixed(2)),
          year: x6.year,
          indicator_name: "Forward linkages (by importing economy)",
          unit: "$ US millions",
        };
        resultCSV.value.push(tempInput);
      });
    }
  }

  //Gross exports
  if (indicator.value == "in_09") {
    let url = serverData.value + "/va/strloaddata1.php";
    let res = await axios.post(url, JSON.stringify(inputQuery.value));
    if (res.data.length > 0) {
      let result = res.data;
      result = result.filter(
        (x9) => x9.var == "Intermediate_directly_consumed"
      );
      result.forEach((x6) => {
        let tempInput = {
          exporting_economy: x6.exp_country,
          importing_economy: x6.imp_country,
          exporting_sector: x6.exp_sector,
          value: Number(Number(x6.total_exports).toFixed(2)),
          year: x6.year,
          indicator_name: "Gross exports",
          unit: "$ US millions",
        };
        resultCSV.value.push(tempInput);
      });
    }
  }

  if (resultCSV.value.length > 0) {
    const csv = convertToCSV(resultCSV.value);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    Notify.create({
      message: "No data available.",
      color: "negative",
      icon: "fa-solid fa-circle-exclamation",
      position: "top",
    });
  }
};
onMounted(() => {
  loadCountry();
  loadYear();
  loadSector();
});
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

  color: white;
}
.vl {
  width: 1px;
  height: calc(100% - 40px);
  border-left: 2px solid white;
  margin-top: 20px;
  margin-bottom: 20px;
}
.btnclear {
  color: white;
  width: 120px;
}
.btngen {
  background-color: #e2cd11;
  width: 120px;
  color: black;
}
</style>
