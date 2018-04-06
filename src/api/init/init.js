import client from '../client'

export default {
  fetch () {
    return client.withAuth().get('/init')
  },
}