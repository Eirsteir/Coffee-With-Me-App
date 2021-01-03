import NavigationActions from "react-navigation/src/NavigationActions";

import AUTH from '../auth';
import TOKEN from '../token';
import Constants from '../../constants/Constants';
import { handleResponse } from '../httpHelpers';


class AuthService {

    static login = async ({ token }, navigation) => {        
        return TOKEN.set(Constants.AUTH_TOKEN, token).then(() => {return token});
   }

    static register = async ({ email, name, password }, navigation) => {
        return AUTH.register(email, name, password)
            .then((response) => handleResponse(response, navigation));
    }

    static isAuthenticated = () => {
        return TOKEN.get(Constants.AUTH_TOKEN)
            .then((data) => {
                return data;
            })
    }

    static logout = (navigation) => {
        TOKEN.remove(Constants.AUTH_TOKEN);
        navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0);
        return;
    }
}

export default AuthService