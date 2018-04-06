import actions from './actions'
import mutations from './mutations'
import getters from './getters'


export function keyForProfile(id) {
    return `profile_${id}`
}

// initial state
const state = {
    profiles: {},
    profilesList: [],
    deletedProfile: {},
    createdProfile: {},
    profileErrors: {
        name: "",
        description: "",
        config: "",
        devices: ""
    }

};


export default {
    state,
    getters,
    actions,
    mutations
}