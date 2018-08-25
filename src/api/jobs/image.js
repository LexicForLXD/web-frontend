import client from '../client'

export default {

    /**
     * Get running image jobs.
     * @returns {AxiosPromise<any>}
     */
    getRunningJobs() {
        return client.withAuth().get('/jobs/image?type=running');
    },

    /**
     * Get archived imgae jobs.
     * @returns {AxiosPromise<any>}
     */
    getArchivedJobs() {
        return client.withAuth().get('/jobs/image?type=archived')
    },


}