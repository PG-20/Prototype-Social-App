import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import {ImagePicker, Permissions} from 'expo';

import Form from 'react-native-form';
import CountryPicker from "react-native-country-picker-modal";

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class SettingsScreen extends React.Component {

    constructor(props){
        super(props);
        this.state={
            image : "",
            received: false,
            email: "",
            phone: "",
            password: "",
            username: "",
            country: {
                cca2: 'US',
                callingCode: '1'
            }
        };
        this.pickImage=this.pickImage.bind(this);
    };

    _changeCountry = (country) => {
        this.setState({ country, phone: "" });
    };


    _renderCountryPicker = () => {

        return (
            <CountryPicker
                ref={'countryPicker'}
                closeable
                onChange={this._changeCountry}
                cca2={this.state.country.cca2}
                styles={flagStyles}
                translation='eng'/>
        );

    };

    _renderCallingCode = () => {

        return (
            <View style={{marginTop: 5}}>
                <Text>+{this.state.country.callingCode}</Text>
            </View>
        );

    };

    pickImage = async() => {

        const res = await Promise.all([
            Permissions.askAsync(Permissions.CAMERA),
            Permissions.askAsync(Permissions.CAMERA_ROLL)
        ]);

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri, received: true });
        }
        else {
            console.log("Camera permission denied")
        }
    };

    render() {
        const {navigate} = this.props.navigation;

        let image = this.state.image;

        let textStyle = this.state.enterCode ? {
            height: 50,
            textAlign: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            fontFamily: 'Courier'
        } : {};

        return(
            <View style={styles.container}>
                <ScrollView>
                    <ImageBackground source={{uri: image}}
                                     reSizeMode= 'stretch'
                                     blurRadius={5}
                                     style={styles.imgUpload}>
                        <TouchableOpacity onPress={this.pickImage}>
                            <View style={styles.uploadButton}>
                                {!this.state.received && <Image source={require ('../assets/images/UploadIMG.png')} style={{width:100, height: 100, borderRadius: 50}}/>}
                                {this.state.received && <Image source={{ uri: image }} style={{ width: 100, height: 100 , borderRadius: 50}} />}
                            </View>
                        </TouchableOpacity>
                    </ImageBackground>

                    <View>
                        <Text style={styles.loginHeading}>Username</Text>
                        <TextInput style={styles.loginInput}
                                   value={this.state.username}
                                   autoCapitalize='none'
                                   autoCorrect={false}
                                   onChangeText={(username) => {this.setState({username: username})}}
                                   underlineColorAndroid="transparent"/>
                        <Text style={styles.loginHeading}>Email</Text>
                        <TextInput style={styles.loginInput}
                                   value={this.state.email}
                                   autoCapitalize='none'
                                   autoCorrect={false}
                                   onChangeText={(email) => {this.setState({email: email})}}
                                   underlineColorAndroid="transparent"/>
                        <Text style={styles.loginHeading}>Password</Text>
                        <TextInput style={styles.loginInput}
                                   value = {this.state.password}
                                   autoCapitalize='none'
                                   autoCorrect={false}
                                   secureTextEntry={true}
                                   onChangeText={(password) => {this.setState({password: password})}}
                                   underlineColorAndroid="transparent"/>
                        <Text style={styles.loginHeading}>Phone</Text>
                        <View style={styles.phoneContainer}>
                            {this._renderCountryPicker()}
                            {this._renderCallingCode()}
                            <TextInput
                                style={styles.loginInput}
                                value={this.state.phone}
                                onChangeText={(phone) => {this.setState({phone: phone})}}
                                underlineColorAndroid={'transparent'}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}/>
                        </View>
                        <TouchableHighlight onPress={() => navigate('VerificationCode')} style={styles.button2} underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableHighlight>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const flagStyles = StyleSheet.create({
    itemCountryFlag: {
        width: 50,
        height: 50
    }
})

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
    },
    phoneContainer: {
      flexDirection: 'row',
      width: '100%',
      marginLeft: 15,
      marginRight: 15
    },
    imgUpload:{
        backgroundColor: 'grey',
        height: deviceHeight/5,
        alignItems: 'center',
        justifyContent: 'center',

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
    loginHeading: {
        marginTop: 10,
        marginLeft: 15,
        color: 'blue',
        fontSize: 20
    },
    loginInput: {
        marginLeft: 15,
        marginRight: 15,
        color: 'blue',
        fontSize: 20,
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
    },
    uploadButton: {
        width:100,
        height: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }

});