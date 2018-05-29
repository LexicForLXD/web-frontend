import client from '../client'
// import { CLIENT_KEY, CLIENT_ID} from '../../config.js'
import {LEXIC_CONFIG } from '../../config'

export default {
    oauth(creds) {
        let data = {
            grant_type: "password",
            client_id: LEXIC_CONFIG.CLIENT_ID,
            client_secret: LEXIC_CONFIG.CLIENT_KEY,
            username: creds.email,
            password: creds.password
        };
        return client.withoutAuth().post('/oauth/v2/token', data)
    },

    /**
     * Login via first party proxy
     *
     * @param creds
     * @returns {AxiosPromise<any>}
     */
    login (creds) {
        let data = {
            username: creds.email,
            password: creds.password
        };
        return client.withoutAuth().post('/login', data);
    },

    /**
     * Refresh token
     *
     * @returns {AxiosPromise<any>}
     */
    refresh () {
        let data = {
            refreshToken: localStorage.getItem("refresh_token"),
        };

        return client.withoutAuth().post('/refresh', data);
    },

    /**
     *
     * @returns {AxiosPromise<any>}
     */
    logout() {
        return client.withAuth().post('/users/logout')
    },

    /**
     * Returns current user
     *
     * @returns {AxiosPromise<any>}
     */
    getUser() {
        return client.withAuth().get('/user')
    },


}