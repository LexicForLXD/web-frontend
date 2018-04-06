import {keyForDestination} from "./index";
import {map} from "lodash";

export default {
    getBackupDestinations({backupDestinations, backupDestinationsList}) {
        return map(backupDestinationsList, id => backupDestinations[keyForDestination(id)])
    },

    getBackupDestinationErrors({backupDestinationErrors}) {
        return backupDestinationErrors;
    }
}