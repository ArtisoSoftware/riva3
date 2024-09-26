// src/boot/vue-gtag.js
import { boot } from "quasar/wrappers";
import VueGtag from "vue-gtag-next";

export default boot(({ app }) => {
  app.use(VueGtag, {
    property: {
      id: "G-41WRYN6L1E", // ใส่ Measurement ID ของคุณที่นี่
    },
  });
});
