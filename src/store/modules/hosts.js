import * as types from '../mutation-types'
import hostApi from '../../api/hosts/host'
import {map, forEach, pull} from 'lodash'

function keyForHost(id) {
    return `host_${id}`
}

// initial state
const state = {
    hosts: {
        deleted: false,
    },
    hostsList: [],
    hostErrors: {}

}

// getters
const getters = {
    getHosts({hosts, hostsList}) {
        return _.map(hostsList, id => hosts[keyForHost(id)])
    },

    getHostErrors({hostErrors}) {
        return hostErrors;
    }

}

const actions = {
    setHosts({commit}) {
        hostApi.fetch().then((res) => {
            commit(types.HOST_SET_ALL, {hostsData: res.data});
        }).catch((error) => {
            if(error.response.status != 404) {
                console.warn('Could not fetch hosts');
            } else {
                console.log(error.response.data.error.message)
            }
        })
    },


    deleteHost({commit, state}, id) {
        const savedHosts = state.hosts;
        const savedHostsList = state.hostsList;
        commit(types.HOST_DELETE, id)
        hostApi.delete(id).then((res) => {
            commit(types.HOST_DELETE_SUCCESS);
        }).catch((res) => {
            console.warn('Could not delete host');
            commit(types.HOST_DELETE_FAILURE, {savedHosts, savedHostsList});
        })
    },


    createHost({commit}, data) {
        const savedHosts = state.hosts;
        const savedHostsList = state.hostsList;
        commit(types.LOADING_BEGIN);
        return new Promise((resolve, reject) => {
            hostApi.create(data).then((res) => {
                commit(types.HOST_ADD_NEW, {host: res.data});
                commit(types.LOADING_FINISH);
                resolve();
            }).catch((error) => {
                console.warn('Could not add new host');
                commit(types.HOST_ADD_NEW_FAILURE, {savedHosts, savedHostsList, error: error});
                commit(types.LOADING_FINISH);
                reject();
            })
        })
    },


    updateHost({commit}, data) {
        commit(types.LOADING_BEGIN);
        hostApi.update(data.host_id, data.host).then((res) => {
            commit(types.HOST_UPDATE_SUCCESS, res.data);
            commit(types.LOADING_FINISH);
        }).catch((res) => {
            console.warn('Could not update host');
            commit(types.LOADING_FINISH);
        })
    },

    authHost({commit}, data) {
        commit(types.LOADING_BEGIN);
        hostApi.auth(data.host_id, data.password).then((res) => {
            hostApi.show(data.host_id).then((res) => {
                commit(types.HOST_UPDATE_SUCCESS, res.data);
                commit(types.LOADING_FINISH);
            })
        }).catch((err) => {
            console.warn('Could not authenticate host');
            commit(types.LOADING_FINISH);
        })
    }
}


const mutations = {
    [types.HOST_DELETE]({hosts, hostsList}, id) {
        const key = keyForHost(id)
        Vue.delete(hosts, key);

        _.pull(hostsList, id);
    },

    [types.HOST_DELETE_FAILURE](state, {savedHosts, savedHostsList}) {
        console.log('delete failure');

        state.hosts = savedHosts;
        state.hostsList = savedHostsList;
    },

    [types.HOST_DELETE_SUCCESS](state) {
        console.log('delete success')
    },


    [types.HOST_SET_ALL]({hosts, hostsList}, {hostsData}) {
        forEach(hostsData, function (value) {

            const key = keyForHost(value.id)

            if (!hosts[key]) {
                hostsList.push(value.id)
            }
            Vue.set(hosts, key, value)

        })
    },

    [types.HOST_UPDATE_SUCCESS](state, host) {
        const key = keyForHost(host.id)

        state.hosts[key] = host;
    },

    [types.HOST_ADD_NEW]({hosts, hostsList}, {host}) {
        const key = keyForHost(host.id)
        if (!hosts[key]) {
            Vue.set(hosts, key, host)
            hostsList.push(host.id)
        }
        console.log('new success')
        state.hostErrors = {};
    },

    [types.HOST_ADD_NEW_SUCCESS](state) {
        console.log('new success')
        state.hostErrors = {};
    },

    [types.HOST_ADD_NEW_FAILURE](state, {savedHosts, savedHostsList, error}) {
        state.hostErrors = error.response.data;
        state.hosts = savedHosts;
        state.hostsList = savedHostsList;
    }

}


export default {
    state,
    getters,
    actions,
    mutations
}