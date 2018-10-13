import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>empty</Text>
            </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
