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
  TouchableOpacity,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import BluetoothSerial from 'react-native-bluetooth-serial'
import store from './store/';
import Appbar from './components/Appbar';
import Controller from './components/Controller';

class App extends Component {
    
  render() {
   return (
      <Provider store={store}>
        <View style={styles.container}>
          <Appbar/>
          <Controller/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
})

export default App;