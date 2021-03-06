import client from '../client'

export default {

    /**
     * Get running contianer jobs.
     * @returns {AxiosPromise<any>}
     */
    getRunningJobs() {
        return client.withAuth().get('/jobs/containers?type=running');
    },

    /**
     * Get archived container jobs.
     * @returns {AxiosPromise<any>}
     */
    getArchivedJobs() {
        return client.withAuth().get('/jobs/containers?type=archived')
    },


}