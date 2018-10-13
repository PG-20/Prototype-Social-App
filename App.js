import React from 'react';
import {StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from "react-redux";

import createStore from "./reduxFiles/store";

export default class App extends React.Component {

    render() {
        return (
            <Provider store={createStore}>
                <View style={styles.container}>
                    <AppNavigator />
                </View>
            </Provider>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});