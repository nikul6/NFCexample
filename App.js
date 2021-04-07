import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity
} from 'react-native'
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nfcId: ""
    };
  }

  componentDidMount() {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      this.setState({ nfcId: tag })
      NfcManager.setAlertMessageIOS('I got your tag!');
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
  }

  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  render() {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>NFC Demo</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ padding: 10, width: 100, margin: 20, borderWidth: 1, borderColor: 'black' }}
            onPress={this._test}
          >
            <Text>Start</Text>
          </TouchableOpacity>
          <Text></Text>
          <TouchableOpacity
            style={{ padding: 10, width: 100, margin: 20, borderWidth: 1, borderColor: 'black' }}
            onPress={this._cancel}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>NFC ID: {this.state.nfcId}</Text>
      </View>
    )
  }

  _cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  _test = async () => {
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  }
}