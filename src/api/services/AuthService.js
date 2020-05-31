import AUTH from '../auth';
import TOKEN from '../token';
import Constants from '../../constants/Constants';
import NavigationActions from "react-navigation/src/NavigationActions";


class AuthService {

    static logIn = (email, password) => {
        const response = AUTH.authenticate(email, password);
        
        return response.then((data) => {
            if(data && data.authorization) {
                return TOKEN.set(Constants.AUTH_TOKEN, data.authorization).then((data) => {return data});
            }
            return null;
        });
    }

    static isAuthenticated = () => {
        return TOKEN.get(Constants.AUTH_TOKEN)
            .then((data) => {
                return data;
            })
    }

    static logOut = (navigation) => {
        TOKEN.remove(Constants.AUTH_TOKEN);
        navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0);
        return;
    }
}

export default AuthService