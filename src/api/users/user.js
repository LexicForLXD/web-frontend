import client from '../client'

export default {
    fetch () {
        return client.withAuth().get('/users')
    },
    show (id) {
        return client.withAuth().get('/users/'+id)
    },
    delete (id) {
        return client.withAuth().delete('/users/'+id)
    },
    create (host) {
        return client.withAuth().post('/users', host)
    },
    update (id, host) {
        return client.withAuth().put('/users/'+id, host)
    }
}