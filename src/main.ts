import Vue from "vue";
//import './plugins/axios';
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import iView from "iview";
import "iview/dist/styles/iview.css";

Vue.config.productionTip = false;
/* Vue.prototype.$http = axios */
Vue.use(iView)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
