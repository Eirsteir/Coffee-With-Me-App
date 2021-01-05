import USER from '../user';
import TOKEN from '../token';
import Constants from '../../constants/Constants';

class UserService {

    static fetchCurrentUser = async () => {
        return USER.fetchCurrentUser().then(response => {return response.data});
    }

    static updateUser = async (userData) => {
        return await TOKEN.get(Constants.AUTH_TOKEN).then((token) => {
            return USER.update(token, userData)
                .then((response) => { 
                    return response.user; 
                });
        });
    }

    static getFriends = async () => {
        return TOKEN.get(Constants.AUTH_TOKEN).then(token => {
            return USER.fetchFriends(token).then(response => { return response.data });
        });
    }

}

export default UserService;