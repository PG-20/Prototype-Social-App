import {ActivityIndicator, StyleSheet, AsyncStorage, StatusBar, View} from 'react-native'
import React from 'react';



class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this.set()
        this._bootstrapAsync();
    }

    set = async () => {
        await AsyncStorage.setItem('userToken','')
    };

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AuthLoadingScreen;