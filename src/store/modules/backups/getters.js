import {keyForBackup} from "./index";
import {map} from "lodash";

export default {
    getBackups({backups, backupsList}) {
        return map(backupsList, id => backups[keyForBackup(id)])
    },

    getBackupErrors({backupErrors}) {
        return backupErrors;
    },

    getBackupIndexById: ({backupsList}) => (id) => {
        return backupsList.findIndex(backup => backup === id);
    },

    getBackupByIndex: (state, getters) => (index) => {
        return getters.getBackups[index];
    }
}