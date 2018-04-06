import {keyForSchedule} from "./index";
import {map} from "lodash";

export default {
    getBackupSchedules({backupSchedules, backupSchedulesList}) {
        return map(backupSchedulesList, id => backupSchedules[keyForSchedule(id)])
    },

    getBackupScheduleErrors({backupScheduleErrors}) {
        return backupScheduleErrors;
    }
}