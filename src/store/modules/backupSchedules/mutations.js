import * as types from "../../mutation-types";
import {forEach, pull} from "lodash";
import {keyForSchedule} from "./index";
import Vue from 'vue';

export default {
    [types.BACKUPSCHEDULE_DELETE]({backupSchedules, backupSchedulesList, deletedBackupSchedule}, id) {
        const key = keyForSchedule(id);
        deletedBackupSchedule = backupSchedules[key];
        Vue.delete(backupSchedules, key);
        pull(backupSchedulesList, id);
    },

    [types.BACKUPSCHEDULE_DELETE_FAILURE](state, error) {
        const key = keyForSchedule(state.deletedBackupSchedule.id);
        state.backupSchedulesList.push(state.deletedBackupSchedule.id);
        Vue.set(state.backupSchedules, key, state.deletedBackupSchedule);
        state.deletedBackupSchedule = {};
        setErrors(state.backupScheduleErrors, error)
    },

    [types.BACKUPSCHEDULE_DELETE_SUCCESS](state) {
        state.deletedBackupSchedule = {};
        clearErrors(state.backupScheduleErrors);
    },


    [types.BACKUPSCHEDULE_SET_ALL]({backupSchedules, backupSchedulesList, backupScheduleErrors}, {backupSchedulesData}) {
        forEach(backupSchedulesData, function (value) {
            const key = keyForSchedule(value.id);
            if (!backupSchedules[key]) {
                backupSchedulesList.push(value.id)
            }
            Vue.set(backupSchedules, key, value);
            clearErrors(backupScheduleErrors);
        })
    },

    [types.BACKUPSCHEDULE_SET_ALL_FAILURE] ({backupScheduleErrors}, error) {
        setErrors(backupScheduleErrors, error);
    },

    [types.BACKUPSCHEDULE_UPDATE_SUCCESS](state, backupSchedule) {
        const key = keyForSchedule(backupSchedule.id);

        state.backupSchedules[key] = backupSchedule;
        clearErrors(state.backupScheduleErrors);
    },

    [types.BACKUPSCHEDULE_UPDATE_FAILURE]({backupScheduleErrors}, error) {
        setErrors(backupScheduleErrors, error);
    },

    [types.BACKUPSCHEDULE_ADD_NEW]({backupSchedules, backupSchedulesList}, {backupSchedule}) {
        const key = keyForSchedule(backupSchedule.id);
        if (!backupSchedules[key]) {
            Vue.set(backupSchedules, key, backupSchedule);
            backupSchedulesList.push(backupSchedule.id)
        }
    },

    [types.BACKUPSCHEDULE_ADD_NEW_SUCCESS]({backupScheduleErrors}) {
        clearErrors(backupScheduleErrors);
    },

    [types.BACKUPSCHEDULE_ADD_NEW_FAILURE]({backupScheduleErrors}, error) {
        setErrors(backupScheduleErrors, error);
    }

}



function setErrors(backupScheduleErrors, error) {
    if (error.response.data.error.message.name) {
        backupScheduleErrors.name = error.response.data.error.message.name;
    } else {
        backupScheduleErrors.name = "";
    }
    if (error.response.data.error.message.description) {
        backupScheduleErrors.description = error.response.data.error.message.description;
    } else {
        backupScheduleErrors.description = "";
    }
    if (error.response.data.error.message.executionTime) {
        backupScheduleErrors.executionTime = error.response.data.error.message.executionTime;
    } else {
        backupScheduleErrors.executionTime = "";
    }
    if (error.response.data.error.message.type) {
        backupScheduleErrors.type = error.response.data.error.message.type;
    } else {
        backupScheduleErrors.type = "";
    }
    if (error.response.data.error.message.destination) {
        backupScheduleErrors.destination = error.response.data.error.message.destination;
    } else {
        backupScheduleErrors.destination = "";
    }
    if (error.response.data.error.message.containers) {
        backupScheduleErrors.containers = error.response.data.error.message.containers;
    } else {
        backupScheduleErrors.containers = "";
    }
    if (error.response.data.error.message.general) {
        backupScheduleErrors.general = error.response.data.error.message.general;
    } else {
        backupScheduleErrors.general = "";
    }
}


function clearErrors(backupScheduleErrors) {
    backupScheduleErrors.name = "";
    backupScheduleErrors.description = "";
    backupScheduleErrors.executionTime = "";
    backupScheduleErrors.type = "";
    backupScheduleErrors.destination = "";
    backupScheduleErrors.containers = "";
    backupScheduleErrors.general = "";
}