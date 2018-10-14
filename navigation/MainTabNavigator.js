import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SettingsScreen2 from '../screens/SettingsScreen2';
import Picker from '../screens/Picker';



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
    }
},{
    initialRouteName: 'Login'
});

export default MainNavigator;

// export const Tabs = TabNavigator({
//     Feed: {
//         screen: FeedStack, // Replaced Feed with FeedStack
//         navigationOptions: {
//             tabBarLabel: 'Feed',
//             tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
//         },
//     },
//     ...
// });
