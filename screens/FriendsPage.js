import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    FlatList,
    AsyncStorage,
} from 'react-native';
import qr from '../assets/images/qrsearch.png'
import {connect} from "react-redux";
import {List,ListItem} from 'react-native-elements';


class FriendsPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            friendsTabClicked: false,
        };
        this.friendsClicked=this.friendsClicked.bind(this);
    }

    static navigationOptions = ({navigation}) => {
        return {
        headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('HashTagsPage')}>
                    <Image
                        source={qr}
                        style={{width: 35, height: 35, margin: 15, tintColor: '#005BEC',}}
                    />
                </TouchableOpacity>
            )
        }
    };

    friendsClicked(){
        this.setState({friendsTabClicked: true})
    }

    renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    flatlistItem(item){
        return(
            <TouchableOpacity>
                <ListItem
                    roundAvatar
                    avatar={{uri: item.profile_pic_url}}
                    title={item.username}
                    containerStyle={{borderBottomWidth: 0}}
                    hideChevron={true}
                />
            </TouchableOpacity>
        )}


    renderFlatlist() {
        if (this.state.friendsTabClicked) {
            return (
                <List containerStyle={{ borderTopWidth: 0 ,borderBottomWidth: 1, borderBottomColor: '#CED0CE' }}>
                    <FlatList
                        data={this.props.friendsList.result}
                        renderItem={({item}) => this.flatlistItem(item)}
                        keyExtractor={(item) => item.user_id}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </List>
            )
        }
    }

    signout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.tabs}>
                    <TouchableOpacity style={this.state.friendsTabClicked
                                                ? styles.blank
                                                : [styles.blank,{backgroundColor: '#3030ff'}]}
                                      onPress={() => this.setState({friendsTabClicked: false})}>
                        <View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.state.friendsTabClicked
                                                ? styles.friendsTab
                                                : styles.friendsTabPressed }
                                      onPress={() => this.friendsClicked()}>
                        <View>
                            <Text style={this.state.friendsTabClicked
                                            ? styles.friendsText
                                            : [styles.friendsText,{color: 'black'}]}>Friends</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.renderFlatlist()}
                <TouchableOpacity onPress={this.signout} style={styles.button2} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        friendsList: state.rootReducer.friendsList
    }
};

export default connect(mapStateToProps, null)(FriendsPage);

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
    },
    button2: {
        height: 50,
        width: '80%',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        bottom: 30,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
    },

});
