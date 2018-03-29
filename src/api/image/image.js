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
    delete(id) {
        return client.withAuth().delete('/containers/' + containerId)
    },
    create(hostId, image, type) {
        return client.withAuth().post('/hosts/' + hostId + '/images/' + type, image)
    },
    update(imageId, image) {
        return client.withAuth().put('/images/' + imageId, image)
    }
}