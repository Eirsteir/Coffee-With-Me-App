import { createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './screens/AuthNavigator';
import AppNavigator from './screens/AppNavigator';

const SwitchNavigator = createSwitchNavigator(
  {
    Login: AuthNavigator,
    App: AppNavigator
  },
  {
    initialRouteName: 'Login'
  }
);

const App = () => (
  <SwitchNavigator />
);

export default App;