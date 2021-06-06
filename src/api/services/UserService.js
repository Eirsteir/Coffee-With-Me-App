import USER from '../user';
import TOKEN from '../token';
import Constants from '../../constants/Constants';

class UserService {

    static fetchCurrentUser = () => {
        return USER.fetchCurrentUser().then(response => {return response.data});
    }

    static getFriends = async userId => {
        return TOKEN.get(Constants.AUTH_TOKEN).then(async token => {
            const response = await USER.fetchFriends(token, userId);
            return response.data;
        });
    }

}

export default UserService;