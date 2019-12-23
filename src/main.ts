import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import { Message } from "iview";
import "@/router/permission";
import iView from "iview";
import "iview/dist/styles/iview.css";

Vue.prototype.$Message = Message;

Vue.use(iView);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
