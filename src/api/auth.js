import axios from 'axios';

const AUTH_URL = 'http://localhost:8080/api/auth';

export default {
    authenticate: (email, password) => {
        const data = {
            email: email,
            password: password
        }

        return axios.post(AUTH_URL + '/login', data);
    },
    register: (email, name, password) => {
        const data = {
            email: email,
            name: name,
            password: password
        }

        return axios.post(AUTH_URL + '/register', data)
    },
    getHeaders: (token) => {
        return {
            'Authorization': token
        }
    }
}