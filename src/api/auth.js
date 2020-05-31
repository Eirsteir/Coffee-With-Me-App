import axios from 'axios';

export default {
    authenticate: (email, password) => {
        const body = {
            email: email,
            password: password
        }

        return axios.post('http://localhost:8080/api/auth', body);
    },
    getHeaders: (token) => {
        return {
            'Authorization': token
        }
    }
}