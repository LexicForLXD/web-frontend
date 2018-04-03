import * as types from '../mutation-types'
import hostApi from '../../api/hosts/host'
import {map, forEach, pull, find, findIndex} from 'lodash'

function keyForHost(id) {
    return `host_${id}`
}

// initial state
const state = {
    hosts: {
        deleted: false,
    },
    hostsList: [],
    hostErrors: {},
    hostLoading: {
        isLoading: false,
        hasLoadingErrors: false,
    }


}

// getters
const getters = {
    getHosts({hosts, hostsList}) {
        return _.map(hostsList, id => hosts[keyForHost(id)])
    },

    getHostErrors({hostErrors}) {
        return hostErrors;
    },

    getHostById: ({hosts}) => (hostId) => {
        return _.find(hosts, ['id', hostId]);
    },

    getHostIndexById: ({hostsList}) => (hostId) => {
        return hostsList.findIndex(host => host == hostId);
    },

    getHostLoading({hostLoading}) {
        return hostLoading;
    },

}

const actions = {
    setHosts({commit}) {
        commit(types.HOST_LOADING_START);
        commit(types.LOADING_BEGIN);
        hostApi.fetch().then((res) => {
            commit(types.HOST_SET_ALL, {hostsData: res.data});
            commit(types.HOST_LOADING_SUCCESS);
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.HOST_LOADING_FAILURE);
            commit(types.LOADING_FAIL);
            if(error.response) {
                if(error.response.status != 404) {
                    console.warn('Could not fetch hosts');
                }
            } else {
                console.log(error);
            }

        })
    },

    initHosts({commit}) {
        return new Promise((resolve, reject) => {
            hostApi.fetch().then((res) => {
                commit(types.HOST_SET_ALL, {hostsData: res.data});
                resolve();
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 404) {
                        console.warn('Could not fetch hosts');
                        if(error.response.data.error.code === 404) {
                            resolve();
                        }
                    }
                } else {
                    console.log(error);
                    reject(error);
                }

            })
        });

    },


    deleteHost({commit, state}, id) {
        const savedHosts = state.hosts;
        const savedHostsList = state.hostsList;
        commit(types.HOST_DELETE, id);
        commit(types.LOADING_BEGIN);
        hostApi.delete(id).then((res) => {
            commit(types.HOST_DELETE_SUCCESS);
            commit(types.LOADING_FINISH);
        }).catch((res) => {
            console.warn('Could not delete host');
            commit(types.HOST_DELETE_FAILURE, {savedHosts, savedHostsList});
            commit(types.LOADING_FAIL);
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
                commit(types.LOADING_FAIL);
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
            commit(types.LOADING_FAIL);
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
            commit(types.LOADING_FAIL);
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
    },

    [types.HOST_LOADING_START] ({hostLoading}) {
        hostLoading.isLoading = true;
        hostLoading.hasLoadingErrors = false;
    },

    [types.HOST_LOADING_SUCCESS] ({hostLoading}) {
        hostLoading.isLoading = false;
        hostLoading.hasLoadingErrors = false;
    },

    [types.HOST_LOADING_FAILURE] ({hostLoading}) {
        hostLoading.isLoading = false;
        hostLoading.hasLoadingErrors = true;
    }


}


export default {
    state,
    getters,
    actions,
    mutations
}