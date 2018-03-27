import * as types from '../mutation-types'
import hostApi from '../../api/hosts/host'
import {map, forEach, findIndex} from 'lodash'

function keyForHost(id) {
    return `host_${id}`
}

// initial state
const state = {
    hosts: {
        deleted: false,
    },
    hostsList: [],

}

// getters
const getters = {
    getHosts({hosts, hostsList}) {
        return _.map(hostsList, id => hosts[keyForHost(id)])
    },

}

const actions = {
    setHosts({commit}) {
        hostApi.fetch().then((res) => {
            commit(types.HOST_SET_ALL, {hostsData: res.data});

        }).catch((err) => {
            console.warn('Could not fetch hosts')
            console.log(err)
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
        hostApi.create(data).then((res) => {
            commit(types.HOST_ADD_NEW, {host: res.data});
            commit(types.LOADING_FINISH);
        }).catch((res) => {
            console.warn('Could not add new host');
            commit(types.HOST_ADD_NEW_FAILURE, {savedHosts, savedHostsList});
            commit(types.LOADING_FINISH);
        })
    },


    updateHost({commit}, data) {
        commit(types.LOADING_BEGIN);
        hostApi.update(id, data).then((res) => {
            commit(types.HOST_UPDATE_SUCCESS, {hosts: res.data});
            commit(types.LOADING_FINISH);
        }).catch((res) => {
            console.warn('Could not update host');
            commit(types.LOADING_FINISH);
        })
    }
}


const mutations = {
    [types.HOST_DELETE]({hosts, hostsList}, id) {
        const key = keyForHost(id)
        Vue.delete(hosts, key);

        const index = findIndex(hostsList, id);
        hostsList.splice(index, 1);
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
    },

    [types.HOST_ADD_NEW_SUCCESS](state) {
        console.log('new success')
    },

    [types.HOST_ADD_NEW_FAILURE](state, {savedHosts, savedHostsList}) {
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