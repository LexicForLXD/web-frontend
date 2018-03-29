import client from '../client'

export default {
    listLogs(containerId) {
        return client.withAuth().get('/monitoring/logs/containers/'+containerId)
    },
    getLogFile(containerId, logName) {
        return client.withAuth().get('/monitoring/logs/containers/'+containerId+'/'+logName)
    }
}