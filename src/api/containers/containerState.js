import client from '../client'

export default {
    show(containerId) {
        return client.withAuth().get('/containers/'+containerId+'/state')
    },
    change(containerId, state) {
        return client.withAuth().put('/containers/'+containerId+'/state', state)
    }
}