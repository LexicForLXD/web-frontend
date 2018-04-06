import backupDestinationApi from "../../../api/backup/backupDestination";
import * as types from "../../mutation-types";

export default {
    setBackupDestinations({commit}) {
        commit(types.LOADING_BEGIN);
        backupDestinationApi.fetch().then((res) => {
            commit(types.BACKUPDEST_SET_ALL, {backupDestinationsData: res.data});
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            commit(types.BACKUPDEST_SET_ALL_FAILURE, error);
        })
    },

    initBackupDestinations({commit}) {
        return new Promise((resolve, reject) => {
            backupDestinationApi.fetch().then((res) => {
                commit(types.BACKUPDEST_SET_ALL, {backupDestinationsData: res.data});
                resolve();
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 404) {
                        if (error.response.data.error.code === 404) {
                            resolve(error.response.data.error.message);
                        }

                    }
                }
                reject(error);
                commit(types.BACKUPDEST_SET_ALL_FAILURE, error);
            })
        })
    },


    deleteBackupDestination({commit}, id) {
        commit(types.BACKUPDEST_DELETE, id);
        commit(types.LOADING_BEGIN);
        backupDestinationApi.delete(id).then(() => {
            commit(types.LOADING_FINISH);
            commit(types.BACKUPDEST_DELETE_SUCCESS);
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            commit(types.BACKUPDEST_DELETE_FAILURE, error);
        })
    },


    createBackupDestination({commit}, data) {
        commit(types.LOADING_BEGIN);
        return new Promise((resolve, reject) => {
            backupDestinationApi.create(data).then((res) => {
                commit(types.BACKUPDEST_ADD_NEW, res.data);
                commit(types.LOADING_FINISH);
                commit(types.BACKUPDEST_ADD_NEW_SUCCESS);
                resolve();
            }).catch((error) => {
                commit(types.BACKUPDEST_ADD_NEW_FAILURE, error);
                commit(types.LOADING_FAIL);
                reject();
            })
        })
    },


    updateBackupDestination({commit}, data) {
        commit(types.LOADING_BEGIN);
        backupDestinationApi.update(data.backupDestination_id, data.backupDestination).then((res) => {
            commit(types.BACKUPDEST_UPDATE_SUCCESS, res.data);
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            commit(types.BACKUPDEST_UPDATE_FAILURE, error);
        })
    }
}