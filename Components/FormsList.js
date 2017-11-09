/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';

const REQUEST_URL = 'http://190.47.73.240/WebApi/api/Forms/getforms';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Formslist extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      dataSource:  new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2}),
      forms: null
    }
  }

  componentDidMount(){
    this.getData();
  }

  getData(){
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) =>{
      console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.msg),
          forms: responseData.msg,

        })
    });
  }



  render() {

    if(!this.state.forms){
      return(
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
          <ListView dataSource={this.state.dataSource}
          renderRow={this.renderSingleForm} />
      </View>
    );
  }

  renderSingleForm(form){
    return(
        <View style={styles.listData}>
          <Text>{form.name}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listData: {
    flex: 1,
    margin: 20,
  },
  loading: {
    flex: 1,
    margin: 20,
  },
});
