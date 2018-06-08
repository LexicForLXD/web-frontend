import * as types from "../../mutation-types";
import hostApi from "../../../api/hosts/host";


export default {
    setHosts({commit}) {
        commit(types.LOADING_BEGIN);
        hostApi.fetch().then((res) => {
            commit(types.HOST_SET_ALL, {hostsData: res.data});
            commit(types.LOADING_FINISH);
        }).catch(() => {
            commit(types.LOADING_FAIL);
        })
    },

    initHosts({commit}) {
        return new Promise((resolve, reject) => {
            hostApi.fetch().then((res) => {
                commit(types.HOST_SET_ALL, {hostsData: res.data});
                resolve();
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 404) {
                        if(error.response.data.error.code === 404) {
                            resolve(error.response.data.error.message);
                        }
                    }
                } else {
                    reject(error);
                }

            })
        });

    },


    deleteHost({commit}, id) {
        commit(types.HOST_DELETE, id);
        commit(types.LOADING_BEGIN);
        hostApi.delete(id).then(() => {
            commit(types.HOST_DELETE_SUCCESS);
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.HOST_DELETE_FAILURE, error);
            commit(types.LOADING_FAIL);
        })
    },


    createHost({commit}, data) {
        commit(types.LOADING_BEGIN);
        return new Promise((resolve, reject) => {
            hostApi.create(data).then((res) => {
                commit(types.HOST_ADD_NEW, {host: res.data});
                commit(types.LOADING_FINISH);
                resolve();
            }).catch((error) => {
                commit(types.HOST_ADD_NEW_FAILURE, error);
                commit(types.LOADING_FAIL);
                reject(error);
            })
        })
    },


    updateHost({commit}, data) {
        commit(types.LOADING_BEGIN);
        hostApi.update(data.host_id, data.host).then((res) => {
            commit(types.HOST_UPDATE_SUCCESS, res.data);
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.HOST_UPDATE_FAILURE, error);
            commit(types.LOADING_FAIL);
        })
    },

    authHost({commit}, data) {
        commit(types.LOADING_BEGIN);
        hostApi.auth(data.host_id, data.password).then(() => {
            commit(types.HOST_AUTH_SUCCESS);
            hostApi.show(data.host_id).then((res) => {
                commit(types.HOST_UPDATE_SUCCESS, res.data);
                commit(types.LOADING_FINISH);
            }).catch(error => {
                commit(types.HOST_UPDATE_FAILURE, error);
            });
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            commit(types.HOST_AUTH_FAILURE, error);
        })
    }
}