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
    TouchableHighlight
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';

import t from 'tcomb-form-native';

const Form = t.form.Form;

let User = t.struct({
        username: t.String,
        email: t.String,
        password: t.String,
        phone: t.Number,
    }
);

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default class SettingsScreen extends React.Component {

    constructor(props){
        super(props);
        this.state={
            image : null,
            email: "",
            phone: 0,
            password: "",
            username: "",
        };
        this.onSignUp=this.onSignUp.bind(this);
        this.pickImage=this.pickImage.bind(this);
    };

    pickImage = async() => {

        const res = await Promise.all([
            Permissions.askAsync(Permissions.CAMERA),
            Permissions.askAsync(Permissions.CAMERA_ROLL)
        ]);

        console.log("here");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
        });

        console.log("there");
        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
        else {
            console.log("Camera permission denied")
        }
    };

    onSignUp() {
        var value = this.refs.form.getValue();
        if (value) {
            this.setState({
                email: value.email,
                phone: value.phone,
                password: value.password,
                username: value.username
            })
        }
    };

    render() {

        let image = this.state.image;
        return(
            <View style={styles.container}>
                <ScrollView>
                    <ImageBackground source={{uri: image}}
                                     reSizeMode= 'stretch'
                                     blurRadius={2}
                                     style={styles.imgUpload}>
                        <TouchableOpacity onPress={this.pickImage}>
                            <View style={styles.uploadButton}>
                                {!image && <Image source={require ('../assets/images/UploadIMG.png')} style={{width:100, height: 100, borderRadius: 50}}/>}
                                {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 , borderRadius: 50}} />}
                            </View>
                        </TouchableOpacity>
                    </ImageBackground>

                    <View>
                        <Form ref="form" type={User} options={options}/>

                        <TouchableHighlight style={styles.button2} onPress={this.onSignUp} underlayColor='#99d9f4'>
                            <Text style={styles.buttonText}>Sign Up</Text>
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


const formStyles = {
    ...Form.stylesheet,

    textbox: {
        normal: {
            alignSelf: 'center',
            color: "#000000",
            fontSize: 17,
            height: 36,
            width: deviceWidth - 30,
            paddingVertical: Platform.OS === "ios" ? 7 : 0,
            paddingHorizontal: 7,
            borderBottomWidth: 1,
            borderBottomColor: 'blue',
            marginBottom: 5,
        },

        error: {
            alignSelf: 'center',
            color: "#000000",
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
            color: "blue",
            fontSize: 16,
            marginBottom: 7,
            marginTop: 5,
            fontWeight: "200",
            paddingHorizontal: 15,
        },

        error: {
            color: "red",
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
        email: {
            keyboardType: 'email-address',
        },
        password: {
            password: true,
            secureTextEntry: true,
        },
        phone:{
            keyboardType: 'numeric',
        }
    },
};