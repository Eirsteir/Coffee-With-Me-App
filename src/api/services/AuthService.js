import NavigationActions from "react-navigation/src/NavigationActions";

import TOKEN from '../token';
import Constants from '../../constants/Constants';


class AuthService {

    static login = async ({ token }, navigation) => {        
        return TOKEN.set(Constants.AUTH_TOKEN, token).then(() => {return token});
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