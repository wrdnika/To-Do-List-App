import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import * as LucideIcons from "lucide-vue-next";

const app = createApp(App);

Object.entries(LucideIcons).forEach(([key, component]) => {
  app.component(key, component);
});

app.mount("#app");
