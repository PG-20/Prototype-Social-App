import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/HomeScreen';
import SignUp from '../screens/SignUp';
import VerificationCode from '../screens/VerificationCode';

const AuthNavigator = createStackNavigator({
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
    VerificationCode: {
        screen: VerificationCode,
        navigationOptions: {
            title: 'Verify Code'
        }
    }
},{
    initialRouteName: 'Login'
});

export default AuthNavigator;
