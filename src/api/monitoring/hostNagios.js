import client from '../client'

export default {
    getConfigs(hostId) {
        return client.withAuth().get('/monitoring/checks/hosts/'+hostId)
    },
    showGraph(checkId, timerange) {
        return client.withAuth().get('/monitoring/checks/'+checkId+'/hosts/graph?timerange='+timerange)
    },
    delete(checkId) {
        return client.withAuth().delete('/monitoring/checks/'+checkId+'/hosts')
    },
    create(hostId, check) {
        return client.withAuth().post('/monitoring/checks/hosts/'+hostId, check)
    },
    update(checkId, check) {
        return client.withAuth().put('/monitoring/checks/'+checkId+'/hosts', check)
    },

}