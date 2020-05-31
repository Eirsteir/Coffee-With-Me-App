import AUTH from '../auth';
import TOKEN from '../token';
import Constants from '../../constants/Constants';
import NavigationActions from "react-navigation/src/NavigationActions";


class AuthService {

    static logIn = (email, password) => {
        const response = AUTH.authenticate(email, password);
        
        return response.then((response) => {
            if(response && response.data.authorization) {
                const authorization = response.data.authorization;
                return TOKEN.set(Constants.AUTH_TOKEN, authorization).then(() => {return authorization});
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