import * as types from "../../mutation-types";
import {forEach, pull} from "lodash";
import {keyForHost} from "./index";

export default {
    [types.HOST_DELETE](state, id) {
        const key = keyForHost(id);
        state.deletedHost = state.hosts[key];
        Vue.delete(state.hosts, key);
        pull(state.hostsList, id);
    },

    [types.HOST_DELETE_FAILURE](state) {
        state.hostsList.push(state.deletedHost.id);
        Vue.set(state.hosts, keyForHost(state.deletedHost.id), state.deletedHost);
        state.deletedHost = {};
    },

    [types.HOST_DELETE_SUCCESS](state) {
        state.deleteHost = {};
    },


    [types.HOST_SET_ALL]({hosts, hostsList}, {hostsData}) {
        forEach(hostsData, function (value) {
            if (!hosts[keyForHost(value.id)]) {
                hostsList.push(value.id)
            }
            Vue.set(hosts, keyForHost(value.id), value);

        })
    },

    [types.HOST_UPDATE_SUCCESS](state, host) {
        const key = keyForHost(host.id);

        state.hosts[key] = host;
    },

    [types.HOST_ADD_NEW]({hosts, hostsList}, {host}) {
        const key = keyForHost(host.id);
        if (!hosts[key]) {
            Vue.set(hosts, key, host);
            hostsList.push(host.id);
        }
    },

    [types.HOST_ADD_NEW_SUCCESS]() {
    },

    [types.HOST_ADD_NEW_FAILURE](state, {savedHosts, savedHostsList, error}) {
        state.hostErrors = error.response.data;
        state.hosts = savedHosts;
        state.hostsList = savedHostsList;
    },

    [types.HOST_LOADING_START]({hostLoading}) {
        hostLoading.isLoading = true;
        hostLoading.hasLoadingErrors = false;
    },

    [types.HOST_LOADING_SUCCESS]({hostLoading}) {
        hostLoading.isLoading = false;
        hostLoading.hasLoadingErrors = false;
    },

    [types.HOST_LOADING_FAILURE]({hostLoading}) {
        hostLoading.isLoading = false;
        hostLoading.hasLoadingErrors = true;
    },

    [types.HOST_ERRORS]({hostErrors}, error) {
        if (error.response) {
            if (error.response.data.error.message.ipv4) {
                hostErrors.ipv4 = error.response.data.error.message.ipv4;
            } else {
                hostErrors.ipv4 = "";
            }
            if (error.response.data.error.message.ipv6) {
                hostErrors.ipv6 = error.response.data.error.message.ipv6;
            } else {
                hostErrors.ipv6 = "";
            }
            if (error.response.data.error.message.domainName) {
                hostErrors.domainName = error.response.data.error.message.domainName;
            } else {
                hostErrors.domainName = "";
            }
            if (error.response.data.error.message.name) {
                hostErrors.name = error.response.data.error.message.name;
            } else {
                hostErrors.name = "";
            }
            if (error.response.data.error.message.port) {
                hostErrors.port = error.response.data.error.message.port;
            } else {
                hostErrors.port = "";
            }
            if (error.response.data.error.message.settings) {
                hostErrors.settings = error.response.data.error.message.settings;
            } else {
                hostErrors.settings = "";
            }
            if (error.response.data.error.message.auth) {
                hostErrors.auth = error.response.data.error.message.auth;
            } else {
                hostErrors.auth = "";
            }

            if (error.response.data.error.message) {
                hostErrors.general = error.response.data.error.message;
            } else {
                hostErrors.general = "";
            }
        }
    },

    [types.HOST_NO_ERRORS](state) {
        state.hostErrors = {
            ipv4: "",
            ipv6: "",
            domainName: "",
            name: "",
            port: "",
            settings: "",
            auth: "",
            general: "",
        };
    }


}