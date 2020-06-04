import axios from 'axios';

const AUTH_URL = 'http://localhost:8080/api/auth'; //d0650856ce40.ngrok.io

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
    }
}