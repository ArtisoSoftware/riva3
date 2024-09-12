<template>
  <div class="bgva" style="width: 100%; max-width: 1400px">
    <div class="row justify-between">
      <div class="row">
        <div class="q-pa-md">
          <img
            src="../../public/images/unescaplogo.svg"
            alt=""
            style="height: 60px"
          />
        </div>
        <div style="padding-top: 25px">
          <img
            src="../../public/images/home.png"
            alt=""
            class="cursor-pointer"
            @click="goToHome()"
          />
        </div>
      </div>
      <div class="row text-white q-pa-md" style="font-size: 16px">
        <div>Download data</div>
        <div class="q-px-lg cursor-pointer" @click="goToCountryBrief">
          Country briefs
        </div>
        <div>
          <span @click="goToNote" class="cursor-pointer">Technical notes</span>
        </div>
      </div>
    </div>
    <div class="q-px-lg">
      <div class="col text-white text-center" style="font-size: 48px">
        Global Value Chains
      </div>

      <div
        class="text-white text-center"
        style="font-size: 28px; line-height: 36px; font-weight: 300"
      >
        <div>
          Gain insight into your economy's participation in global value chains
          (GVCs).
        </div>
        <div>
          Uncover the sources of intermediate inputs and destinations of
          domestic value-added.
        </div>
      </div>
    </div>
    <div class="row justify-between" style="padding-top: 60px">
      <div class="row q-px-lg">
        <div>
          <q-btn
            label="User guide"
            no-caps
            outline
            color="white"
            class="btnleft"
            @click="goToUserGuide()"
          />
        </div>
        <div style="width: 10px"></div>
        <div>
          <q-btn
            label="Demostration video"
            no-caps
            outline
            color="white"
            class="btnleft"
            @click="goToDemo()"
          />
        </div>
      </div>
      <div class="row q-px-lg">
        <div>
          <q-btn
            label="Share"
            no-caps
            outline
            color="white"
            class="btnright"
            icon="fa-solid fa-share"
            :disable="!shareContent"
            @click="isShareShow = true"
          />
        </div>
        <div style="width: 10px"></div>
        <div>
          <q-btn
            label="Tina Link"
            no-caps
            outline
            color="white"
            class="btnright"
            icon="fa-solid fa-link"
            :disable="!tinaLink"
            @click="goToTinaLink"
          />
        </div>
      </div>
    </div>

    <!-- Demo VDO Dialog -->
    <q-dialog v-model="demoDia" persistent>
      <q-card class="vdoDemoDiv q-pa-md">
        <div class="text-right">
          <q-icon
            name="fa-solid fa-xmark"
            size="20px"
            class="cursor-pointer"
            @click="demoDia = false"
          />
        </div>
        <div class="q-pt-md">
          <video :src="vdoURL" controls style="width: 100%"></video>
        </div>
      </q-card>
    </q-dialog>

    <!-- Share btn -->
    <q-dialog v-model="isShareShow" persistent>
      <q-card class="shareDia q-pa-md">
        <div class="row justify-between">
          <div>Share</div>
          <div class="cursor-pointer" @click="isShareShow = false">
            <q-icon name="fa-solid fa-xmark" size="20px" />
          </div>
        </div>
        <div class="row justify-between q-px-lg q-py-lg">
          <div>
            <ShareNetwork
              network="facebook"
              :url="shareContent"
              title="RIVA - A Revolutionary Platform"
              description="Discover the RIVA platform by the United Nations"
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
              :url="shareContent"
              title="RIVA - A Revolutionary Platform"
              description="Discover the RIVA platform by the United Nations"
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
              :url="shareContent"
              title="RIVA - A Revolutionary Platform"
              description="Discover the RIVA platform by the United Nations"
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
            <div class="col ellipsis">{{ shareContent }}</div>
            <div
              style="width: 40px; color: #1996d4; font-weight: 600"
              class="text-right cursor-pointer"
              @click="copyToClipboard"
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
import { serverSetup } from "../pages/server.js";
import { ref } from "vue";
import { Notify } from "quasar";
import { useRouter } from "vue-router";
const { serverData } = serverSetup();
const props = defineProps({
  shareContent: {
    type: String,
    required: true,
  },
  tinaLink: {
    type: String,
    default: "",
  },
});

const goToUserGuide = () => {
  window.open(serverData.value + "intro", "_blank");
};
const goToNote = () => {
  window.open(serverData.value + "note", "_blank");
};

const router = useRouter();
const goToHome = () => {
  router.push("/");
};
const goToCountryBrief = () => {
  router.push("/countrybrief");
};
const demoDia = ref(false);
const goToDemo = () => {
  demoDia.value = true;
};

const vdoURL = ref(serverData.value + "demo/demo.webm");

//share
const isShareShow = ref(false);

// ฟังก์ชันเพื่อคัดลอกข้อความไปยังคลิปบอร์ด
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.shareContent);
    isShareShow.value = false;
    Notify.create({
      message: "Copied to clipboard",
      color: "positive",
      position: "top",
      icon: "fa-solid fa-circle-check",
    });
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
const goToTinaLink = () => {
  if (props.tinaLink) {
    window.open(props.tinaLink, "_blank");
  }
};
</script>

<style lang="scss" scoped>
.bgva {
  background-image: url("../../public/images/bgva.jpg");
  height: 360px;
}
.btnleft {
  width: 180px;
}
.btnright {
  width: 140px;
}
.vdoDemoDiv {
  width: 100%;
  max-width: 800px;
  overflow: hidden;
}
.shareDia {
  width: 100%;
  max-width: 500px;
  height: 300px;
}
.boxGrey {
  background-color: #d9d9d9;
  height: 40px;
  line-height: 40px;
}
</style>
