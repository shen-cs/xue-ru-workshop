import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import BluetoothSerial from 'react-native-bluetooth-serial'
import ActionBar from 'react-native-action-bar';
import DeviceListModal from './DeviceList';
import btAction from '../actions/bluetooth.action';
import Icon from 'react-native-vector-icons/MaterialIcons';
import makerIcon from '../images/logo.png';


const mapStateToProps = state => ({
  btEnabled: state.btEnabled,
  deviceList: state.deviceList,
})

class Appbar extends Component {
  
  state = {
    modalVisible: false,
  }

  componentWillMount () {
    const { dispatch } = this.props;
    BluetoothSerial.on('bluetoothEnabled', () => {
      dispatch(btAction.setEnabled(true));
      BluetoothSerial.list()
      .then(devices => dispatch(btAction.setDeviceList(devices)));
    });
    BluetoothSerial.on('bluetoothDisabled', () => {
      dispatch(btAction.setEnabled(false));
    });
    BluetoothSerial.on('connectionLost', () => {
      dispatch(btAction.setConnectedDevice(new Object()))
    })
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
    .then((values) => {
      const [ isEnabled, devices ] = values
      dispatch(btAction.setEnabled(isEnabled));
      dispatch(btAction.setDeviceList(devices));
    })
  }
  openModal = () => {
    this.setState({
      modalVisible: true
    })
  }
  closeModal = () => {
    this.setState({
      modalVisible: false
    })
  }
  enableBt = () => {
    ToastAndroid.show('開啟藍牙...', ToastAndroid.SHORT);
    BluetoothSerial.enable()
      .then(res => console.log(res))
  }
  disableBt = () => {
    ToastAndroid.show('關閉藍牙...', ToastAndroid.SHORT);
    BluetoothSerial.disable()
      .then(res => console.log(res))
  }
  renderRight = () => (
    <View style={styles.iconContainer}>
      { this.props.btEnabled ? 
      <TouchableOpacity 
        style={styles.icon}
        onPress={this.disableBt}>
        <Icon
          name="bluetooth"
          size={30}
          color="#FFF"/>
      </TouchableOpacity>
        :
      <TouchableOpacity 
        style={styles.icon}
        onPress={this.enableBt}>
        <Icon
          name="bluetooth-disabled"
          size={30}
          color="#FFF"/>
      </TouchableOpacity> }
      <TouchableOpacity 
        style={styles.icon}
        onPress={this.openModal}>
        <Icon
          name="format-list-bulleted"
          size={30}
          color="#FFF"/>
      </TouchableOpacity>
    </View>
  )
  render() {
    return (
      <View style={styles.container}>
        <DeviceListModal 
          closeModal={this.closeModal}
          modalVisible={this.state.modalVisible}/>
        <ActionBar
          backgroundColor={'#3B373C'}
          title={'藍牙遙控車車'}
          leftIconImage={makerIcon}
          leftIconImageStyle={styles.leftIcon}
          leftIconContainerStyle={{width: 55, height: 60}}
          containerStyle={styles.bar}
          titleStyle={styles.title}
          renderRightSide={this.renderRight}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  bar: {
    height: 60,
    alignItems: 'stretch',
  },
  icon: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    width: 55,
    height: 55,
    marginLeft: 5,
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 22,
    marginLeft: -3,
  },
})

export default connect(mapStateToProps)(Appbar);
