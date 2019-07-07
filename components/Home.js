import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    
  } from 'react-native';
import Contact from './Contact';
import DetailContact from './DetailContact';

class Home extends Component {

    render() {

        const RootStack = createStackNavigator(
            {
              Home: {
                screen: Contact,
              },
              Details: {
                screen: DetailContact,
              },
            },
            {
              initialRouteName: 'Home',
            }
          );
        
          const AppContainer = createAppContainer(RootStack);

        return <AppContainer />;
    }
}

export default Home;



  