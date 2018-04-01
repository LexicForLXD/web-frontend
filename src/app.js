import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'
import store from './store'
import {sync} from 'vuex-router-sync'
import progressbar from './progressbar'

window.Vue = Vue

window.axios = require('axios');
window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
};
// window.axios.defaults.withCredentials = true;

sync(store, router)

export default new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
})