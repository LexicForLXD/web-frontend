import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export function keyForContainer(id) {
    return `container_${id}`
}

// initial state
const state = {
    containers: {
        deleted: false,
    },
    deletedContainer: {},
    containersList: [],
    containerLoading: {
        isLoading: false,
        hasLoadingErrors: false,
    },
    containerErrors: {
        ipv4: [],
        ipv6: [],
        domainName: [],
        name: [],
        architecture: [],
        config: [],
        devices: [],
        sourceType: [],
        fingerprint: [],
        alias: [],
    }

};

export default {
    state,
    getters,
    actions,
    mutations
}