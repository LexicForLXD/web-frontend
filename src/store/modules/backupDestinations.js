import * as types from '../mutation-types'
import backupDestinationApi from '../../api/backup/backupDestination'
import {map, forEach, pull} from 'lodash'

function keyForDestination(id) {
    return `backupDestination_${id}`
}

// initial state
const state = {
    backupDestinations: {
        deleted: false,
    },
    backupDestinationsList: [],
    deletedBackupDestination: {},
    backupDestinationErrors: {
        name: "",
        description: "",
        protocol: "",
        username: "",
        password: "",
        hostname: "",
        path: "",
    }

}

// getters
const getters = {
    getBackupDestinations({backupDestinations, backupDestinationsList}) {
        return _.map(backupDestinationsList, id => backupDestinations[keyForDestination(id)])
    },

    getBackupDestinationErrors({backupDestinationErrors}) {
        return backupDestinationErrors;
    }

}

const actions = {
    setBackupDestinations({commit}) {
        commit(types.LOADING_BEGIN);
        backupDestinationApi.fetch().then((res) => {
            commit(types.BACKUPDEST_SET_ALL, {backupDestinationsData: res.data});
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.LOADING_FAIL)
            if (error.response.status != 404) {
                console.warn('Could not fetch backupDestinations');
            } else {
                console.log(error.response.data.error.message)
            }
        })
    },

    initBackupDestinations({commit}) {
        return new Promise((resolve, reject) => {
            backupDestinationApi.fetch().then((res) => {
                commit(types.BACKUPDEST_SET_ALL, {backupDestinationsData: res.data});
                resolve();
            }).catch((error) => {
                if(error.response) {
                    if (error.response.status === 404) {
                        console.warn('Could not fetch backupDestinations');
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


    deleteBackupDestination({commit, state}, id) {
        const savedBackupDestinations = state.backupDestinations;
        const savedBackupDestinationsList = state.backupDestinationsList;
        commit(types.BACKUPDEST_DELETE, id)
        commit(types.LOADING_BEGIN);
        backupDestinationApi.delete(id).then((res) => {
            commit(types.LOADING_FINISH);
            commit(types.BACKUPDEST_DELETE_SUCCESS);
            commit(types.BACKUPDEST_NO_ERRORS);
        }).catch((res) => {
            commit(types.LOADING_FAIL);
            console.warn('Could not delete backupDestination');
            commit(types.BACKUPDEST_DELETE_FAILURE, {savedBackupDestinations, savedBackupDestinationsList});
        })
    }
    ,


    createBackupDestination({commit}, data) {
        const savedBackupDestinations = state.backupDestinations;
        const savedBackupDestinationsList = state.backupDestinationsList;
        commit(types.LOADING_BEGIN);
        return new Promise((resolve, reject) => {
            backupDestinationApi.create(data).then((res) => {
                commit(types.BACKUPDEST_ADD_NEW, res.data);
                commit(types.LOADING_FINISH);
                commit(types.BACKUPDEST_NO_ERRORS);
                resolve();
            }).catch((error) => {
                console.warn('Could not add new backupDestination');
                commit(types.BACKUPDEST_ADD_NEW_FAILURE, {
                    savedBackupDestinations,
                    savedBackupDestinationsList,
                });
                commit(types.BACKUPDEST_ERRORS, error);
                commit(types.LOADING_FAIL);
                reject();
            })
        })
    }
    ,


    updateBackupDestination({commit}, data) {
        commit(types.LOADING_BEGIN);
        backupDestinationApi.update(data.backupDestination_id, data.backupDestination).then((res) => {
            commit(types.BACKUPDEST_UPDATE_SUCCESS, res.data);
            commit(types.LOADING_FINISH);
            commit(types.BACKUPDEST_NO_ERRORS);
        }).catch((error) => {
            console.warn('Could not update backupDestination');
            commit(types.BACKUPDEST_ERRORS, error);
            commit(types.LOADING_FAIL);
        })
    }
}


const mutations = {
    [types.BACKUPDEST_DELETE]({backupDestinations, backupDestinationsList, deletedBackupDestination}, id) {
        const key = keyForDestination(id);
        deletedBackupDestination = backupDestinations[key];
        Vue.delete(backupDestinations, key);
        _.pull(backupDestinationsList, id);
    },

    [types.BACKUPDEST_DELETE_FAILURE]({backupDestinations, backupDestinationsList, deletedBackupDestination}) {
        console.log('delete failure');
        const key = keyForDestination(deletedBackupDestination.id);
        Vue.set(backupDestinations, key, deletedBackupDestination);
        backupDestinationsList.push(deletedBackupDestination.id);
    },

    [types.BACKUPDEST_DELETE_SUCCESS]({deletedBackupDestination}) {
       deletedBackupDestination = {};
    },


    [types.BACKUPDEST_SET_ALL]({backupDestinations, backupDestinationsList}, {backupDestinationsData}) {
        forEach(backupDestinationsData, function (value) {

            const key = keyForDestination(value.id)

            if (!backupDestinations[key]) {
                backupDestinationsList.push(value.id)
            }
            Vue.set(backupDestinations, key, value)

        })
    },

    [types.BACKUPDEST_UPDATE_SUCCESS](state, backupDestination) {
        const key = keyForDestination(backupDestination.id)

        state.backupDestinations[key] = backupDestination;
    },


    [types.BACKUPDEST_UPDATE_FAILURE]() {
        console.log("backup destination update failed");
    },

    [types.BACKUPDEST_ADD_NEW]({backupDestinations, backupDestinationsList}, backupDestination) {
        const key = keyForDestination(backupDestination.id)
        if (!backupDestinations[key]) {
            Vue.set(backupDestinations, key, backupDestination)
            backupDestinationsList.push(backupDestination.id)
        }
        console.log('new success');
    },

    [types.BACKUPDEST_ADD_NEW_SUCCESS]() {
        console.log('new success')
    },

    [types.BACKUPDEST_ADD_NEW_FAILURE](state, {savedBackupDestinations, savedBackupDestinationsList}) {
        state.backupDestinations = savedBackupDestinations;
        state.backupDestinationsList = savedBackupDestinationsList;
    },


    [types.BACKUPDEST_ERRORS](state, error) {
        if (error.response.data.error.message.name) {
            state.backupDestinationErrors.name = error.response.data.error.message.name;
        } else {
            state.backupDestinationErrors.name = "";
        }
        if (error.response.data.error.message.description) {
            state.backupDestinationErrors.description = error.response.data.error.message.description;
        } else {
            state.backupDestinationErrors.description = "";
        }
        if (error.response.data.error.message.protocol) {
            state.backupDestinationErrors.protocol = error.response.data.error.message.protocol;
        } else {
            state.backupDestinationErrors.protocol = "";
        }
        if (error.response.data.error.message.username) {
            state.backupDestinationErrors.username = error.response.data.error.message.username;
        } else {
            state.backupDestinationErrors.username = "";
        }
        if (error.response.data.error.message.password) {
            state.backupDestinationErrors.password = error.response.data.error.message.password;
        } else {
            state.backupDestinationErrors.password = "";
        }
        if (error.response.data.error.message.hostname) {
            state.backupDestinationErrors.hostname = error.response.data.error.message.hostname;
        } else {
            state.backupDestinationErrors.hostname = "";
        }
        if (error.response.data.error.message.path) {
            state.backupDestinationErrors.path = error.response.data.error.message.path;
        } else {
            state.backupDestinationErrors.path = "";
        }
    },

    [types.BACKUPDEST_NO_ERRORS](state) {
        state.backupDestinationErrors = {
            name: "",
            description: "",
            protocol: "",
            username: "",
            password: "",
            hostname: "",
            path: "",
        }
    }

}


export default {
    state,
    getters,
    actions,
    mutations
}