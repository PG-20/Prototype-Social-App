import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Dimensions,
    TextInput,
    Image
} from 'react-native';

import fblogo from '../assets/images/fblogo.png'

import {getAllAvailableHashtag, getFriendsList} from "../api";
import {connect} from "react-redux";
import { Facebook, Google } from 'expo';
import glogo from "../assets/images/google.png";


let {deviceHeight, deviceWidth }= Dimensions.get('window');

class HomeScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            phone: "",
            password: "",
            navigate: this.props.navigation.navigate
        };

        this.props.getFriends();
        this.props.getHashtag();

        this.onLogin=this.onLogin.bind(this);
        this.facebookLogIn= this.facebookLogIn.bind(this);
        this.googleLogIn = this.googleLogIn.bind(this);
    }

    async facebookLogIn() {

        const { type, token } = await Facebook.logInWithReadPermissionsAsync('255136435199421', {
            permissions: ['public_profile', 'email', 'user_link']
        });

        if (type === 'success') {
            // Get the user details using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?fields=email,name,id&access_token=${token}`);

            let responseJson = await response.json();

            // print user data from graph API
            console.log(responseJson);

            alert(
                'Logged in! ' +
                `Hi ${responseJson.name}!`,
            );
            this.state.navigate("SignUp");
        }
    }
    async googleLogIn() {
        try {

            const result = await Google.logInAsync({
                androidClientId: "646248863161-g4ethrgs56h9ftbfo6pv8b31m5nj1kmb.apps.googleusercontent.com",
                iosClientId: "646248863161-tanc3558klnklvpcnksp2p5afr2aar8f.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {

                // print user data from google login
                console.log(result.user);

                alert(
                    'Logged in! ' +
                    `Hi ${result.user.name}!`,
                );

                this.state.navigate("SignUp");
            } else {
                return {cancelled: true};
            }
        } catch(e) {
            return {error: true};
        }
    }

    onLogin() {

        // check if getUser call resolves the promise, and then navigate to next page

    };

    render() {
        return (
            <View style={styles.container}>
                    <Text style={styles.heading}> Go Juice</Text>
                    <Text style={styles.loginHeading}>Phone</Text>
                    <TextInput style={styles.loginInput}
                           autoCapitalize='none'
                           autoCorrect={false}
                           onChangeText={(phone) => {this.setState({phone: phone})}}
                           underlineColorAndroid="transparent"/>
                    <Text style={styles.loginHeading}>Password</Text>
                    <TextInput style={styles.loginInput}
                           autoCapitalize='none'
                           autoCorrect={false}
                           onChangeText={(password) => {this.setState({password: password})}}
                           underlineColorAndroid="transparent"/>
                    <TouchableOpacity>
                        <Text style={styles.forgot}> Forgot Password? </Text>
                    </TouchableOpacity>
                    <TouchableHighlight>
                        <Text style={styles.logIn} onPress={this.onLogin}> Login </Text>
                    </TouchableHighlight>
                    <Text style={[styles.logIn, styles.text]}>Or Sign up with</Text>
                    <View style={styles.signupthirdparty}>
                        <TouchableOpacity onPress={this.facebookLogIn} style={{margin: 5}}>
                            <Image source={fblogo} style={{height: 100, width: 100}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.googleLogIn} style={{margin: 5}}>
                            <Image source={glogo} style={{height: 100, width: 100}}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.bottomSignUp} onPress={() => this.state.navigate('SignUp')}>
                        <View>
                            <Text style={styles.signUp}>Sign Up Now!</Text>
                        </View>
                    </TouchableOpacity>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFriends: () => {
            dispatch(getFriendsList());
            return Promise.resolve();
        },
        getHashtag: () => {
            dispatch(getAllAvailableHashtag());
            return Promise.resolve();
        }
    }
};

export default connect(null, mapDispatchToProps)(HomeScreen);


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'black',
  },
  loginHeading: {
      marginTop: 10,
      marginLeft: 15,
      color: 'white',
      fontSize: 20
  },
  loginInput: {
      marginLeft: 15,
      marginRight: 15,
      color: 'white',
      fontSize: 20,
      borderBottomColor: 'white',
      borderBottomWidth: 1,
  },
  heading: {
      textAlign: 'center',
      marginTop: 75,
      fontSize: 50,
      color: 'white',
  },
  logIn: {
      textAlign: 'center',
      color: 'white',
      fontSize: 30,
  },
  bottomSignUp:{
      backgroundColor: 'rgba(255,255,255,0.2)',
      height: 45,
      width: "90%",
      marginTop: 20,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
  },
  signUp:{
      color: 'white',
      textAlign: 'center',
  },

  forgot:{
      marginTop: 10,
      alignSelf: 'flex-end',
      color: 'white',
      fontSize: 16,
      marginRight: 15
  },

  text:{
      marginTop: 10,
      fontSize: 20,
  },
  signupthirdparty:{
      marginTop: 10,
      flexDirection: 'row',
      alignSelf: "center",
      justifyContent: 'center',
      alignContent: 'center',
      width: "60%",
  }

});