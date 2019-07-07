

// either import the whole module and call as Communications.method()
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  AsyncStorage

} from 'react-native';

import Communications from 'react-native-communications';
import { List, ListItem, SearchBar, Button } from 'react-native-elements';
import DetailContact from './DetailContact';
import { connect } from 'react-redux';
import * as actions from '../actions/Index'

class Contact extends Component {

  static navigationOptions = ({ navigation, props }) => {
    return {
      title: 'Contact',
      headerRight: (
        <Button
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => { 
            console.log('props:',props);
            navigation.navigate('Details', {
              onNavigateBack: this.handleOnNavigateBack
            }); 
          }}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentItem: {},
      loading: false
    }
    this.data = [];
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.loadData();
    });
  }

  loadData = async () => {
    this.data = [];
    try {
      let keys = await AsyncStorage.getAllKeys();
      console.log('keys', keys);
      if (keys) {
        for (let i = 0; i < keys.length; i++) {
          console.log('loading key:', keys[i]);
          let userJson = await AsyncStorage.getItem(keys[i]);
          let user = JSON.parse(userJson);
          this.data.push(user);
        }
      }
      console.log(this.data);
      this.setState({ data: this.data });
    } catch (error) {
      console.log(error);
    }
  }

  clickItem = (item) => {
    this.setState({ currentItem: item });
    this.props.navigation.navigate('Details', { item });
    //this.props.sendItem(item);
  }

  addContact = () => {
    this.props.navigation.navigate('Details');
    const item = {
      name: null,
      uri: null,
      phoneNumber: null,
      id: null
    }
    this.props.sendItem(item);
  }

  render() {

    return (
      <View>
        {/* <Button title='Add'  /> */}
        {this.state.data && <FlatList
          data={this.state.data}
          renderItem={({ item, index }) => (
            <ListItem
              //roundAvatar
              key={index}
              title={`${item.name}`}
              onPress={() => this.clickItem(item)}
              leftAvatar={{ source: { uri: item.uri } }}
            // subtitle={item.email}
            //avatar={{ uri: item.uri }}
            // containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => item.id}
        // ItemSeparatorComponent={this.renderSeparator}
        // ListHeaderComponent={this.renderHeader}
        // ListFooterComponent={this.renderFooter}
        // onRefresh={this.handleRefresh}
        // refreshing={this.state.refreshing}
        // onEndReached={this.handleLoadMore}
        // onEndReachedThreshold={50}
        />}



      </View>

    );
  }
}

const mapStatetoProps = (state) => {
  return {

  }
}

const mapDispatchtoProps = (dispatch, props) => {
  return {
    sendItem: (item) => {
      dispatch(actions.getItem(item));
    }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Contact);