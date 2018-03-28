import client from '../client'

export default {
    fetch () {
        return client.withAuth().get('/hosts')
    },
    show (id) {
        return client.withAuth().get('/hosts/'+id)
    },
    delete (id) {
        return client.withAuth().delete('/hosts/'+id)
    },
    create (host) {
        return client.withAuth().post('/hosts', host)
    },
    update (id, host) {
        return client.withAuth().put('/hosts/'+id, host)
    },
    auth (id, body) {
        return client.withAuth().post('/hosts/'+id+'/authorization', body)
    }
}