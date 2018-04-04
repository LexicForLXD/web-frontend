import * as types from '../mutation-types'
import backupScheduleApi from '../../api/backup/backupSchedule'
import {map, forEach, pull} from 'lodash'

function keyForSchedule(id) {
    return `backupSchedule_${id}`
}

// initial state
const state = {
    backupSchedules: {
        deleted: false,
    },
    backupSchedulesList: [],
    deletedBackupSchedule: {},
    backupScheduleErrors: {
        name: "",
        description: "",
        executionTime: "",
        type: "",
        destination: "",
        containers: "",
    }

}

// getters
const getters = {
    getBackupSchedules({backupSchedules, backupSchedulesList}) {
        return _.map(backupSchedulesList, id => backupSchedules[keyForSchedule(id)])
    },

    getBackupScheduleErrors({backupScheduleErrors}) {
        return backupScheduleErrors;
    }

}

const actions = {
    setBackupSchedules({commit}) {
        commit(types.LOADING_BEGIN);
        backupScheduleApi.fetch().then((res) => {
            commit(types.BACKUPSCHEDULE_SET_ALL, {backupSchedulesData: res.data});
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.LOADING_FAIL)
            if (error.response.status != 404) {
                console.warn('Could not fetch backupSchedules');
            } else {
                console.log(error.response.data.error.message)
            }
        })
    },

    initBackupSchedules({commit}) {
        return new Promise((resolve, reject) => {
            backupScheduleApi.fetch().then((res) => {
                commit(types.BACKUPSCHEDULE_SET_ALL, {backupSchedulesData: res.data});
                resolve();
            }).catch((error) => {
                if(error.response) {
                    if (error.response.status === 404) {
                        console.warn('Could not fetch backupSchedules');
                        if (error.response.data.error.code === 404) {
                            resolve();
                        }
                    } else {
                        console.log(error.response.data.error.message)
                    }
                }
                reject(error);
            })
        })
    },


    deleteBackupSchedule({commit, state}, id) {
        const savedBackupSchedules = state.backupSchedules;
        const savedBackupSchedulesList = state.backupSchedulesList;
        commit(types.BACKUPSCHEDULE_DELETE, id)
        commit(types.LOADING_BEGIN);
        backupScheduleApi.delete(id).then((res) => {
            commit(types.LOADING_FINISH);
            commit(types.BACKUPSCHEDULE_DELETE_SUCCESS);
            commit(types.BACKUPSCHEDULE_NO_ERRORS);
        }).catch((res) => {
            commit(types.LOADING_FAIL);
            console.warn('Could not delete backupSchedule');
            commit(types.BACKUPSCHEDULE_DELETE_FAILURE, {savedBackupSchedules, savedBackupSchedulesList});
        })
    }
    ,


    createBackupSchedule({commit}, data) {
        const savedBackupSchedules = state.backupSchedules;
        const savedBackupSchedulesList = state.backupSchedulesList;
        commit(types.LOADING_BEGIN);
        return new Promise((resolve, reject) => {
            backupScheduleApi.create(data).then((res) => {
                commit(types.BACKUPSCHEDULE_ADD_NEW, res.data);
                commit(types.LOADING_FINISH);
                commit(types.BACKUPSCHEDULE_NO_ERRORS);
                resolve();
            }).catch((error) => {
                console.warn('Could not add new backupSchedule');
                commit(types.BACKUPSCHEDULE_ADD_NEW_FAILURE, {
                    savedBackupSchedules,
                    savedBackupSchedulesList,
                });
                commit(types.BACKUPSCHEDULE_ERRORS, error);
                commit(types.LOADING_FAIL);
                reject();
            })
        })
    }
    ,


    updateBackupSchedule({commit}, data) {
        commit(types.LOADING_BEGIN);
        backupScheduleApi.update(data.backupSchedule_id, data.backupSchedule).then((res) => {
            commit(types.BACKUPSCHEDULE_UPDATE_SUCCESS, res.data);
            commit(types.LOADING_FINISH);
            commit(types.BACKUPSCHEDULE_NO_ERRORS);
        }).catch((error) => {
            console.warn('Could not update backupSchedule');
            commit(types.BACKUPSCHEDULE_ERRORS, error);
            commit(types.LOADING_FAIL);
        })
    }
}


const mutations = {
    [types.BACKUPSCHEDULE_DELETE]({backupSchedules, backupSchedulesList, deletedBackupSchedule}, id) {
        const key = keyForSchedule(id);
        deletedBackupSchedule = backupSchedules[key];
        Vue.delete(backupSchedules, key);
        _.pull(backupSchedulesList, id);
    },

    [types.BACKUPSCHEDULE_DELETE_FAILURE]({backupSchedules, backupSchedulesList, deletedBackupSchedule}) {
        console.log('delete failure');
        const key = keyForSchedule(deletedBackupSchedule.id);
        Vue.set(backupSchedules, key, deletedBackupSchedule);
        backupSchedulesList.push(deletedBackupSchedule.id);
    },

    [types.BACKUPSCHEDULE_DELETE_SUCCESS]({deletedBackupSchedule}) {
       deletedBackupSchedule = {};
    },


    [types.BACKUPSCHEDULE_SET_ALL]({backupSchedules, backupSchedulesList}, {backupSchedulesData}) {
        forEach(backupSchedulesData, function (value) {

            const key = keyForSchedule(value.id)

            if (!backupSchedules[key]) {
                backupSchedulesList.push(value.id)
            }
            Vue.set(backupSchedules, key, value)

        })
    },

    [types.BACKUPSCHEDULE_UPDATE_SUCCESS](state, backupSchedule) {
        const key = keyForSchedule(backupSchedule.id)

        state.backupSchedules[key] = backupSchedule;
    },


    [types.BACKUPSCHEDULE_UPDATE_FAILURE]() {
        console.log("backup destination update failed");
    },

    [types.BACKUPSCHEDULE_ADD_NEW]({backupSchedules, backupSchedulesList}, backupSchedule) {
        const key = keyForSchedule(backupSchedule.id)
        if (!backupSchedules[key]) {
            Vue.set(backupSchedules, key, backupSchedule)
            backupSchedulesList.push(backupSchedule.id)
        }
        console.log('new success');
    },

    [types.BACKUPSCHEDULE_ADD_NEW_SUCCESS]() {
        console.log('new success')
    },

    [types.BACKUPSCHEDULE_ADD_NEW_FAILURE](state, {savedBackupSchedules, savedBackupSchedulesList}) {
        state.backupSchedules = savedBackupSchedules;
        state.backupSchedulesList = savedBackupSchedulesList;
    },


    [types.BACKUPSCHEDULE_ERRORS](state, error) {
        if (error.response.data.error.message.name) {
            state.backupScheduleErrors.name = error.response.data.error.message.name;
        } else {
            state.backupScheduleErrors.name = "";
        }
        if (error.response.data.error.message.description) {
            state.backupScheduleErrors.description = error.response.data.error.message.description;
        } else {
            state.backupScheduleErrors.description = "";
        }
        if (error.response.data.error.message.type) {
            state.backupScheduleErrors.type = error.response.data.error.message.type;
        } else {
            state.backupScheduleErrors.type = "";
        }
        if (error.response.data.error.message.containers) {
            state.backupScheduleErrors.containers = error.response.data.error.message.containers;
        } else {
            state.backupScheduleErrors.containers = "";
        }
        if (error.response.data.error.message.executionTime) {
            state.backupScheduleErrors.executionTime = error.response.data.error.message.executionTime;
        } else {
            state.backupScheduleErrors.executionTime = "";
        }
        if (error.response.data.error.message.destination) {
            state.backupScheduleErrors.destination = error.response.data.error.message.destination;
        } else {
            state.backupScheduleErrors.destination = "";
        }
    },

    [types.BACKUPSCHEDULE_NO_ERRORS](state) {
        state.backupScheduleErrors = {
            name: "",
            description: "",
            type: "",
            executionTime: "",
            containers: "",
            destination: "",
        }
    }

}


export default {
    state,
    getters,
    actions,
    mutations
}