import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View
} from 'react-native';
import qr from '../assets/images/qrsearch.png'
import {connect} from "react-redux";


class SettingsScreen2 extends React.Component {
    static navigationOptions = {
        headerRight: (<Image source={qr} style={{width: 35, height: 35, margin: 15, tintColor: 'blue',}}/>),
    };

    constructor(props){
        super(props)
        this.state={
            friendsTabClicked: false,
        };
        this.friendsClicked=this.friendsClicked.bind(this);

        console.log(this.props.friendsList);
    }

    friendsClicked(){
        this.setState({friendsTabClicked: true})
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.tabs}>
                    <TouchableOpacity style={this.state.friendsTabClicked?styles.blank: [styles.blank,{backgroundColor: '#3030ff'}]} onPress={() => this.setState({friendsTabClicked: false})}>
                        <View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.state.friendsTabClicked? styles.friendsTab: styles.friendsTabPressed } onPress={() => this.friendsClicked()}>
                        <View>
                            <Text style={this.state.friendsTabClicked?styles.friendsText: [styles.friendsText,{color: 'black'}]}>Friends</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        friendsList: state.rootReducer.friendsList
    }
};

export default connect(mapStateToProps, null)(SettingsScreen2);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
    tabs: {
        flexDirection: 'row',
    },
    blank:{
        flex: 1,
        backgroundColor: '#eaedf2',
        borderRadius:0,
        height: 70,
    },
    friendsTab: {
        flex:1,
        backgroundColor: '#3030ff',
        borderRadius: 0,
        height: 70,
        justifyContent: 'center'
    },
    friendsTabPressed:{
        flex:1,
        backgroundColor: '#eaedf2',
        borderRadius: 0,
        height: 70,
        justifyContent: 'center'
    },
    friendsText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 21,
        fontWeight: '300',
    }
});
