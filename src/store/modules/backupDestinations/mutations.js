import * as types from "../../mutation-types";
import {forEach, pull} from "lodash";
import {keyForDestination} from "./index";
import Vue from 'vue';

export default {
    [types.BACKUPDEST_DELETE]({backupDestinations, backupDestinationsList, deletedBackupDestination}, id) {
        const key = keyForDestination(id);
        deletedBackupDestination = backupDestinations[key];
        Vue.delete(backupDestinations, key);
        pull(backupDestinationsList, id);
    },

    [types.BACKUPDEST_DELETE_FAILURE](state, error) {
        const key = keyForDestination(state.deletedBackupDestination.id);
        state.backupDestinationsList.push(state.deletedBackupDestination.id);
        Vue.set(state.backupDestinations, key, state.deletedBackupDestination);
        state.deletedBackupDestination = {};
        setErrors(state.backupDestinationErrors, error)
    },

    [types.BACKUPDEST_DELETE_SUCCESS](state) {
        state.deletedBackupDestination = {};
        clearErrors(state.backupDestinationErrors);
    },


    [types.BACKUPDEST_SET_ALL]({backupDestinations, backupDestinationsList, backupDestinationErrors}, {backupDestinationsData}) {
        forEach(backupDestinationsData, function (value) {
            const key = keyForDestination(value.id);
            if (!backupDestinations[key]) {
                backupDestinationsList.push(value.id)
            }
            Vue.set(backupDestinations, key, value);
            clearErrors(backupDestinationErrors);
        })
    },

    [types.BACKUPDEST_SET_ALL_FAILURE] ({backupDestinationErrors}, error) {
        setErrors(backupDestinationErrors, error);
    },

    [types.BACKUPDEST_UPDATE_SUCCESS](state, backupDestination) {
        const key = keyForDestination(backupDestination.id);

        state.backupDestinations[key] = backupDestination;
        clearErrors(state.backupDestinationErrors);
    },

    [types.BACKUPDEST_UPDATE_FAILURE]({backupDestinationErrors}, error) {
        setErrors(backupDestinationErrors, error);
    },

    [types.BACKUPDEST_ADD_NEW]({backupDestinations, backupDestinationsList}, {backupDestination}) {
        const key = keyForDestination(backupDestination.id);
        if (!backupDestinations[key]) {
            Vue.set(backupDestinations, key, backupDestination);
            backupDestinationsList.push(backupDestination.id)
        }
    },

    [types.BACKUPDEST_ADD_NEW_SUCCESS]({backupDestinationErrors}) {
        clearErrors(backupDestinationErrors);
    },

    [types.BACKUPDEST_ADD_NEW_FAILURE]({backupDestinationErrors}, error) {
        setErrors(backupDestinationErrors, error);
    }

}



function setErrors(backupDestinationErrors, error) {
    if (error.response.data.error.message.name) {
        backupDestinationErrors.name = error.response.data.error.message.name;
    } else {
        backupDestinationErrors.name = "";
    }
    if (error.response.data.error.message.description) {
        backupDestinationErrors.description = error.response.data.error.message.description;
    } else {
        backupDestinationErrors.description = "";
    }
    if (error.response.data.error.message.protocol) {
        backupDestinationErrors.protocol = error.response.data.error.message.protocol;
    } else {
        backupDestinationErrors.protocol = "";
    }
    if (error.response.data.error.message.username) {
        backupDestinationErrors.username = error.response.data.error.message.username;
    } else {
        backupDestinationErrors.username = "";
    }
    if (error.response.data.error.message.password) {
        backupDestinationErrors.password = error.response.data.error.message.password;
    } else {
        backupDestinationErrors.password = "";
    }
    if (error.response.data.error.message.hostname) {
        backupDestinationErrors.hostname = error.response.data.error.message.hostname;
    } else {
        backupDestinationErrors.hostname = "";
    }
    if (error.response.data.error.message.path) {
        backupDestinationErrors.devices = error.response.data.error.message.devices;
    } else {
        backupDestinationErrors.devices = "";
    }
    if (error.response.data.error.message.general) {
        backupDestinationErrors.general = error.response.data.error.message.general;
    } else {
        backupDestinationErrors.general = "";
    }
}


function clearErrors(backupDestinationErrors) {
    backupDestinationErrors.name = "";
    backupDestinationErrors.description = "";
    backupDestinationErrors.protocol = "";
    backupDestinationErrors.username = "";
    backupDestinationErrors.password = "";
    backupDestinationErrors.hostname = "";
    backupDestinationErrors.path = "";
    backupDestinationErrors.general = "";
}