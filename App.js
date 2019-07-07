
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Contact from './components/Contact';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DetailContact from './components/DetailContact';
import { Provider } from 'react-redux';
import { createStore } from 'redux';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Contact,
    },
    Details: {
      screen: DetailContact,
    },
  },

  
  
);


const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

