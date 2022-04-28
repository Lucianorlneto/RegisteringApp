/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { NavigationContainer } from '@react-navigation/native';

import Main from './src/navigation/Main';

const App = () => (
  <NavigationContainer>
    <Main />
    <Toast />
  </NavigationContainer>
);

export default App;
