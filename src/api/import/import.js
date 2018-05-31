import client from '../client'

export default {

    /**
     * Import images from host.
     * @param hostId
     * @returns {AxiosPromise<any>}
     */
    images(hostId) {
        return client.withAuth().post('/sync/hosts/' + hostId + '/images')
    },

    /**
     * Import containers from host.
     * @param hostId
     * @returns {AxiosPromise<any>}
     */
    containers(hostId) {
        return client.withAuth().post('/sync/hosts/' + hostId + '/containers')
    },

    /**
     * Import images and containers at the same time.
     * @param hostId
     * @returns {AxiosPromise<any>}
     */
    all(hostId) {
        return client.withAuth().post('/sync/hosts/' + hostId)
    }

}