import * as types from '../mutation-types'
import containerApi from '../../api/containers/container'
import {map, forEach, pull, filter} from 'lodash'

function keyForContainer(id) {
    return `container_${id}`
}

// initial state
const state = {
    containers: {
        deleted: false,
    },
    deletedContainer:{},
    containersList: [],

}

// getters
const getters = {
    getContainers({containers, containersList}) {
        return _.map(containersList, id => containers[keyForContainer(id)])
    },

    getContainersByIds: (state) => (ids) => {
        return _.map(ids, id => state.containers[keyForContainer(id)])
    },

    getContainersFromHost: (state) => (hostId) => {
        return _.filter(state.containers, ['host.id', hostId]);
    },

    getContainerIndexById: ({containersList}) => (containerId) => {
        return containersList.findIndex(container => container == containerId)
    }
}

const actions = {
    setContainers({commit}) {
        containerApi.fetch().then((res) => {
            commit(types.CONTAINER_SET_ALL, {containersData: res.data});
        }).catch((error) => {
            if (error.response.status != 404) {
                console.warn('Could not fetch containers');
            } else {
                console.log(error.response.data.error.message)
            }
        })
    },


    deleteContainer({commit, state}, id) {
        commit(types.CONTAINER_DELETE, id)
        containerApi.delete(id).then((res) => {
            commit(types.CONTAINER_DELETE_SUCCESS);
        }).catch((error) => {
            console.warn('Could not delete container');
            commit(types.CONTAINER_DELETE_FAILURE);
        })
    }
    ,


    createContainer({commit}, data) {
        const savedContainers = state.containers;
        const savedContainersList = state.containersList;
        commit(types.LOADING_BEGIN);
        return new Promise((resolve, reject) => {
            containerApi.create(data.hostId, data.container, data.type).then((res) => {
                commit(types.CONTAINER_ADD_NEW, {container: res.data});
                commit(types.LOADING_FINISH);
                resolve();
            }).catch((res) => {
                console.warn('Could not add new container');
                commit(types.CONTAINER_ADD_NEW_FAILURE, {savedContainers, savedContainersList});
                commit(types.LOADING_FINISH);
                reject();
            })
        })
    }
    ,


    updateContainer({commit}, data) {
        commit(types.LOADING_BEGIN);
        containerApi.update(data.hostId, data).then((res) => {
            commit(types.CONTAINER_UPDATE_SUCCESS, {containers: res.data});
            commit(types.LOADING_FINISH);
        }).catch((res) => {
            console.warn('Could not update container');
            commit(types.LOADING_FINISH);
        })
    }
}


const mutations = {
    [types.CONTAINER_DELETE]({containers, containersList}, id) {
        const key = keyForContainer(id)
        state.deletedContainer = containers[key];
        Vue.delete(containers, key);
        _.pull(containersList, id);
    },

    [types.CONTAINER_DELETE_FAILURE](state) {
        const key = keyForContainer(state.deletedContainer.id);
        state.containersList.push(state.deletedContainer.id)
        Vue.set(state.containers, key, state.deletedContainer);
        state.deletedContainer = {};
    },

    [types.CONTAINER_DELETE_SUCCESS](state) {
        state.deletedContainer = {};
        console.log('delete success')
    },


    [types.CONTAINER_SET_ALL]({containers, containersList}, {containersData}) {
        forEach(containersData, function (value) {
            const key = keyForContainer(value.id)
            if (!containers[key]) {
                containersList.push(value.id)
            }
            Vue.set(containers, key, value)
        })
    },

    [types.CONTAINER_UPDATE_SUCCESS](state, container) {
        const key = keyForContainer(container.id)

        state.containers[key] = container;
    },

    [types.CONTAINER_ADD_NEW]({containers, containersList}, {container}) {
        const key = keyForContainer(container.id)
        if (!containers[key]) {
            Vue.set(containers, key, container)
            containersList.push(container.id)
        }
    },

    [types.CONTAINER_ADD_NEW_SUCCESS](state) {
        console.log('new success')
    },

    [types.CONTAINER_ADD_NEW_FAILURE](state, {savedContainers, savedContainersList}) {
        state.containers = savedContainers;
        state.containersList = savedContainersList;
    }

}


export default {
    state,
    getters,
    actions,
    mutations
}