import * as React from 'react';

import TOKEN from './api/token';
import AuthService from './api/services/AuthService';
import Constants from './constants/Constants';
import AuthNavigator from './nav/AuthNavigator';
import AppNavigator from './nav/AppNavigator';
import UserController from './context/UserContext';

export const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGIN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'LOG_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isLogout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await TOKEN.get(Constants.AUTH_TOKEN); 
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      login: async data => {
        const token = await AuthService.login(data).then((token) => { return token });
        dispatch({ type: 'LOGIN', token: token });
      }, 
      logout: () => dispatch({ type: 'LOG_OUT' }),
      register: async data => {
        return await AuthService.register(data, navigation);
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
        {state.userToken == null ? (
          <AuthNavigator />
        ) : (
          <UserController>
            <AppNavigator token={state.userToken} />
          </UserController>
        )}
    </AuthContext.Provider>
  );
}