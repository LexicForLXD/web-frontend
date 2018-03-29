import client from '../client'

export default {
    fetch() {
        return client.withAuth().get('/backupdestinations')
    },
    show(destId) {
        return client.withAuth().get('/backupdestinations/' + destId)
    },
    delete(destId) {
        return client.withAuth().delete('/backupdestinations/' + destId)
    },
    create(destination) {
        return client.withAuth().post('/backupdestinations', destination)
    },
    update(destId, destination) {
        return client.withAuth().put('/backupdestinations/' + destId, destination)
    }
}