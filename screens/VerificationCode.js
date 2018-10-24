import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ScrollView,
    View,
    AsyncStorage,
} from 'react-native';
import { Permissions, Notifications } from 'expo';
import NotificationPopup from './DefaultPopup';
import CodeInput from 'react-native-confirmation-code-input';
import {connect} from "react-redux";


class VerificationCode extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const {params = {}} = navigation.state;

        if (params.hideHeader) {
            return {
                header: null,
            }
        }

        return {
            headerTitle: <Text>Verify Code</Text>
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            notification: null,
            code: Math.ceil(1000 + Math.random() * 9000),
            inputCode: Math.ceil(1000 + Math.random() * 9000)
        };
        this.props.navigation.setParams({
            hideHeader: false
        });

        this.verifyCode = this.verifyCode.bind(this);

    }

    componentDidMount() {
        this.registerForPushNotifications();
    }

    async registerForPushNotifications() {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (status !== 'granted') {
            return;
        }

        const token = await Notifications.getExpoPushTokenAsync();

        Notifications.addListener(this.handleNotification);

        this.setState({
            token,
        }, () => {
            this.sendPushNotification();
        });
    }

    sendPushNotification(token = this.state.token, title = "GOJUICE") {
        let code =  Math.ceil(1000 + Math.random() * 9000);
        this.setState({code: code});
        this.props.navigation.setParams({
            hideHeader: true
        });
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

    verifyCode = async () => {
        if(this.state.code == this.state.inputCode) {

            // we can check if addUser call resolves the promise, and then do the navigation below
            await AsyncStorage.setItem('userToken', 'abc');
            this.props.navigation.navigate('Main');
        }
        else {
            alert('Wrong code entered. Try again!');
            this.refs.codeInput.clear();
            this.setState({inputCode: Math.ceil(1000 + Math.random() * 9000)});
        }
    };

    render() {

        let marginValue = 30;

        if(this.props.navigation.state.params != undefined) {
            if(this.props.navigation.state.params.hideHeader) {
                marginValue = 110;
            }
            else {
                marginValue = 30;
            }
        }
        return (
            <ScrollView style={{paddingTop: 40}}>
                <View>
                    <NotificationPopup ref={ref => this.popup = ref} navigation={this.props.navigation}/>
                </View>
                <View style={{marginTop: marginValue}}>
                    <Text style={styles.title}>SMS verification code has been sent to your phone number. Please enter the code below.</Text>

                    <TouchableOpacity style={styles.resendButton} onPress={() => this.sendPushNotification()}>
                        <Text style={styles.resentText}>Resend</Text>
                    </TouchableOpacity>
                    <CodeInput
                        ref="codeInput"
                        keyboardType="numeric"
                        activeColor='rgba(49, 180, 4, 1)'
                        inactiveColor='rgba(49, 180, 4, 1.3)'
                        autoFocus={true}
                        ignoreCase={true}
                        inputPosition='center'
                        size={50}
                        codeLength={4}
                        onFulfill={(code) => {this.setState({inputCode: code})}}
                        containerStyle={{ marginTop: 30 }}
                        codeInputStyle={{ borderWidth: 1.5 }}
                    />
                    <TouchableOpacity onPress={this.verifyCode} style={styles.button2} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userDetails: state.rootReducer.userDetails
    }
};

export default connect(mapStateToProps, null)(VerificationCode);

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
    resendButton: {
        alignSelf: 'center',
    },
    resentText: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#005BEC'
    }
});