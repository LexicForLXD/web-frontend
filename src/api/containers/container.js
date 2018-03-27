import client from '../client'

export default {
  fetch () {
    return client.withAuth().get('/containers')
  },
  page (url) {
    return client.withAuth().get(url)
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