import * as types from '../mutation-types'
import profileApi from '../../api/profiles/profile'
import {map, forEach, pull} from 'lodash'

function keyForProfile(id) {
    return `profile_${id}`
}

// initial state
const state = {
    profiles: {
        deleted: false,
    },
    profilesList: [],
    profileErrors: {
        name: "",
        description: "",
        config: "",
        devices: ""
    }

}

// getters
const getters = {
    getProfiles({profiles, profilesList}) {
        return _.map(profilesList, id => profiles[keyForProfile(id)])
    },

    getProfileErrors({profileErrors}) {
        return profileErrors;
    }

}

const actions = {
    setProfiles({commit}) {
        commit(types.LOADING_BEGIN);
        profileApi.fetch().then((res) => {
            commit(types.PROFILE_SET_ALL, {profilesData: res.data});
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.LOADING_FAIL)
            if (error.response.status != 404) {
                console.warn('Could not fetch profiles');
            } else {
                console.log(error.response.data.error.message)
            }
        })
    },

    initProfiles({commit}) {
        return new Promise((resolve, reject) => {
            profileApi.fetch().then((res) => {
                commit(types.PROFILE_SET_ALL, {profilesData: res.data});
                resolve();
            }).catch((error) => {
                if (error.response.status != 404) {
                    console.warn('Could not fetch profiles');
                } else {
                    console.log(error.response.data.error.message)
                }
                reject(error);
            })
        })
    },


    deleteProfile({commit, state}, id) {
        const savedProfiles = state.profiles;
        const savedProfilesList = state.profilesList;
        commit(types.PROFILE_DELETE, id)
        commit(types.LOADING_BEGIN);
        profileApi.delete(id).then((res) => {
            commit(types.LOADING_FINISH);
            commit(types.PROFILE_DELETE_SUCCESS);
        }).catch((res) => {
            commit(types.LOADING_FAIL);
            console.warn('Could not delete profile');
            commit(types.PROFILE_DELETE_FAILURE, {savedProfiles, savedProfilesList});
        })
    }
    ,


    createProfile({commit}, data) {
        const savedProfiles = state.profiles;
        const savedProfilesList = state.profilesList;
        commit(types.LOADING_BEGIN);
        return new Promise((resolve, reject) => {
            profileApi.create(data).then((res) => {
                commit(types.PROFILE_ADD_NEW, res.data);
                commit(types.LOADING_FINISH);
                resolve();
            }).catch((error) => {
                console.warn('Could not add new profile');
                commit(types.PROFILE_ADD_NEW_FAILURE, {savedProfiles, savedProfilesList, error: error});
                commit(types.LOADING_FAIL);
                reject();
            })
        })
    }
    ,


    updateProfile({commit}, data) {
        commit(types.LOADING_BEGIN);
        profileApi.update(data.profile_id, data.profile).then((res) => {
            commit(types.PROFILE_UPDATE_SUCCESS, res.data);
            commit(types.LOADING_FINISH);
        }).catch((res) => {
            console.warn('Could not update profile');
            commit(types.LOADING_FAIL);
        })
    }
}


const mutations = {
    [types.PROFILE_DELETE]({profiles, profilesList}, id) {
        const key = keyForProfile(id)
        Vue.delete(profiles, key);

        _.pull(profilesList, id);
    },

    [types.PROFILE_DELETE_FAILURE](state, {savedProfiles, savedProfilesList}) {
        console.log('delete failure');

        state.profiles = savedProfiles;
        state.profilesList = savedProfilesList;
    },

    [types.PROFILE_DELETE_SUCCESS](state) {
        console.log('delete success')
    },


    [types.PROFILE_SET_ALL]({profiles, profilesList}, {profilesData}) {
        forEach(profilesData, function (value) {

            const key = keyForProfile(value.id)

            if (!profiles[key]) {
                profilesList.push(value.id)
            }
            Vue.set(profiles, key, value)

        })
    },

    [types.PROFILE_UPDATE_SUCCESS](state, profile) {
        const key = keyForProfile(profile.id)

        state.profiles[key] = profile;

        state.profileErrors = {
            name: "",
            description: "",
            config: "",
            devices: ""
        };
    },


    [types.PROFILE_UPDATE_FAILURE](state, error) {
        if (error.response.data.error.message.name) {
            state.profileErrors.name = error.response.data.error.message.name;
        }
        if (error.response.data.error.message.description) {
            state.profileErrors.description = error.response.data.error.message.description;
        }
        if (error.response.data.error.message.config) {
            state.profileErrors.config = error.response.data.error.message.config;
        }
        if (error.response.data.error.message.devices) {
            state.profileErrors.devices = error.response.data.error.message.devices;
        }
        ;
    },

    [types.PROFILE_ADD_NEW]({profiles, profilesList}, profile) {
        const key = keyForProfile(profile.id)
        if (!profiles[key]) {
            Vue.set(profiles, key, profile)
            profilesList.push(profile.id)
        }
        console.log('new success')
        state.profileErrors = {
            name: "",
            description: "",
            config: "",
            devices: ""
        };
    },

    [types.PROFILE_ADD_NEW_SUCCESS](state) {
        console.log('new success')
        state.profileErrors = {
            name: "",
            description: "",
            config: "",
            devices: ""
        };
    },

    [types.PROFILE_ADD_NEW_FAILURE](state, {savedProfiles, savedProfilesList, error}) {
        state.profiles = savedProfiles;
        state.profilesList = savedProfilesList;

        if (error.response.data.error.message.name) {
            state.profileErrors.name = error.response.data.error.message.name;
        }
        if (error.response.data.error.message.description) {
            state.profileErrors.description = error.response.data.error.message.description;
        }
        if (error.response.data.error.message.config) {
            state.profileErrors.config = error.response.data.error.message.config;
        }
        if (error.response.data.error.message.devices) {
            state.profileErrors.devices = error.response.data.error.message.devices;
        }
    }

}


export default {
    state,
    getters,
    actions,
    mutations
}