import * as types from "../../mutation-types";
import {forEach, pull} from "lodash";
import {keyForUser} from "./index";
import Vue from 'vue';

export default {
    [types.USER_SET_CURRENT](state, currentUser) {
        state.currentUserId = currentUser.id;
        state.isAuthenticated = true;
    },

    [types.USER_SET_CURRENT_FAILED](state) {
        state.isAuthenticated = false;
    },

    [types.USER_DELETE](state, id) {
        const key = keyForUser(id);
        state.deletedUser = state.users[key];
        Vue.delete(state.users, key);
        pull(state.usersList, id);
    },

    [types.USER_DELETE_FAILURE](state, error) {
        state.usersList.push(state.deletedUser.id);
        Vue.set(state.users, keyForUser(state.deletedUser.id), state.deletedUser);
        state.deletedUser = {};
        setErrors(state.userErrors, error);
    },

    [types.USER_DELETE_SUCCESS](state) {
        state.deletedUser = {};
        clearErrors(state.userErrors);
    },


    [types.USER_SET_ALL]({users, usersList, userErrors}, {usersData}) {
        forEach(usersData, function (value) {
            const key = keyForUser(value.id);
            if (!users[key]) {
                usersList.push(value.id)
            }
            Vue.set(users, key, value)
        });
        clearErrors(userErrors);
    },


    [types.USER_SET_ALL_FAILURE]({userErrors}, error) {
        setErrors(userErrors, error);
    },

    [types.USER_UPDATE_SUCCESS](state, {user}) {
        state.users[keyForUser(user.id)] = user;
        clearErrors(state.userErrors);
    },

    [types.USER_UPDATE_FAILURE]({userErrors}, error) {
        setErrors(userErrors, error);
    },


    [types.USER_ADD_NEW]({users, usersList}, {user}) {
        const key = keyForUser(user.id);
        if (!users[key]) {
            Vue.set(users, key, user);
            usersList.push(user.id)
        }
    },

    [types.USER_ADD_NEW_SUCCESS]({userErrors}) {
        clearErrors(userErrors);
    },

    [types.USER_ADD_NEW_FAILURE]({userErrors}, error) {
        setErrors(userErrors, error);
    },

}


function setErrors(userErrors, error) {
    if (error.response) {
        if (error.response.data) {
            if (error.response.data.error) {
                if (error.response.data.error.message) {
                    if (error.response.data.error.message.firstName) {
                        userErrors.firstName = error.response.data.error.message.firstName;
                    } else {
                        userErrors.firstName = "";
                    }
                    if (error.response.data.error.message.lastName) {
                        userErrors.lastName = error.response.data.error.message.lastName;
                    } else {
                        userErrors.lastName = "";
                    }
                    if (error.response.data.error.message.username) {
                        userErrors.username = error.response.data.error.message.username;
                    } else {
                        userErrors.username = "";
                    }
                    if (error.response.data.error.message.email) {
                        userErrors.email = error.response.data.error.message.email;
                    } else {
                        userErrors.email = "";
                    }
                    if (error.response.data.error.message.password) {
                        userErrors.password = error.response.data.error.message.password;
                    } else {
                        userErrors.password = "";
                    }
                    if (error.response.data.error.message.roles) {
                        userErrors.roles = error.response.data.error.message.roles;
                    } else {
                        userErrors.roles = "";
                    }
                }
            }
        }
    }

}

function clearErrors(userErrors) {
    userErrors.firstName = "";
    userErrors.lastName = "";
    userErrors.username = "";
    userErrors.email = "";
    userErrors.password = "";
    userErrors.roles = "";
}