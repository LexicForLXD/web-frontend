import backupApi from "../../../api/backup/backup";
import * as types from "../../mutation-types";

export default {
    setBackups({commit}) {
        commit(types.LOADING_BEGIN);
        backupApi.fetch().then((res) => {
            commit(types.BACKUP_SET_ALL, {backupsData: res.data});
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            commit(types.BACKUP_SET_ALL_FAILURE, error);
        })
    },

    initBackups({commit}) {
        return new Promise((resolve, reject) => {
            backupApi.fetch().then((res) => {
                commit(types.BACKUP_SET_ALL, {backupsData: res.data});
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
                commit(types.BACKUP_SET_ALL_FAILURE, error);
            })
        })
    },


    deleteBackup({commit}, id) {
        commit(types.BACKUP_DELETE, id);
        commit(types.LOADING_BEGIN);
        backupApi.delete(id).then(() => {
            commit(types.LOADING_FINISH);
            commit(types.BACKUP_DELETE_SUCCESS);
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            commit(types.BACKUP_DELETE_FAILURE, error);
        })
    },


    createBackup({commit}, data) {
        commit(types.LOADING_BEGIN);
        return new Promise((resolve, reject) => {
            backupApi.create(data).then((res) => {
                commit(types.BACKUP_ADD_NEW, res.data);
                commit(types.LOADING_FINISH);
                commit(types.BACKUP_ADD_NEW_SUCCESS);
                resolve();
            }).catch((error) => {
                commit(types.BACKUP_ADD_NEW_FAILURE, error);
                commit(types.LOADING_FAIL);
                reject();
            })
        })
    },


    updateBackup({commit}, data) {
        commit(types.LOADING_BEGIN);
        backupApi.update(data.backup_id, data.backup).then((res) => {
            commit(types.BACKUP_UPDATE_SUCCESS, res.data);
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            commit(types.BACKUP_UPDATE_FAILURE, error);
        })
    }
}