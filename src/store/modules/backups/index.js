import actions from './actions'
import mutations from './mutations'
import getters from './getters'


export function keyForBackup(id) {
    return `backup_${id}`
}

// initial state
const state = {
    backups: {},
    backupsList: [],
    deletedBackup: {},
    backupErrors: {
        name: [],
        destination: [],
        containers: [],
        manualBackupName: [],
        general: [],
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}