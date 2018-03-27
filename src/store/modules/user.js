import * as types from '../mutation-types'
import { forEach } from 'lodash'
// import stub from './'

// initial state
const state = {
  isAuthenticated: !!localStorage.getItem('access_token'),
  currentUser: {
    roles: [],
    clubs: [],
    email: '',
    first_name: '',
    last_name: ''
  },
  athletes: []
}


// getters
const getters = {
  isAuthenticated({isAuthenticated}) {
    return isAuthenticated;
  },

  isAdmin({currentUser}) {
    let result = false
    forEach(currentUser.roles, function(value) {
      if(value.slug.localeCompare('admin') == 0) {
        result = true;
      }
    })
    return result
  },

  isCoach({currentUser}) {
    let result = false;
    forEach(currentUser.roles, function(value) {
      if(value.slug.localeCompare('coach') == 0){
        result = true;
      }
    })
    return result;
  },

  isAthlete({currentUser}) {
    let result = false;
    forEach(currentUser.roles, function(value) {
      if(value.slug.localeCompare('athlete') == 0){
        result = true;
      }
    })
    return result;
  },

  getUserid({currentUser}) {
    return currentUser.id
  }

}


// actions
const actions = {
  initUser({ commit}, currentUser) {
    commit(types.USER_SET_CURRENT, currentUser);
  }
}

//mutations
const mutations = {
  [types.USER_SET_CURRENT] ( state, {currentUser}) {
    state.currentUser = currentUser;
    state.isAuthenticated = true;
  }
}


export default {
  name: 'userStore',
  state,
  getters,
  actions,
  mutations
}