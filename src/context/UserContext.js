import React from 'react';
import PropTypes from 'prop-types';

import UserService from '../api/services/UserService';

const initialState = {
    user: {},
}

const initialContext = [{ ...initialState }, () => {}]

export const UserContext = React.createContext(initialContext);

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
          user: {},
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
            profile: () => { return state.user; },
            fetchUser: async () => {
                const userData = await UserService.fetchUserData();
                
                dispatch({ type: 'GET', user: userData });
            }, 
            update: async data => {
                const userData = await UserService.updateUser(data);
                dispatch({ type: 'EDIT', userData });
            },
            }),
            [state]
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
