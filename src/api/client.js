import {LEXIC_CONFIG} from '../config.js'

const client = {
    auth: false,
    withAuth() {
        client.auth = true
        return client
    },
    withoutAuth() {
        client.auth = false
        return client
    }
};

['get', 'post', 'put', 'delete'].forEach((verb) => {

    client[verb] = (url, data = {}, headers = {}, responseType = 'json') => {
        return new Promise((resolve, reject) => {
            if (!url.startsWith("http")) {
                url = LEXIC_CONFIG.API_URL + url
            }
            return window.axios({
                method: verb,
                url,
                data,
                headers: client.auth ? Object.assign({}, {'Authorization': `Bearer ` + localStorage.getItem('access_token')}, headers) : headers,
                responseType: responseType
            }).then((res) => {
                client.auth = false
                resolve(res)
            }).catch((error) => {
                client.auth = false
                reject(error)
            })
        })
    }
})


export default client;

function newFunction() {
    return 'get';
}