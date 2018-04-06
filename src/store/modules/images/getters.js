import {map, filter} from 'lodash';
import {keyForImage} from "./index";

export default {
    getImages: ({images, imagesList}) => {
        return map(imagesList, id => images[keyForImage(id)])
    },

    getFinishedImages: (state, getters) => {
        return filter(getters.getImages, ['finished', true]);
    },

    getUnfinishedImages: (state, getters) => {
        return filter(getters.getImages, ['finished', false]);
    },

    getImageErrors: ({imageErrors}) => {
        return imageErrors;
    },

    getImageLoading: ({imageLoading}) => {
        return imageLoading;
    },

    getImagesForHost: ({images}) => (hostId) => {
        return filter(images, ['hostId', hostId]);
    },

    getImagesWithAliasesForHost: ({images}) => (hostId) => {
        const filteredImages = filter(images, ['hostId', hostId]);
        return filter(filteredImages, function (image) {
            return image.aliases.length > 0
        })
    },

}