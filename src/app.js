import Vue from "vue";
import App from "./App.vue";
import router from "./routes.js";
import store from "./store";
import { sync } from "vuex-router-sync";
import Vuetify from "vuetify";
import VueCookies from "vue-cookies";
import JobOverview from "./components/jobs/JobOverview.vue";
import progressbar from "./progressbar";

window.Vue = Vue;

window.axios = require("axios");
window.axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest"
};
// window.axios.defaults.withCredentials = true;

Vue.component("job-overview", JobOverview);
Vue.use(Vuetify);
Vue.use(VueCookies);
sync(store, router);

export default new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
