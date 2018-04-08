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

    [types.BACKUP_SET_ALL_FAILURE] ({backupErrors}, error) {
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
                    if (error.response.data.error.message.name) {
                        backupErrors.name = error.response.data.error.message.name;
                    } else {
                        backupErrors.name = "";
                    }
                    if (error.response.data.error.message.description) {
                        backupErrors.description = error.response.data.error.message.description;
                    } else {
                        backupErrors.description = "";
                    }
                    if (error.response.data.error.message.protocol) {
                        backupErrors.protocol = error.response.data.error.message.protocol;
                    } else {
                        backupErrors.protocol = "";
                    }
                    if (error.response.data.error.message.username) {
                        backupErrors.username = error.response.data.error.message.username;
                    } else {
                        backupErrors.username = "";
                    }
                    if (error.response.data.error.message.password) {
                        backupErrors.password = error.response.data.error.message.password;
                    } else {
                        backupErrors.password = "";
                    }
                    if (error.response.data.error.message.hostname) {
                        backupErrors.hostname = error.response.data.error.message.hostname;
                    } else {
                        backupErrors.hostname = "";
                    }
                    if (error.response.data.error.message.path) {
                        backupErrors.devices = error.response.data.error.message.devices;
                    } else {
                        backupErrors.devices = "";
                    }
                    if (error.response.data.error.message.general) {
                        backupErrors.general = error.response.data.error.message.general;
                    } else {
                        backupErrors.general = "";
                    }
                }
            }
        }
    }
}


function clearErrors(backupErrors) {
    backupErrors.name = "";
    backupErrors.description = "";
    backupErrors.protocol = "";
    backupErrors.username = "";
    backupErrors.password = "";
    backupErrors.hostname = "";
    backupErrors.path = "";
    backupErrors.general = "";
}