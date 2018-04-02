import * as types from '../mutation-types'
import app from '../../app'
import {assign} from 'lodash'

// initial state
const state = {
    initiated: false,
    loading: false,
}


// getters
const getters = {
    getInitiated({initiated}) {
        return initiated;
    }
}


// actions
const actions = {
    initShared({commit, dispatch, state, rootState}) {
        return Promise.all([
            dispatch('initContainers'),
            dispatch('initHosts'),
            dispatch('initProfiles'),
            dispatch('initUser'),
            dispatch('initImages'),
        ]).then(() => {
            console.log('init ready');
            commit(types.INIT_READY);
        }).catch((reason) => {
            console.warn('not able to fetch init data');
            console.log(reason)
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
        app.$Progress.start();
    },

    [types.LOADING_FINISH](state) {
        state.loading = false;
        app.$Progress.finish();
    },

    [types.LOADING_FAIL](state) {
        state.loading = false;
        app.$Progress.fail()
    },

}


export default {
    name: 'sharedStore',
    state,
    getters,
    actions,
    mutations
}