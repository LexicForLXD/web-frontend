import * as types from "../../mutation-types";
import {forEach, pull} from "lodash";
import {keyForHost} from "./index";
import Vue from 'vue';

export default {
    [types.HOST_DELETE](state, id) {
        const key = keyForHost(id);
        state.deletedHost = state.hosts[key];
        Vue.delete(state.hosts, key);
        pull(state.hostsList, id);
    },

    [types.HOST_DELETE_FAILURE](state, error) {
        state.hostsList.push(state.deletedHost.id);
        Vue.set(state.hosts, keyForHost(state.deletedHost.id), state.deletedHost);
        state.deletedHost = {};
        setErrors(state, error);
    },

    [types.HOST_DELETE_SUCCESS](state) {
        state.deleteHost = {};
        clearErrors(state);
    },


    [types.HOST_SET_ALL]({hosts, hostsList, hostErrors}, {hostsData}) {
        forEach(hostsData, function (value) {
            if (!hosts[keyForHost(value.id)]) {
                hostsList.push(value.id)
            }
            Vue.set(hosts, keyForHost(value.id), value);
            clearErrors(hostErrors);
        })
    },

    [types.HOST_UPDATE_SUCCESS](state, host) {
        state.hosts[keyForHost(host.id)] = host;
        clearErrors(state);
    },

    [types.HOST_UPDATE_FAILURE](state, error) {
        setErrors(state, error);
    },

    [types.HOST_ADD_NEW](state, {host}) {
        const key = keyForHost(host.id);
        if (!state.hosts[key]) {
            Vue.set(state.hosts, key, host);
            state.hostsList.push(host.id);
        }
        clearErrors(state);
    },

    [types.HOST_ADD_NEW_SUCCESS](state) {
        clearErrors(state);
    },

    [types.HOST_ADD_NEW_FAILURE](state, error) {
        setErrors(state, error);
    },
}


function setErrors(state, error) {
    if (error.response) {
        if (error.response.data) {
            if (error.response.data.error) {
                if (error.response.data.error.message) {
                    if (error.response.data.error.message.ipv4) {
                        state.hostErrors.ipv4 = error.response.data.error.message.ipv4;
                    } else {
                        state.hostErrors.ipv4 = "";
                    }
                    if (error.response.data.error.message.ipv6) {
                        state.hostErrors.ipv6 = error.response.data.error.message.ipv6;
                    } else {
                        state.hostErrors.ipv6 = "";
                    }
                    if (error.response.data.error.message.domainName) {
                        state.hostErrors.domainName = error.response.data.error.message.domainName;
                    } else {
                        state.hostErrors.domainName = "";
                    }
                    if (error.response.data.error.message.name) {
                        state.hostErrors.name = error.response.data.error.message.name;
                    } else {
                        state.hostErrors.name = "";
                    }
                    if (error.response.data.error.message.port) {
                        state.hostErrors.port = error.response.data.error.message.port;
                    } else {
                        state.hostErrors.port = "";
                    }
                    if (error.response.data.error.message.settings) {
                        state.hostErrors.settings = error.response.data.error.message.settings;
                    } else {
                        state.hostErrors.settings = "";
                    }
                    if (error.response.data.error.message.auth) {
                        state.hostErrors.auth = error.response.data.error.message.auth;
                    } else {
                        state.hostErrors.auth = "";
                    }

                    // if (error.response.data.error.message) {
                    //     state.hostErrors.general = error.response.data.error.message;
                    // } else {
                    //     state.hostErrors.general = "";
                    // }
                }
            }
        }
    }
}

function clearErrors(hostErrors) {
    hostErrors.ipv4 = "";
    hostErrors.ipv6 = "";
    hostErrors.domainName = "";
    hostErrors.name = "";
    hostErrors.port = "";
    hostErrors.settings = "";
    hostErrors.auth = "";
    hostErrors.general = "";
}