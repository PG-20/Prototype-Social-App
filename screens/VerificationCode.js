import React from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView, TouchableHighlight, View
} from 'react-native';
import { Permissions, Notifications } from 'expo';
import NotificationPopup from './DefaultPopup';


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            notification: null,
            code: Math.ceil(1000 + Math.random() * 9000)
        };
    }

    componentDidMount() {
        this.registerForPushNotifications();
    }

    async registerForPushNotifications() {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

        if (status !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (status !== 'granted') {
                return;
            }
        }

        const token = await Notifications.getExpoPushTokenAsync();

        Notifications.addListener(this.handleNotification);

        this.setState({
            token,
        });
    }

    sendPushNotification(token = this.state.token, title = "GOJUICE") {
        let code =  Math.ceil(1000 + Math.random() * 9000);
        this.setState({code: code});

        this.popup.show({
            onPress: function() {alert('Pressed')},
            appIconSource: require('../assets/images/google.png'),
            appTitle: 'GOJUICE',
            timeText: 'Now',
            title: '',
            body: 'SMS Code: ' + code,
        });

        return fetch('https://exp.host/--/api/v2/push/send', {
            body: JSON.stringify({
                to: token,
                title: title,
                body: "SMS Code: " + code,
                data: { message: `${title} - ${"SMS Code: " + code}` },
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

    }

    handleNotification = notification => {
        this.setState({
            notification,
        });
    };

    render() {

        console.log(this.props.navigation);
        const { navigate } = this.props.navigation;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="position">
                <NotificationPopup ref={ref => this.popup = ref} />

                <Text style={styles.title}>SMS verification code has been sent to your phone number. Please enter the code below.</Text>

                <TouchableOpacity onPress={() => this.sendPushNotification()} style={styles.touchable}>
                    <Text>Send me a notification!</Text>
                </TouchableOpacity>
                <TouchableHighlight onPress={() => navigate('Friends')} style={styles.button2} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '85%',
        fontSize: 18,
        padding: 8,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
    },
    button2: {
        height: 50,
        width: '80%',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    text: {
        paddingBottom: 2,
        padding: 8,
    },
    container: {
        flex: 1,
        paddingTop: 40,
    },
    touchable: {
        borderWidth: 1,
        borderRadius: 4,
        margin: 8,
        padding: 8,
        width: '95%',
    },
    input: {
        height: 40,
        borderWidth: 1,
        margin: 8,
        padding: 8,
        width: '95%',
    },
});