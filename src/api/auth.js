import axios from 'axios';

import Constant from '../constants/Constants';

const AUTH_URL = 'http://d0650856ce40.ngrok.io/api/auth';

export default {
    authenticate: (email, password) => {
        const data = {
            email: email,
            password: password
        }

        console.log(AUTH_URL);
        
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
            'Authorization': Constant.JWT_PREFIX + token
        }
    }
}