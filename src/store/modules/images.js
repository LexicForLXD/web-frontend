import * as types from '../mutation-types'
import imageApi from '../../api/image/image'
import {map, forEach, pull} from 'lodash'

function keyForImage(id) {
    return `image_${id}`
}

// initial state
const state = {
    images: {
        deleted: false,
    },
    imagesList: [],
    imageErrors: {}

}

// getters
const getters = {
    getHosts({images, imagesList}) {
        return _.map(imagesList, id => images[keyForImage(id)])
    },

    getHostErrors({imageErrors}) {
        return imageErrors;
    }

}

const actions = {
    setHosts({commit}) {
        imageApi.fetch().then((res) => {
            commit(types.IMAGE_SET_ALL, {imagesData: res.data});
        }).catch((error) => {
            if(error.response.status != 404) {
                console.warn('Could not fetch images');
            } else {
                console.log(error.response.data.error.message)
            }
        })
    },


    deleteHost({commit, state}, id) {
        const savedImages = state.images;
        const savedImagesList = state.imagesList;
        commit(types.IMAGE_DELETE, id)
        imageApi.delete(id).then((res) => {
            commit(types.IMAGE_DELETE_SUCCESS);
        }).catch((res) => {
            console.warn('Could not delete image');
            commit(types.IMAGE_DELETE_FAILURE, {savedImages, savedImagesList});
        })
    },


    createHost({commit}, data) {
        const savedImages = state.images;
        const savedImagesList = state.imagesList;
        commit(types.LOADING_BEGIN);
        return new Promise((resolve, reject) => {
            imageApi.create(data).then((res) => {
                commit(types.IMAGE_ADD_NEW, {image: res.data});
                commit(types.LOADING_FINISH);
                resolve();
            }).catch((error) => {
                console.warn('Could not add new image');
                commit(types.IMAGE_ADD_NEW_FAILURE, {savedImages, savedImagesList, error: error});
                commit(types.LOADING_FINISH);
                reject();
            })
        })
    },


    updateHost({commit}, data) {
        commit(types.LOADING_BEGIN);
        imageApi.update(data.image_id, data.image).then((res) => {
            commit(types.IMAGE_UPDATE_SUCCESS, res.data);
            commit(types.LOADING_FINISH);
        }).catch((res) => {
            console.warn('Could not update image');
            commit(types.LOADING_FINISH);
        })
    },

    authHost({commit}, data) {
        commit(types.LOADING_BEGIN);
        imageApi.auth(data.image_id, data.password).then((res) => {
            imageApi.show(data.image_id).then((res) => {
                commit(types.IMAGE_UPDATE_SUCCESS, res.data);
                commit(types.LOADING_FINISH);
            })
        }).catch((err) => {
            console.warn('Could not authenticate image');
            commit(types.LOADING_FINISH);
        })
    }
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

    [types.IMAGE_ADD_NEW]({images, imagesList}, {image}) {
        const key = keyForImage(image.id)
        if (!images[key]) {
            Vue.set(images, key, image)
            imagesList.push(image.id)
        }
        console.log('new success')
        state.imageErrors = {};
    },

    [types.IMAGE_ADD_NEW_SUCCESS](state) {
        console.log('new success')
        state.imageErrors = {};
    },

    [types.IMAGE_ADD_NEW_FAILURE](state, {savedImages, savedImagesList, error}) {
        state.imageErrors = error.response.data;
        state.images = savedImages;
        state.imagesList = savedImagesList;
    }

}


export default {
    state,
    getters,
    actions,
    mutations
}