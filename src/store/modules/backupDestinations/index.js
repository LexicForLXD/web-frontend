import actions from './actions'
import mutations from './mutations'
import getters from './getters'


export function keyForDestination(id) {
    return `destination_${id}`
}

// initial state
const state = {
    backupDestinations: {},
    backupDestinationsList: [],
    deletedBackupDestination: {},
    createdBackupDestination: {},
    backupDestinationErrors: {
        name: "",
        description: "",
        protocol: "",
        username: "",
        password: "",
        hostname: "",
        path: "",
        general: "",
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}