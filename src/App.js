import * as React from 'react';

import { Appearance, useColorScheme } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApolloProvider } from '@apollo/client';

import TOKEN from './api/token';
import AuthService from './api/services/AuthService';
import Constants from './constants/Constants';
import AuthNavigator from './nav/AuthNavigator';
import AppNavigator from './nav/AppNavigator';
import UserController from './context/UserContext';
import apolloClient from './apollo-client-setup';
import { ThemeContext } from './theme-context';

export const AuthContext = React.createContext();

export default function App({ navigation }) {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState(colorScheme);
  console.log(colorScheme);
  console.log(theme);
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  React.useEffect(() => {
    Appearance.addChangeListener(
      (preferences) => {
        const { colorScheme } = preferences;
        setTheme(colorScheme);
      },
    );
  }, [])

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
        console.log('Failed to restore user token');
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

  if (state.isLoading) return null;
  let isLoggedIn = state.userToken == null;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <ApolloProvider client={apolloClient}>
            <AuthContext.Provider value={authContext}>
                { isLoggedIn ? (
                  <AuthNavigator />
                ) : (
                  <UserController>
                    <AppNavigator />
                  </UserController>
                )}
            </AuthContext.Provider>
          </ApolloProvider>
        </ApplicationProvider>
      </ThemeContext.Provider>  
    </>
  );
}