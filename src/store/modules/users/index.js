import mutations from './mutations'
import getters from './getters'
import actions from './actions'

// initial state
const state = {
    isAuthenticated: !!localStorage.getItem('access_token'),
    currentUserId: '',
    users: {},
    usersList: [],
    deletedUser: {},
    createdUser: {},
    userLoading: {
        isLoading: false,
        hasLoadingErrors: false,
    },
    loginError: "",
    userErrors: {
        firstName: "",
        lastName: "",
        username:"",
        email: "",
        password: "",
        roles: "",
    }
};

export function keyForUser(id) {
    return `user_${id}`
}

export default {
    name: 'userStore',
    state,
    getters,
    actions,
    mutations
}