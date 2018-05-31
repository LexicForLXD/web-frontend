import client from '../client'

export default {

    /**
     * Get running import jobs.
     * @returns {AxiosPromise<any>}
     */
    getRunningJobs() {
        return client.withAuth().get('/sync/hosts?type=running');
    },

    /**
     * Get archived import jobs.
     * @returns {AxiosPromise<any>}
     */
    getArchivedJobs() {
        return client.withAuth().get('/sync/hosts?type=archived')
    },


}