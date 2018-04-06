import client from '../client'

export default {
    fetch() {
        return client.withAuth().get('/images')
    },
    fetchFromHost(hostId) {
        return client.withAuth().get('/hosts/' + hostId + '/images')
    },
    show(imageId) {
        return client.withAuth().get('/images/'+imageId)
    },
    delete(imageId) {
        return client.withAuth().delete('/images/' + imageId)
    },
    create(hostId, image) {
        return client.withAuth().post('/hosts/' + hostId + '/images', image)
    },
    update(imageId, image) {
        return client.withAuth().put('/images/' + imageId, image)
    }
}