<template>
  <div class="bgva">
    <div class="row justify-between">
      <div class="row">
        <div class="q-pa-md">
          <img
            src="../../public/images/unescaplogo.svg"
            alt=""
            style="height: 80px"
          />
        </div>
        <div style="padding-top: 25px">
          <img src="../../public/images/home.png" alt="" />
        </div>
      </div>
      <div class="row text-white q-pa-md" style="font-size: 20px">
        <div>Download data</div>
        <div class="q-px-lg">Country briefs</div>
        <div>Technical notes</div>
      </div>
    </div>
    <div class="q-px-lg">
      <div class="col text-white text-center" style="font-size: 80px">
        Global Value Chains
      </div>
      <div
        class="text-white text-center"
        style="font-size: 24px; line-height: 36px; font-weight: 300"
      >
        <div>
          Gain insight into your economy’s participation in global value chains
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
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bgva {
  background-image: url("../../public/images/bgva.jpg");
  height: 420px;
}
.btnleft {
  width: 180px;
}
.btnright {
  width: 140px;
}
</style>
