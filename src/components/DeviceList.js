import React, { Component } from 'react';
import { 
  View,
  ScrollView,
  Modal,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { connect } from 'react-redux';
import btAction from '../actions/bluetooth.action';

const mapStateToProps = (state) => ({
  btEnabled: state.btEnabled,
  deviceList: state.deviceList,
})

class DeviceListModal extends Component {

  state = {
    deviceHeight: null,
    deviceWidth: null
  }
  componentWillMount() {
    const { height, width } = Dimensions.get('window');
    this.setState({ deviceHeight: height, deviceWidth: width });
    Dimensions.addEventListener('change', ({ window, screen }) => {
      this.setState({ deviceHeight: window.height, deviceWidth: window.width });
    })
  }

  handleConnect = (item) => () => {
    const { dispatch, closeModal } = this.props;
    ToastAndroid.show(`與${item.name}建立連線中...`, ToastAndroid.SHORT);
    BluetoothSerial.connect(item.address)
      .catch( err => {
        // console.log('Error!!! :', err);
        dispatch(btAction.setConnectedDevice(new Object()))
        ToastAndroid.show('連線失敗...', ToastAndroid.SHORT);
        closeModal();
      })
      .then(res => {
        if(res && res.message.includes('Connected')) {
          dispatch(btAction.setConnectedDevice(item));
          ToastAndroid.show(`已連線到${item.name}`, ToastAndroid.SHORT);
          closeModal();
        }
      })
      
  }
  renderItem = (item) => (
    <View style={styles.listItem} key={item.id}>
      <TouchableNativeFeedback
        style={{flex: 1}}
        onPress={this.handleConnect(item)}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.deviceItemContainer}>
          <Text style={styles.deviceNameItem} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.deviceMacItem}>{item.address}</Text> 
        </View>
      </TouchableNativeFeedback>
      <View style={styles.divider}/>
    </View>
  )
  render() {
    const { modalVisible, closeModal, btEnabled, deviceList } = this.props;
    return (
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}>
        <View style={styles.modal}>
          <View style={[styles.container, { width: this.state.deviceWidth * 0.8}]}>
            { btEnabled ?
              <View style={styles.listContainer}>
                <Text style={styles.header}>點選以連線...</Text>
                <View style={styles.divider}/>
                <ScrollView style={{height: this.state.deviceHeight * 0.6}}>
                  {deviceList.map(this.renderItem)}
                </ScrollView>
              </View>
            :
              <View style={styles.openBtContainer}>
                <Text style={styles.openBtText}>請開啟藍牙</Text>
              </View>
            }
            <View style={{alignSelf: 'stretch'}}>
              <TouchableNativeFeedback
                  onPress={closeModal}
                  background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.button}>
                  <Text style={styles.btnText}>關閉</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 50,
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  openBtContainer: {
    padding: 30,
  },
  listContainer: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  openBtText: {
    textAlign: 'center',
    fontSize: 24,
  },
  button: {
    alignItems: 'center',
    height: 50,
    padding: 10,
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 20,
  },
  divider: {
    alignSelf: 'stretch',
    backgroundColor: '#EEE',
    height: 1,
  },
  listItem: {
    height: 60,
    alignItems: 'stretch',
  },
  deviceItemContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center'
  },
  deviceNameItem: {
    fontSize: 18,
  },
  deviceMacItem: {
    opacity: 0.4,
    fontSize: 14,
  },
  header: {
    padding: 10,
  }
})
export default connect(mapStateToProps)(DeviceListModal);