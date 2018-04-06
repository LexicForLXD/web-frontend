import {keyForUser} from './index'

export default {
    isAuthenticated({isAuthenticated}) {
        return isAuthenticated;
    },

    getUserLoading({userLoading}) {
        return userLoading;
    },

    getCurrentFirstName({currentUserId, users}) {
        if (users[keyForUser(currentUserId)]) {
            return users[keyForUser(currentUserId)].firstName;
        }
        return "Loading";
    },

    getCurrentUser({currentUserId, users}) {
        return users[keyForUser(currentUserId)];
    },

    getUsers({users, usersList}) {
        return _.map(usersList, id => users[keyForUser(id)])
    },

    getUserIndexById: ({usersList}) => (userId) => {
        return usersList.findIndex(user => user == userId)
    },

    getUserErrors: ({userErrors}) => {
        return userErrors;
    }


}