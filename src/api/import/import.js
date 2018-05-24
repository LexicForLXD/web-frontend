import client from '../client'

export default {
    images(hostId) {
        return client.withAuth().post('/sync/hosts/' + hostId + '/images')
    },
    containers(hostId) {
        return client.withAuth().post('/sync/hosts/' + hostId + '/containers')
    },

}