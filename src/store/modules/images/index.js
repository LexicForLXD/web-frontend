import actions from './actions'
import mutations from './mutations'
import getters from './getters'


export function keyForImage(id) {
    return `image_${id}`
}

// initial state
const state = {
    images: {},
    imagesList: [],
    deletedImage: {},
    createdImage: {},
    imageErrors: {
        public: [],
        filename: [],
        properties: [],
        type: [],
        general: [],
        aliasName: [],
        aliasDescription: [],
    },
    imageLoading: {
        isLoading: false,
        hasLoadingErrors: false,
    }

};


export default {
    state,
    getters,
    actions,
    mutations
}