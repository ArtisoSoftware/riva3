<template>
  <div style="background-color: #7a7a7a">
    <div class="mainApp">
      <div><RIHeader :menu="5" /></div>
      <div class="text-h4 text-center q-pt-md">Data availability</div>
      <!-- input -->
      <div class="row justify-center q-pt-md">
        <q-card style="width: 100%; max-width: 1200px">
          <q-tabs
            v-model="tabMode"
            align="justify"
            narrow-indicator
            no-caps
            class="text-grey"
            active-color="secondary"
            indicator-color="secondary"
          >
            <q-tab name="economyGroup" label="Economy group" />
            <q-tab name="spec" label="Specific reporter(s) and partner(s)" />
            <q-space style="width: 300px" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tabMode" animated>
            <!-- tab 1   -->
            <q-tab-panel name="economyGroup">
              <div class="q-pa-md">
                <div class="row" style="font-size: 18px; font-weight: 500">
                  <div class="col-4">
                    <div>Integration type</div>
                    <div style="font-size: 16px; font-weight: 400">
                      Select the desired type of integration
                    </div>
                  </div>
                  <div class="col-4">
                    <q-radio
                      label="Sustainable integration"
                      val="sustainable"
                      v-model="ecoGroupInput.type"
                      color="secondary"
                      @update:model-value="loadCountry()"
                    />
                  </div>
                  <div class="col-4">
                    <q-radio
                      label="Conventional integration"
                      val="conventional"
                      v-model="ecoGroupInput.type"
                      color="secondary"
                      @update:model-value="loadCountry()"
                    />
                  </div>
                </div>

                <div
                  class="row q-pt-lg"
                  style="font-size: 18px; font-weight: 500"
                >
                  <div class="col-4">
                    <div>Database</div>
                    <div style="font-size: 16px; font-weight: 400">
                      Select database of interest
                    </div>
                  </div>
                  <div class="col-4">
                    <q-radio
                      label="DigiSRII"
                      val="DigiSRII"
                      v-model="ecoGroupInput.database"
                      color="secondary"
                      @update:model-value="loadCountry()"
                    />
                    <div
                      style="
                        font-size: 12px;
                        font-weight: 400;
                        padding-left: 40px;
                      "
                    >
                      Data restrictions for robustness apply
                    </div>
                  </div>
                  <div class="col-4">
                    <q-radio
                      label="All Data"
                      val="alldata"
                      v-model="ecoGroupInput.database"
                      color="secondary"
                      @update:model-value="loadCountry()"
                    />
                    <div
                      style="
                        font-size: 12px;
                        font-weight: 400;
                        padding-left: 40px;
                      "
                    >
                      No data restictions
                    </div>
                  </div>
                </div>

                <div
                  class="row q-pt-lg"
                  style="font-size: 18px; font-weight: 500"
                >
                  <div class="col-4">
                    <div>Level of disaggregation</div>
                    <div style="font-size: 16px; font-weight: 400">
                      Include all previous disaggregation levels
                    </div>
                  </div>
                  <div class="col">
                    <q-radio
                      label="Pair"
                      val="pair"
                      v-model="ecoGroupInput.level"
                      color="secondary"
                      @update:model-value="clearResult()"
                    />
                  </div>
                  <div class="col">
                    <q-radio
                      label="Dimension"
                      val="dimension"
                      v-model="ecoGroupInput.level"
                      color="secondary"
                      @update:model-value="clearResult()"
                    />
                  </div>
                  <div class="col">
                    <q-radio
                      label="Indicator"
                      val="indicator"
                      v-model="ecoGroupInput.level"
                      color="secondary"
                      @update:model-value="clearResult()"
                    />
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 500" class="q-pt-lg">
                  Economy group
                </div>
                <div style="font-size: 16px; font-weight: 400">
                  Select two or more economies of interest or a pre-selected
                  group
                </div>
                <div class="q-pt-md">
                  <q-select
                    v-model="selectedValue"
                    :options="formattedOptions"
                    map-options
                    emit-value
                    option-label="label"
                    option-value="value"
                    style="width: 1140px"
                    multiple
                    use-chips
                    stack-label
                    filled
                    @update:model-value="selectCountryGroup"
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section
                          avatar
                          v-if="
                            !scope.opt.disable &&
                            /^[A-Z]{3}$/.test(scope.opt.value)
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
                  </q-select>
                </div>
                <div class="selectedBox q-mt-md q-pa-md">
                  <div class="text-h6">Selected economy group</div>
                  <div class="row">
                    <div v-for="(item, index) in countryListName" :key="index">
                      <q-chip color="grey-4" :label="item" />
                    </div>
                  </div>
                </div>
                <div class="row justify-center q-pt-md">
                  <div>
                    <q-btn
                      label="Clear all"
                      outline
                      no-caps
                      class="btnClear"
                      @click="clearEcoGroup"
                    />
                  </div>
                  <div style="width: 30px"></div>
                  <div>
                    <q-btn
                      label="Start"
                      no-caps
                      color="secondary"
                      class="btnStart"
                      @click="btnStartEcoGroup"
                    />
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <!-- tab2 -->
            <q-tab-panel name="spec">
              <div class="q-pa-md">
                <div class="row" style="font-size: 18px; font-weight: 500">
                  <div class="col-4">
                    <div>Integration type</div>
                    <div style="font-size: 16px; font-weight: 400">
                      Select the desired type of integration
                    </div>
                  </div>
                  <div class="col-4">
                    <q-radio
                      label="Sustainable integration"
                      val="sustainable"
                      v-model="ecoSpecInput.type"
                      color="secondary"
                      @update:model-value="loadCountry()"
                    />
                  </div>
                  <div class="col-4">
                    <q-radio
                      label="Conventional integration"
                      val="conventional"
                      v-model="ecoSpecInput.type"
                      color="secondary"
                      @update:model-value="loadCountry()"
                    />
                  </div>
                </div>

                <div
                  class="row q-pt-lg"
                  style="font-size: 18px; font-weight: 500"
                >
                  <div class="col-4">
                    <div>Database</div>
                    <div style="font-size: 16px; font-weight: 400">
                      Select database of interest
                    </div>
                  </div>
                  <div class="col-4">
                    <q-radio
                      label="DigiSRII"
                      val="DigiSRII"
                      v-model="ecoSpecInput.database"
                      color="secondary"
                      @update:model-value="loadCountry()"
                    />
                  </div>
                  <div class="col-4">
                    <q-radio
                      label="All Data"
                      val="alldata"
                      v-model="ecoSpecInput.database"
                      color="secondary"
                      @update:model-value="loadCountry()"
                    />
                  </div>
                </div>

                <div
                  class="row q-pt-lg"
                  style="font-size: 18px; font-weight: 500"
                >
                  <div class="col-4">
                    <div>Level of disaggregation</div>
                    <div style="font-size: 16px; font-weight: 400">
                      Include all previous disaggregation levels
                    </div>
                  </div>
                  <div class="col">
                    <q-radio
                      label="Pair"
                      val="pair"
                      v-model="ecoSpecInput.level"
                      color="secondary"
                      @update:model-value="clearResult()"
                    />
                  </div>
                  <div class="col">
                    <q-radio
                      label="Dimension"
                      val="dimension"
                      v-model="ecoSpecInput.level"
                      color="secondary"
                      @update:model-value="clearResult()"
                    />
                  </div>
                  <div class="col">
                    <q-radio
                      label="Indicator"
                      val="indicator"
                      v-model="ecoSpecInput.level"
                      color="secondary"
                      @update:model-value="clearResult()"
                    />
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 500" class="q-pt-lg">
                  Reporting economy
                </div>
                <div style="font-size: 16px; font-weight: 400">
                  Select one, many or pre-selected group of patner economies of
                  interest.
                </div>
                <div class="q-pt-md">
                  <q-select
                    v-model="selectedValueReport"
                    :options="formattedOptionsReport"
                    map-options
                    emit-value
                    option-label="label"
                    option-value="value"
                    style="width: 1140px"
                    multiple
                    use-chips
                    stack-label
                    filled
                    @update:model-value="selectCountryReport"
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section
                          avatar
                          v-if="
                            !scope.opt.disable &&
                            /^[A-Z]{3}$/.test(scope.opt.value)
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
                  </q-select>
                </div>
                <div style="font-size: 18px; font-weight: 500" class="q-pt-lg">
                  Partner economy
                </div>
                <div style="font-size: 16px; font-weight: 400">
                  Select one, many or pre-selected group of patner economies of
                  interest.
                </div>
                <div class="q-pt-md">
                  <q-select
                    v-model="selectedValuePartner"
                    :options="formattedOptionsPartner"
                    map-options
                    emit-value
                    option-label="label"
                    option-value="value"
                    style="width: 1140px"
                    multiple
                    use-chips
                    stack-label
                    filled
                    @update:model-value="selectCountryPartner"
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section
                          avatar
                          v-if="
                            !scope.opt.disable &&
                            /^[A-Z]{3}$/.test(scope.opt.value)
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
                  </q-select>
                </div>
                <div class="selectedBox2 q-mt-md q-pa-md">
                  <div class="text-h6">Selected reporting economy</div>
                  <div class="row">
                    <div
                      v-for="(item, index) in countryListNameReport"
                      :key="index"
                    >
                      <q-chip color="grey-4" :label="item" />
                    </div>
                  </div>
                </div>
                <div class="selectedBox2 q-mt-md q-pa-md">
                  <div class="text-h6">Selected partner economy</div>
                  <div class="row">
                    <div
                      v-for="(item, index) in countryListNamePartner"
                      :key="index"
                    >
                      <q-chip color="grey-4" :label="item" />
                    </div>
                  </div>
                </div>
                <div class="row justify-center q-pt-md">
                  <div>
                    <q-btn
                      label="Clear all"
                      outline
                      no-caps
                      class="btnClear"
                      @click="clearEcoSpec"
                    />
                  </div>
                  <div style="width: 30px"></div>
                  <div>
                    <q-btn
                      label="Start"
                      no-caps
                      color="secondary"
                      class="btnStart"
                      @click="btnStartSpec"
                    />
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <!-- output Group pair-->
      <div v-if="showResultPair">
        <div class="bgGreay q-my-md q-px-xl">
          <div class="row justify-between">
            <div class="q-py-lg q-px-md" style="font-size: 26px" align="left">
              Data availability
            </div>
            <div class="row" style="font-size: 20px">
              <div class="row items-center">
                <div class="boxLegend scoreMore90"></div>
                <div class="q-pl-sm q-pr-lg">More than 90%</div>
              </div>
              <div class="row items-center">
                <div class="boxLegend scoreMore75"></div>
                <div class="q-pl-sm q-pr-lg">76%-90%</div>
              </div>
              <div class="row items-center">
                <div class="boxLegend scoreMore49"></div>
                <div class="q-pl-sm q-pr-lg">50%-75%</div>
              </div>
              <div class="row items-center">
                <div class="boxLegend scoreLess"></div>
                <div class="q-pl-sm q-pr-lg">Less than50%</div>
              </div>
            </div>
          </div>

          <!-- Result Group Pair -->
          <div class="boxData q-pt-xl">
            <div class="showType">
              <div class="row no-wrap" align="center">
                <div class="diagBox" style="min-width: 140px; height: 90px">
                  <div class="fontTable q-px-md q-py-sm" align="right">
                    Partner
                  </div>
                  <div class="fontTable q-px-md q-py-sm" align="left">
                    Reporter
                  </div>
                </div>
                <div class="row no-wrap">
                  <div
                    class="headPartnerTable"
                    v-for="(item, j) in countryListFinalWithLabel"
                    :key="j"
                  >
                    {{ item.iso }}
                    <q-tooltip>{{ item.label }}</q-tooltip>
                  </div>
                </div>
              </div>
              <div
                v-for="(itemReport, index) in countryListFinalWithLabel"
                :key="index"
              >
                <div class="row no-wrap">
                  <div class="rowReport">
                    {{ itemReport.iso }}
                    <q-tooltip>{{ itemReport.label }}</q-tooltip>
                  </div>
                  <div
                    v-for="(item, index2) in tablePair[index]"
                    :key="index2"
                    style="min-width: 100px; font-size: 18px; line-height: 40px"
                    class="text-center"
                    :class="changeClass(item)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- output spec pair -->
      <div v-if="showResultPairSpec">
        <div class="bgGreay q-my-md q-px-xl">
          <div class="row justify-between">
            <div class="q-py-lg q-px-md" style="font-size: 26px" align="left">
              Data availability
            </div>
            <div class="row" style="font-size: 20px">
              <div class="row items-center">
                <div class="boxLegend scoreMore90"></div>
                <div class="q-pl-sm q-pr-lg">More than 90%</div>
              </div>
              <div class="row items-center">
                <div class="boxLegend scoreMore75"></div>
                <div class="q-pl-sm q-pr-lg">76%-90%</div>
              </div>
              <div class="row items-center">
                <div class="boxLegend scoreMore49"></div>
                <div class="q-pl-sm q-pr-lg">50%-75%</div>
              </div>
              <div class="row items-center">
                <div class="boxLegend scoreLess"></div>
                <div class="q-pl-sm q-pr-lg">Less than50%</div>
              </div>
            </div>
          </div>

          <!-- Result Spec Pair -->
          <div class="boxData q-pt-xl">
            <div class="showType">
              <div class="row no-wrap" align="center">
                <div class="diagBox" style="min-width: 140px; height: 90px">
                  <div class="fontTable q-px-md q-py-sm" align="right">
                    Partner
                  </div>
                  <div class="fontTable q-px-md q-py-sm" align="left">
                    Reporter
                  </div>
                </div>
                <div class="row no-wrap">
                  <div
                    class="headPartnerTable"
                    v-for="(item, j) in countryListFinalPartnerWithLabel"
                    :key="j"
                  >
                    {{ item.iso }}
                    <q-tooltip>{{ item.label }}</q-tooltip>
                  </div>
                </div>
              </div>
              <div
                v-for="(itemReport, index) in countryListFinalReportWithLabel"
                :key="index"
              >
                <div class="row no-wrap">
                  <div class="rowReport">
                    {{ itemReport.iso
                    }}<q-tooltip>{{ itemReport.label }}</q-tooltip>
                  </div>
                  <div
                    v-for="(item, index2) in tablePair[index]"
                    :key="index2"
                    style="min-width: 100px; font-size: 18px; line-height: 40px"
                    class="text-center"
                    :class="changeClass(item)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- output group dimension  -->
      <div v-if="showResultDimension">
        <div class="bgGreay q-my-md q-px-xl">
          <div class="row justify-between">
            <div class="q-py-lg q-px-md" style="font-size: 26px" align="left">
              Data availability
            </div>
            <div class="row" style="font-size: 20px">
              <div class="row items-center">
                <div class="boxLegend scoreMore90"></div>
                <div class="q-pl-sm q-pr-lg">More than 90%</div>
              </div>
              <div class="row items-center">
                <div class="boxLegend scoreMore75"></div>
                <div class="q-pl-sm q-pr-lg">76%-90%</div>
              </div>
              <div class="row items-center">
                <div class="boxLegend scoreMore49"></div>
                <div class="q-pl-sm q-pr-lg">50%-75%</div>
              </div>
              <div class="row items-center">
                <div class="boxLegend scoreLess"></div>
                <div class="q-pl-sm q-pr-lg">Less than50%</div>
              </div>
            </div>
          </div>

          <!-- Result Group dimension -->
          <div class="boxData q-pt-xl">
            <div class="showType">
              <div class="row no-wrap" align="center">
                <div class="diagBox" style="min-width: 140px; height: 90px">
                  <div class="fontTable q-px-md q-py-sm" align="right">
                    Partner
                  </div>
                  <div class="fontTable q-px-md q-py-sm" align="left">
                    Reporter
                  </div>
                </div>
                <div class="row no-wrap">
                  <div
                    class="headPartnerTable text-center"
                    v-for="(item, j) in countryListFinalPartnerWithLabel"
                    :key="j"
                  >
                    {{ item.iso }}
                    <q-tooltip>{{ item.label }}</q-tooltip>
                  </div>
                </div>
              </div>
              <div
                v-for="(dataRow, index) in tableDimension"
                :key="index"
                class="row no-wrap"
              >
                <div class="reportHead text-center">
                  {{ countryListFinalReportWithLabel[index].iso }}
                  <q-tooltip>
                    {{
                      countryListFinalReportWithLabel[index].label
                    }}</q-tooltip
                  >
                </div>
                <div>
                  <div
                    v-for="(dataItem, index2) in dataRow"
                    :key="index2"
                    class="row no-wrap"
                    style="height: 30px"
                  >
                    <div v-for="(item, index3) in dataItem" :key="index3">
                      <div v-if="index3 == 0" class="dimText">
                        {{ item }}
                        <q-tooltip>{{ dimContent[index2] }}</q-tooltip>
                      </div>
                      <div v-else class="dimText2" :class="changeClass(item)">
                        {{ item == "" ? "&nbsp;" : item }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Result indicator -->
        </div>
      </div>

      <!-- output indicator -->
      <div v-if="showResultIndicator">
        <div class="bgGreay q-my-md q-px-xl">
          <div class="row justify-between">
            <div class="q-py-lg q-px-md" style="font-size: 26px" align="left">
              Data availability
            </div>
            <div class="row" style="font-size: 20px">
              <div class="row items-center">
                <div class="boxLegend scoreMore90"></div>
                <div class="q-pl-sm q-pr-lg">More than 90%</div>
              </div>
              <div class="row items-center">
                <div class="boxLegend scoreMore75"></div>
                <div class="q-pl-sm q-pr-lg">76%-90%</div>
              </div>
              <div class="row items-center">
                <div class="boxLegend scoreMore49"></div>
                <div class="q-pl-sm q-pr-lg">50%-75%</div>
              </div>
              <div class="row items-center">
                <div class="boxLegend scoreLess"></div>
                <div class="q-pl-sm q-pr-lg">Less than50%</div>
              </div>
            </div>
          </div>
          <div class="boxData q-pt-xl">
            <div class="showType">
              <div class="row no-wrap" align="center">
                <div class="diagBox" style="min-width: 210px; height: 90px">
                  <div class="fontTable q-px-md q-py-sm" align="right">
                    Partner
                  </div>
                  <div class="fontTable q-px-md q-py-sm" align="left">
                    Reporter
                  </div>
                </div>
                <div class="row no-wrap">
                  <div
                    class="headPartnerTable text-center"
                    v-for="(item, j) in countryListFinalPartnerWithLabel"
                    :key="j"
                  >
                    {{ item.iso }}
                    <q-tooltip>{{ item.label }}</q-tooltip>
                  </div>
                </div>
              </div>
              <div
                class="row no-wrap"
                v-show="indicatorType == 'sustainable'"
                v-for="(itemReport, index2) in countryListFinalPartnerWithLabel"
                :key="index2"
              >
                <div class="indBox row items-center justify-center">
                  {{ itemReport.iso }}
                  <q-tooltip>{{ itemReport.label }}</q-tooltip>
                </div>
                <div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 1 <q-tooltip>{{ dimContent[0] }}</q-tooltip>
                    </div>
                    <div class="">
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData[0][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData[0][1] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 3<q-tooltip>{{ dimensionData[0][2] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 4<q-tooltip>{{ dimensionData[0][3] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 2 <q-tooltip>{{ dimContent[1] }}</q-tooltip>
                    </div>
                    <div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData[1][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData[1][1] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 3<q-tooltip>{{ dimensionData[1][2] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 3 <q-tooltip>{{ dimContent[2] }}</q-tooltip>
                    </div>
                    <div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData[2][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData[2][1] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 3<q-tooltip>{{ dimensionData[2][2] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 4 <q-tooltip>{{ dimContent[3] }}</q-tooltip>
                    </div>
                    <div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData[3][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData[3][1] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 3<q-tooltip>{{ dimensionData[3][2] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 5 <q-tooltip>{{ dimContent[4] }}</q-tooltip>
                    </div>
                    <div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData[4][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData[4][1] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 6 <q-tooltip>{{ dimContent[5] }}</q-tooltip>
                    </div>
                    <div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData[5][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData[5][1] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 3<q-tooltip>{{ dimensionData[5][2] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 4<q-tooltip>{{ dimensionData[5][3] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 7 <q-tooltip>{{ dimContent[6] }}</q-tooltip>
                    </div>
                    <div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData[6][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData[6][1] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 3<q-tooltip>{{ dimensionData[6][2] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 4<q-tooltip>{{ dimensionData[6][3] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    v-for="(resultRow, indexRow) in tableIndicator[index2]"
                    :key="indexRow"
                  >
                    <div class="row no-wrap">
                      <div
                        v-for="(item, indexItem) in resultRow"
                        :key="indexItem"
                        style="
                          min-width: 100px;
                          border: 1px solid white;
                          height: 35px;
                          line-height: 35px;
                        "
                        class="text-center"
                        :class="changeClassIndi(item)"
                      >
                        {{ item }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="row no-wrap"
                v-show="indicatorType == 'conventional'"
                v-for="(itemReport, index2) in countryListFinalPartnerWithLabel"
                :key="index2"
              >
                <div class="indBox row items-center justify-center">
                  {{ itemReport.iso }}
                  <q-tooltip>{{ itemReport.label }}</q-tooltip>
                </div>
                <div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 1 <q-tooltip>{{ dimContent[0] }}</q-tooltip>
                    </div>
                    <div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData2[0][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData2[0][1] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 3<q-tooltip>{{ dimensionData2[0][2] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 4<q-tooltip>{{ dimensionData2[0][3] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 5<q-tooltip>{{ dimensionData2[0][4] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 2 <q-tooltip>{{ dimContent[1] }}</q-tooltip>
                    </div>
                    <div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData2[1][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData2[1][1] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 3<q-tooltip>{{ dimensionData2[1][2] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 3 <q-tooltip>{{ dimContent[2] }}</q-tooltip>
                    </div>
                    <div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData2[2][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData2[2][1] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 3<q-tooltip>{{ dimensionData2[2][2] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 4<q-tooltip>{{ dimensionData2[2][3] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 4 <q-tooltip>{{ dimContent[3] }}</q-tooltip>
                    </div>
                    <div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData2[3][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData2[3][1] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 3<q-tooltip>{{ dimensionData2[3][2] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 4<q-tooltip>{{ dimensionData2[3][3] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 5 <q-tooltip>{{ dimContent[4] }}</q-tooltip>
                    </div>
                    <div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData2[4][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData2[4][1] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 3<q-tooltip>{{ dimensionData2[4][2] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 4<q-tooltip>{{ dimensionData2[4][3] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 6 <q-tooltip>{{ dimContent[5] }}</q-tooltip>
                    </div>
                    <div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData2[5][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData2[5][1] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 3<q-tooltip>{{ dimensionData2[5][2] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 4<q-tooltip>{{ dimensionData2[5][3] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="row no-wrap">
                    <div class="indBox row items-center justify-center">
                      Dim. 7 <q-tooltip>{{ dimContent[6] }}</q-tooltip>
                    </div>
                    <div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 1<q-tooltip>{{ dimensionData2[6][0] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 2<q-tooltip>{{ dimensionData2[6][1] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 3<q-tooltip>{{ dimensionData2[6][2] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 4<q-tooltip>{{ dimensionData2[6][3] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 5<q-tooltip>{{ dimensionData2[6][4] }}</q-tooltip>
                      </div>
                      <div
                        class="indBox"
                        style="height: 35px; line-height: 35px"
                      >
                        Ind. 6<q-tooltip>{{ dimensionData2[6][5] }}</q-tooltip>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    v-for="(resultRow, indexRow) in tableIndicator[index2]"
                    :key="indexRow"
                  >
                    <div class="row no-wrap">
                      <div
                        v-for="(item, indexItem) in resultRow"
                        :key="indexItem"
                        style="
                          min-width: 100px;
                          border: 1px solid white;
                          height: 35px;
                          line-height: 35px;
                        "
                        class="text-center"
                        :class="changeClassIndi(item)"
                      >
                        {{ item }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- end result -->
    </div>
  </div>
</template>

<script setup>
import RIHeader from "../components/RI_header.vue";
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { serverSetup } from "./server";
import { countryGroupListRiva2 } from "./countryGroupList.js";
import { useQuasar } from "quasar";
const $q = useQuasar();

const { serverData } = serverSetup();
const tabMode = ref("economyGroup");
const ecoGroupInput = ref({
  type: "sustainable",
  database: "DigiSRII",
  level: "pair",
});
const ecoSpecInput = ref({
  type: "sustainable",
  database: "DigiSRII",
  level: "pair",
});
const dimContent = ref([
  "Trade and investment",
  "Financcial",
  "Value chains",
  "Infrastructure",
  "Movement of people",
  "Regulatory cooperation",
  "Digital economy",
]);
const databaseConnect = ref("");
const databaseReporter = ref("");
const databasePartner = ref("");
const formattedOptions = ref([]);
const selectedValue = ref(null);
const showResultPair = ref(false);
const showResultPairSpec = ref(false);
const showResultDimension = ref(false);

const showResultIndicator = ref(false);

const formattedOptionsReport = ref([]);
const selectedValueReport = ref(null);

const formattedOptionsPartner = ref([]);
const selectedValuePartner = ref(null);

// Load country List section
const loadCountry = async () => {
  if (tabMode.value == "economyGroup") {
    selectedValue.value = null;
    if (ecoGroupInput.database == "DIgiSRII") {
      if (ecoGroupInput.type == "sustainable") {
        databaseConnect.value = "ri_data_digi_sus";
      } else {
        databaseConnect.value = "ri_data_digi_con";
      }
    } else {
      if (ecoGroupInput.type == "sustainable") {
        databaseConnect.value = "ri_data_all_sus";
      } else {
        databaseConnect.value = "ri_data_all_con";
      }
    }
    //load database
    const dataInput = {
      table: databaseConnect.value,
    };
    clearEcoGroup();
    const url = serverData.value + "ri/getEcoDataGroup.php";
    const res = await axios.post(url, JSON.stringify(dataInput));
    formattedOptions.value = res.data.map((option) => ({
      id: option.id,
      label: option.name,
      value: option.iso,
      disable: option.disable,
    }));
  } else {
    if (ecoGroupInput.database == "DIgiSRII") {
      if (ecoGroupInput.type == "sustainable") {
        databaseReporter.value = "ri_data_spec_digi_report_sus";
        databasePartner.value = "ri_data_spec_digi_partner_sus";
      } else {
        databaseReporter.value = "ri_data_spec_digi_report_con";
        databasePartner.value = "ri_data_spec_digi_partner_con";
      }
    } else {
      if (ecoGroupInput.type == "sustainable") {
        databaseReporter.value = "ri_data_spec_all_report_sus";
        databasePartner.value = "ri_data_spec_all_partner_sus";
      } else {
        databaseReporter.value = "ri_data_spec_all_report_con";
        databasePartner.value = "ri_data_spec_all_partner_con";
      }
    }
    clearEcoSpec();
    const url = serverData.value + "ri/getEcoDataGroup.php";
    const dataInputReport = {
      table: databaseReporter.value,
    };
    const resReport = await axios.post(url, JSON.stringify(dataInputReport));
    formattedOptionsReport.value = resReport.data.map((option) => ({
      id: option.id,
      label: option.name,
      value: option.iso,
      disable: option.disable,
    }));
    const dataInputPartner = {
      table: databasePartner.value,
    };
    const resPartner = await axios.post(url, JSON.stringify(dataInputPartner));
    formattedOptionsPartner.value = resPartner.data.map((option) => ({
      id: option.id,
      label: option.name,
      value: option.iso,
      disable: option.disable,
    }));
  }
};

const getFlagUrl = (iso) => {
  return `images/flags/${iso}.png`;
};

//Select country in economy group
const countryList = ref([]);
const countryListFinal = ref([]);

const countryListName = ref([]);
const selectCountryGroup = () => {
  clearResult();
  countryList.value = [];
  selectedValue.value.forEach((x) => {
    countryList.value = [
      ...new Set([...countryGroupListRiva2(x), ...countryList.value]),
    ];
  });

  // กรองรายการ countryList เพื่อเอาเฉพาะค่าที่มีใน formattedOptions
  countryList.value = countryList.value.filter((code) =>
    formattedOptions.value.some((option) => option.value === code)
  );

  countryListName.value = countryList.value.map((code) => {
    const country = formattedOptions.value.find(
      (option) => option.value === code
    );
    return country ? country.label : null;
  });
  countryListName.value = countryListName.value.filter((name) => name !== null);
};

const clearEcoGroup = () => {
  selectedValue.value = [];
  selectCountryGroup();
  clearResult();
};
//Select country in spec
const countryListReport = ref([]);
const countryListPartner = ref([]);
const countryListNameReport = ref([]);
const countryListNamePartner = ref([]);

const selectCountryReport = () => {
  countryListReport.value = [];
  clearResult();
  selectedValueReport.value.forEach((x) => {
    countryListReport.value = [
      ...new Set([...countryGroupListRiva2(x), ...countryListReport.value]),
    ];
  });

  countryListReport.value = countryListReport.value.filter((code) =>
    formattedOptionsReport.value.some((option) => option.value === code)
  );

  countryListNameReport.value = countryListReport.value.map((code) => {
    const country = formattedOptionsReport.value.find(
      (option) => option.value === code
    );
    return country ? country.label : null;
  });
  countryListNameReport.value = countryListNameReport.value.filter(
    (name) => name !== null
  );
  countryListNameReport.value.sort();
};

const selectCountryPartner = () => {
  countryListPartner.value = [];
  clearResult();
  selectedValuePartner.value.forEach((x) => {
    countryListPartner.value = [
      ...new Set([...countryGroupListRiva2(x), ...countryListPartner.value]),
    ];
  });

  countryListPartner.value = countryListPartner.value.filter((code) =>
    formattedOptionsPartner.value.some((option) => option.value === code)
  );
  console.log(countryListPartner.value);
  countryListNamePartner.value = countryListPartner.value.map((code) => {
    const country = formattedOptionsPartner.value.find(
      (option) => option.value === code
    );
    return country ? country.label : null;
  });
  countryListNamePartner.value = countryListNamePartner.value.filter(
    (name) => name !== null
  );
  countryListNamePartner.value.sort();
};
const clearEcoSpec = () => {
  selectedValueReport.value = [];
  selectedValuePartner.value = [];
  selectCountryReport();
  selectCountryPartner();
  clearResult();
};

// start btn in group
const resultOutputPair = ref([]);
const tablePair = ref([]);
const tableDimension = ref([]);
const tableIndicator = ref([]);
const indicatorType = ref("");
const resultOutputDim = ref([]);
const resultOutputIndicator = ref([]);
const countryListFinalReport = ref([]);
const countryListFinalPartner = ref([]);
const countryListFinalWithLabel = ref([]);
const countryListFinalReportWithLabel = ref([]);
const countryListFinalPartnerWithLabel = ref([]);
const btnStartEcoGroup = async () => {
  if (countryList.value.length > 0) {
    const dataSent = {
      integration: ecoGroupInput.value.type,
      database: ecoGroupInput.value.database,
      report: countryList.value,
      partner: countryList.value,
    };

    //pair
    if (ecoGroupInput.value.level == "pair") {
      $q.loading.show();
      countryListFinalWithLabel.value = [];
      const url = serverData.value + "ri/data_pair_table.php";
      const res = await axios.post(url, JSON.stringify(dataSent));
      resultOutputPair.value = res.data;
      showResultPair.value = true;
      countryListFinal.value = [
        ...new Set(resultOutputPair.value.map((x) => x.report)),
      ];
      countryListFinal.value.forEach((x) => {
        let countryName = formattedOptions.value.filter((y) => y.value == x);
        let temp = {
          iso: x,
          label: countryName[0].label,
        };
        countryListFinalWithLabel.value.push(temp);
      });
      tablePair.value = [];
      countryListFinal.value.forEach((report) => {
        const row = ref([]);
        countryListFinal.value.forEach((partner) => {
          row.value.push(outputPair(report, partner));
        });
        tablePair.value.push(row.value);
      });
      $q.loading.hide();
    } else if (ecoGroupInput.value.level == "dimension") {
      //dimension
      $q.loading.show();
      countryListFinalReportWithLabel.value = [];
      countryListFinalPartnerWithLabel.value = [];

      const url = serverData.value + "ri/data_dimension_table.php";
      const res = await axios.post(url, JSON.stringify(dataSent));
      resultOutputDim.value = res.data;
      showResultDimension.value = true;
      countryListFinalReport.value = [
        ...new Set(resultOutputDim.value.map((x) => x.report)),
      ];
      countryListFinalReport.value.sort();
      countryListFinalPartner.value = [
        ...new Set(resultOutputDim.value.map((x) => x.partner)),
      ];
      countryListFinalPartner.value.sort();

      countryListFinalReport.value.forEach((x) => {
        let countryName = formattedOptions.value.filter((y) => y.value == x);
        let temp = {
          iso: x,
          label: countryName.length > 0 ? countryName[0].label : "",
        };
        countryListFinalReportWithLabel.value.push(temp);
      });

      countryListFinalPartner.value.forEach((x) => {
        let countryName = formattedOptions.value.filter((y) => y.value == x);
        let temp = {
          iso: x,
          label: countryName.length > 0 ? countryName[0].label : "",
        };
        countryListFinalPartnerWithLabel.value.push(temp);
      });

      const tableDimensionTemp = ref([]);
      tableDimension.value = [];
      countryListFinalReport.value.forEach((report) => {
        for (let dim = 1; dim <= 7; dim++) {
          const row = ref([]);

          row.value.push("dim" + dim);
          countryListFinalPartner.value.forEach((partner) => {
            row.value.push(outputDimension(report, partner, dim));
          });
          tableDimensionTemp.value.push(row.value);
        }
      });
      const rowCol = ref([]);
      for (let i = 0; i < tableDimensionTemp.value.length; i++) {
        rowCol.value.push(tableDimensionTemp.value[i]);
        if (i % 7 == 6) {
          tableDimension.value.push(rowCol.value);
          rowCol.value = [];
        }
      }
      $q.loading.hide();
    } else {
      //indicator
      $q.loading.show();
      countryListFinalReportWithLabel.value = [];
      countryListFinalPartnerWithLabel.value = [];
      tableIndicator.value = [];
      const url = serverData.value + "ri/data_indicator_table.php";
      const res = await axios.post(url, JSON.stringify(dataSent));
      resultOutputIndicator.value = res.data;
      getDimensionData(ecoSpecInput.value.type);
      showResultIndicator.value = true;
      countryListFinalReport.value = [
        ...new Set(resultOutputIndicator.value.map((x) => x.report)),
      ];
      countryListFinalReport.value.sort();
      countryListFinalPartner.value = [
        ...new Set(resultOutputIndicator.value.map((x) => x.partner)),
      ];
      countryListFinalPartner.value.sort();
      countryListFinalReport.value.forEach((x) => {
        let countryName = formattedOptions.value.filter((y) => y.value == x);
        let temp = {
          iso: x,
          label: countryName.length > 0 ? countryName[0].label : "",
        };
        countryListFinalReportWithLabel.value.push(temp);
      });

      countryListFinalPartner.value.forEach((x) => {
        let countryName = formattedOptions.value.filter((y) => y.value == x);
        let temp = {
          iso: x,
          label: countryName.length > 0 ? countryName[0].label : "",
        };
        countryListFinalPartnerWithLabel.value.push(temp);
      });
      indicatorType.value = ecoGroupInput.value.type;
      console.log(resultOutputIndicator.value);
      const indicatorNumber = ref([]);
      if (indicatorType.value == "sustainable") {
        indicatorNumber.value = [4, 3, 3, 3, 2, 4, 4];
      } else {
        indicatorNumber.value = [5, 3, 4, 4, 4, 4, 6];
      }
      countryListFinalReport.value.forEach((report) => {
        const rowReport = ref([]);
        for (let dim = 1; dim <= 7; dim++) {
          for (let indi = 1; indi <= indicatorNumber.value[dim - 1]; indi++) {
            const row = ref([]);
            countryListFinalPartner.value.forEach((partner) => {
              row.value.push(outputIndicator(report, partner, dim, indi));
            });
            rowReport.value.push(row.value);
          }
        }
        tableIndicator.value.push(rowReport.value);
      });

      console.log(tableIndicator.value);

      $q.loading.hide();
    }
  }
};

// start btn in spec
const btnStartSpec = async () => {
  if (
    countryListReport.value.length > 0 &&
    countryListPartner.value.length > 0
  ) {
    const dataSent = {
      integration: ecoSpecInput.value.type,
      database: ecoSpecInput.value.database,
      report: countryListReport.value,
      partner: countryListPartner.value,
    };
    if (ecoSpecInput.value.level == "pair") {
      $q.loading.show();
      countryListFinalReportWithLabel.value = [];
      countryListFinalPartnerWithLabel.value = [];
      const url = serverData.value + "ri/data_pair_table.php";
      const res = await axios.post(url, JSON.stringify(dataSent));
      resultOutputPair.value = res.data;

      countryListFinalReport.value = [
        ...new Set(resultOutputPair.value.map((x) => x.report)),
      ];
      countryListFinalReport.value.forEach((x) => {
        let countryName = formattedOptions.value.filter((y) => y.value == x);
        let temp = {
          iso: x,
          label: countryName.length > 0 ? countryName[0].label : "",
        };
        countryListFinalReportWithLabel.value.push(temp);
      });

      countryListFinalPartner.value = [
        ...new Set(resultOutputPair.value.map((x) => x.partner)),
      ];
      countryListFinalPartner.value.forEach((x) => {
        let countryName = formattedOptions.value.filter((y) => y.value == x);
        let temp = {
          iso: x,
          label: countryName.length > 0 ? countryName[0].label : "",
        };
        countryListFinalPartnerWithLabel.value.push(temp);
      });

      tablePair.value = [];
      countryListFinalReport.value.forEach((report) => {
        const row = ref([]);
        countryListFinalPartner.value.forEach((partner) => {
          row.value.push(outputPair(report, partner));
        });
        tablePair.value.push(row.value);
      });
      showResultPairSpec.value = true;
      $q.loading.hide();
    } else if ((ecoSpecInput.value.level = "dimension")) {
      $q.loading.show();
      countryListFinalReportWithLabel.value = [];
      countryListFinalPartnerWithLabel.value = [];

      const url = serverData.value + "ri/data_dimension_table.php";
      const res = await axios.post(url, JSON.stringify(dataSent));
      resultOutputDim.value = res.data;

      showResultDimension.value = true;
      countryListFinalReport.value = [
        ...new Set(resultOutputDim.value.map((x) => x.report)),
      ];
      countryListFinalReport.value.sort();
      countryListFinalReport.value.forEach((x) => {
        let countryName = formattedOptionsReport.value.filter(
          (y) => y.value == x
        );
        let temp = {
          iso: x,
          label: countryName.length > 0 ? countryName[0].label : "",
        };
        countryListFinalReportWithLabel.value.push(temp);
      });

      countryListFinalPartner.value = [
        ...new Set(resultOutputDim.value.map((x) => x.partner)),
      ];
      countryListFinalPartner.value.sort();

      countryListFinalPartner.value.forEach((x) => {
        let countryName = formattedOptionsPartner.value.filter(
          (y) => y.value == x
        );
        let temp = {
          iso: x,
          label: countryName.length > 0 ? countryName[0].label : "",
        };
        countryListFinalPartnerWithLabel.value.push(temp);
      });
      const tableDimensionTemp = ref([]);
      tableDimension.value = [];
      countryListFinalReport.value.forEach((report) => {
        for (let dim = 1; dim <= 7; dim++) {
          const row = ref([]);

          row.value.push("dim" + dim);
          countryListFinalPartner.value.forEach((partner) => {
            row.value.push(outputDimension(report, partner, dim));
          });
          tableDimensionTemp.value.push(row.value);
        }
      });
      const rowCol = ref([]);
      for (let i = 0; i < tableDimensionTemp.value.length; i++) {
        rowCol.value.push(tableDimensionTemp.value[i]);
        if (i % 7 == 6) {
          tableDimension.value.push(rowCol.value);
          rowCol.value = [];
        }
      }
      $q.loading.hide();
    } else {
      const url = serverData.value + "ri/data_indicator_table.php";
      const res = await axios.post(url, JSON.stringify(dataSent));
      resultOutputIndicator.value = res.data;
      console.log(resultOutputIndicator.value);
    }
  }
};

const outputPair = (report, partner) => {
  const result = resultOutputPair.value.filter(
    (x) => x.report == report && x.partner == partner
  );
  if (result.length > 0) {
    return (Number(result[0].avg) * 100).toFixed(2);
  } else {
    if (report == partner) {
      return "";
    } else {
      return "-";
    }
  }
};

const outputDimension = (report, partner, dim) => {
  if (report == partner) {
    return "";
  } else {
    const result = resultOutputDim.value.filter(
      (x) => x.report == report && x.partner == partner && x.dim == dim
    );
    if (result.length > 0) {
      return (Number(result[0].coverage) * 100).toFixed(2);
    } else {
      return "-";
    }
  }
};

const outputIndicator = (report, partner, dim, indi) => {
  if (report == partner) {
    return "";
  } else {
    const result = resultOutputIndicator.value.filter(
      (x) =>
        x.report == report &&
        x.partner == partner &&
        x.dimension == dim &&
        x.indicator == indi
    );
    if (result.length > 0) {
      return result[0].avail;
    } else {
      return "0";
    }
  }
};

const clearResult = () => {
  showResultPair.value = false;
  showResultPairSpec.value = false;
  showResultDimension.value = false;
  showResultIndicator.value = false;
};

const changeClass = (value) => {
  if (value != "" && value != "-") {
    if (value > 90) {
      return "color1";
    } else if (value > 75) {
      return "color2";
    } else if (value > 50) {
      return "color3";
    } else {
      return "color4";
    }
  } else {
    return "color5";
  }
};

const changeClassIndi = (value) => {
  if (value == "1") {
    return "cGreen";
  } else if (value == "0") {
    return "cRed";
  } else {
    return "cGrey";
  }
};

const dimensionData = ref([]);
const dimensionData2 = ref([]);
const getDimensionData = () => {
  dimensionData.value = [];
  dimensionData2.value = [];

  dimensionData.value.push([
    "Environmental goods exports to GDP",
    "Environmental goods imports to GDP",
    "Tariffs on environmental goods imports",
    "Employment created by DVA",
  ]);
  dimensionData.value.push([
    "Real exchange rate volatility",
    "Avg. financial development index score",
    "Volatility weighted correlation of share price",
  ]);
  dimensionData.value.push([
    "Environmental goods export complementarity index",
    "Sustainable Value Chain participation index",
    "Exports of intermediates per unit of CO2",
  ]);
  dimensionData.value.push([
    "Avg. rural access to electricity",
    "Sustainable trade facilitation implementation",
    "Avg. share of Internet users",
  ]);
  dimensionData.value.push([
    "Avg. outward remittances per immigrant",
    "Avg. inward remittances per emigrant",
  ]);
  dimensionData.value.push([
    "Sustainable FTA score",
    "Sustainable IIA score",
    "Avg.  rule of law index score",
    "SDG trade regulatory distance from partners",
  ]);
  dimensionData.value.push([
    "Avg. secure Internet servers",
    "Avg. share of households with Internet access",
    "Avg. share of females with mobile or formal bank account",
    "Avg. share of female online shoppers",
  ]);
  dimensionData2.value.push([
    "Exports to GDP",
    "Imports to GDP",
    "Import tarriffs",
    "FDI inflows to GDP",
    "FDI outflows to GDP",
  ]);
  dimensionData2.value.push([
    "Cross-border portfolio to GDP",
    "Deposit rates dispersion",
    "Share price index correlation",
  ]);
  dimensionData2.value.push([
    "Export complementarity index",
    "Value Chains participation Index",
    "Intermediate goods exports to GDP",
    "Intermediate goods imports to GDP",
  ]);
  dimensionData2.value.push([
    "Liner shipping connectivity index",
    "Trade facilitation implement",
    "Average internet quality",
    "Average trade cost",
  ]);
  dimensionData2.value.push([
    "Stock of emigrants per capita",
    "Stock of immigrants per capita",
    "Remittances outflow to GDP",
    "Remittances inflow to GDP",
  ]);
  dimensionData2.value.push([
    "Signed FTA",
    "Signed IIA (Yes/No)",
    "Embassy (yes/No)",
    "Trade regulatory similarity",
  ]);
  dimensionData2.value.push([
    "ICT goods exports to GDP",
    "ICT goods imports to GDP",
    "Tariffs on ICT imports",
    "Avg. share using digital financial services",
    "Avg. share of online shoppers",
    "Digital Trade regulatory similarity",
  ]);
};

onMounted(() => {
  loadCountry();
});

watch(tabMode, (newTab, oldTab) => {
  loadCountry();
});
</script>

<style lang="scss" scoped>
.mainApp {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  background-color: #fff;
}
.selectedBox {
  width: 100%;
  height: 400px;
  border: 1px dashed #cacaca;
}
.selectedBox2 {
  width: 100%;
  height: 150px;
  border: 1px dashed #cacaca;
  overflow-y: auto;
}
.btnClear {
  width: 240px;
  font-size: 20px;
}
.btnStart {
  width: 240px;
  font-size: 20px;
}
.bgGreay {
  width: 100%;
  background: #ededed;
}
.scoreBox {
  min-width: 80px;
  height: 40px;
  line-height: 40px;
  width: 80px;
  background: #a9a9a9;
  font-size: 16px;
  color: white;
}
.scoreMore90 {
  border: 1px solid #e5e5e5;
  background: #6b8465;
}
.scoreMore75 {
  border: 1px solid #e5e5e5;
  background: #8ba889;
}
.scoreMore49 {
  border: 1px solid #e5e5e5;
  background: #cf9683;
}
.scoreLess {
  border: 1px solid #e5e5e5;
  background: #cf7956;
}
.boxLegend {
  width: 45px;
  height: 25px;
}
.boxData {
  margin: auto;
  border: 1px solid #757575;
}
.showType {
  width: 95%;
  max-height: 700px;
  margin: auto;
  overflow-y: auto;
}
.diagBox {
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M1 0 L0 1 L99 100 L100 99' fill='white' /></svg>");
  background-color: #757575;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%, auto;
  border: 1px solid white;
}
.fontTable {
  font-size: 18px;
  color: white;
}
.headPartnerTable {
  width: 100px;
  height: 90px;
  line-height: 90px;
  font-size: 18px;
  color: white;
  background: #757575;
  border: 1px solid white;
}
.headReport {
  color: white;
  background: #757575;
  border: 1px solid white;
}
.headDim {
  color: white;
  background: #757575;
  border: 1px solid white;
}
.rowReport {
  min-width: 140px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  text-align: center;
  color: white;
  background: #757575;
  border: 1px solid white;
}
.color1 {
  background-color: #6b8465;
  border: 1px solid white;
  color: white;
}
.color2 {
  background-color: #8ba889;
  border: 1px solid white;
  color: white;
}
.color3 {
  background-color: #cf9683;
  border: 1px solid white;
  color: white;
}
.color4 {
  background-color: #cf7956;
  border: 1px solid white;
  color: white;
}
.color5 {
  background-color: #8f8f8f;
  border: 1px solid white;
  color: white;
}
.rowDim {
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  min-width: 70px;
  color: #757575;
  background: #cacaca;
  border: 1px solid white;
}
.rowReport2 {
  line-height: 210px;
  text-align: center;
  vertical-align: middle;
  font-size: 18px;
  min-width: 70px;
  color: white;
  background: #757575;
  border: 1px solid white;
}
.reportHead {
  min-width: 70px;
  height: 210px;
  color: white;
  background: #757575;
  border: 1px solid white;
  font-size: 18px;
  text-align: center;
  line-height: 210px;
}
.dimText {
  min-width: 70px;
  text-align: center;
  font-size: 18px;
  color: #757575;
  background: #cacaca;
  border: 1px solid white;
}
.dimText2 {
  min-width: 100px;
  text-align: center;
  font-size: 18px;
  border: 1px solid white;
}
.indBox {
  min-width: 70px;
  color: white;
  background: #757575;
  border: 1px solid white;
  text-align: center;
  font-size: 18px;
}
.cGreen {
  color: white;
  background-color: #6b8465;
}
.cRed {
  color: white;
  background-color: #cf7956;
}
.cGrey {
  background-color: #8f8f8f;
}
</style>
