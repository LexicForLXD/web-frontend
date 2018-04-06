import client from '../client'

export default {
    getFiles(backupId) {
        return client.withAuth().get('/restores/backups/'+backupId)
    },
    restore(backupId) {
        return client.withAuth().post('/restores/backups/' + backupId)
    }
}