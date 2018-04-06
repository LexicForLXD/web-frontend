import client from '../client'

export default {
    getConfigs(containerId) {
        return client.withAuth().get('/monitoring/checks/containers/'+containerId)
    },
    showGraph(checkId, timerange) {
        return client.withAuth().get('/monitoring/checks/'+checkId+'/containers/graph?timerange='+timerange)
    },
    delete(checkId) {
        return client.withAuth().delete('/monitoring/checks/'+checkId+'/containers')
    },
    create(containerId, check) {
        return client.withAuth().post('/monitoring/checks/containers/'+containerId, check)
    },
    update(checkId, check) {
        return client.withAuth().put('/monitoring/checks/'+checkId+'/containers', check)
    },

}