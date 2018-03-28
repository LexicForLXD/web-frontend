import client from '../client'

export default {
  fetch () {
    return client.withAuth().get('/containers')
  },
  refreshSingle (id) {
    return client.withAuth().get('/containers/'+id+'?fresh=true')
  },
  refreshAll () {
    return client.withAuth().get('/containers?fresh=true')
  },
  delete (containerId) {
    return client.withAuth().delete('/containers/'+containerId)
  },
  create (container) {
    return client.withAuth().post('/containers', container)
  },
  update (containerId, container) {
    return client.withAuth().put('/containers/'+containerId, container)
  }
}