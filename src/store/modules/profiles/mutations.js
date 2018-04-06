import * as types from "../../mutation-types";
import {forEach, pull} from "lodash";
import {keyForProfile} from "./index";
import Vue from 'vue';

export default {
    [types.PROFILE_DELETE]({profiles, profilesList, deletedProfile}, id) {
        const key = keyForProfile(id);
        deletedProfile = profiles[key];
        Vue.delete(profiles, key);
        pull(profilesList, id);
    },

    [types.PROFILE_DELETE_FAILURE]({profiles, profilesList, deletedProfile, profileErrors}, error) {
        const key = keyForProfile(deletedProfile.id);

        profilesList.push(deletedProfile.id);
        Vue.set(profiles, key, deletedProfile);
        deletedProfile = {};
        setErrors(profileErrors, error)
    },

    [types.PROFILE_DELETE_SUCCESS]({profileErrors}) {
        clearErrors(profileErrors);
    },


    [types.PROFILE_SET_ALL]({profiles, profilesList, profileErrors}, {profilesData}) {
        forEach(profilesData, function (value) {
            const key = keyForProfile(value.id);
            if (!profiles[key]) {
                profilesList.push(value.id)
            }
            Vue.set(profiles, key, value)
        });
        clearErrors(profileErrors);
    },

    [types.PROFILE_SET_ALL_FAILURE] ({profileErrors}, error) {
        setErrors(profileErrors, error);
    },

    [types.PROFILE_UPDATE_SUCCESS]({profiles, profileErrors}, profile) {
        profiles[keyForProfile(profile.id)] = profile;
        clearErrors(profileErrors);
    },


    [types.PROFILE_UPDATE_FAILURE]({profileErrors}, error) {
        setErrors(profileErrors, error);
    },

    [types.PROFILE_ADD_NEW]({profiles, profilesList}, profile) {
        const key = keyForProfile(profile.id);
        if (!profiles[key]) {
            Vue.set(profiles, key, profile);
            profilesList.push(profile.id)
        }
    },

    [types.PROFILE_ADD_NEW_SUCCESS]({profileErrors}) {
        clearErrors(profileErrors);
    },

    [types.PROFILE_ADD_NEW_FAILURE]({profileErrors}, error) {
        setErrors(profileErrors, error);
    },

}



function setErrors (profileErrors, error) {
    if (error.response.data.error.message.name) {
        profileErrors.name = error.response.data.error.message.name;
    }
    if (error.response.data.error.message.description) {
        profileErrors.description = error.response.data.error.message.description;
    }
    if (error.response.data.error.message.config) {
        profileErrors.config = error.response.data.error.message.config;
    }
    if (error.response.data.error.message.devices) {
        profileErrors.devices = error.response.data.error.message.devices;
    }
}

function clearErrors (profileErrors) {
    profileErrors.name = "";
    profileErrors.description = "";
    profileErrors.config = "";
    profileErrors.devices = "";
}
