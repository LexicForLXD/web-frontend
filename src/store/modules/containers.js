import * as types from '../mutation-types'
import containerApi from '../../api/containers/container'
import { map, forEach, findIndex } from 'lodash'

function keyForContainer(id) {
    return `container_${id}`
}

  // initial state
const state = {
    containers: {
      deleted: false,
    },
    containersList: [],

}

// getters
const getters = {
    getContainers({ containers, containersList }) {
      return _.map(containersList, id => containers[keyForContainer(id)])
    },

}

const actions = {
  setContainers({ commit }) {
    containerApi.fetch().then((res) => {
      commit(types.CONTAINER_SET_ALL, { containersData: res.data });

    }).catch((err) => {
      console.warn('Could not fetch containers')
      console.log(err)
    })
  },


  deleteContainer({ commit, state }, id) {
    const savedContainers = state.containers;
    const savedContainersList = state.containersList;
    commit(types.CONTAINER_DELETE, id)
    containerApi.delete(id).then((res) => {
      commit(types.CONTAINER_DELETE_SUCCESS);
    }).catch((res) => {
      console.warn('Could not delete container');
      commit(types.CONTAINER_DELETE_FAILURE, { savedContainers, savedContainersList });
    })
  },


  createContainer({ commit }, data) {
    const savedContainers = state.containers;
    const savedContainersList = state.containersList;
    commit(types.LOADING_BEGIN);
    containerApi.create(data).then((res) => {
      commit(types.CONTAINER_ADD_NEW, { container: res.data });
      commit(types.LOADING_FINISH);
    }).catch((res) => {
      console.warn('Could not add new container');
      commit(types.CONTAINER_ADD_NEW_FAILURE, { savedContainers, savedContainersList });
      commit(types.LOADING_FINISH);
    })
  },


  updateContainer({ commit }, data) {
    commit(types.LOADING_BEGIN);
    workoutsApi.update(id, data).then((res) => {
      commit(types.CONTAINER_UPDATE_SUCCESS, { containers: res.data });
      commit(types.LOADING_FINISH);
    }).catch((res) => {
      console.warn('Could not update container');
      commit(types.LOADING_FINISH);
    })
  }
}


const mutations = {
    [types.CONTAINER_DELETE]({ containers, containersList }, id) {
        const key = keyForContainer(id)
        Vue.delete(containers, key);

        const index = findIndex(containersList, id);
        containersList.splice(index, 1);
      },

      [types.CONTAINER_DELETE_FAILURE](state, { savedContainers, savedContainersList }) {
        console.log('delete failure');

        state.containers = savedContainers;
        state.containersList = savedContainersList;
      },

      [types.CONTAINER_DELETE_SUCCESS](state) {
        console.log('delete success')
      },


      [types.CONTAINER_SET_ALL]({ containers, containersList }, { containersData }) {
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

      [types.CONTAINER_ADD_NEW]({ containers, containersList }, { container }) {
        const key = keyForContainer(container.id)
        if (!containers[key]) {
          Vue.set(containers, key, container)
          containersList.push(container.id)
        }
      },

      [types.CONTAINER_ADD_NEW_SUCCESS](state) {
        console.log('new success')
      },

      [types.CONTAINER_ADD_NEW_FAILURE](state, { savedContainers, savedContainersList }) {
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