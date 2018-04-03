import * as types from '../mutation-types'
import {forEach, map, pull, filter} from 'lodash'
import authApi from '../../api/auth/auth'
import userApi from '../../api/users/user'


function keyForUser(id) {
    return `user_${id}`
}

// initial state
const state = {
    isAuthenticated: !!localStorage.getItem('access_token'),
    currentUserId: '',
    users: {},
    usersList: [],
    deletedUser: {},
    userLoading: {
        isLoading: false,
        hasLoadingErrors: false,
    }
}


// getters
const getters = {
    isAuthenticated({isAuthenticated}) {
        return isAuthenticated;
    },

    getUserLoading({userLoading}) {
        return userLoading;
    },

    getCurrentFirstName({currentUserId, users}) {
        if (users[keyForUser(currentUserId)]) {
            return users[keyForUser(currentUserId)].firstName;
        }
        return "Loading";
    },

    getCurrentUser({currentUserId, users}) {
        return users[keyForUser(currentUserId)];
    },

    getUsers({users, usersList}) {
        return _.map(usersList, id => users[keyForUser(id)])
    },

    getUserIndexById: ({usersList}) => (userId) => {
        return usersList.findIndex(user => user == userId)
    },


}


// actions
const actions = {
    initUser({commit}) {
        return Promise.all([
            new Promise((resolve, reject) => {
                authApi.getUser().then((res) => {
                    commit(types.USER_SET_CURRENT, res.data);
                    resolve();
                }).catch(() => {
                    commit(types.USER_SET_CURRENT_FAILED);
                    reject('user data');
                })
            }),
            new Promise((resolve, reject) => {
                userApi.fetch().then((res) => {
                    commit(types.USER_SET_ALL, {usersData: res.data});
                    resolve();
                }).catch((error) => {
                    if(error.response) {
                        if (error.response.status === 404) {
                            console.warn('Could not fetch users');
                            if (error.response.data.error.code === 404) {
                                resolve();
                            }
                        } else {
                            console.log(error.response.data.error.message)
                        }
                    }
                    reject('all users');
                })
            })
        ])


    },

    getUsers({commit}) {
        commit(types.USER_LOADING_START);
        commit(types.LOADING_BEGIN);
        userApi.fetch().then((res) => {
            commit(types.USER_SET_ALL, {usersData: res.data});
            commit(types.USER_LOADING_SUCCESS);
            commit(types.LOADING_FINISH);

        }).catch((error) => {
            commit(types.USER_LOADING_FAILURE);
            commit(types.LOADING_FAIL);

            if (error.response.status === 404) {
                console.warn('Could not fetch users');

            } else {
                console.log(error.response.data.error.message)
            }
        })
    },


    deleteUser({commit, state}, id) {
        commit(types.USER_DELETE, id)
        commit(types.USER_LOADING_START);
        commit(types.LOADING_BEGIN);
        userApi.delete(id).then((res) => {
            commit(types.USER_DELETE_SUCCESS);
            commit(types.USER_LOADING_SUCCESS);
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            console.warn('Could not delete user');
            commit(types.USER_DELETE_FAILURE);
            commit(types.USER_LOADING_FAILURE);
            commit(types.LOADING_FAIL);
        })
    }
    ,


    createUser({commit}, data) {
        const savedUsers = state.users;
        const savedUsersList = state.usersList;
        commit(types.LOADING_BEGIN);
        commit(types.USER_LOADING_START);
        return new Promise((resolve, reject) => {
            userApi.create(data.hostId, data.user, data.type).then((res) => {
                commit(types.USER_ADD_NEW, {user: res.data});
                commit(types.LOADING_FINISH);
                commit(types.USER_LOADING_SUCCESS);
                resolve();
            }).catch((res) => {
                console.warn('Could not add new user');
                commit(types.USER_ADD_NEW_FAILURE, {savedUsers, savedUsersList});
                commit(types.LOADING_FAIL);
                commit(types.USER_LOADING_FAILURE);
                reject();
            })
        })
    }
    ,


    updateUser({commit}, data) {
        commit(types.LOADING_BEGIN);
        commit(types.USER_LOADING_START);
        userApi.update(data.userId, data.user).then((res) => {
            commit(types.USER_UPDATE_SUCCESS, {user: res.data});
            commit(types.LOADING_FINISH);
            commit(types.USER_LOADING_SUCCESS);
        }).catch((res) => {
            console.warn('Could not update user');
            commit(types.LOADING_FAIL);
            commit(types.USER_LOADING_FAILURE);
        })
    }
}

//mutations
const mutations = {
    [types.USER_SET_CURRENT](state, currentUser) {
        state.currentUserId = currentUser.id;
        state.isAuthenticated = true;
    },

    [types.USER_SET_CURRENT_FAILED](state) {
        state.isAuthenticated = false;
    },

    [types.USER_DELETE]({users, usersList}, id) {
        const key = keyForUser(id)
        state.deletedUser = users[key];
        Vue.delete(users, key);
        _.pull(usersList, id);
    },

    [types.USER_DELETE_FAILURE](state) {
        const key = keyForUser(state.deletedUser.id);
        state.usersList.push(state.deletedUser.id)
        Vue.set(state.users, key, state.deletedUser);
        state.deletedUser = {};
    },

    [types.USER_DELETE_SUCCESS](state) {
        state.deletedUser = {};
        console.log('delete success')
    },


    [types.USER_SET_ALL]({users, usersList}, {usersData}) {
        forEach(usersData, function (value) {
            const key = keyForUser(value.id)
            if (!users[key]) {
                usersList.push(value.id)
            }
            Vue.set(users, key, value)
        })
    },

    [types.USER_UPDATE_SUCCESS](state, {user}) {
        const key = keyForUser(user.id)
        state.users[key] = user;
    },

    [types.USER_ADD_NEW]({users, usersList}, {user}) {
        const key = keyForUser(user.id)
        if (!users[key]) {
            Vue.set(users, key, user)
            usersList.push(user.id)
        }
    },

    [types.USER_ADD_NEW_SUCCESS](state) {
        console.log('new success')
    },

    [types.USER_ADD_NEW_FAILURE](state, {savedUsers, savedUsersList}) {
        state.users = savedUsers;
        state.usersList = savedUsersList;
    },

    [types.USER_LOADING_START]({userLoading}) {
        userLoading.isLoading = true;
        userLoading.hasLoadingErrors = false;
    },

    [types.USER_LOADING_SUCCESS]({userLoading}) {
        userLoading.isLoading = false;
        userLoading.hasLoadingErrors = false;
    },

    [types.USER_LOADING_FAILURE]({userLoading}) {
        userLoading.isLoading = false;
        userLoading.hasLoadingErrors = true;
    }
}


export default {
    name: 'userStore',
    state,
    getters,
    actions,
    mutations
}