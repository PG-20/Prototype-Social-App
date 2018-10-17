import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SettingsScreen2 from '../screens/SettingsScreen2';
import Picker from '../screens/Picker';
import VerificationCode from '../screens/VerificationCode';


const MainNavigator = createStackNavigator({
    Login : {
        screen : HomeScreen,
        navigationOptions: {
            title: 'Login or Sign Up'
        }
    },
    SignUp: {
        screen: SettingsScreen,
        navigationOptions: {
            title: 'Sign Up'
        }
    },
    Verification: {
        screen: LinksScreen,
        navigationOptions: {
            title: 'Verification'
        }
    },
    FriendsPage: {
        screen: SettingsScreen2,
        navigationOptions: {
            title: 'Friends'
        }
    },
    HashTagsPage: {
        screen: Picker,
    },
    VerificationCode: {
        screen: VerificationCode,
        navigationOptions: {
            title: 'Verify Code'
        }
    }
},{
    initialRouteName: 'Login'
});

export default MainNavigator;
