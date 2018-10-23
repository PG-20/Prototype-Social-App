import React from 'react';
import { createStackNavigator } from 'react-navigation';

import FriendsPage from '../screens/FriendsPage';
import HashtagPage from '../screens/HashtagPage';



const MainNavigator = createStackNavigator({
    FriendsPage: {
        screen: FriendsPage,
        navigationOptions: {
            title: 'Friends'
        }
    },
    HashTagsPage: {
        screen: HashtagPage,
    },
},{
    initialRouteName: 'FriendsPage'
});

export default MainNavigator;
