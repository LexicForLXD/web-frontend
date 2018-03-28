import client from '../client'

export default {
    fetch () {
        return client.withAuth().get('/profiles')
    },
    show (id) {
        return client.withAuth().get('/profiles/'+id)
    },
    delete (id) {
        return client.withAuth().delete('/profiles/'+id)
    },
    create (profile) {
        return client.withAuth().post('/profiles', profile)
    },
    update (id, profile) {
        return client.withAuth().put('/profiles/'+id, profile)
    }
}