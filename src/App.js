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

const Providers = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState(colorScheme);

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

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <ApolloProvider client={apolloClient}>
            {children}
          </ApolloProvider>
        </ApplicationProvider>
      </ThemeContext.Provider>  
    </>
  );
}

const Navigators = () => {
  
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
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await TOKEN.get(Constants.AUTH_TOKEN); 
      } catch (e) {
        console.log('Failed to restore user token');
      }

      // After restoring token, we may need to validate it in production apps
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
  let isLoggedIn = state.userToken != null;

  return (
    <AuthContext.Provider value={authContext}>
      { isLoggedIn ? (
        <UserController>
          <AppNavigator />
        </UserController>
        ) : <AuthNavigator />
      }
    </AuthContext.Provider>
  )
}

export default App = () => {
  return (
    <Providers>
        <Navigators />
    </Providers>
  )
}