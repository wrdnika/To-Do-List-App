import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import * as LucideIcons from "lucide-vue-next";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Versi baru tersedia. Muat ulang sekarang?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("wrdnika siap digunakan secara offline.");
  },
});

const app = createApp(App);
app.use(router);
Object.entries(LucideIcons).forEach(([key, component]) => {
  app.component(key, component);
});
app.mount("#app");
