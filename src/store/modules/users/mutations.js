import * as types from "../../mutation-types";
import {forEach, pull} from "lodash";
import {keyForUser} from "./index";

export default {
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
        pull(usersList, id);
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
    },


    [types.USER_ERRORS]({userErrors}, error) {
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
    },


    [types.USER_NO_ERRORS](state) {
        state.userErrors = {
            firstName: "",
            lastName: "",
            username:"",
            email: "",
            password: "",
            roles: "",
        };
    },
}
