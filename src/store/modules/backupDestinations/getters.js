import {keyForDestination} from "./index";
import {map, find} from "lodash";

export default {
    getBackupDestinations({backupDestinations, backupDestinationsList}) {
        return map(backupDestinationsList, id => backupDestinations[keyForDestination(id)])
    },

    getBackupDestinationErrors({backupDestinationErrors}) {
        return backupDestinationErrors;
    },

    getBackupDestinationIndexById: ({backupDestinationsList}) => (id) => {
        return backupDestinationsList.findIndex(dest => dest === id);
    },

    getBackupDestinationById: ({backupDestinations}) => (id) => {
        return find(backupDestinations, ['id', id]);
    },

    getBackupDestinationByIndex: (state, getters) => (index) => {
        return getters.getBackupDestinations[index];
    }

}