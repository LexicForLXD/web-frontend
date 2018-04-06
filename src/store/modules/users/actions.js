import userApi from "../../../api/users/user";
import authApi from "../../../api/auth/auth";
import * as types from "../../mutation-types";

export default {
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
            userApi.create(data).then((res) => {
                commit(types.USER_ADD_NEW, {user: res.data});
                commit(types.LOADING_FINISH);
                commit(types.USER_LOADING_SUCCESS);
                commit(types.USER_NO_ERRORS);
                resolve();
            }).catch((error) => {
                console.warn('Could not add new user');
                commit(types.USER_ADD_NEW_FAILURE, {savedUsers, savedUsersList});
                commit(types.LOADING_FAIL);
                commit(types.USER_LOADING_FAILURE);
                commit(types.USER_ERRORS, error);
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
            commit(types.USER_NO_ERRORS);
        }).catch((error) => {
            console.warn('Could not update user');
            commit(types.LOADING_FAIL);
            commit(types.USER_LOADING_FAILURE);
            commit(types.USER_ERRORS, error);
        })
    }
}