import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import LoadingScreen from '../screens/LoadingScreen'

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Loading: LoadingScreen,
    Main: MainTabNavigator,
    Auth: AuthNavigator,
    },
    {
        initialRouteName: 'Loading',
    }
);