import axios from 'axios';

import AUTH from '../auth';
import TOKEN from '../token';
import Constants from '../../constants/Constants';

const API_USER_URL = 'http://localhost:8080/api/social';

class UserService {

    static fetchUserData = async () => {
        return TOKEN.get(Constants.AUTH_TOKEN).then((token) => {
            return UserService._doFetchUserData(token).then((response) => {return response.data});
        });
    }

    static _doFetchUserData = async (token) => {
        return axios({
            method: 'GET',
            url: API_USER_URL + '/me',
            headers: AUTH.getHeaders(token)
        });
    }

    static updateUser = async ({ userData, callback=null }) => {
        return await TOKEN.get(Constants.accessToken).then((token) => {
            return UserService._doUpdateUser(token, userData)
                .then((response) => { 
                    !callback || callback(response.isError === true, response.data);
                    return response.user; 
                });
        });
    }

    static _doUpdateUser = (token, userData) => {
        return axios({
            method: 'PUT',
            url: API_USER_URL,
            headers: AUTH.getHeaders(token),
            data: userData
        });
    }

}

export default UserService;