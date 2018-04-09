import {keyForSchedule} from "./index";
import {find, map} from "lodash";

export default {
    getBackupSchedules({backupSchedules, backupSchedulesList}) {
        return map(backupSchedulesList, id => backupSchedules[keyForSchedule(id)])
    },

    getBackupScheduleErrors({backupScheduleErrors}) {
        return backupScheduleErrors;
    },

    getBackupScheduleIndexById: ({backupSchedulesList}) => (id) => {
        return backupSchedulesList.findIndex(schedule => schedule === id);
    },

    getBackupScheduleById: ({backupSchedules}) => (id) => {
        return find(backupSchedules, ['id', id]);
    },

    getBackupScheduleByIndex: (state, getters) => (index) => {
        return getters.getBackupSchedules[index];
    }
}