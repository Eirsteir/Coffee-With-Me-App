import { registerRootComponent} from 'expo';
import {activateKeepAwake} from 'expo-keep-awake'
import DEVELOPMENT from './src/constants/Constants';
import App from './src/App';

import {
  ENV,
  STREAM_API_KEY,
  STREAM_API_SECRET,
} from 'babel-dotenv';


if (ENV == DEVELOPMENT) {
  activateKeepAwake();

  const stream = require('getstream'); 
  // instantiate a new client (server side) 
  const client = stream.connect( 
    STREAM_API_KEY, 
    STREAM_API_SECRET
  );
   
  // disable auth checks, allows dev token usage 
  client.updateAppSettings({ 
    disable_auth_checks: true, 
  }); 
}

registerRootComponent(App);
