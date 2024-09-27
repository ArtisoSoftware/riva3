<template>
  <div style="background-color: #7a7a7a; height: fit-content">
    <div
      class="bg-white q-pb-md"
      style="
        width: 1200px;
        height: fit-content;
        margin: auto;
        background: white;
      "
    >
      <div ref="content">
        <!-- หน้าแรก -->
        <div class="printPage text-white">
          <div
            style="background: #04284d; width: 100%; height: 140px"
            class="q-pt-md"
          >
            <div style="padding-top: 5px; padding-left: 20px" class="row">
              <div class="col-1" style="width: 150px">
                <img
                  src="../../public/images/unescaplogo.svg"
                  style="height: 50px"
                  alt=""
                />
              </div>
              <div class="col-2"></div>
              <div class="col">
                <div class="row justify-center">
                  <div>
                    <img
                      src="../../public/images/logobig2.png"
                      width="190px"
                      alt
                    />
                  </div>
                  <div>
                    <div class="font-16 q-pt-xs">
                      <span>REGIONAL INTEGRATION</span>
                      AND
                    </div>
                    <div class="font-16" style="color: #e0d04e">
                      VALUE CHAIN ANALYZER
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <div
                  class="q-pa-md row justify-center"
                  id="printSection"
                  align="right"
                >
                  <div>
                    <q-btn
                      no-caps
                      text-color="black"
                      @click="printBtn()"
                      style="background-color: white"
                      v-if="btnShow"
                    >
                      <div>
                        <span>print</span>
                      </div>
                    </q-btn>
                  </div>
                  <div>
                    <q-btn
                      @click="downloadPDF()"
                      class="q-mx-md"
                      no-caps
                      text-color="black"
                      style="background-color: white"
                      v-if="btnShow"
                    >
                      <div>
                        <span>PDF</span>
                      </div>
                    </q-btn>
                  </div>
                  <div>
                    <q-btn
                      no-caps
                      text-color="black"
                      style="background-color: white"
                      @click="isShowShare = true"
                      v-if="btnShow"
                    >
                      <div>
                        <span>Share</span>
                      </div>
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>
            <div align="center" style="font-size: 20px">
              Country brief: {{ dataSend.economyName }} : {{ dataSend.year }}
            </div>
          </div>
          <div
            class="q-py-sm text-bold bg-bar"
            style="
              width: 1000px;
              margin: 5px auto 5px auto;
              font-size: 16px;
              border-radius: 5px;
            "
            align="center"
          >
            <div>
              <span class="text-white"
                >Value-added structure of gross exports to the world by
                exporter</span
              >
              <span
                class="relative-position text-white"
                style="display: inline-block; top: -10px; font-size: 12px"
                >1-5</span
              >
              <span style="font-size: 15px"></span>
            </div>
          </div>
          <div class="q-mt-sm row justify-center q-px-md text-black">
            <div class="col q-px-sm" align="center">
              <div align="center" class="q-px-sm" style="height: 22px">
                <span class="text-bold" style="font-size: 16px">{{
                  fullRegion
                }}</span>
              </div>
              <div align="center" class>
                <i style="font-size: 14px">(% of gross exports)</i>
              </div>
              <div id="container2"></div>
            </div>
            <div class="col q-px-sm" align="center">
              <div align="center" class="q-px-sm" style="height: 22px">
                <span class="text-bold" style="font-size: 16px">{{
                  dataSend.economyName
                }}</span>
              </div>
              <div align="center" class>
                <i style="font-size: 14px">(% of gross exports)</i>
              </div>
              <div id="container1"></div>
            </div>
            <div class="col q-px-sm" align="center">
              <div align="center" class="q-px-sm" style="height: 22px">
                <span class="text-bold" style="font-size: 16px"
                  >All economies</span
                >
              </div>
              <div align="center" class>
                <i style="font-size: 14px">(% of gross exports)</i>
              </div>
              <div id="container3"></div>
            </div>
          </div>
          <div
            style="width: 1000px; margin: 0px auto 8px auto; font-size: 14px"
            align="left"
            class="text-black"
          >
            For more details on these indicators, please refer to the Notes
            section at the bottom of the page
          </div>
          <div
            class="q-py-sm text-bold bg-bar"
            style="
              width: 1000px;
              margin: 2px auto 2px auto;
              font-size: 16px;
              border-radius: 5px;
            "
            align="center"
          >
            <span class="text-white">
              {{ dataSend.economyName }}'s gross and value-added trade balance
              with the world
            </span>
          </div>
          <div
            style="width: 1000px; margin: 0px auto 8px auto; font-size: 14px"
            align="left"
            class="text-black"
          >
            <div class="row justify-center">
              <div class="col q-pt-md" v-show="modeShowSection2 == 2">
                <ul>
                  <li v-for="(item, index) in contentSection2" :key="index">
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div style="width: 500px">
                <div align="center" class="q-pa-xs">
                  <span class="text-bold">
                    {{ dataSend.economyName }}'s gross and value-added trade
                    balance with the world</span
                  >
                </div>
                <div align="right" class="q-px-md">
                  <i style="font-size: 12px"
                    >(% of {{ dataSend.economyName }}'s gross exports)</i
                  >
                </div>
                <div class id="container4">xxx</div>
              </div>
            </div>
          </div>

          <div
            class="q-py-sm text-bold bg-bar"
            style="
              width: 1000px;
              margin: 2px auto 2px auto;
              font-size: 16px;
              border-radius: 5px;
            "
            align="center"
          >
            <span class="text-white">
              Global value chain relationships
              <span
                class="relative-position"
                style="display: inline-block; top: -10px; font-size: 10px"
                >6-7</span
              >
              <span style="font-size: 15px"></span>
            </span>
          </div>

          <div
            class="row"
            style="width: 1000px; margin: 0px auto 10px auto; font-size: 16px"
          >
            <div
              class="col-6 q-px-md text-black"
              style="text-align: justify; text-justify: inter-word"
            >
              {{ contentSection3Left }}
            </div>
            <div
              class="col-6 q-px-md text-black"
              style="text-align: justify; text-justify: inter-word"
            >
              {{ contentSection3Right }}
            </div>
          </div>

          <div class="q-mt-sm text-black">
            <div class="row">
              <div class="col-6 q-pa-sm">
                <div align="center" class="q-px-md">
                  <span style="font-size: 16px" class="text-bold"
                    >{{ dataSend.economyName }}'s top 5 GVC partners</span
                  >
                </div>
                <div align="right" class="q-px-md" style="margin-top: 0px">
                  <i style="font-size: 12px"
                    >(US$, % of {{ dataSend.economyName }}'s gross exports)</i
                  >
                </div>
                <div class="q-pl-md">
                  <div id="container5" style="border: 1px solid grey"></div>
                </div>
              </div>
              <div class="col-6 q-pa-sm" style="width: 580px">
                <div align="center" class="q-px-md">
                  <span style="font-size: 16px" class="text-bold"
                    >{{ dataSend.economyName }}'s top 5 GVC-linked exporting
                    sectors</span
                  >
                </div>
                <div align="right" class="q-px-md" style="margin-top: 0px">
                  <i style="font-size: 12px"
                    >(US$, % of {{ dataSend.economyName }}'s sectoral gross
                    exports)</i
                  >
                </div>
                <div class="q-pr-xs">
                  <div id="container6" style="border: 1px solid grey"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="break"></div>
        <!-- หน้าสอง -->
        <div class="printPage text-black">
          <div
            class="q-py-sm text-bold bg-bar"
            style="
              width: 1000px;
              margin: 2px auto 2px auto;
              font-size: 16px;
              border-radius: 5px;
            "
            align="center"
          >
            <span class="text-white"
              >{{ dataSend.economyName }} compared to {{ fullRegion }} ({{
                fullRegionISO
              }})</span
            >
          </div>

          <div class="q-mt-lg">
            <div class="row">
              <div class="col q-pl-xl">
                <div align="left">
                  <span style="font-size: 18px" class="text-bold text-black">
                    Participation in GVCs
                  </span>
                  <div>
                    <ul>
                      <li
                        v-for="(item, index) in content1Page2"
                        :key="index"
                        v-html="item"
                      ></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-7">
                <div align="center">
                  <span style="font-size: 16px" class="text-bold"
                    >GVC related exports - {{ fullRegionISO }}</span
                  >
                </div>
                <div align="right" class="q-pr-xl">
                  <i style="font-size: 12px">(% of gross exports)</i>
                </div>
                <div class="q-pl-md">
                  <div id="container7"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="q-mt-lg">
            <div class="row">
              <div class="col q-pl-xl">
                <div align="left">
                  <span style="font-size: 18px" class="text-bold text-black">
                    Backward linkages
                    <span
                      class="relative-position"
                      style="top: -10px; font-size: 12px"
                      >6</span
                    >
                    (by source region)
                    <span
                      class="relative-position"
                      style="top: -10px; font-size: 12px"
                      >9</span
                    >
                    <span style="font-size: 15px"></span>
                  </span>
                </div>
                <div align="left">
                  <span class="text-bold" style="font-size: 18px"
                    >Sources of {{ dataSend.economyName }}'s imported content
                    used in exports (% of {{ dataSend.economyName }}'s gross
                    exports):</span
                  >
                </div>
                <div>
                  <ul>
                    <li v-for="(item, index) in contentG2_1" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div class="q-mt-md" align="left">
                  <span class="text-bold" style="font-size: 18px">
                    Sources of {{ fullRegionISO }} imported content used in
                    exports
                    <br />
                    (% of {{ fullRegionISO }} gross exports)
                  </span>
                </div>
                <div>
                  <ul>
                    <li v-for="(item, index) in contentG2_2" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-7">
                <div align="center">
                  <span style="font-size: 18px" class="text-bold"
                    >Backward linkages, by source region</span
                  >
                </div>
                <div align="right" class="q-pr-xl">
                  <i style="font-size: 12px">(% of gross exports)</i>
                </div>
                <div class="q-pl-md">
                  <div id="container8" class></div>
                </div>
              </div>
            </div>
          </div>

          <div class="q-mt-lg">
            <div class="row">
              <div class="col q-pl-xl">
                <div align="left">
                  <span style="font-size: 18px" class="text-bold text-black">
                    Backward linkages
                    <span
                      class="relative-position"
                      style="top: -10px; font-size: 12px"
                      >6</span
                    >
                    (by exporting sector )
                    <span
                      class="relative-position"
                      style="top: -10px; font-size: 12px"
                      >8</span
                    >
                    <span style="font-size: 15px"></span>
                  </span>
                </div>
                <div align="left">
                  <span class="text-bold" style="font-size: 18px"
                    >{{ dataSend.economyName }}'s use of imported content in
                    exports, by sector (% of {{ dataSend.economyName }}'s gross
                    exports):</span
                  >
                </div>
                <div>
                  <ul>
                    <li v-for="(item, index) in contentG3_1" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div class="q-mt-md" align="left">
                  <span class="text-bold" style="font-size: 18px">
                    {{ fullRegionISO }} use of imported content in exports, by
                    sector
                    <br />
                    (% of {{ fullRegionISO }} gross exports):
                  </span>
                </div>
                <div>
                  <ul>
                    <li v-for="(item, index) in contentG3_2" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-7">
                <div align="center">
                  <span style="font-size: 18px" class="text-bold"
                    >Backward linkages, by exporting sector</span
                  >
                </div>
                <div align="right" class="q-pr-xl">
                  <i style="font-size: 12px">(% of gross exports)</i>
                </div>
                <div class="q-pl-md">
                  <div id="container9"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="break"></div>
        <div class="printPage text-black">
          <div class="q-mt-xl">
            <div class="row">
              <div class="col q-pl-xl">
                <div align="left">
                  <span style="font-size: 18px" class="text-bold text-black">
                    Forward linkages
                    <span
                      class="relative-position"
                      style="top: -10px; font-size: 12px"
                      >7</span
                    >
                    (by importing region)
                    <span
                      class="relative-position"
                      style="top: -10px; font-size: 12px"
                      >9</span
                    >
                    <span style="font-size: 15px"></span>
                  </span>
                </div>
                <div align="left">
                  <span class="text-bold" style="font-size: 18px"
                    >{{ dataSend.economyName }}'s contribution to further export
                    production, by destination (% of
                    {{ dataSend.economyName }}'s gross exports):</span
                  >
                </div>
                <div>
                  <ul>
                    <li v-for="(item, index) in contentG4_1" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div class="q-mt-md" align="left">
                  <span class="text-bold" style="font-size: 18px"
                    >{{ fullRegionISO }} contribution to further export
                    production, by destination (% of {{ fullRegionISO }} gross
                    exports):</span
                  >
                </div>
                <div>
                  <ul>
                    <li v-for="(item, index) in contentG4_2" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-7">
                <div align="center">
                  <span style="font-size: 18px" class="text-bold"
                    >Forward linkages, by importing region</span
                  >
                </div>
                <div align="right" class="q-pr-xl">
                  <i style="font-size: 12px">(% of gross exports)</i>
                </div>
                <div class="q-pl-md">
                  <div id="container10"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="q-mt-xl">
            <div class="row">
              <div class="col q-pl-xl">
                <div align="left">
                  <span style="font-size: 18px" class="text-bold text-black">
                    Forward linkages
                    <span
                      class="relative-position"
                      style="top: -10px; font-size: 12px"
                      >7</span
                    >
                    (by exporting sector)
                    <span
                      class="relative-position"
                      style="top: -10px; font-size: 12px"
                      >8</span
                    >
                    <span style="font-size: 15px"></span>
                  </span>
                </div>
                <div align="left">
                  <span class="text-bold" style="font-size: 18px"
                    >{{ dataSend.economyName }}'s contribution to further export
                    production, by sector (% of {{ dataSend.economyName }}'s
                    gross exports):</span
                  >
                </div>
                <div>
                  <ul>
                    <li v-for="(item, index) in contentG5_1" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div class="q-mt-md" align="left">
                  <span class="text-bold" style="font-size: 18px"
                    >{{ fullRegionISO }} contribution to further export
                    production, by sector (% of {{ fullRegionISO }} gross
                    exports):</span
                  >
                </div>
                <div>
                  <ul>
                    <li v-for="(item, index) in contentG5_2" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-7">
                <div align="center">
                  <span style="font-size: 18px" class="text-bold"
                    >Forward linkages, by exporting sector</span
                  >
                </div>
                <div align="right" class="q-pr-xl">
                  <i style="font-size: 12px">(% of gross exports)</i>
                </div>
                <div class="q-pl-md">
                  <div id="container11"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="break"></div>
        <div class="printPage text-black">
          <div class="q-mt-xl q-px-xl">
            <div>
              <span class="text-bold text-h6">Notes:</span>
            </div>
            <div style="font-size: 14px">
              <div>
                <ul>
                  <li style="list-style: decimal">
                    Domestic production consumed by the importer: Share of
                    domestic value-added in gross exports that is consumed in
                    the importing economy.
                  </li>
                  <li style="list-style: decimal">
                    Domestic production used in the importer's exports: Share of
                    domestic value-added in gross exports used by importing
                    economy to produce exports. Higher shares are indicative of
                    deeper GVC integration.
                  </li>
                  <li style="list-style: decimal">
                    Domestic production that returns via the importer's exports:
                    Share of domestic value-added in gross exports that returns
                    home via imports and is consumed domestically.
                  </li>
                  <li style="list-style: decimal">
                    Double counted exports: Share of intermediate trade flows in
                    gross exports that are recorded multiple times from repeated
                    border crossings. Higher shares are indicative of deeper GVC
                    integration.
                  </li>
                  <li style="list-style: decimal">
                    Foreign production consumed by the importer: Share of
                    foreign value added in gross exports. Higher shares are
                    indicative of deeper GVC integration.
                  </li>
                  <li style="list-style: decimal">
                    Backward linkages: Share of foreign value added in gross
                    exports.
                  </li>
                  <li style="list-style: decimal">
                    Forward linkages: Share of domestic value-added in gross
                    exports used by importing economy to produce exports.
                  </li>
                  <li style="list-style: decimal">
                    Sectors are grouped based on ADB ERDI classification. For
                    more details please refer to
                    <u>RIVA techinical notes.</u>
                  </li>
                  <li style="list-style: decimal">
                    Regional classification of Asia-Pacific economies follows
                    ESCAP sub-regions while regional classification for other
                    economies is based on United Nations Statistical Division
                    (UNSD) methodology. For more details please refer to
                    <u>RIVA techinical notes.</u>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <span class="text-bold text-h6">Abbreviations and acronyms:</span>
            </div>
            <div style="font-size: 14px">
              GVC: global value chain
              <br />
              <div>
                {{
                  fullRegionISO != "Pacific"
                    ? fullRegionISO + ": " + fullRegion
                    : ""
                }}
              </div>
              <span
                >ADB ERDI: Asian Development Bank Development Indicators and
                Policy Research Division</span
              >
              <div>MRIO: Multi-regional input output</div>
            </div>
            <div class="q-mt-md">
              <span class="text-bold text-h6">Source:</span>
            </div>
            <div style="font-size: 14px">
              <span>
                RIVA, available at
                <u>https://riva.negotiatetrade.org</u>
              </span>
            </div>
            <div class="q-mt-md">
              <span class="text-bold font-14">Disclaimer:</span>
            </div>
            <div style="font-size: 12px">
              <span
                >ESCAP gratefully acknowledges the use of ADB-MRIO database as
                underlying data to estimate GVC indicators in RIVA.</span
              >
            </div>
            <div style="font-size: 12px">
              <span>
                The designations employed and the presentation of the material
                in RIVA do not imply the expression of any opinion whatsoever on
                the part of the Secretariat of the United Nations concerning the
                legal status of any country, territory, city or area or of its
                authorities, or concerning the delimitation of its frontiers or
                boundaries. Opinions, figures and estimates set forth in this
                publication should not necessarily be considered as reflecting
                the views or carrying the endorsement of the United Nations.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="isShowShare" persistent>
      <q-card class="shareDia q-pa-md">
        <div class="row justify-between">
          <div>Share</div>
          <div class="cursor-pointer" @click="isShowShare = false">
            <q-icon name="fa-solid fa-xmark" size="20px" />
          </div>
        </div>
        <div class="row justify-between q-px-lg q-py-lg">
          <div>
            <ShareNetwork
              network="facebook"
              :url="urlLink"
              title="RIVA - A Revolutionary Platform"
              description="Country brief from RIVA "
              quote="RIVA: Revolutionizing International Trade"
              hashtag="#RIVA"
            >
              <img
                src="../../public/images/facebookShare.svg"
                alt="Facebook Share"
                style="height: 120px"
                class="cursor-pointer"
              />
            </ShareNetwork>
            <div class="text-center">Facebook</div>
          </div>
          <div>
            <ShareNetwork
              network="twitter"
              :url="urlLink"
              title="RIVA - A Revolutionary Platform"
              description="Country brief from RIVA "
              hashtag="#RIVA"
            >
              <img
                src="../../public/images/xShare.svg"
                alt="Twitter Share"
                style="height: 120px"
                class="cursor-pointer"
              />
            </ShareNetwork>
            <div class="text-center">Twitter</div>
          </div>
          <div>
            <ShareNetwork
              network="linkedin"
              :url="urlLink"
              title="RIVA - A Revolutionary Platform"
              description="Country brief from RIVA "
              source="https://riva.negotiatetrade.org"
            >
              <img
                src="../../public/images/inShare.svg"
                alt="LinkedIn Share"
                style="height: 120px"
                class="cursor-pointer"
              />
            </ShareNetwork>
            <div class="text-center">LinkedIn</div>
          </div>
        </div>
        <div class="q-px-lg">
          <div class="boxGrey q-px-md row">
            <div class="col ellipsis">{{ urlLink }}</div>
            <div
              style="width: 40px; color: #1996d4; font-weight: 600"
              class="text-right cursor-pointer"
              @click="copyLink()"
            >
              COPY
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeMount, nextTick } from "vue";
import { LocalStorage } from "quasar";
import axios from "axios";
import { useRoute } from "vue-router";
import { serverSetup } from "./server.js";
import { countryName } from "./countryName.js";
import { countryGroupListRiva2 } from "./countryGroupList";
import html2pdf from "jspdf-html2canvas";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

//Set up variable
const { serverData } = serverSetup();
const dataSend = ref({
  economicISO: "",
  economicName: "",
  year: "",
});
const isShowShare = ref(false);
const urlLink = ref("");
const route = useRoute();
const showError = ref(false);
const btnShow = ref(true);
const fullRegion = ref("");
const fullRegionISO = ref("");
const dataGrap1 = ref({
  foreignShare: 0, //สีม่วง
  foreignValue: 0,
  doubleShare: 0, //สีเขียว
  doubleValue: 0,
  usedInShare: 0, //สีแดง
  usedInValue: 0,
  returnShare: 0, //สีส้ม
  retrunValue: 0,
  comsumedShare: 0, //สีน้ำเงิน
  comsumedValue: 0,
});

const dataGrap2 = ref({
  foreignShare: 0, //สีม่วง
  foreignValue: 0,
  doubleShare: 0, //สีเขียว
  doubleValue: 0,
  usedInShare: 0, //สีแดง
  usedInValue: 0,
  returnShare: 0, //สีส้ม
  retrunValue: 0,
  comsumedShare: 0, //สีน้ำเงิน
  comsumedValue: 0,
});

const dataGrap3 = ref({
  foreignShare: 0, //สีม่วง
  foreignValue: 0,
  doubleShare: 0, //สีเขียว
  doubleValue: 0,
  usedInShare: 0, //สีแดง
  usedInValue: 0,
  returnShare: 0, //สีส้ม
  retrunValue: 0,
  comsumedShare: 0, //สีน้ำเงิน
  comsumedValue: 0,
});
const yearLow = ref("");
const setDataSection2 = ref([]);
const modeShowSection2 = ref(1);
const contentSection2 = ref([]);

const contentSection3Left = ref("");
const contentSection3Right = ref("");
const backwardSection3Left = ref([]);
const forwardSection3Left = ref([]);
const backwardSection3Right = ref([]);
const forwardSection3Right = ref([]);

const redOutput = ref([]);
const greenOutput = ref([]);
const purpleOutput = ref([]);
const countryListName = ref([]);
const content1Page2 = ref([]);

const asiaSumG2 = ref([]);
const europeSumG2 = ref([]);
const americaSumG2 = ref([]);
const latinSumG2 = ref([]);
const restSumG2 = ref([]);
const itemExport = ref(0);
const groupExport = ref(0);
const contentG2_1 = ref([]);
const contentG2_2 = ref([]);
const countryListNameG2 = ref([]);
const asiaG2 = ref([]);
const europeG2 = ref([]);
const americaG2 = ref([]);
const latinG2 = ref([]);
const restG2 = ref([]);
const totalG2 = ref([]);

const contentG3_1 = ref([]);
const contentG3_2 = ref([]);

const contentG4_1 = ref([]);
const contentG4_2 = ref([]);

const contentG5_1 = ref([]);
const contentG5_2 = ref([]);

const g6AsiaPacific = ref([]);
const g6Europe = ref([]);
const g6NorthAmerica = ref([]);
const g6Latin = ref([]);
const g6Rest = ref([]);
const g6CountryList = ref([]);

//ลำดับตัวเลข
const getOrdinalSuffix = (n) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = n % 100;

  // ถ้าเลขอยู่ในช่วง 11 ถึง 13 ให้ใช้ th
  if (value >= 11 && value <= 13) {
    return n + "<sup>th</sup>";
  }

  // คำนวณ suffix จากตัวเลขหลักสุดท้าย
  return n + "<sup>" + (suffixes[n % 10] || "th") + "</sup>";
};

const loadData = async () => {
  let ecoList = [];
  let ecoGroupName = "";
  let url = serverData.value + "va/getEco.php";
  let res = await axios.get(url);
  ecoList = res.data;
  ecoGroupName = ecoList.filter((x) => x.iso == dataSend.value.economyISO)[0]
    .group;

  fullRegion.value = ecoGroupName;
  let tempGroupISO = ecoList.filter((x) => x.name == ecoGroupName);
  fullRegionISO.value = tempGroupISO[0].iso;
  // console.log("fullRegionISO: ", fullRegionISO.value);
  // console.log("fullRegion: ", fullRegion.value);
  // console.log("ecoList", ecoList);

  //*************** */
  //graph1 in Value-added structure of gross exports to the world by exporter
  //Pie chart of Region - page 1
  {
    let dataTemp2 = {
      exp_country: fullRegionISO.value,
      imp_country: "WLD",
      exp_sector: "All sectors",
      year: dataSend.value.year,
    };

    let url2 = serverData.value + "/va/strloaddata1.php";
    let res2 = await axios.post(url2, JSON.stringify(dataTemp2));

    {
      let dataFilter = res2.data.filter((x) => x.var == "Backward_linkages");
      dataGrap1.value.foreignShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap1.value.foreignValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res2.data.filter(
        (x) => x.var == "Double_counted_exports"
      );
      dataGrap1.value.doubleShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap1.value.doubleValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res2.data.filter((x) => x.var == "Forward_linkages");
      dataGrap1.value.usedInShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap1.value.usedInValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res2.data.filter((x) => x.var == "Forward_linkages2");
      dataGrap1.value.returnShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap1.value.retrunValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res2.data.filter(
        (x) =>
          x.var == "Intermediate_directly_consumed" ||
          x.var == "Final_directly_consumed"
      );
      dataGrap1.value.comsumedShare =
        Number((dataFilter[0].share * 100).toFixed(2)) +
        Number((dataFilter[1].share * 100).toFixed(2));
      dataGrap1.value.comsumedValue =
        Number(Number(dataFilter[0].value).toFixed(2)) +
        Number(Number(dataFilter[1].value).toFixed(2));
    }

    await nextTick();
    chart1();
  }
  //*************** */
  //graph2 in Value-added structure of gross exports to the world by exporter
  //Pie chart of economic - page 1
  {
    let dataTemp3 = {
      exp_country: dataSend.value.economyISO,
      imp_country: "WLD",
      exp_sector: "All sectors",
      year: dataSend.value.year,
    };

    let url3 = serverData.value + "/va/strloaddata1.php";
    let res3 = await axios.post(url3, JSON.stringify(dataTemp3));

    {
      let dataFilter = res3.data.filter((x) => x.var == "Backward_linkages");
      dataGrap2.value.foreignShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap2.value.foreignValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter(
        (x) => x.var == "Double_counted_exports"
      );
      dataGrap2.value.doubleShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap2.value.doubleValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter((x) => x.var == "Forward_linkages");
      dataGrap2.value.usedInShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap2.value.usedInValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter((x) => x.var == "Forward_linkages2");
      dataGrap2.value.returnShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap2.value.retrunValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter(
        (x) =>
          x.var == "Intermediate_directly_consumed" ||
          x.var == "Final_directly_consumed"
      );
      dataGrap2.value.comsumedShare =
        Number((dataFilter[0].share * 100).toFixed(2)) +
        Number((dataFilter[1].share * 100).toFixed(2));
      dataGrap2.value.comsumedValue =
        Number(Number(dataFilter[0].value).toFixed(2)) +
        Number(Number(dataFilter[1].value).toFixed(2));
    }

    chart2();
  }

  //*************** */
  //graph3 in Value-added structure of gross exports to the world by exporter
  //Pie chart of All economics - page 1
  {
    let dataTemp3 = {
      exp_country: "WLD",
      imp_country: "WLD",
      exp_sector: "All sectors",
      year: dataSend.value.year,
    };

    let url3 = serverData.value + "/va/strloaddata1.php";
    let res3 = await axios.post(url3, JSON.stringify(dataTemp3));

    {
      let dataFilter = res3.data.filter((x) => x.var == "Backward_linkages");
      dataGrap3.value.foreignShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap3.value.foreignValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter(
        (x) => x.var == "Double_counted_exports"
      );
      dataGrap3.value.doubleShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap3.value.doubleValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter((x) => x.var == "Forward_linkages");
      dataGrap3.value.usedInShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap3.value.usedInValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter((x) => x.var == "Forward_linkages2");
      dataGrap3.value.returnShare = Number(
        (dataFilter[0].share * 100).toFixed(2)
      );
      dataGrap3.value.retrunValue = Number(
        Number(dataFilter[0].value).toFixed(2)
      );
    }

    {
      let dataFilter = res3.data.filter(
        (x) =>
          x.var == "Intermediate_directly_consumed" ||
          x.var == "Final_directly_consumed"
      );
      dataGrap3.value.comsumedShare =
        Number((dataFilter[0].share * 100).toFixed(2)) +
        Number((dataFilter[1].share * 100).toFixed(2));
      dataGrap3.value.comsumedValue =
        Number(Number(dataFilter[0].value).toFixed(2)) +
        Number(Number(dataFilter[1].value).toFixed(2));
    }

    await nextTick();
    chart3();
  }

  //************* */
  //หาว่าข้อมูลปีที่เก่าที่สุดของประเทศนี้
  {
    let url4 = serverData.value + "va/getYear.php";
    let res4 = await axios.get(url4);
    let yearList = res4.data.sort((a, b) => Number(a.year) - Number(b.year));
    yearLow.value = "";
    for (let yearData of yearList) {
      let dataTempYear = {
        exp_country: dataSend.value.economyISO,
        imp_country: "WLD",
        exp_sector: "All sectors",
        year: yearData.year,
      };
      let urlYear = serverData.value + "va/strloaddata2.php";
      let resYear = await axios.post(urlYear, JSON.stringify(dataTempYear));

      let resultYear = resYear.data;

      if (resultYear.length != 0 && yearLow.value == "") {
        yearLow.value = yearData.year;
      }
    }
  }

  //***************** */
  //graph4 in economic's gross and value-added trade balance with the world
  //Value-added trade balance & Gross trade balance - page 1
  {
    let modeShow = 1;
    if (dataSend.value.year == yearLow.value) {
      modeShow = 1; // แสดงกราฟเดียวใน section 2
      let dataTempYear = {
        exp_country: dataSend.value.economyISO,
        imp_country: "WLD",
        exp_sector: "All sectors",
        year: dataSend.value.year,
      };
      let urlYear = serverData.value + "va/strloaddata2.php";
      let resYear = await axios.post(urlYear, JSON.stringify(dataTempYear));
      let valuedAdded =
        resYear.data.filter((x) => x.variable == "value_added_trade_balance")[0]
          .value * 100;
      let grossTrade =
        resYear.data.filter((x) => x.variable == "gross_trade_balance")[0]
          .value * 100;

      setDataSection2.value = [
        {
          name: yearLow.value,
          data: [
            Number(parseFloat(valuedAdded).toFixed(2)),
            Number(parseFloat(grossTrade).toFixed(2)),
          ],
          color: "#4472C4",
        },
      ];
    } else {
      modeShow = 2; // แสดงกราฟสองอันใน section 2
      let dataTempYear = {
        exp_country: dataSend.value.economyISO,
        imp_country: "WLD",
        exp_sector: "All sectors",
        year: dataSend.value.year,
      };
      let urlYear = serverData.value + "va/strloaddata2.php";
      let resYear = await axios.post(urlYear, JSON.stringify(dataTempYear));
      let valuedAddedCurrent =
        resYear.data.filter((x) => x.variable == "value_added_trade_balance")[0]
          .value * 100;
      let grossTradeCurrent =
        resYear.data.filter((x) => x.variable == "gross_trade_balance")[0]
          .value * 100;
      let dataTempYearBase = {
        exp_country: dataSend.value.economyISO,
        imp_country: "WLD",
        exp_sector: "All sectors",
        year: yearLow.value,
      };
      let urlYearBase = serverData.value + "va/strloaddata2.php";
      let resYearBase = await axios.post(
        urlYearBase,
        JSON.stringify(dataTempYearBase)
      );
      let valuedAddedBase =
        resYearBase.data.filter(
          (x) => x.variable == "value_added_trade_balance"
        )[0].value * 100;
      let grossTradeBase =
        resYearBase.data.filter((x) => x.variable == "gross_trade_balance")[0]
          .value * 100;

      setDataSection2.value = [
        {
          name: yearLow.value,
          data: [
            Number(parseFloat(valuedAddedBase).toFixed(2)),
            Number(parseFloat(grossTradeBase).toFixed(2)),
          ],
          color: "#4472C4",
        },
        {
          name: dataSend.value.year,
          data: [
            Number(parseFloat(valuedAddedCurrent).toFixed(2)),
            Number(parseFloat(grossTradeCurrent).toFixed(2)),
          ],
          color: "#ED7D31",
        },
      ];
      contentSection2.value = [
        `In ${dataSend.value.year}, ${
          dataSend.value.economyName
        } registered a gross trade ${
          grossTradeCurrent > 0 ? "surplus" : "deficit"
        } with the world - an ${
          grossTradeCurrent > grossTradeBase ? "increase" : "decrease"
        } since ${yearLow.value}.`,

        `In ${dataSend.value.year}, ${
          dataSend.value.economyName
        } registered a  value-added trade ${
          valuedAddedCurrent > 0 ? "surplus" : "deficit"
        } with the world - ${
          valuedAddedCurrent > valuedAddedBase ? "an increase" : "a decrease"
        } since ${yearLow.value}.`,

        `Gross trade balance ${
          grossTradeCurrent > valuedAddedCurrent ? "greater" : "lesser"
        } than value-added trade balance in ${
          dataSend.value.year
        }, indicating ${
          grossTradeCurrent > valuedAddedCurrent ? "high" : "low"
        } imported content embodied in exports.`,

        `Between ${yearLow.value} and ${
          dataSend.value.year
        }, growth in gross trade balance has been ${
          grossTradeCurrent -
            grossTradeBase -
            (valuedAddedCurrent - valuedAddedBase) >
          0
            ? "larger"
            : "smaller"
        } than growth in value added trade balance, indicating ${
          grossTradeCurrent -
            grossTradeBase -
            (valuedAddedCurrent - valuedAddedBase) >
          0
            ? "increasing"
            : "decreasing"
        } use of imported content.`,
      ];

      // console.log(setDataSection2.value);
    }
    await nextTick();
    modeShowSection2.value = modeShow;

    chart4();
  }

  //**************** */
  //graph5 in top 5 GVC partners - page 1
  {
    contentSection3Left.value = "";
    backwardSection3Left.value = [];
    forwardSection3Left.value = [];

    let dataTemp = {
      exp_country: dataSend.value.economyISO,
      year: dataSend.value.year,
    };
    let url = serverData.value + "va/gvcloaddata3.php";
    let res = await axios.post(url, JSON.stringify(dataTemp));
    let backwardData = res.data.filter((x) => x.var == "Backward linkages");
    backwardData.sort((a, b) => Number(a.value) - Number(b.value));
    backwardData.forEach((item) => {
      let temp = {
        country: countryName(item.country)[0].country,
        precent: Number((Number(item.share) * 100).toFixed(2)),
        value: Number(Number(item.value).toFixed(2)),
        y: -Number(Number(item.value).toFixed(2)),
      };
      backwardSection3Left.value.push(temp);
    });

    let forwardData = res.data.filter((x) => x.var == "Forward linkages");
    forwardData.sort((a, b) => Number(a.value) - Number(b.value));
    forwardData.forEach((item) => {
      let temp = {
        country: countryName(item.country)[0].country,
        precent: Number((Number(item.share) * 100).toFixed(2)),
        value: Number(Number(item.value).toFixed(2)),
        y: Number(Number(item.value).toFixed(2)),
      };
      forwardSection3Left.value.push(temp);
    });
    backwardSection3Left.value.sort((a, b) => b.value - a.value);
    forwardSection3Left.value.sort((a, b) => b.value - a.value);
    let ctext1 = "";
    if (backwardSection3Left.value[0].value >= 1000) {
      ctext1 =
        "$" +
        Number(backwardSection3Left.value[0].value / 1000).toFixed(1) +
        "B";
    } else {
      ctext1 =
        "$" + Number(backwardSection3Left.value[0].value).toFixed(1) + "M";
    }

    let ctext2 = "";
    if (forwardSection3Left.value[0].value >= 1000) {
      ctext2 =
        "$" +
        Number(forwardSection3Left.value[0].value / 1000).toFixed(1) +
        "B";
    } else {
      ctext2 =
        "$" + Number(forwardSection3Left.value[0].value).toFixed(1) + "M";
    }
    contentSection3Left.value = `In ${dataSend.value.year}, ${backwardSection3Left.value[0].precent}% (${ctext1}) of ${dataSend.value.economyName}'s gross exports to the world came from ${backwardSection3Left.value[0].country} in the form of imported content, and ${forwardSection3Left.value[0].precent}% (${ctext2}) of ${dataSend.value.economyName}'s gross exports to the world were used for further export production in ${forwardSection3Left.value[0].country}.`;
    await nextTick();
    chart5();
  }

  //*************** */
  //graph6 in top 5 GVC-linked exporting sectors - page 1
  {
    contentSection3Right.value = "";
    backwardSection3Right.value = [];
    forwardSection3Right.value = [];
    let sectorList = [];
    let resSector = await axios.get(serverData.value + "va/getSector.php");

    resSector.data.forEach((x) => {
      if (x.shortname) {
        let tempData = {
          name: x.name,
          shortname: x.shortname,
        };
        sectorList.push(tempData);
      }
    });
    let dataTemp = {
      exp_country: dataSend.value.economyISO,
      year: dataSend.value.year,
    };
    let url = serverData.value + "va/gvcloaddata2.php";
    let res = await axios.post(url, JSON.stringify(dataTemp));
    res.data.forEach((x) => {
      let tempX = sectorList.filter(
        (sectorData) => sectorData.name == x.exp_sector
      );
      let shortName = tempX[0].shortname;
      if (x.var == "Backward linkages") {
        let tempInput = {
          sector: shortName,
          precent: Number((Number(x.share) * 100).toFixed(2)),
          value: Number(Number(x.value).toFixed(2)),
          y: -Number(Number(x.value).toFixed(2)),
        };
        backwardSection3Right.value.push(tempInput);
      } else {
        let tempInput = {
          sector: shortName,
          precent: Number((Number(x.share) * 100).toFixed(2)),
          value: Number(Number(x.value).toFixed(2)),
          y: Number(Number(x.value).toFixed(2)),
        };
        forwardSection3Right.value.push(tempInput);
      }
    });
    backwardSection3Right.value.sort((a, b) => b.value - a.value);
    forwardSection3Right.value.sort((a, b) => b.value - a.value);
    // console.log(backwardSection3Right.value);
    // console.log(forwardSection3Right.value);

    let ctext1 = "";
    if (backwardSection3Right.value[0].value >= 1000) {
      ctext1 =
        "$" +
        Number(backwardSection3Right.value[0].value / 1000).toFixed(1) +
        "B";
    } else {
      ctext1 =
        "$" + Number(backwardSection3Right.value[0].value).toFixed(1) + "M";
    }

    let ctext2 = "";
    if (forwardSection3Right.value[0].value >= 1000) {
      ctext2 =
        "$" +
        Number(forwardSection3Right.value[0].value / 1000).toFixed(1) +
        "B";
    } else {
      ctext2 =
        "$" + Number(forwardSection3Right.value[0].value).toFixed(1) + "M";
    }

    contentSection3Right.value = `In ${dataSend.value.year}, ${backwardSection3Right.value[0].precent}% (${ctext1}) of ${dataSend.value.economyName}'s${backwardSection3Right.value[0].sector} sector gross exports to the world comprised imported content, and ${forwardSection3Right.value[0].precent}% (${ctext2}) of ${dataSend.value.economyName}'s ${forwardSection3Right.value[0].sector} sector gross exports to the world were used in further export production.`;
    await nextTick();
    chart6();
  }

  //Graph7 in GVC related exports  - page 2
  {
    let dataTemp = {
      exp_country: dataSend.value.economyISO,
      imp_country: "WLD",
      exp_sector: "All sectors",
      year: dataSend.value.year,
    };

    let url = serverData.value + "/va/strloaddata3.php";
    let res = await axios.post(url, JSON.stringify(dataTemp));
    let resultFromDatabase = res.data;
    let countryListISO = [...new Set(resultFromDatabase.map((x) => x.iso))];
    countryListName.value = [];
    countryListISO.forEach((x) => {
      countryListName.value.push(countryName(x)[0].country);
      {
        let dataAdd = resultFromDatabase.filter(
          (y) => y.var == "Double_counted_exports" && y.iso == x
        );
        purpleOutput.value.push({
          value: dataAdd[0].value,
          y: dataAdd[0].percentData,
        });
      }
      {
        let dataAdd = resultFromDatabase.filter(
          (y) => y.var == "Forward_linkages" && y.iso == x
        );
        redOutput.value.push({
          value: dataAdd[0].value,
          y: dataAdd[0].percentData,
        });
      }
      {
        let dataAdd = resultFromDatabase.filter(
          (y) => y.var == "Backward_linkages" && y.iso == x
        );
        greenOutput.value.push({
          value: dataAdd[0].value,
          y: dataAdd[0].percentData,
        });
      }
    });

    let totals = {};
    let varsToCalculate = [
      "Double_counted_exports",
      "Forward_linkages",
      "Backward_linkages",
    ];

    resultFromDatabase.forEach((item) => {
      if (varsToCalculate.includes(item.var)) {
        if (!totals[item.iso]) {
          totals[item.iso] = 0;
        }
        // รวมค่า percentData ของแต่ละ iso
        totals[item.iso] += item.percentData;
      }
    });
    let resultTotal = Object.keys(totals).map((iso) => ({
      iso,
      totalPercentData: totals[iso],
    }));
    resultTotal.sort((a, b) => b.totalPercentData - a.totalPercentData);
    let orderIndex =
      resultTotal.findIndex((item) => item.iso === dataSend.value.economyISO) +
      1;
    let precentShow = resultTotal[orderIndex - 1].totalPercentData.toFixed(1);
    let c1 = countryName(resultTotal[resultTotal.length - 1].iso)[0].country;
    let p1 = resultTotal[resultTotal.length - 1].totalPercentData.toFixed(1);
    let c1a = countryName(resultTotal[0].iso)[0].country;
    let p1a = resultTotal[0].totalPercentData.toFixed(1);
    // let url2 = serverData.value + "/va/getEco2.php";
    // let res2 = await axios.get(url2);
    // console.log(res2.data);
    let countryOutput2 = countryGroupListRiva2("escap");
    let dataTemp2 = {
      year: dataSend.value.year,
    };
    let url2 = serverData.value + "/va/countryBriefg2p2.php";
    let res2 = await axios.post(url2, JSON.stringify(dataTemp2));
    let resultFromDatabase2 = res2.data;

    let totals2 = {};
    resultFromDatabase2.forEach((item) => {
      if (varsToCalculate.includes(item.var)) {
        if (!totals2[item.exp_country]) {
          totals2[item.exp_country] = 0;
        }
        // รวมค่า percentData ของแต่ละ exp_country
        totals2[item.exp_country] += Number(item.share);
      }
    });
    let resultTotal2 = Object.keys(totals2).map((iso) => ({
      iso,
      totalPercentData: totals2[iso],
    }));
    let resultTotal2Escap = resultTotal2.filter((item) =>
      countryOutput2.includes(item.iso)
    );
    resultTotal2Escap.sort((a, b) => b.totalPercentData - a.totalPercentData);
    let c2 = countryName(resultTotal2Escap[resultTotal2Escap.length - 1].iso)[0]
      .country;
    let p2 = (
      resultTotal2Escap[resultTotal2Escap.length - 1].totalPercentData * 100
    ).toFixed(1);
    let c2a = countryName(resultTotal2Escap[0].iso)[0].country;
    let p2a = (resultTotal2Escap[0].totalPercentData * 100).toFixed(1);

    let countryOutput3 = countryGroupListRiva2("WLD");
    let resultTotal2World = resultTotal2.filter((item) =>
      countryOutput3.includes(item.iso)
    );
    resultTotal2World.sort((a, b) => b.totalPercentData - a.totalPercentData);
    let c3 = countryName(resultTotal2World[resultTotal2World.length - 1].iso)[0]
      .country;
    let p3 = (
      resultTotal2World[resultTotal2World.length - 1].totalPercentData * 100
    ).toFixed(1);
    let c3a = countryName(resultTotal2World[0].iso)[0].country;
    let p3a = (resultTotal2World[0].totalPercentData * 100).toFixed(1);

    // console.log(resultTotal2World);

    content1Page2.value = [
      `GVC-related export reliance: ${precentShow}% of gross exports (${getOrdinalSuffix(
        orderIndex
      )}) largest in ${fullRegion.value}`,
      `The least GVC reliance for export: <br/>
       ${fullRegionISO.value}: ${c1} (${p1}%)<br/>
       Asia-Pacific: ${c2} (${p2}%)<br/>
       World: ${c3} (${p3}%)
      `,
      `The highest GVC reliance for exports: <br/>
      ${fullRegionISO.value}: ${c1a} (${p1a}%)<br/>
       Asia-Pacific: ${c2a} (${p2a}%)<br/>
       World: ${c3a} (${p3a}%)
      `,
    ];

    await nextTick();
    chart7();
  }

  //Graph8 in Backward linkages, by source region - page 2
  {
    let url0 = serverData.value + "va/getEcoList.php";
    let res0 = await axios.get(url0);
    let countryData = res0.data;

    let url4 = serverData.value + "va/getEcoList.php";
    let res4 = await axios.get(url4);
    let regionCountryList = res4.data
      .filter((x) => x.region == fullRegion.value)
      .map((y) => y.iso);
    regionCountryList.unshift(fullRegionISO.value);
    let dataTemp = {
      exp_country: regionCountryList,
      imp_country: "WLD",
      exp_sector: "All sectors",
      year: dataSend.value.year,
    };

    let url = serverData.value + "/va/backwardSector1.php";
    let res = await axios.post(url, JSON.stringify(dataTemp));
    let rawResult = res.data;

    rawResult.forEach((item) => {
      const country = countryData.find(
        (country) => country.iso === item.source_country
      );
      if (country) {
        item.area = country.area;
      } else {
        item.area = "Rest of the world"; // กรณีไม่พบข้อมูลที่ตรงกัน
      }
    });

    let asiaData = rawResult.filter((x) => x.area == "Asia-Pacific");
    let europeData = rawResult.filter((x) => x.area == "Europe");
    let latinData = rawResult.filter((x) => x.area == "Latin America");
    let americaData = rawResult.filter((x) => x.area == "North America");
    let restData = rawResult.filter((x) => x.area == "Rest of the world");

    asiaSumG2.value = [];
    europeSumG2.value = [];
    americaSumG2.value = [];
    latinSumG2.value = [];
    restSumG2.value = [];
    itemExport.value = [];
    groupExport.value = [];
    countryListNameG2.value = [];
    let dataTempx = {
      exp_country: dataSend.value.economyISO,
      imp_country: "WLD",
      exp_sector: "All sectors",
      year: dataSend.value.year,
    };

    let urlx = serverData.value + "/va/strloaddata1.php";
    let resx = await axios.post(urlx, JSON.stringify(dataTempx));
    itemExport.value = Number(resx.data[0].total_exports);
    let dataTempy = {
      exp_country: fullRegionISO.value,
      imp_country: "WLD",
      exp_sector: "All sectors",
      year: dataSend.value.year,
    };
    let urly = serverData.value + "/va/strloaddata1.php";
    let resy = await axios.post(urly, JSON.stringify(dataTempy));
    groupExport.value = Number(resy.data[0].total_exports);

    let count = 0;
    totalG2.value = [];
    for (const item of regionCountryList) {
      let dataTemp6 = {
        exp_country: item,
        imp_country: "WLD",
        exp_sector: "All sectors",
        year: dataSend.value.year,
      };
      let url6 = serverData.value + "/va/strloaddata1.php";
      let res6 = await axios.post(url6, JSON.stringify(dataTemp6));

      if (res6.data.length > 0) {
        totalG2.value.push(res6.data[0].total_exports);
        count++;
        let temp1 = asiaData.filter((x) => x.exp_country == item);
        let total1 = temp1.reduce((sum, item2) => sum + Number(item2.value), 0);
        asiaSumG2.value.push(total1);

        let temp2 = europeData.filter((x) => x.exp_country == item);
        let total2 = temp2.reduce((sum, item2) => sum + Number(item2.value), 0);
        europeSumG2.value.push(total2);

        let temp3 = americaData.filter((x) => x.exp_country == item);
        let total3 = temp3.reduce((sum, item2) => sum + Number(item2.value), 0);
        americaSumG2.value.push(total3);

        let temp4 = latinData.filter((x) => x.exp_country == item);
        let total4 = temp4.reduce((sum, item2) => sum + Number(item2.value), 0);
        latinSumG2.value.push(total4);

        let temp5 = restData.filter((x) => x.exp_country == item);
        let total5 = temp5.reduce((sum, item2) => sum + Number(item2.value), 0);
        restSumG2.value.push(total5);
        if (count == 1) {
          countryListNameG2.value.push(fullRegionISO.value);
        } else {
          countryListNameG2.value.push(countryName(item)[0].country);
        }
      }
    }
    let indexEcon = countryListNameG2.value.indexOf(dataSend.value.economyName);
    await nextTick();
    let c1 = ((asiaSumG2.value[indexEcon] / itemExport.value) * 100).toFixed(1);
    let c2 = ((europeSumG2.value[indexEcon] / itemExport.value) * 100).toFixed(
      1
    );
    let c3 = ((americaSumG2.value[indexEcon] / itemExport.value) * 100).toFixed(
      1
    );
    let c4 = ((latinSumG2.value[indexEcon] / itemExport.value) * 100).toFixed(
      1
    );
    let c5 = ((restSumG2.value[indexEcon] / itemExport.value) * 100).toFixed(1);
    let c6 = (
      ((asiaSumG2.value[indexEcon] +
        europeSumG2.value[indexEcon] +
        americaSumG2.value[indexEcon] +
        latinSumG2.value[indexEcon] +
        restSumG2.value[indexEcon]) /
        itemExport.value) *
      100
    ).toFixed(1);
    contentG2_1.value = [
      `Asia-Pacific (${c1}%)`,
      `Europe (${c2}%)`,
      `North America (${c3}%)`,
      `Latin America (${c4}%)`,
      `Rest of the world (${c5}%)`,
      `Total (${c6}%)`,
    ];

    let c1a = ((asiaSumG2.value[0] / groupExport.value) * 100).toFixed(1);
    let c2a = ((europeSumG2.value[0] / groupExport.value) * 100).toFixed(1);
    let c3a = ((americaSumG2.value[0] / groupExport.value) * 100).toFixed(1);
    let c4a = ((latinSumG2.value[0] / groupExport.value) * 100).toFixed(1);
    let c5a = ((restSumG2.value[0] / groupExport.value) * 100).toFixed(1);
    let c6a = (
      ((asiaSumG2.value[0] +
        europeSumG2.value[0] +
        americaSumG2.value[0] +
        latinSumG2.value[0] +
        restSumG2.value[0]) /
        groupExport.value) *
      100
    ).toFixed(1);
    contentG2_2.value = [
      `Asia-Pacific (${c1a}%)`,
      `Europe (${c2a}%)`,
      `North America (${c3a}%)`,
      `Latin America (${c4a}%)`,
      `Rest of the world (${c5a}%)`,
      `Total (${c6a}%)`,
    ];
    asiaG2.value = [];
    asiaSumG2.value.forEach((x, index5) => {
      let dataTemp5 = {
        name: countryListNameG2.value[index5],
        value: Number(x.toFixed(1)),
        y: Number(((x / totalG2.value[index5]) * 100).toFixed(1)),
      };
      asiaG2.value.push(dataTemp5);
    });

    europeG2.value = [];
    europeSumG2.value.forEach((x, index5) => {
      let dataTemp5 = {
        name: countryListNameG2.value[index5],
        value: Number(x.toFixed(1)),
        y: Number(((x / totalG2.value[index5]) * 100).toFixed(1)),
      };
      europeG2.value.push(dataTemp5);
    });

    americaG2.value = [];
    americaSumG2.value.forEach((x, index5) => {
      let dataTemp5 = {
        name: countryListNameG2.value[index5],
        value: Number(x.toFixed(1)),
        y: Number(((x / totalG2.value[index5]) * 100).toFixed(1)),
      };
      americaG2.value.push(dataTemp5);
    });

    latinG2.value = [];
    latinSumG2.value.forEach((x, index5) => {
      let dataTemp5 = {
        name: countryListNameG2.value[index5],
        value: Number(x.toFixed(1)),
        y: Number(((x / totalG2.value[index5]) * 100).toFixed(1)),
      };
      latinG2.value.push(dataTemp5);
    });

    restG2.value = [];
    restSumG2.value.forEach((x, index5) => {
      let dataTemp5 = {
        name: countryListNameG2.value[index5],
        value: Number(x.toFixed(1)),
        y: Number(((x / totalG2.value[index5]) * 100).toFixed(1)),
      };
      restG2.value.push(dataTemp5);
    });
    await nextTick();
    chart8();
  }

  //Graph9 in Backward linkages, by exporting sector - page 2
  //********* wait source economy */
  {
    contentG3_1.value = [
      `High and medium tech (4.8%)`,
      `High and medium tech (4.8%)`,
      `High and medium tech (4.8%)`,
      `High and medium tech (4.8%)`,
      `High and medium tech (4.8%)`,
    ];
    contentG3_2.value = [
      `Low tech (3.81%)`,
      `Low tech (3.81%)`,
      `Low tech (3.81%)`,
      `Low tech (3.81%)`,
      `Low tech (3.81%)`,
    ];
  }

  //Graph10 in Forward linkages, by importing region - page 3
  //**** codeing here */
  {
    let url0 = serverData.value + "va/getEcoList.php";
    let res0 = await axios.get(url0);
    let countryData = res0.data;
    let url4 = serverData.value + "va/getEcoList.php";
    let res4 = await axios.get(url4);
    let regionCountryList = res4.data
      .filter((x) => x.region == fullRegion.value)
      .map((y) => y.iso);
    regionCountryList.unshift(fullRegionISO.value);

    //หา gross exports
    let totalG2 = [];
    for (const item of regionCountryList) {
      let dataTemp6 = {
        exp_country: item,
        imp_country: "WLD",
        exp_sector: "All sectors",
        year: dataSend.value.year,
      };
      let url6 = serverData.value + "/va/strloaddata1.php";
      let res6 = await axios.post(url6, JSON.stringify(dataTemp6));
      if (res6.data.length > 0) {
        totalG2.push(Number(res6.data[0].total_exports));
      }
    }
    let dataTemp = {
      exp_country: regionCountryList,
      exp_sector: "All sectors",
      year: dataSend.value.year,
    };

    let url = serverData.value + "/va/forwardSector1.php";
    let res = await axios.post(url, JSON.stringify(dataTemp));
    let result = res.data;

    const isoToAreaMap = {};
    countryData.forEach((country) => {
      isoToAreaMap[country.iso] = country.area;
    });

    result.forEach((item) => {
      const area = isoToAreaMap[item.imp_country];
      item.area = area || "Unknown";
    });
    g6AsiaPacific.value = [];
    g6Europe.value = [];
    g6NorthAmerica.value = [];
    g6Latin.value = [];
    g6Rest.value = [];

    regionCountryList.forEach((eco, index) => {
      {
        //Asia-Pacific
        let c1 = result.filter(
          (itemx) => itemx.exp_country == eco && itemx.area == "Asia-Pacific"
        );
        let totalC1 = c1.reduce((sum, item) => {
          // Convert totalvalue to a number using parseFloat
          const totalValueNum = parseFloat(item.value);
          return sum + totalValueNum;
        }, 0);
        let temp = {
          iso: eco,
          value: Number(totalC1.toFixed(2)),
          y: Number(Number((totalC1 / totalG2[index]) * 100).toFixed(1)),
        };
        g6AsiaPacific.value.push(temp);
      }
      {
        //Europe
        let c1 = result.filter(
          (itemx) => itemx.exp_country == eco && itemx.area == "Europe"
        );
        let totalC1 = c1.reduce((sum, item) => {
          // Convert totalvalue to a number using parseFloat
          const totalValueNum = parseFloat(item.value);
          return sum + totalValueNum;
        }, 0);
        let temp = {
          iso: eco,
          value: Number(totalC1.toFixed(2)),
          y: Number(Number((totalC1 / totalG2[index]) * 100).toFixed(1)),
        };
        g6Europe.value.push(temp);
      }

      {
        //North America
        let c1 = result.filter(
          (itemx) => itemx.exp_country == eco && itemx.area == "North America"
        );
        let totalC1 = c1.reduce((sum, item) => {
          // Convert totalvalue to a number using parseFloat
          const totalValueNum = parseFloat(item.value);
          return sum + totalValueNum;
        }, 0);
        let temp = {
          iso: eco,
          value: Number(totalC1.toFixed(2)),
          y: Number(Number((totalC1 / totalG2[index]) * 100).toFixed(1)),
        };
        g6NorthAmerica.value.push(temp);
      }

      {
        //Latin
        let c1 = result.filter(
          (itemx) => itemx.exp_country == eco && itemx.area == "Latin America"
        );
        let totalC1 = c1.reduce((sum, item) => {
          // Convert totalvalue to a number using parseFloat
          const totalValueNum = parseFloat(item.value);
          return sum + totalValueNum;
        }, 0);
        let temp = {
          iso: eco,
          value: Number(totalC1.toFixed(2)),
          y: Number(Number((totalC1 / totalG2[index]) * 100).toFixed(1)),
        };
        g6Latin.value.push(temp);
      }

      {
        //Rest of the world
        let c1 = result.filter(
          (itemx) => itemx.exp_country == eco && itemx.area == "Unknown"
        );
        let totalC1 = c1.reduce((sum, item) => {
          // Convert totalvalue to a number using parseFloat
          const totalValueNum = parseFloat(item.value);
          return sum + totalValueNum;
        }, 0);
        let temp = {
          iso: eco,
          value: Number(totalC1.toFixed(2)),
          y: Number(Number((totalC1 / totalG2[index]) * 100).toFixed(1)),
        };
        g6Rest.value.push(temp);
      }
    });

    let g41_1 = 0;
    let g41_2 = 0;
    let g41_3 = 0;
    let g41_4 = 0;
    let g41_5 = 0;
    let g41_6 = 0;
    let g41_1a = 0;
    let g41_2a = 0;
    let g41_3a = 0;
    let g41_4a = 0;
    let g41_5a = 0;
    let g41_6a = 0;

    {
      g6AsiaPacific.value = g6AsiaPacific.value.map((g6Item) => {
        let country = countryData.find((country) => country.iso == g6Item.iso);
        if (country == undefined) {
          return {
            ...g6Item,
            name: fullRegion.value,
          };
        } else {
          return {
            ...g6Item,
            name: country.economic,
          };
        }
      });

      g6Europe.value = g6Europe.value.map((g6Item) => {
        let country = countryData.find((country) => country.iso == g6Item.iso);
        if (country == undefined) {
          return {
            ...g6Item,
            name: fullRegion.value,
          };
        } else {
          return {
            ...g6Item,
            name: country.economic,
          };
        }
      });

      g6NorthAmerica.value = g6NorthAmerica.value.map((g6Item) => {
        let country = countryData.find((country) => country.iso == g6Item.iso);
        if (country == undefined) {
          return {
            ...g6Item,
            name: fullRegion.value,
          };
        } else {
          return {
            ...g6Item,
            name: country.economic,
          };
        }
      });

      g6Latin.value = g6Latin.value.map((g6Item) => {
        let country = countryData.find((country) => country.iso == g6Item.iso);
        if (country == undefined) {
          return {
            ...g6Item,
            name: fullRegion.value,
          };
        } else {
          return {
            ...g6Item,
            name: country.economic,
          };
        }
      });

      g6Rest.value = g6Rest.value.map((g6Item) => {
        let country = countryData.find((country) => country.iso == g6Item.iso);
        if (country == undefined) {
          return {
            ...g6Item,
            name: fullRegion.value,
          };
        } else {
          return {
            ...g6Item,
            name: country.economic,
          };
        }
      });
    }
    await nextTick();
    g6CountryList.value = g6AsiaPacific.value.map((xx) => xx.name);
    console.log(g6AsiaPacific.value);
    {
      g41_1a = g6AsiaPacific.value[0].y;
      g41_2a = g6Europe.value[0].y;
      g41_3a = g6NorthAmerica.value[0].y;
      g41_4a = g6Latin.value[0].y;
      g41_5a = g6Rest.value[0].y;
      g41_6a = g41_1a + g41_2a + g41_3a + g41_4a + g41_5a;

      let indexEco = g6AsiaPacific.value.findIndex(
        (c9) => c9.iso == dataSend.value.economyISO
      );

      g41_1 = g6AsiaPacific.value[indexEco].y;
      g41_2 = g6Europe.value[indexEco].y;
      g41_3 = g6NorthAmerica.value[indexEco].y;
      g41_4 = g6Latin.value[indexEco].y;
      g41_5 = g6Rest.value[indexEco].y;
      g41_6 = g41_1 + g41_2 + g41_3 + g41_4 + g41_5;

      // let temp = g6AsiaPacific.value.map((xx) => xx.y);
      // console.log(temp);
    }

    console.log(g6CountryList.value);
    console.log(g6AsiaPacific.value);
    console.log(g6Europe.value);
    console.log(g6NorthAmerica.value);
    console.log(g6Latin.value);
    console.log(g6Rest.value);

    contentG4_1.value = [
      `Asia-Pacific (${g41_1}%)`,
      `Europe (${g41_2}%)`,
      `North America (${g41_3}%)`,
      `Latin America (${g41_4}%)`,
      `Rest of the world (${g41_5}%)`,
      `Total (${g41_6.toFixed(1)}%)`,
    ];
    contentG4_2.value = [
      `Asia-Pacific (${g41_1a}%)`,
      `Europe (${g41_2a}%)`,
      `North America (${g41_3a}%)`,
      `Latin America (${g41_4a}%)`,
      `Rest of the world (${g41_5a}%)`,
      `Total (${g41_6a.toFixed(1)}%)`,
    ];

    chart10();
  }

  //Graph11 in Forward linkages, by exporting sector - page 3
  //******** wait source economy */
  {
    contentG5_1.value = [
      `Mining (xx%)`,
      `High and medium tech (xx%)`,
      `Trade and repair service (xx%)`,
      `Transport service (xx%)`,
      `Total (xx%)`,
    ];
    contentG5_2.value = [
      `Mining (xx%)`,
      `High and medium tech (xx%)`,
      `Trade and repair service (xx%)`,
      `Transport service (xx%)`,
      `Total (xx%)`,
    ];
  }
};
//Chart1
const chart1 = () => {
  Highcharts.chart("container2", {
    chart: {
      type: "pie",
      borderRadius: 5,
      height: 400,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    legend: {
      padding: 30,
      alignColumns: false,
      width: 350,
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          // format: "<b>{point.percentage:.1f}</b> %",
          formatter: function () {
            if (this.point.percentage > 1.5) {
              return Highcharts.numberFormat(this.point.percentage, 1) + "%";
            }
          },
          distance: -50,
          color: "black",
        },
        showInLegend: true,
        borderWidth: 1,
        size: 200,
      },
    },

    tooltip: {
      formatter: function () {
        if (this.point.options.total >= 1000) {
          let tempNumber = (this.point.options.total / 1000).toFixed(1);
          return `<b>${this.point.name}</b><br>
              Share: ${this.y}%<br>
              Value:  $${tempNumber} billion`;
        } else {
          let tempNumber = this.point.options.total.toFixed(1);
          return `<b>${this.point.name}</b><br>
              Share: ${this.y}%<br>
              Value:  $${tempNumber} million`;
        }
      },
    },

    series: [
      {
        name: "Browsers",
        colorByPoint: true,
        data: [
          {
            name: "Foreign production consumed by the importer",
            y: dataGrap1.value.foreignShare,
            total: dataGrap1.value.foreignValue,
            color: "#9034AD",
          },
          {
            name: "Double counted",
            y: dataGrap1.value.doubleShare,
            total: dataGrap1.value.doubleValue,
            color: "#4E9487",
          },
          {
            name: "Domestic production used in the <Br> importer's exports",
            y: dataGrap1.value.usedInShare,
            total: dataGrap1.value.usedInValue,
            color: "#D83964",
          },
          {
            name: "Domestic production that returns via <br> the importer's exports",
            y: dataGrap1.value.returnShare,
            total: dataGrap1.value.retrunValue,
            color: "#EB9B38",
          },
          {
            name: "Domestic production consumed by the importer",
            y: dataGrap1.value.comsumedShare,
            total: dataGrap1.value.comsumedValue,
            color: "#4080B3",
          },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  });
};
//Chart2
const chart2 = () => {
  Highcharts.chart("container1", {
    chart: {
      type: "pie",
      borderRadius: 5,
      height: 400,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    legend: {
      padding: 30,
      alignColumns: false,
      width: 350,
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          // format: "<b>{point.percentage:.1f}</b> %",
          formatter: function () {
            if (this.point.percentage > 1.5) {
              return Highcharts.numberFormat(this.point.percentage, 1) + "%";
            }
          },
          distance: -50,
          color: "black",
        },
        showInLegend: true,
        borderWidth: 1,
        size: 200,
      },
    },

    tooltip: {
      formatter: function () {
        if (this.point.options.total >= 1000) {
          let tempNumber = (this.point.options.total / 1000).toFixed(1);
          return `<b>${this.point.name}</b><br>
              Share: ${this.y}%<br>
              Value:  $${tempNumber} billion`;
        } else {
          let tempNumber = this.point.options.total.toFixed(1);
          return `<b>${this.point.name}</b><br>
              Share: ${this.y}%<br>
              Value:  $${tempNumber} million`;
        }
      },
    },

    series: [
      {
        name: "Browsers",
        colorByPoint: true,
        data: [
          {
            name: "Foreign production consumed by the importer",
            y: dataGrap2.value.foreignShare,
            total: dataGrap2.value.foreignValue,
            color: "#9034AD",
          },
          {
            name: "Double counted",
            y: dataGrap2.value.doubleShare,
            total: dataGrap2.value.doubleValue,
            color: "#4E9487",
          },
          {
            name: "Domestic production used in the <Br> importer's exports",
            y: dataGrap2.value.usedInShare,
            total: dataGrap2.value.usedInValue,
            color: "#D83964",
          },
          {
            name: "Domestic production that returns via <br> the importer's exports",
            y: dataGrap2.value.returnShare,
            total: dataGrap2.value.retrunValue,
            color: "#EB9B38",
          },
          {
            name: "Domestic production consumed by the importer",
            y: dataGrap2.value.comsumedShare,
            total: dataGrap2.value.comsumedValue,
            color: "#4080B3",
          },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  });
};
//Chart3
const chart3 = () => {
  Highcharts.chart("container3", {
    chart: {
      type: "pie",
      borderRadius: 5,
      height: 400,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    legend: {
      padding: 30,
      alignColumns: false,
      width: 350,
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          // format: "<b>{point.percentage:.1f}</b> %",
          formatter: function () {
            if (this.point.percentage > 1.5) {
              return Highcharts.numberFormat(this.point.percentage, 1) + "%";
            }
          },
          distance: -50,
          color: "black",
        },
        showInLegend: true,
        borderWidth: 1,
        size: 200,
      },
    },

    tooltip: {
      formatter: function () {
        if (this.point.options.total >= 1000) {
          let tempNumber = (this.point.options.total / 1000).toFixed(1);
          return `<b>${this.point.name}</b><br>
              Share: ${this.y}%<br>
              Value:  $${tempNumber} billion`;
        } else {
          let tempNumber = this.point.options.total.toFixed(1);
          return `<b>${this.point.name}</b><br>
              Share: ${this.y}%<br>
              Value:  $${tempNumber} million`;
        }
      },
    },

    series: [
      {
        name: "Browsers",
        colorByPoint: true,
        data: [
          {
            name: "Foreign production consumed by the importer",
            y: dataGrap3.value.foreignShare,
            total: dataGrap3.value.foreignValue,
            color: "#9034AD",
          },
          {
            name: "Double counted",
            y: dataGrap3.value.doubleShare,
            total: dataGrap3.value.doubleValue,
            color: "#4E9487",
          },
          {
            name: "Domestic production used in the <Br> importer's exports",
            y: dataGrap3.value.usedInShare,
            total: dataGrap3.value.usedInValue,
            color: "#D83964",
          },
          {
            name: "Domestic production that returns via <br> the importer's exports",
            y: dataGrap3.value.returnShare,
            total: dataGrap3.value.retrunValue,
            color: "#EB9B38",
          },
          {
            name: "Domestic production consumed by the importer",
            y: dataGrap3.value.comsumedShare,
            total: dataGrap3.value.comsumedValue,
            color: "#4080B3",
          },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  });
};
//Chart4
const chart4 = () => {
  Highcharts.chart("container4", {
    chart: {
      type: "column",
      width: 450,
      height: 250,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      type: "category",
      categories: ["Value-added trade balance", "Gross trade Balance"],
    },
    yAxis: {
      labels: {
        formatter() {
          return `${this.value}%`;
        },
      },
      title: {
        text: "",
      },
    },
    legend: {
      enabled: true,
    },
    plotOptions: {
      column: {
        // stacking: "normal",
        dataLabels: {
          enabled: true,
          color: "black",
          inside: true,
          format: "{point.y}%",
        },
      },
    },
    tooltip: {
      headerFormat: "<b>Value-added/Gross trade balance</b><br>",
      pointFormat: "Value: {point.y:.1f}%<br/>",
    },

    series: setDataSection2.value,
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  });
};
//Chart5
const chart5 = () => {
  let setCategories = ["", "", "", "", ""];
  let maxData =
    backwardSection3Left.value[0].value > forwardSection3Left.value[0].value
      ? backwardSection3Left.value[0].value
      : forwardSection3Left.value[0].value;
  Highcharts.chart("container5", {
    chart: {
      type: "bar",
      height: 300,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: [
      {
        categories: setCategories,
        lineWidth: 0,
        borderWidth: 0,
        opposite: true,
        reversed: false,
      },
    ],
    yAxis: {
      borderWidth: 0,
      gridLineWidth: 0,
      lineWidth: 0,
      title: {
        text: null,
      },
      min: -maxData,
      max: maxData,
      labels: {
        enabled: false,
        formatter: function () {
          return Math.abs(this.value) + "%";
        },
      },
    },
    plotOptions: {
      bar: {
        stacking: "normal",
        dataLabels: {
          style: {
            textOutline: 0,
          },
          enabled: true,
          color: "black",
          formatter() {
            return `${this.point.country}, $${
              this.point.value > 1000
                ? (this.point.value / 1000).toFixed(2) + "B"
                : this.point.value.toFixed(2) + "M"
            }, ${this.point.precent.toFixed(2)}%`;
          },
        },
        groupPadding: 0,
        grouping: false,
      },
    },

    tooltip: {
      formatter: function () {
        let tempValue;
        if (this.point.value > 1000) {
          tempValue = (this.point.value / 1000).toFixed(2) + " billion";
        } else {
          tempValue = this.point.value.toFixed(2) + " million";
        }
        return (
          "<b>" +
          this.series.name +
          "</b><br/><b>" +
          this.point.country +
          "</b><br>" +
          "Value: " +
          tempValue
        );
      },
    },

    series: [
      {
        name: "Backward linkages (%)",
        data: backwardSection3Left.value,
        color: "#4472C4",
        dataLabels: {
          style: {
            fontSize: "10px",
            fontWeight: 500,
          },
          align: "right",
        },
      },
      {
        name: "Forward linkages (%)",
        data: forwardSection3Left.value,
        color: "#ED7D31",
        dataLabels: {
          style: {
            fontSize: "10px",
            fontWeight: 500,
          },
          align: "left",
        },
      },
    ],
    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  });
};
//Chart6
const chart6 = () => {
  let setCategories = ["", "", "", "", ""];
  let maxData =
    backwardSection3Right.value[0].value > forwardSection3Right.value[0].value
      ? backwardSection3Right.value[0].value
      : forwardSection3Right.value[0].value;
  Highcharts.chart("container6", {
    chart: {
      type: "bar",
      height: 300,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },

    xAxis: [
      {
        categories: setCategories,
        lineWidth: 0,
        borderWidth: 0,
        opposite: true,
        reversed: false,
      },
    ],
    yAxis: {
      borderWidth: 0,
      gridLineWidth: 0,
      lineWidth: 0,
      title: {
        text: null,
      },
      min: -maxData,
      max: maxData,
      labels: {
        enabled: false,
        formatter: function () {
          return Math.abs(this.value) + "%";
        },
      },
    },

    plotOptions: {
      bar: {
        stacking: "normal",
        dataLabels: {
          style: {
            textOutline: 0,
          },
          enabled: true,
          color: "black",
          formatter() {
            return `<span >${this.point.sector}, $${
              this.point.value > 1000
                ? (this.point.value / 1000).toFixed(2) + "B"
                : this.point.value.toFixed(2) + "M"
            }, ${this.point.precent}%</span>`;
          },
          allowOverlap: true,
          overflow: "allow",
          crop: false,
        },
        groupPadding: 0,
        grouping: false,
      },
    },
    tooltip: {
      formatter: function () {
        return false;
      },
    },
    tooltip: {
      formatter: function () {
        let tempValue;
        if (this.point.value > 1000) {
          tempValue = (this.point.value / 1000).toFixed(2) + " billion";
        } else {
          tempValue = this.point.precent.toFixed(2) + " million";
        }
        return (
          "<b>" +
          this.series.name +
          "</b><br/><b>" +
          this.point.sector +
          "</b><br>" +
          "Value: " +
          this.point.y
        );
      },
    },

    series: [
      {
        name: "Backward linkages (%)",
        data: backwardSection3Right.value,
        color: "#4472C4",

        dataLabels: {
          style: {
            fontSize: "9px",
            fontWeight: 500,
          },
          align: "right",
        },
      },
      {
        name: "Forward linkages (%)",
        data: forwardSection3Right.value,
        color: "#ED7D31",

        dataLabels: {
          style: {
            fontSize: "9px",
            fontWeight: 500,
          },
          align: "left",
        },
      },
    ],

    exporting: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  });
};
//Chart7
const chart7 = () => {
  Highcharts.chart("container7", {
    chart: {
      type: "column",
      height: 400,
      width: 650,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: countryListName.value,
      labels: {
        enabled: true,
        rotation: -45,
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        formatter() {
          return `${this.value}%`;
        },
      },
    },
    legend: {
      enabled: true,
      useHTML: true,
      align: "center",
      layout: "horizontal",
      alignColumns: false,
      width: 550,
      labelFormatter() {
        return `<div class='q-pr-sm q-pb-sm'>${this.name}</div>  `;
      },
    },
    tooltip: {
      useHTML: true,
      headerFormat: "<b>{point.x}</b><br/>",

      // pointFormat: "<div>{series.name}</div><div>Share: {point.y}%</div><div>Value: " + this + "</div>",

      pointFormatter: function () {
        return (
          // "<div> <span class=''>" + this.series.name + "</span>" +
          // "<br>" +
          // "Share: $" +
          // this.y +
          // "%" +
          // "</div>"

          `<div>
                <span>
                  ${this.series.name}
                </span>
                <br>
                Share : ${this.y}%
                <br>
                Value : $${this.options.value}
              </div>`
        );
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    series: [
      {
        name: "Domestic production used in the importer's exports (forward linkages)",
        data: purpleOutput.value,
        color: "#9034AD",
      },
      {
        name: "Foreign production consumed by the importer (backward linkages)",
        data: redOutput.value,
        color: "#D83964",
      },
      {
        name: "Double counted",
        data: greenOutput.value,
        color: "#4E9487",
      },
    ],
  });
};
//Chart8
const chart8 = () => {
  Highcharts.chart("container8", {
    chart: {
      type: "column",
      height: 400,
      width: 650,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: countryListNameG2.value,
      labels: {
        enabled: true,
        rotation: -45,
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        formatter() {
          return `${this.value}%`;
        },
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    tooltip: {
      formatter: function () {
        let svalue = 0;
        if (this.point.value >= 1000) {
          svalue = (this.point.value / 1000).toFixed(1) + " billion";
        } else {
          svalue = this.point.value.toFixed(1) + " million";
        }
        let yvalue = this.point.y.toFixed(1);
        return (
          "<b>" +
          countryListNameG2.value[this.point.x] +
          "</b><br/>" +
          this.series.name +
          "<br>Value: $" +
          svalue +
          "<br>Share: " +
          yvalue +
          "%"
        );
      },
    },
    series: [
      {
        name: "Asia-Pacific",
        data: asiaG2.value,
        color: "#4080B3",
      },
      {
        name: "Europe",
        data: europeG2.value,
        color: "#D83964",
      },
      {
        name: "North America",
        data: americaG2.value,
        color: "#EB9B38",
      },
      {
        name: "Latin America",
        data: latinG2.value,
        color: "#4E9487",
      },
      {
        name: "Rest of the world",
        data: restG2.value,
        color: "#9034AD",
      },
    ],
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  });
};

//Chart10
const chart10 = () => {
  Highcharts.chart("container10", {
    chart: {
      type: "column",
      height: 450,
      width: 650,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: g6CountryList.value,
      labels: {
        enabled: true,
        rotation: -45,
      },
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        formatter() {
          return `${this.value}%`;
        },
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    legend: {
      enabled: true,
      useHTML: true,
      align: "center",
      layout: "horizontal",
      alignColumns: false,
      width: 630,
      labelFormatter() {
        return `<div class='q-pr-sm q-pb-sm'>${this.name}</div>  `;
      },
    },
    series: [
      {
        name: "Asia-Pacific",
        data: g6AsiaPacific.value,
        color: "#4080B3",
      },
      {
        name: "Europe",
        data: g6Europe.value,
        color: "#D83964",
      },
      {
        name: "North America",
        data: g6NorthAmerica.value,
        color: "#EB9B38",
      },
      {
        name: "Latin America",
        data: g6Latin.value,
        color: "#4E9487",
      },
      {
        name: "Rest of the world",
        data: g6Rest.value,
        color: "#9034AD",
      },
    ],
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
  });
};
//Print Btn
const printBtn = () => {
  window.print();
};
//Download Btn
const downloadPDF = async () => {
  btnShow.value = false;
  await nextTick();
  let pages = document.getElementsByClassName("printPage");

  html2pdf(pages, {
    html2canvas: {
      scrollX: 0,
      scrollY: -window.scrollY,
    },
    jsPDF: {
      format: "a4",
    },

    imageType: "image/jpeg",
    output: "./pdf/generate.pdf",
  }).then(() => {
    btnShow.value = true;
  });
};

onBeforeMount(() => {
  if (route.params.ecoISO) {
    console.log("params");
    let temp = {
      economyISO: route.params.ecoISO,
      economyName: route.params.ecoName,
      year: route.params.year,
    };
    dataSend.value = temp;
    loadData();
  } else {
    let dataInput = LocalStorage.getItem("countryBrief");
    if (dataInput == null) {
      showError.value = true;
    } else {
      dataSend.value = dataInput;
      loadData();
      // console.log("dataSend: ", dataSend.value);
    }
  }
});
</script>

<style lang="scss" scoped>
.shareDia {
  width: 100%;
  max-width: 500px;
  height: 300px;
}
.bg-bar {
  background-image: linear-gradient(to right, #6e6b6b, #a5a1a1);
}
.break {
  break-after: page;
}

.boxGrey {
  background-color: #d9d9d9;
  height: 40px;
  line-height: 40px;
}
.set-p-right {
  padding-right: 0px;
}
.printPage {
  padding-top: 10px;
}
@media print {
  body {
    background-color: #fff;
  }

  .set-p-right {
    padding-right: 20px;
  }

  #printSection {
    display: none;
  }

  @page {
    margin: 0mm;
  }
}
</style>
