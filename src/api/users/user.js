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
    create (user) {
        return client.withAuth().post('/users', user)
    },
    update (id, user) {
        return client.withAuth().put('/users/'+id, user)
    }
}