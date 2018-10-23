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
import Modal from 'react-native-modal'
import CountryPicker from "react-native-country-picker-modal";
import {setUserDetails} from "../reduxFiles/actionCreator";
import {connect} from "react-redux";

let deviceHeight = Dimensions.get('window').height;

class SignUp extends React.Component {

    constructor(props){
        super(props);
        this.state={
            image : null,
            received: false,
            email: "",
            camera: false,
            phone: "",
            password: "",
            username: "",
            modalVisible: false,
            country: {
                cca2: 'US',
                callingCode: '1'
            }
        };
        this.pickImage=this.pickImage.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.imageModal=this.imageModal.bind(this)
    };

    _changeCountry = (country) => {
        this.setState({ country, phone: "" });
    };

    componentWillUnmount() {
        console.log('hi');
        this.setState({modalVisible: false})
    }

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
            <View>
                <Text style={{fontSize: 20}}>+{this.state.country.callingCode}</Text>
            </View>
        );

    };

    pickImage = async() => {
        Promise.all([
            Permissions.askAsync(Permissions.CAMERA),
            Permissions.askAsync(Permissions.CAMERA_ROLL)
        ]).then(async () => {
            let result = this.state.camera
                ? await ImagePicker.launchCameraAsync({mediaTypes: 'Images',})
                : await ImagePicker.launchImageLibraryAsync({mediaTypes: 'Images',});

            if (!result.cancelled) {
                this.setState({ image: result.uri, received: true });
            }
            else {
                console.log("cancelled");
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    imageModal() {
        return(
            <Modal isVisible={this.state.modalVisible}
                   onBackButtonPress={() => {this.setState({modalVisible: false})}}
                   onBackdropPress={() => {this.setState({modalVisible: false})}}
                   backdropOpacity={.7}>
                <View style={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,1)',
                    borderRadius: 8,
                    height: 170,
                    overflow: 'hidden',
                    }}>
                        <TouchableOpacity onPress={() => this.setState({camera: true,modalVisible: false},
                            () => {this.pickImage()})}
                                          style={{marginTop: 20}}
                        >
                            <Text style={{fontSize: 25}}>Take from Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({camera: false, modalVisible: false},
                            () => {this.pickImage()})}
                                          style={{margin: 15}}
                        >
                            <Text style={{fontSize: 25}}>Take from Library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({modalVisible: false})}
                                            style={{width: '100%',
                                                    alignItems: 'center',
                                                    borderTopWidth: 1,
                                                    height: 40,
                                                    bottom: 0,
                                                    position: 'absolute',
                                                    backgroundColor: 'rgba(0,0,0,.8)',

                                            }}>
                            <Text style={{fontSize: 25, color: 'white'}}>Cancel</Text>
                        </TouchableOpacity>
                </View>
            </Modal>
        )
    }

    onSignUp() {

        let userDetails = {
            username: this.state.username,
            phone: this.state.phone,
            fcm_token: this.state.fcm_token,
            apns_token: this.state.apns_token,
            password: this.state.password,
            email: this.state.email,
            // fb_user_id can be received from previous page
            fb_user_id: this.state.fb_user_id,
            //google_user_id can be received from previous page
            google_user_id: this.state.google_user_id,
            profile_pic_url: this.state.image,
            type: this.state.type,
            status_phone: this.state.status_phone
        };

        this.props.updateUserDetails(userDetails);
        this.props.navigation.navigate('VerificationCode')
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <ImageBackground source={{uri: this.state.image}}
                                     reSizeMode= 'stretch'
                                     blurRadius={5}
                                     style={styles.imgUpload}>
                        <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                            <View style={styles.uploadButton}>
                                {!this.state.received && <Image source={require ('../assets/images/UploadIMG.png')}
                                                                style={{width:100, height: 100, borderRadius: 50}}/>}
                                {this.state.received && <Image source={{ uri: this.state.image }}
                                                               style={{ width: 100, height: 100 , borderRadius: 50}} />}
                            </View>
                        </TouchableOpacity>
                    </ImageBackground>
                    {this.imageModal()}
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
                        <View style={[styles.phoneContainer, styles.loginInput]}>
                            {this._renderCountryPicker()}
                            {this._renderCallingCode()}
                            <TextInput
                                style={{marginLeft: 10, width: '100%', fontSize: 20}}
                                value={this.state.phone}
                                onChangeText={(phone) => {this.setState({phone: phone})}}
                                underlineColorAndroid={'transparent'}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}/>
                        </View>
                        <TouchableHighlight onPress={this.onSignUp} style={styles.button2} underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableHighlight>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserDetails: (data) => {
            dispatch(setUserDetails(data));
            return Promise.resolve();
        }
    }
};

export default connect(null, mapDispatchToProps)(SignUp);


const flagStyles = StyleSheet.create({
    itemCountryFlag: {
        width: 50,
        height: 50
    }
});

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
    },
    modalStyle:{
        borderRadius: 8,
        zIndex: 1
    },

    phoneContainer: {
      flexDirection: 'row',
      borderBottomColor: '#005BEC',
      borderBottomWidth: 1
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
        marginTop: 50,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    loginHeading: {
        marginTop: 10,
        marginLeft: 15,
        color: '#005BEC',
        fontSize: 20
    },
    loginInput: {
        marginLeft: 15,
        marginRight: 15,
        color: '#005BEC',
        fontSize: 20,
        borderBottomColor: '#005BEC',
        borderBottomWidth: 1
    },
    uploadButton: {
        width:100,
        height: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    }

});