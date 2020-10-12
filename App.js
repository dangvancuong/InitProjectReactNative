import React, { Component } from 'react';
import {View, Alert, RefreshControl, FlatList, ListItem} from 'react-native';
import {Button, Text} from 'react-native-elements'; // Version can be specified in package.json
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: {}
    }
  }

  showFirstContactAsync = async () => {
    // Ask for permission to query contacts.
    const permission = await Permissions.askAsync(Permissions.CONTACTS);

    if (permission.status !== 'granted') {
      console.log('Permission was denied');

      return;
    }
    const contacts = await Contacts.getContactsAsync({
      fields: [
        Contacts.PHONE_NUMBERS,
        Contacts.EMAILS,
      ],
      pageSize: 10,
      pageOffset: 0,
    });

    if (contacts.total > 0) {
      this.setState({
        contacts: contacts.data
      });
    }
  }

  render() {
    console.log(this.state.contacts)
    return (
        <View style={{flex: 1, paddingTop: 40}}>
          <Button title='Get contacts' onPress={this.showFirstContactAsync}/>
          <FlatList
              data={this.state.contacts}
              renderItem={({item}) => {
                return <Text style={styles.textStyle}>{item.id} _ key {item.id}</Text>
              }}
              keyExtractor={item => item.id}
          />
        </View>
    );
  }
}
