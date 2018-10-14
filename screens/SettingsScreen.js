import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    ImageBackground,
    ScrollView,
    Platform,
    TouchableHighlight, TextInput
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';

import Form from 'react-native-form';
import CountryPicker from "react-native-country-picker-modal";

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class SettingsScreen extends React.Component {

    constructor(props){
        super(props);
        this.state={
            image : '',
            received: false,
            email: "",
            phone: 1,
            password: "",
            username: "",
            enterCode: false,
            country: {
                cca2: 'US',
                callingCode: '1'
            }
        };
        this.pickImage=this.pickImage.bind(this);
    };

    _changeCountry = (country) => {
        this.setState({ country });
        this.refs.form.refs.textInput.focus();
    };


    _renderCountryPicker = () => {

        if (this.state.enterCode)
            return (
                <View />
            );

        return (
            <CountryPicker
                ref={'countryPicker'}
                closeable
                style={styles.countryPicker}
                onChange={this._changeCountry}
                cca2={this.state.country.cca2}
                styles={countryPickerCustomStyles}
                translation='eng'/>
        );

    };

    _renderCallingCode = () => {

        if (this.state.enterCode)
            return (
                null
            );

        return (
            <View style={styles.callingCodeView}>
                <Text style={styles.callingCodeText}>+{this.state.country.callingCode}</Text>
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

                    <View style={{ flexDirection: 'row' }}>
                        <Form ref={'form'} style={styles.form}>
                            <View style={{ flexDirection: 'row' }}>

                                {this._renderCountryPicker()}
                                {this._renderCallingCode()}

                                <TextInput
                                    ref={'textInput'}
                                    name={this.state.enterCode ? 'code' : 'phoneNumber' }
                                    type={'TextInput'}
                                    underlineColorAndroid={'transparent'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    placeholder={this.state.enterCode ? '_ _ _ _ _ _' : 'Phone Number'}
                                    keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                                    style={[ styles.textInput, textStyle ]}
                                    returnKeyType='go'
                                    autoFocus
                                    placeholderTextColor={brandColor}
                                    selectionColor={brandColor}
                                    maxLength={this.state.enterCode ? 6 : 20}/>

                            </View>
                        </Form>

                        <TouchableHighlight style={styles.button2} underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Sign Up</Text>

                        </TouchableHighlight>
                        <TouchableHighlight style={styles.button2} onPress={() => navigate('FriendsPage')} underlayColor='#99d9f4'>
                            <Text >Next Page</Text>

                        </TouchableHighlight>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
    },

    imgUpload:{
        backgroundColor: '#9bc4a0',
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
        width: deviceWidth-30,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    uploadButton: {
        width:100,
        height: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }

});

// if you want to customize the country picker
const countryPickerCustomStyles = {};

// your brand's theme primary color
const brandColor = '#744BAC';

//
// const options = {
//     stylesheet: formStyles,
//     fields: {
//         email: {
//             keyboardType: 'email-address',
//         },
//         password: {
//             password: true,
//             secureTextEntry: true,
//         },
//         phone:{
//             keyboardType: 'numeric',
//         }
//     },
// };