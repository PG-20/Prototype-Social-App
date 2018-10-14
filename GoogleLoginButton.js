import React, { Component } from 'react';
import {StyleSheet, NativeModules, TouchableOpacity, Image} from 'react-native';
import glogo from "./assets/images/google.png";
const GoogleUtil = NativeModules.GoogleUtil;

export default class GoogleLoginButton extends Component {
    constructor (props) {
        super(props);

        this.onLogin = this.onLogin.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            status: false,
            text: 'Sign out'
        };
    }

    onLogin() {
        if(this.state.status)
            this.logout();
        else
            this.login();
    }

    login() {
        GoogleUtil.setup().then(() => {
            GoogleUtil.login((err,data) => {
                this.handleLogin(err, data);
                this.setState({status: true})
            });
        });
    }

    logout() {
        GoogleUtil.logout((err, data) => {
            this.setState({status:false});
            this.handleLogin(err, data);
        })
    }

    handleLogin(e, data) {
        console.log("handle");
        const result = e || data;
        if (result.eventName === "onLogin") {
            this.setState({status:true});
        }

        if(result.eventName && this.props.hasOwnProperty(result.eventName)){
            const event = result.eventName;
            delete result.eventName;
            this.props[event](result);
        }
    }

    render(){

        const text = this.state.text;
        return (

            <TouchableOpacity onPress={this.onLogin} style={{margin: 5}}>
                <Image source={glogo} style={{height: 100, width: 100}}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        backgroundColor: 'white',
    },
    blakText: {
        color: 'black'
    }
});