import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import shared from './modules/shared'
import containers from './modules/containers'
import hosts from './modules/hosts'
import profiles from './modules/profiles'
import images from './modules/images'
// import createLogger from '../../../src/plugins/logger'


Vue.use(Vuex)


// const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
    modules: {
        user,
        shared,
        containers,
        hosts,
        profiles,
        images
    },
//   strict: debug,
//   plugins: debug ? [createLogger()] : []

})