import * as types from "../../mutation-types";
import {forEach, pull} from "lodash";
import {keyForBackup} from "./index";
import Vue from 'vue';

export default {
    [types.BACKUP_DELETE]({backups, backupsList, deletedBackup}, id) {
        const key = keyForBackup(id);
        deletedBackup = backups[key];
        Vue.delete(backups, key);
        pull(backupsList, id);
    },

    [types.BACKUP_DELETE_FAILURE](state, error) {
        const key = keyForBackup(state.deletedBackup.id);
        state.backupsList.push(state.deletedBackup.id);
        Vue.set(state.backups, key, state.deletedBackup);
        state.deletedBackup = {};
        setErrors(state.backupErrors, error)
    },

    [types.BACKUP_DELETE_SUCCESS](state) {
        state.deletedBackup = {};
        clearErrors(state.backupErrors);
    },


    [types.BACKUP_SET_ALL]({backups, backupsList, backupErrors}, {backupsData}) {
        forEach(backupsData, function (value) {
            const key = keyForBackup(value.id);
            if (!backups[key]) {
                backupsList.push(value.id)
            }
            Vue.set(backups, key, value);
            clearErrors(backupErrors);
        })
    },

    [types.BACKUP_SET_ALL_FAILURE]({backupErrors}, error) {
        setErrors(backupErrors, error);
    },

    [types.BACKUP_UPDATE_SUCCESS](state, backup) {
        const key = keyForBackup(backup.id);

        state.backups[key] = backup;
        clearErrors(state.backupErrors);
    },

    [types.BACKUP_UPDATE_FAILURE]({backupErrors}, error) {
        setErrors(backupErrors, error);
    },

    [types.BACKUP_ADD_NEW]({backups, backupsList}, {backup}) {
        const key = keyForBackup(backup.id);
        if (!backups[key]) {
            Vue.set(backups, key, backup);
            backupsList.push(backup.id)
        }
    },

    [types.BACKUP_ADD_NEW_SUCCESS]({backupErrors}) {
        clearErrors(backupErrors);
    },

    [types.BACKUP_ADD_NEW_FAILURE]({backupErrors}, error) {
        setErrors(backupErrors, error);
    }

}


function setErrors(backupErrors, error) {
    if (error.response) {
        if (error.response.data) {
            if (error.response.data.error) {
                if (error.response.data.error.message) {
                    if (error.response.data.error.message.manualBackupName) {
                        backupErrors.name = error.response.data.error.message.manualBackupName;
                    } else {
                        backupErrors.name = [];
                    }
                    if (error.response.data.error.message.destination) {
                        backupErrors.destination = error.response.data.error.message.destination;
                    } else {
                        backupErrors.destination = [];
                    }
                    if (error.response.data.error.message.containers) {
                        backupErrors.containers = error.response.data.error.message.containers;
                    } else {
                        backupErrors.containers = [];
                    }

                    if (error.response.data.error.message.general) {
                        backupErrors.general = error.response.data.error.message.general;
                    } else {
                        backupErrors.general = [];
                    }
                }
            }
        }
    }
}


function clearErrors(backupErrors) {
    backupErrors.name = [];
    backupErrors.destination = [];
    backupErrors.containers = [];
    backupErrors.manualBackupName = [];
    backupErrors.general = [];
}