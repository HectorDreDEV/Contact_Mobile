import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  CameraRoll,
  ScrollView,
  Image,
  TouchableOpacity

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/Index';
import Communications from 'react-native-communications';

class DetailContact extends Component {

  constructor(props) {
    super(props);
    const item = this.props.navigation.state.params.item;
    this.state = {
      photos: [],
      loading: true,
      id: item ? item.id : null,
      uri: item ? item.uri : null,
      name: item ? item.name : null,
      phoneNumber: item ? item.phoneNumber : null,
      test: ''
    }

  }


  addContact = async () => {
    if (this.state.id) {
      await AsyncStorage.removeItem(this.props.navigation.state.params.item.id);
      try {
        let user = {
          name: this.state.name,
          phoneNumber: this.state.phoneNumber,
          uri: this.state.uri,
          id: this.state.name
        }
        await AsyncStorage.setItem(this.state.name, JSON.stringify(user));
        this.props.navigation.navigate('Home', { loading: true });
      } catch (error) {
        // Error saving data
      }
    }
    else {
      try {
        let keys = await AsyncStorage.getAllKeys();
        let user = {
          name: this.state.name,
          phoneNumber: this.state.phoneNumber,
          uri: this.state.uri,
          id: this.state.name
        }
        await AsyncStorage.setItem((this.state.name), JSON.stringify(user));
        this.props.navigation.navigate('Home', { loading: true });
      } catch (error) {
        // Error saving data
      }
    }

  };

  deleteContact = async () => {
    try {

      if (this.state.id) {
        await AsyncStorage.removeItem(this.state.id);
        this.props.navigation.navigate('Home', { loading: true });
      }
    }
    catch (exception) {
      console.log(exception);
    }
  }

  chooseAvatar = () => {
    CameraRoll.getPhotos({
      first: 500,
      assetType: 'Photos',
    })
      .then(r => {
        this.setState({ photos: r.edges, loading: true });
      })
      .catch((err) => {
        //Error Loading Images
      });
  };

  showAvatar = (uri) => {
    console.log('uri', uri);
    this.setState({ loading: false, uri: uri })
  }

  getName = () => {

  }

  render() {
    return (
      <View >

        <View style={{ flexDirection: "row" }}>
          <Input
            onChangeText={(Text) => this.setState({ name: Text })}
            value={this.state.name}
            placeholder='Name'
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='black'
              />
            }
            containerStyle={styles.input}
          />

          <Button
            icon={
              <Icon
                name="envelope"
                size={15}
                color="white"
              />
            }
            buttonStyle={{ backgroundColor: '#7fff00', marginTop: 15, width: 35 }}
            onPress={() => Communications.text(this.state.phoneNumber)}
          />

        </View>

        <View style={{ flexDirection: 'row' }}>
          <Input
            onChangeText={(Text) => this.setState({ phoneNumber: Text })}
            value={this.state.phoneNumber}
            keyboardType='numeric'
            placeholder='Phone Number'
            leftIcon={
              <Icon
                name='phone'
                size={24}
                color='black'
              />
            }
            containerStyle={styles.input}
          />

          <Button
            icon={
              <Icon
                name="phone"
                size={15}
                color="white"
              />
            }
            buttonStyle={{ backgroundColor: '#7fff00', marginTop: 15, width: 35 }}
            onPress={() => Communications.phonecall(this.state.phoneNumber, true)}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginTop: 5, marginLeft: 10, width: 100, height: 100 }}>
            {this.state.uri && <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: this.state.uri }}
            />}
          </View>

          <View style={{ flexDirection: "column", marginTop: 5, marginLeft: 5}}>
            <View style={{flexDirection: "row"}}>
              <Button
                title="Save"
                onPress={this.addContact}
                buttonStyle={{ width: 90, backgroundColor: '#7cfc00' }}
                disabled = { !(this.state.name && this.state.phoneNumber) }
              />

              <Button
                title="Remove"
                // icon={                 
                //   <Icon
                //     name="trash"
                //     size={15}
                //     color="white"
                //   />
                // }
                onPress={this.deleteContact}
                buttonStyle={{ width: 90, backgroundColor: '#ff4500', marginLeft: 5}}
              />
            </View>
            <Button
              title="Choose Avatar"
              onPress={this.chooseAvatar}
              buttonStyle={{ backgroundColor: '#7cfc00', marginTop: 5 }}
            />
          </View>
        </View>

        {this.state.loading && <ScrollView style={{marginTop: 5}}>
          {this.state.photos.map((p, i) => {
            return (
              <TouchableOpacity onPress={() => this.showAvatar(p.node.image.uri)}>
                <Image
                  key={i}
                  style={{
                    resizeMode: 'stretch',
                    width: '100%',
                    height: 350
                  }}
                  source={{ uri: p.node.image.uri }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>}


      </View>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    item: state.task
  }
}

const mapDispatchtoProps = (dispatch, props) => {
  return {
    sendItem: (item) => {
      dispatch(actions.getItem(item));
    }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(DetailContact);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    width: '80%'
  }
})