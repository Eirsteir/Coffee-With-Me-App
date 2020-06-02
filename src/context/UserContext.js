
import React, { useContext, useDebugValue } from 'react';
import PropTypes from 'prop-types';

import UserService from '../api/services/UserService';

export const UserContext = React.createContext();

export default function UserController(props) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'GET':
              return {
                ...prevState,
                user: action.user,
                isLoading: false,
              };
            case 'EDIT':
              return {
                ...prevState,
                user: action.user,
              };
          }
        },
        {
          isLoading: true,
          user: null,
        }
      );

      React.useEffect(() => {
        const getUser = async () => {
          const userData = await UserService.fetchUserData();
          dispatch({ type: 'GET', user: userData });
        };
    
        getUser();
      }, []);

      const userContext = React.useMemo(
        () => ({
          fetchUser: async () => {
            const userData = await UserService.fetchUserData();
            console.log(userData);
            
            dispatch({ type: 'GET', user: userData });
          }, 
          profile: async () => {
            // fetch friends count
            console.log("profile()");
          },
          update: async data => {
            const userData = await UserService.updateUser(data);
            dispatch({ type: 'EDIT', userData });
          },
        }),
        []
      );

  return (<UserContext.Provider value={userContext}>
            {props.children}
          </UserContext.Provider>);
}

UserController.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
