import client from '../client'

export default {

    getLogFile(hostId, logPath) {
        return client.withAuth().get('/monitoring/logs/hosts/'+hostId+'?logpath='+logPath)
    }
}