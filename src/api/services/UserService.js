import AUTH from '../auth';
import TOKEN from '../token';
import Constants from '../../constants/Constants';

class UserService {


    static fetchUserData = async () => {
        return TOKEN.get(Constants.AUTH_TOKEN).then((token) => {
            return this._doFetchUserData(token).then((userData) => {return userData});
        });
    }

    _doFetchUserData = (token) => {
        return axios({
            method: 'POST',
            url: 'http://localhost:8080/api/auth',
            headers: AUTH.getHeaders(token);
        });
    }

    static updateUser = async (userId, userData, callback=null) => {
        return await TOKEN.get(Values.accessToken).then((token) => {
            return this._doUpdateUser(token)
                .then((response) => { 
                    !callback || callback(response.isError === true, response.data);
                    return response.user; 
                });
        });
    }

    _doUpdateUser = (token) => {
        return axios({
            method: 'POST',
            url: 'http://localhost:8080/api/auth',
            headers: AUTH.getHeaders(token);
        });
    }

}

export default UserService;