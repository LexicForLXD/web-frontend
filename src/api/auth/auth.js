import client from '../client'
// import { CLIENT_KEY, CLIENT_ID} from '../../config.js'
import {LEXIC_CONFIG } from '../../config'

export default {
    login (creds) {
        let data = {
            grant_type: "password",
            client_id: LEXIC_CONFIG.CLIENT_ID,
            client_secret: LEXIC_CONFIG.CLIENT_KEY,
            username: creds.email,
            password: creds.password
        };
        return client.withoutAuth().post('/oauth/v2/token', data)
    },

    refresh () {
        return client.withoutAuth().post('/users/login/refresh')
    },

    logout() {
        return client.withAuth().post('/users/logout')
    },

    getUser() {
        return client.withAuth().get('/user')
    },


}