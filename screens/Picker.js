import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {connect} from "react-redux";

class Picker extends React.Component {
    static navigationOptions = {
        title: 'HI',
    };

    constructor(props){
        super(props);
        this.state={
            list: [true,false,false,false]
        }

        console.log(this.props.allAvailableHashtag);
    }

    render() {
        var col = ['black', '#3030ff', '#00ba00', '#ff0000'];
        var tabstyle = [{},styles.bluetab, styles.greentab, styles.redtab];
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
                </View>
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
        marginTop: 71,
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
        fontSize: 16,
    }


});