import * as types from "../../mutation-types";
import imageApi from "../../../api/image/image";

export default {
    setImages({commit}) {
        commit(types.LOADING_BEGIN);
        imageApi.fetch().then((res) => {
            commit(types.IMAGE_SET_ALL, {imagesData: res.data});
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            commit(types.IMAGE_SET_ALL_FAILURE, error);
        })
    },

    initImages({commit}) {
        return new Promise((resolve, reject) => {
            imageApi.fetch().then((res) => {
                commit(types.IMAGE_SET_ALL, {imagesData: res.data});
                resolve();
            }).catch((error) => {
                if (error.response) {
                    commit(types.IMAGE_SET_ALL_FAILURE, {general: error.response.data.error.message});
                    if (error.response.status === 404) {
                        if (error.response.data.error.code === 404) {
                            resolve();
                        }
                    }
                }
                reject(error);
            })
        })
    },


    deleteImage({commit}, id) {
        commit(types.IMAGE_DELETE, id);
        commit(types.LOADING_BEGIN);
        imageApi.delete(id).then(() => {
            commit(types.LOADING_FINISH);
            commit(types.IMAGE_DELETE_SUCCESS);
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            commit(types.IMAGE_DELETE_FAILURE, error);
        })
    },


    createImage({commit}, data) {
        commit(types.LOADING_BEGIN);
        return new Promise((resolve, reject) => {
            imageApi.create(data.hostId, data.image).then((res) => {
                commit(types.IMAGE_ADD_NEW, {image: res.data});
                commit(types.LOADING_FINISH);
                resolve();
            }).catch((error) => {
                commit(types.IMAGE_ADD_NEW_FAILURE, error);
                commit(types.LOADING_FAIL);
                reject();
            })
        })
    },


    updateImage({commit}, data) {
        commit(types.LOADING_BEGIN);
        imageApi.update(data.image_id, data.image).then((res) => {
            commit(types.IMAGE_UPDATE_SUCCESS, res.data);
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            commit(types.IMAGE_UPDATE_FAILURE, error);
        })
    },


}