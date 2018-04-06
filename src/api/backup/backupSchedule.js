import client from '../client'

export default {
    fetch() {
        return client.withAuth().get('/schedules')
    },
    show(scheduleId) {
        return client.withAuth().get('/schedules/' + scheduleId)
    },
    delete(scheduleId) {
        return client.withAuth().delete('/schedules/' + scheduleId)
    },
    create(schedule) {
        return client.withAuth().post('/schedules', schedule)
    },
    update(scheduleId, schedule) {
        return client.withAuth().put('/schedules/' + scheduleId, schedule)
    }
}