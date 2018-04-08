import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import shared from './modules/shared'
import containers from './modules/containers'
import hosts from './modules/hosts'
import profiles from './modules/profiles'
import images from './modules/images'
import backupDestinations from "./modules/backupDestinations";
import backupSchedules from "./modules/backupSchedules";
import backups from "./modules/backups"
// import createLogger from '../../../src/plugins/logger'


Vue.use(Vuex);


// const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
    modules: {
        users,
        shared,
        containers,
        hosts,
        profiles,
        images,
        backupDestinations,
        backupSchedules,
        backups,
    },
  strict: true,
//   plugins: debug ? [createLogger()] : []

})