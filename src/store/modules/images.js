import * as types from '../mutation-types'
import imageApi from '../../api/image/image'
import {map, forEach, pull, filter} from 'lodash'

function keyForImage(id) {
    return `image_${id}`
}

// initial state
const state = {
    images: {
        deleted: false,
    },
    imagesList: [],
    imageErrors: {
        public: "",
        filename: "",
        properties: "",
    },
    imageLoading: {
        isLoading: false,
        hasLoadingErrors: false,
    }

}

// getters
const getters = {
    getImages({images, imagesList}) {
        return _.map(imagesList, id => images[keyForImage(id)])
    },

    getFinishedImages: (state, getters) => {
        return _.filter(getters.getImages, ['finished', true]);
    },

    getUnfinishedImages: (state, getters) => {
        return _.filter(getters.getImages, ['finished', false]);
    },

    getImageErrors: ({imageErrors}) => {
        return imageErrors;
    },

    getImageLoading: ({imageLoading}) => {
        return imageLoading;
    },

    getImagesForHost: ({images}) => (hostId) => {
        return _.filter(images, ['hostId', hostId]);
    },

    getImagesWithAliasesForHost: ({images}) => (hostId) => {
        const filteredImages = _.filter(images, ['hostId', hostId]);
        return _.filter(filteredImages, function (image) {
            return image.aliases.length > 0
        })
    },

}

const actions = {
    setImages({commit}) {
        commit(types.LOADING_BEGIN);
        imageApi.fetch().then((res) => {
            commit(types.IMAGE_SET_ALL, {imagesData: res.data});
            commit(types.LOADING_FINISH);
        }).catch((error) => {
            commit(types.LOADING_FAIL);
            if (error.response.status != 404) {
                console.warn('Could not fetch images');
            } else {
                console.log(error.response.data.error.message)
            }
        })
    },

    initImages({commit}) {
        return new Promise((resolve, reject) => {
            imageApi.fetch().then((res) => {
                commit(types.IMAGE_SET_ALL, {imagesData: res.data});
                resolve();
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 404) {
                        console.warn('Could not fetch images');
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


    deleteImage({commit, state}, id) {
        const savedImages = state.images;
        const savedImagesList = state.imagesList;
        commit(types.IMAGE_DELETE, id)
        commit(types.LOADING_BEGIN);
        imageApi.delete(id).then((res) => {
            commit(types.LOADING_FINISH);
            commit(types.IMAGE_DELETE_SUCCESS);
            commit(types.IMAGE_NO_ERRORS);
        }).catch((res) => {
            commit(types.LOADING_FAIL);
            console.warn('Could not delete image');
            commit(types.IMAGE_DELETE_FAILURE, {savedImages, savedImagesList});
        })
    },


    createImage({commit}, data) {
        const savedImages = state.images;
        const savedImagesList = state.imagesList;
        commit(types.LOADING_BEGIN);

        return new Promise((resolve, reject) => {
            imageApi.create(data.hostId, data.image).then((res) => {
                commit(types.IMAGE_ADD_NEW, {image: res.data});
                commit(types.LOADING_FINISH);
                commit(types.IMAGE_NO_ERRORS);
                resolve();
            }).catch((error) => {
                console.warn('Could not add new image');
                commit(types.IMAGE_ADD_NEW_FAILURE, {savedImages, savedImagesList});
                commit(types.LOADING_FAIL);
                commit(types.IMAGE_ERRORS, error);
                reject();
            })
        })
    },


    updateImage({commit}, data) {
        commit(types.LOADING_BEGIN);
        imageApi.update(data.image_id, data.image).then((res) => {
            commit(types.IMAGE_UPDATE_SUCCESS, res.data);
            commit(types.LOADING_FINISH);
            commit(types.IMAGE_NO_ERRORS);
        }).catch((error) => {
            console.warn('Could not update image');
            commit(types.LOADING_FAIL);
            commit(types.IMAGE_ERRORS, error);
        })
    },


}


const mutations = {
    [types.IMAGE_DELETE]({images, imagesList}, id) {
        const key = keyForImage(id)
        Vue.delete(images, key);

        _.pull(imagesList, id);
    },

    [types.IMAGE_DELETE_FAILURE](state, {savedImages, savedImagesList}) {
        console.log('delete failure');

        state.images = savedImages;
        state.imagesList = savedImagesList;
    },

    [types.IMAGE_DELETE_SUCCESS](state) {
        console.log('delete success')
    },


    [types.IMAGE_SET_ALL]({images, imagesList}, {imagesData}) {
        forEach(imagesData, function (value) {

            const key = keyForImage(value.id)

            if (!images[key]) {
                imagesList.push(value.id)
            }
            Vue.set(images, key, value)

        })
    },

    [types.IMAGE_UPDATE_SUCCESS](state, image) {
        const key = keyForImage(image.id)

        state.images[key] = image;
    },

    [types.IMAGE_ADD_NEW]({images, imagesList}, image) {
        const key = keyForImage(image.id)
        if (!images[key]) {
            Vue.set(images, key, image)
            imagesList.push(image.id)
            console.log('new success')
        } else {
            console.log("image already in cache");
        }

    },

    [types.IMAGE_ADD_NEW_SUCCESS]() {
        console.log('new success')
    },

    [types.IMAGE_ADD_NEW_FAILURE](state, {savedImages, savedImagesList}) {
        state.images = savedImages;
        state.imagesList = savedImagesList;
    },

    [types.IMAGE_ERRORS]({imageErrors}, error) {
        if (error.response.data.error.message.public) {
            imageErrors.public = error.response.data.error.message.public;
        }
        if (error.response.data.error.message.filename) {
            imageErrors.filename = error.response.data.error.message.filename;
        }
        if (error.response.data.error.message.properties) {
            imageErrors.properties = error.response.data.error.message.properties;
        }
    },

    [types.IMAGE_NO_ERRORS]({imageErrors}) {
        imageErrors = {
            public: "",
            filename: "",
            properties: "",
        }
    }

}


export default {
    state,
    getters,
    actions,
    mutations
}