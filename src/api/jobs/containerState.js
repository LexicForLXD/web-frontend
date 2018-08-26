import client from '../client'

export default {

    /**
     * Get running container state jobs.
     * @returns {AxiosPromise<any>}
     */
    getRunningJobs() {
        return client.withAuth().get('/jobs/containers/state?type=running');
    },

    /**
     * Get archived import jobs.
     * @returns {AxiosPromise<any>}
     */
    getArchivedJobs() {
        return client.withAuth().get('/jobs/containers/state?type=archived')
    },


}