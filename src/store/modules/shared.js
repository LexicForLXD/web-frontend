import * as types from '../mutation-types'
import initApi from '../../api/init/init'
// import { userStore } from './user'
import {assign} from 'lodash'

// initial state
const state = {
    initiated: false,
    loading: false,
}


// getters
const getters = {}


// actions
const actions = {
    initShared({commit, dispatch, state, rootState}) {
        return new Promise((resolve, reject) => {
            // initApi.fetch().then((res) => {
            if (!state.initiated) {
                dispatch('setContainers');
                dispatch('setHosts');
                dispatch('setProfiles');
                dispatch('initUser');


                commit(types.INIT_READY);
            }

            resolve()
            // }).catch((err) => {
            //   reject()
            //   console.log(err)
            //   console.warn('not able to fetch init data');
            // })
        })
    }
}

//mutations
const mutations = {
    [types.INIT_READY](state) {
        state.initiated = true
    },

    [types.LOADING_BEGIN](state) {
        state.loading = true;
    },

    [types.LOADING_FINISH](state) {
        state.loading = false;
    },

}


export default {
    name: 'sharedStore',
    state,
    getters,
    actions,
    mutations
}