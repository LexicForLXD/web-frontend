import client from '../client'

export default {
    delete(aliasId) {
        return client.withAuth().delete('/images/aliases/' + aliasId)
    },
    create(imageId, alias) {
        return client.withAuth().post('/images/' + imageId + '/aliases', alias)
    },
    update(aliasId, alias) {
        return client.withAuth().patch('/images/aliases/' + aliasId, alias)
    }
}