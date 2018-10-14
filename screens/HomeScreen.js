import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    TextInput, Dimensions, Platform,Image,
} from 'react-native';

import fblogo from '../assets/images/fblogo.png'


import t from 'tcomb-form-native';
import GoogleLogin from "../GoogleLoginButton";
import {getAllAvailableHashtag, getFriendsList} from "../api";
import {connect} from "react-redux";
import { Facebook } from 'expo';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
const Form = t.form.Form;

let User = t.struct({
        password: t.String,
        phone: t.Number,
    });

const formStyles = {
    ...Form.stylesheet,

    textbox: {
        normal: {
            alignSelf: 'center',
            color: "white",
            fontSize: 17,
            height: 36,
            width: deviceWidth - 30,
            paddingVertical: Platform.OS === "ios" ? 7 : 0,
            paddingHorizontal: 7,
            borderBottomWidth: 1,
            borderBottomColor: 'white',
            marginBottom: 5,
        },

        error: {
            alignSelf: 'center',
            color: "white",
            fontSize: 17,
            height: 36,
            width: deviceWidth - 30,
            paddingVertical: Platform.OS === "ios" ? 7 : 0,
            paddingHorizontal: 7,
            borderBottomWidth: 1,
            borderBottomColor: 'red',
            marginBottom: 5,
        },
    },

    controlLabel: {
        normal: {
            color: 'white',
            fontSize: 16,
            marginBottom: 7,
            marginTop: 5,
            fontWeight: "200",
            paddingHorizontal: 15,
        },

        error: {
            color: 'red',
            fontSize: 16,
            marginBottom: 7,
            marginTop: 5,
            fontWeight: "200",
            paddingHorizontal: 15,
        },
    },
};

const options = {
    stylesheet: formStyles,
    fields: {

        underlineColorAndroid: 'transparent',
        password: {
            password: true,
            secureTextEntry: true,
            underlineColorAndroid : 'transparent',
        },
        phone:{
            keyboardType: 'numeric',
            underlineColorAndroid : 'transparent',
        }
    },
};

class HomeScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            phone: "",
            password: "",
        };

        this.props.getFriends();
        this.props.getHashtag();

        this.onLogin=this.onLogin.bind(this);
        // this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
        // this.FBGraphRequest = this.FBGraphRequest.bind(this);
        // this.FBLoginCallback = this.FBLoginCallback.bind(this);
        this.facebookLogIn= this.facebookLogIn.bind(this);
    }

    async facebookLogIn() {

        const { type, token } = await Facebook.logInWithReadPermissionsAsync('255136435199421', {
            permissions: ['public_profile', 'email', 'user_link']
        });

        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

            alert(
                'Logged in! ' +
                `Hi ${(await response.json()).name}!`,
            );
        }
    }

    onLogin() {
        var value = this.refs.form.getValue();
        if (value) {
            this.setState({
                phone: value.phone,
                password: value.password,
            })
        }
        console.log(this.state)
    };

    render() {
        return (
            <View style={styles.container}>
                    <Text style={styles.heading}> Go Juice</Text>
                    <Form ref="form" type={User} options={options}/>
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
                        {/*<GoogleLogin*/}
                            {/*onLogin={*/}
                                {/*(result) => {*/}
                                    {/*console.log("entering");*/}
                                    {/*if (result.message) {*/}
                                        {/*alert('error: ' + result.message);*/}
                                        {/*console.log("fail");*/}
                                    {/*} else {*/}
                                        {/*alert("Login was successful " + result.name + ' - ' + result.email);*/}
                                        {/*console.log("success");*/}
                                    {/*}*/}
                                {/*}*/}
                            {/*}*/}
                            {/*onLogout={() => alert("logged out")}*/}
                            {/*onError={*/}
                                {/*(result) => {*/}
                                    {/*if (result.error) {*/}
                                        {/*alert('error: ' + result.error)*/}
                                    {/*} else {*/}
                                        {/*alert(error)*/}
                                    {/*}*/}
                                {/*}*/}
                            {/*}*/}
                        {/*/>*/}
                    </View>
                    <TouchableOpacity style={styles.bottomSignUp}>
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
      alignSelf: 'flex-end',
      color: 'white',
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