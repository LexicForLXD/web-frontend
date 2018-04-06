import actions from './actions'
import mutations from './mutations'
import getters from './getters'


export function keyForHost(id) {
    return `host_${id}`
}

// initial state
const state = {
    hosts: {},
    hostsList: [],
    deletedHost: {},
    createdHost: {},
    hostErrors: {
        ipv4: "",
        ipv6: "",
        domainName:"",
        name: "",
        port: "",
        settings: "",
        auth: "",
        general: "",
    },
    hostLoading: {
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