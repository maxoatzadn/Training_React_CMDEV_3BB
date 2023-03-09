/**
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
const ReduxApp = () => (
  <Provider store={store}>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
