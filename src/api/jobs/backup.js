import client from '../client'

export default {

    /**
     * Get running backup jobs.
     * @returns {AxiosPromise<any>}
     */
    getRunningJobs() {
        return client.withAuth().get('/jobs/backup?type=running');
    },

    /**
     * Get archived backup jobs.
     * @returns {AxiosPromise<any>}
     */
    getArchivedJobs() {
        return client.withAuth().get('/jobs/backup?type=archived')
    },


}