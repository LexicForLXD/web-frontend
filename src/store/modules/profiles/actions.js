import profileApi from "../../../api/profiles/profile";
import * as types from "../../mutation-types";

export default {
    setProfiles({commit}) {
        commit(types.LOADING_BEGIN);
        profileApi.fetch().then((res) => {
            commit(types.PROFILE_SET_ALL, {profilesData: res.data});
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            commit(types.PROFILE_SET_ALL_FAILURE, error);
        })
    },

    initProfiles({commit}) {
        return new Promise((resolve, reject) => {
            profileApi.fetch().then((res) => {
                commit(types.PROFILE_SET_ALL, {profilesData: res.data});
                resolve();
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 404) {
                        if (error.response.data.error.code === 404) {
                            resolve(error.response.data.error.message);
                        }

                    }
                }
                reject(error);
                commit(types.PROFILE_SET_ALL_FAILURE, error);
            })
        })
    },


    deleteProfile({commit}, id) {
        commit(types.PROFILE_DELETE, id);
        commit(types.LOADING_BEGIN);
        profileApi.delete(id).then(() => {
            commit(types.LOADING_FINISH);
            commit(types.PROFILE_DELETE_SUCCESS);
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            commit(types.PROFILE_DELETE_FAILURE, error);
        })
    },


    createProfile({commit}, data) {
        commit(types.LOADING_BEGIN);
        return new Promise((resolve, reject) => {
            profileApi.create(data).then((res) => {
                commit(types.PROFILE_ADD_NEW, res.data);
                commit(types.LOADING_FINISH);
                commit(types.PROFILE_ADD_NEW_SUCCESS);
                resolve();
            }).catch((error) => {
                commit(types.PROFILE_ADD_NEW_FAILURE, error);
                commit(types.LOADING_FAIL);
                reject();
            })
        })
    },


    updateProfile({commit}, data) {
        commit(types.LOADING_BEGIN);
        profileApi.update(data.profile_id, data.profile).then((res) => {
            commit(types.PROFILE_UPDATE_SUCCESS, res.data);
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            commit(types.PROFILE_UPDATE_FAILURE, error);
        })
    }
}