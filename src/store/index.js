import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import shared from './modules/shared'
import containers from './modules/containers'
import hosts from './modules/hosts'
// import createLogger from '../../../src/plugins/logger'


Vue.use(Vuex)


// const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
    modules: {
        user,
        shared,
        containers,
        hosts
    },
//   strict: debug,
//   plugins: debug ? [createLogger()] : []

})