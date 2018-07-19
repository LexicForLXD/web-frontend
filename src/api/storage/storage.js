import client from '../client'

export default {
    fetch () {
        return client.withAuth().get('/storage-pools')
    },
    show (id) {
        return client.withAuth().get('/storage-pools/'+id)
    },
    fetchFromHost (hostId) {
        return client.withAuth().get('/hosts/'+ hostId +'/storage-pools')
    },
    delete (id) {
        return client.withAuth().delete('/storage-pools/'+id)
    },
    create (hostId, storagePool) {
        return client.withAuth().post('/hosts/'+hostId+'/storage-pools', storagePool)
    },
    update (id, storagePool) {
        return client.withAuth().put('/storage-pools/'+id, storagePool)
    }
}