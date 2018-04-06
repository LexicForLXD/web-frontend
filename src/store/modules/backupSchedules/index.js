import actions from './actions'
import mutations from './mutations'
import getters from './getters'


export function keyForSchedule(id) {
    return `schedule_${id}`
}

// initial state
const state = {
    backupSchedules: {},
    backupSchedulesList: [],
    deletedBackupSchedule: {},
    createdBackupSchedule: {},
    backupScheduleErrors: {
        name: "",
        description: "",
        executionTime: "",
        type: "",
        destination: "",
        containers: "",
        general: "",
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}