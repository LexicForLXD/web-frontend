import * as types from "../../mutation-types";
import {forEach, pull} from "lodash";
import {keyForImage} from "./index";
import Vue from 'vue';

export default {
    [types.IMAGE_DELETE](state, id) {
        state.deletedImage = state.images[keyForImage(id)];
        Vue.delete(state.images, keyForImage(id));
        pull(state.imagesList, id);
    },

    [types.IMAGE_DELETE_FAILURE](state, error) {
        state.imagesList.push(state.deletedImage.id);
        Vue.set(state.images, keyForImage(state.deletedImage.id), state.deletedImage);
        state.deletedImage = {};
        setErrors(state.imageErrors, error);
    },

    [types.IMAGE_DELETE_SUCCESS](state) {
        state.deletedImage = {};
        clearErrors(state.imageErrors);
    },


    [types.IMAGE_SET_ALL]({images, imagesList, imageErrors}, {imagesData}) {
        forEach(imagesData, function (value) {
            const key = keyForImage(value.id);
            if (!images[key]) {
                imagesList.push(value.id)
            }
            Vue.set(images, key, value)
        });
        clearErrors(imageErrors);
    },

    [types.IMAGE_SET_ALL_FAILURE]({imageErrors}, error) {
        setErrors(imageErrors, error);
    },

    [types.IMAGE_UPDATE_SUCCESS](state, image) {
        state.images[keyForImage(image.id)] = image;
        clearErrors(state.imageErrors);
    },

    [types.IMAGE_UPDATE_FAILURE](state, error) {
        setErrors(state.imageErrors, error);
    },

    [types.IMAGE_ADD_NEW]({images, imagesList}, image) {
        const key = keyForImage(image.id);
        if (!images[key]) {
            imagesList.push(image.id);
        }
        Vue.set(images, key, image);

    },

    [types.IMAGE_ADD_NEW_SUCCESS](state) {
        clearErrors(state.imageErrors);
    },

    [types.IMAGE_ADD_NEW_FAILURE](state, error) {
        setErrors(state.imageErrors, error);
    },

}

function setErrors(imageErrors, error) {
    if (error.response) {
        if (error.response.data) {
            if (error.response.data.error) {
                if (error.response.data.error.message) {
                    if (error.response.data.error.message.public) {
                        imageErrors.public = error.response.data.error.message.public;
                    } else {
                        imageErrors.public = "";
                    }
                    if (error.response.data.error.message.filename) {
                        imageErrors.filename = error.response.data.error.message.filename;
                    } else {
                        imageErrors.filename = "";
                    }
                    if (error.response.data.error.message.properties) {
                        imageErrors.properties = error.response.data.error.message.properties;
                    } else {
                        imageErrors.properties = "";
                    }
                    if (error.response.data.error.message.type) {
                        imageErrors.type = error.response.data.error.message.type;
                    } else {
                        imageErrors.type = "";
                    }
                    if (error.response.data.error.message.name) {
                        imageErrors.aliasName = error.response.data.error.message.name;
                    } else {
                        imageErrors.aliasName = "";
                    }
                    if (error.response.data.error.message.description) {
                        imageErrors.aliasDescription = error.response.data.error.message.description;
                    } else {
                        imageErrors.aliasDescription = "";
                    }
                    if (error.general) {
                        imageErrors.general = error.general;
                    } else {
                        imageErrors.general = "";
                    }
                }
            }
        }
    }
}

function clearErrors(imageErrors) {
    imageErrors.public = "";
    imageErrors.filename = "";
    imageErrors.properties = "";
    imageErrors.type = "";
    imageErrors.aliasDescription = "";
    imageErrors.aliasName = "";
    imageErrors.general = "";

}