<template>
  <div style="background-color: #7a7a7a">
    <!-- For PC -->
    <div class="gt-md mainApp">
      <video id="myVideo" autoplay loop muted style="width: 100%">
        <source type="video/mp4" src="../../public/images/bg-hd.webm" />
      </video>

      <div class="logoESCAP">
        <img
          src="../../public/images/unescaplogo.svg"
          alt=""
          style="height: 90px"
        />
      </div>

      <div class="boxCenter">
        <div class="text-center q-pa-md">
          <img
            src="../../public/images/logobig2.png"
            alt=""
            style="width: 80%"
          />
        </div>
        <div class="row justify-center">
          <div>
            <q-btn
              label="REGIONAL INTEGRATION ANALYZER"
              outline
              class="btnMain"
              @click="goToRI()"
            />
          </div>
          <div style="width: 30px"></div>
          <div>
            <q-btn
              label="VALUE CHAIN ANALYZER"
              outline
              class="btnMain"
              @click="goToVA()"
            />
          </div>
        </div>
      </div>
      <div style="position: absolute; bottom: 0px; width: 100%">
        <footerMain />
      </div>
    </div>
    <!-- For Tablet -->
    <div class="lt-lg gt-xs tabletBG">
      <div class="q-pa-md">
        <img
          src="../../public/images/unescaplogo.svg"
          alt=""
          style="height: 80px"
        />
      </div>
      <div class="text-center q-pa-md">
        <img src="../../public/images/logobig2.png" alt="" style="width: 80%" />
      </div>
      <div>
        <div class="text-center">
          <q-btn
            label="Regional Integration Analyzer"
            outline
            rounded
            class="btnMainTablet"
            no-caps
            @click="goToRI()"
          />
        </div>
        <div class="text-center q-pt-md">
          <q-btn
            label="Value Chain Analyzer"
            outline
            rounded
            class="btnMainTablet"
            no-caps
            @click="goToVA()"
          />
        </div>
      </div>
      <footerMain />
    </div>
    <!-- For Mobile -->
    <div class="lt-sm mobileBG">
      <div class="q-pa-sm">
        <img
          src="../../public/images/unescaplogo.svg"
          alt=""
          style="height: 50px"
        />
      </div>
      <div class="text-center q-pa-md">
        <img src="../../public/images/logobig2.png" alt="" style="width: 80%" />
      </div>
      <div>
        <div class="text-center">
          <q-btn
            label="Regional Integration Analyzer"
            outline
            rounded
            class="btnMainMobile"
            no-caps
            @click="goToRI()"
          />
        </div>
        <div class="text-center q-pt-md">
          <q-btn
            label="Value Chain Analyzer"
            outline
            rounded
            class="btnMainMobile"
            no-caps
            @click="goToVA()"
          />
        </div>
      </div>
      <footerMain />
    </div>
  </div>
</template>

<script setup>
import footerMain from "../components/footer.vue";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";
import { onMounted, ref } from "vue";
const router = useRouter();
const { proxy } = getCurrentInstance();

const goToVA = () => {
  // ส่ง Event ไปยัง Google Analytics
  proxy.$gtag.event("value_chain_analyzer_click", {
    // พารามิเตอร์เพิ่มเติม (ถ้าจำเป็น)
    button_name: "Value Chain Analyzer",
    page_title: "Welcome Page",
    page_path: "/welcome",
  });
  router.push("/gvcrelationships");
};
const goToRI = () => {
  // ส่ง Event ไปยัง Google Analytics
  proxy.$gtag.event("regional_integration_analyzer_click", {
    button_name: "Regional Integration Analyzer",
    page_title: "Welcome Page",
    page_path: "/welcome",
  });

  router.push("/rioverview");
};
onMounted(() => {
  // Clear sessionStorage key "reloaded"
  sessionStorage.removeItem("reloaded");
  if (!sessionStorage.getItem("reloaded2")) {
    sessionStorage.setItem("reloaded2", "true");
    location.reload();
  }
});
</script>

<style lang="scss" scoped>
// For PC
.mainApp {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  background-color: #161616;
  min-height: 100vh;
  position: relative;
}
.logoESCAP {
  position: absolute;
  top: 20px;
  left: 20px;
}
.langBar {
  position: absolute;
  top: 20px;
  right: 20px;
}
.boxCenter {
  width: 800px;
  height: 280px;
  border-radius: 5px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  left: calc(50% - 365px);
  position: absolute;
  top: calc((100vh - 190px - 240px) / 2);
}
.btnMain {
  color: #f99704;
  font-size: 18px;
  width: 350px;

  border-radius: 5px;
}

// For Mobile
.mobileBG {
  background-color: #161616;
  height: 100dvh;
  background-image: url("../../public/images/bgmobile.jpg");
  background-size: cover;
}
.btnMainMobile {
  color: white;
  width: 250px;
}

// For Tablet
.tabletBG {
  background-color: #161616;
  height: 100dvh;
  background-image: url("../../public/images/bgTablet.jpg");
  background-size: cover;
}
.btnMainTablet {
  color: white;
  width: 450px;
  font-size: 24px;
}
</style>
