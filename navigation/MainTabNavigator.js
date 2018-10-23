import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/HomeScreen';
import SignUp from '../screens/SignUp';
import FriendsPage from '../screens/FriendsPage';
import HashtagPage from '../screens/HashtagPage';
import VerificationCode from '../screens/VerificationCode';


const MainNavigator = createStackNavigator({
    Login : {
        screen : LoginScreen,
        navigationOptions: {
            title: 'Login or Sign Up'
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: 'Sign Up'
        }
    },
    FriendsPage: {
        screen: FriendsPage,
        navigationOptions: {
            title: 'Friends'
        }
    },
    HashTagsPage: {
        screen: HashtagPage,
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
