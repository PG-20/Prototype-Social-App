import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    View,
    FlatList, Dimensions,
} from 'react-native';
import {SearchBar} from 'react-native-elements'

import {connect} from "react-redux";
import {LinearGradient} from 'expo'
import NotificationPopup from 'react-native-push-notification-popup';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;


class Picker extends React.Component {
    static navigationOptions = {
        headerTitle: <SearchBar containerStyle={{width: '100%', backgroundColor: '#eaf2f1', alignItems: 'center'}}
                                inputStyle={{color: 'black',width: '95%', backgroundColor: 'white'}}
                                />
    };

    constructor(props){
        super(props);
        this.state={
            list: [false,true,false,false],
            phone: '',
            code: ''
        };
    }

    componentDidMount() {
        this.popup.show({
            onPress: function() {console.log('Pressed')},
            appTitle: 'Some App',
            timeText: 'Now',
            title: 'Hello World',
            body: 'This is a sample message.\nTesting emoji 😀',
        });
    }

    flatlistItem(item){
        return(
            <ImageBackground source={{uri: item.url}}
                             style={{width: deviceWidth/3,
                                    height: 150,
                                    margin: 1}}
                             resizeMode='stretch'>
                <TouchableOpacity>
                    <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.7)']}
                                    style={{justifyContent: 'center',
                                            height: 150}}>
                        <Text style={{textAlign: "center", color: 'white'} }>{item.name_en}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ImageBackground>

        )
    }

    renderFlatlist(){
        let a=Object.values(this.props.allAvailableHashtag).reverse();
        a.push([]);
        let f_data=(a)[3-(this.state.list.indexOf(true))];
        return(
            <FlatList
                data={f_data}
                renderItem={({item}) => this.flatlistItem(item)}
                keyExtractor={(item) => item.hashtag_id}
                horizontal={true}
            />
        )
    }



    render() {
        let col = ['black', '#3030ff', '#00ba00', '#ff0000'];
        let tabstyle = [{},styles.bluetab, styles.greentab, styles.redtab];
        return(
            <View style={styles.container}>
                <View style={[styles.picker,{borderColor: col[this.state.list.indexOf(true)]}]}>
                    <TouchableOpacity style={[styles.blank, {borderColor: col[this.state.list.indexOf(true)]}]}
                                      onPress={() => this.setState({list: [true,false,false,false]})}>

                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.midtab,
                                              this.state.list[1]
                                                  ?tabstyle[1]
                                                  :{borderColor: col[this.state.list.indexOf(true)]}]}
                                      onPress={() => this.setState({list: [false,true,false,false]})}>
                        <Text style={[styles.pickerText,
                            {color: this.state.list[1]
                                    ?'white'
                                    :col[this.state.list.indexOf(true)]}]}>Restaurant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.midtab,
                                              this.state.list[2]
                                                  ?tabstyle[2]
                                                  :{borderColor: col[this.state.list.indexOf(true)]}]}
                                      onPress={() => this.setState({list: [false,false,true,false]})}>
                        <Text style={[styles.pickerText,
                            {color: this.state.list[2]
                                    ?'white'
                                    :col[this.state.list.indexOf(true)]}]}>Place</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.item,
                                              this.state.list[3]
                                                  ?tabstyle[3]
                                                  :{borderColor: col[this.state.list.indexOf(true)]}]}
                                      onPress={() => this.setState({list: [false,false,false,true]})}>
                        <Text style={[styles.pickerText,
                                      {color: this.state.list[3]
                                              ?'white'
                                              :col[this.state.list.indexOf(true)]}]}>Item</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    </TouchableOpacity>
                    <NotificationPopup ref={ref => this.popup = ref} />
                </View>
                {this.renderFlatlist()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allAvailableHashtag: state.rootReducer.allAvailableHashtag,
    }
};

export default connect(mapStateToProps, null)(Picker);


const styles = StyleSheet.create({
    container:{
         flex: 1,
         backgroundColor: 'white',
     },
    picker: {
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 0.5,
        flexDirection: 'row',
        width: '95%',
        marginTop: 50,
        height: 35,
        borderColor: 'black',
    },
    blank:{
        flex: 1,
        borderWidth: 0.5,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        borderColor: 'black',
    },
    midtab: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: 'black',
        justifyContent: 'center',
    },

    bluetab: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#3030ff',
        justifyContent: 'center',
        backgroundColor: '#3030ff'
    },
    greentab: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#00ba00',
        justifyContent: 'center',
        backgroundColor: '#00ba00'
    },
    redtab: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#ff0000',
        justifyContent: 'center',
        backgroundColor: '#ff0000'
    },

    item: {
        flex: 1,
        borderWidth: 0.5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        justifyContent: 'center',
        borderColor: 'black',
    },

    pickerText:{
        textAlign: 'center',
        fontSize: 18,
    }


});