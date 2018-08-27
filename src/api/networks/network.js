import client from '../client'

export default {

    fetchFromHost() {
        return client.withAuth().get('/hosts/' + hostId + '/networks')
    },

    /**
     * @param {int} id 
     */
    show(id) {
        return client.withAuth().get('/networks/' + id)
    },

    fetch() {
        return client.withAuth().get('/networks')
    },

    /**
     * @param {int} id 
     */
    delete(id) {
        return client.withAuth().delete('/networks/' + id)
    },

    /**
     * @param {object} network 
     */
    create(network) {
        return client.withAuth().post('/networks', network)
    },

    /**
     * @param {int} id 
     * @param {object} network 
     */
    update(id, network) {
        return client.withAuth().put('/networks/' + id, network)
    }
}