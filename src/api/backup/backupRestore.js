import client from '../client'

export default {
    /**
     * Getting the array of the tarballs on the selected host
     *
     * @param backupId
     * @param hostId
     * @returns AxiosPromise
     */
    getFiles(backupId, hostId) {
        return client.withAuth().get('/restores/backups/'+backupId+'?host='+hostId)
    },

    /**
     * Restore a selected backup
     *
     * @param backupId
     * @returns {AxiosPromise<any>}
     */
    restore(backupId) {
        return client.withAuth().post('/restores/backups/' + backupId)
    }
}