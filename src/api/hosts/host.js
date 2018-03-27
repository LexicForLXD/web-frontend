import client from '../client'

export default {
    fetch () {
        return client.withAuth().get('/hosts')
    },
    page (url) {
        return client.withAuth().get(url)
    },
    delete (id) {
        return client.withAuth().delete('/hosts/'+id)
    },
    create (host) {
        return client.withAuth().post('/host', host)
    },
    update (id, host) {
        return client.withAuth().put('/containers/'+id, host)
    }
}