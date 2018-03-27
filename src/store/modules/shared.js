import * as types from '../mutation-types'
import initApi from '../../api/init/init'
// import { userStore } from './user'
import { assign } from 'lodash'

// initial state
const state = {
  initiated: false
}


// getters
const getters = {

}


// actions
const actions = {
  initShared({ commit, dispatch, state, rootState}) {
    return new Promise((resolve, reject) => {
      // initApi.fetch().then((res) => {
        if(!state.initiated) {
          // dispatch('initUser', { currentUser: res.data.data.currentUser })

          // dispatch('initTypes', { types: res.data.data.types })

          // // dispatch('initWorkouts', {workoutsInit: res.data.data.workoutsData})
          dispatch('setContainers');
          dispatch('setHosts');
          // dispatch('setCurrentAthleteWorkouts', res.data.data.currentUser.id)
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
  [types.INIT_READY] (state) {
    state.initiated = true
  }
}


export default {
  name: 'sharedStore',
  state,
  getters,
  actions,
  mutations
}