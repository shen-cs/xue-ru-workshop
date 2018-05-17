import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Slider,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import BluetoothSerial from 'react-native-bluetooth-serial';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { slidersConfig, cmds } from '../constants';

const mapStateToProps = (state) => ({
  connectedDevice: state.connectedDevice,
})

class Controller extends Component {

  state = {
    width: null,
    height: null,
    sliderVals: new Array(slidersConfig.length).fill(0),
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.connectedDevice.name  === undefined) {
      nextState.sliderVals = this.state.sliderVals.fill(0)
    }
    return true;
  }
  handleSlide = index => val => {
    const rounded = Math.floor(val);
    const msg = `${index}:${rounded}\n`;
    // console.log(msg);
    let sliderVals = this.state.sliderVals.slice();
    sliderVals[index] = rounded;
    this.setState({
      sliderVals,
    })
    BluetoothSerial.write(msg)
      .then(success => null);
  };
  handleTouchable = cmd => () => {
    BluetoothSerial.write(`${cmd}\n`)
      .then(success => null);
  }
  renderSlider = (item, index) => (
    <View key={item.title} style={styles.sliderContainer}>
      <View style={styles.sliderTitleContainer}>
        <Text style={styles.sliderTitle}>{item.title}</Text>
        <Text style={{marginLeft: 10}}>{this.state.sliderVals[index]}</Text>
      </View>
      <Slider 
        minimumValue={item.min}
        maximumValue={item.max}
        onValueChange={this.handleSlide(index)}/>
    </View>
  )
  render() {
    const { connectedDevice } = this.props;
      return (
        connectedDevice.name ?
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.connectedContainer}>
              <Text>
                {`已連接至 ${connectedDevice.name}`}
              </Text>
            </View>
            <View style={styles.slidersContainer}>
              {slidersConfig.map(this.renderSlider)}
            </View>
            <View style={styles.arrowContainer}>
              <View style={styles.upperIconsContainer}>
                <TouchableOpacity onPress={this.handleTouchable(cmds[0])}>
                  <Icon name="play-arrow"
                    size={80}
                    style={{transform: [{rotate: '-90deg'}]}}
                    color="#000"/>
                </TouchableOpacity>
              </View>
              <View style={styles.lowerIconsContainer}>
                <TouchableOpacity onPress={this.handleTouchable(cmds[1])}>
                  <Icon name="play-arrow"
                    size={80}
                    style={{transform: [{rotate: '180deg'}]}}
                    color="#000"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleTouchable(cmds[2])}>
                  <Icon name="play-arrow"
                    size={80}
                    style={{transform: [{rotate: '90deg'}]}}
                    color="#000"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handleTouchable(cmds[3])}>
                  <Icon name="play-arrow"
                    size={80}
                    color="#000"/>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

        :
        <View style={styles.connectBTContainer}>
          <Text>請連接藍牙裝置</Text>
        </View>
      )
      
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  connectBTContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  connectedContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  slidersContainer: {
    // flex: 2,
    alignItems: 'stretch',
  },
  sliderTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderTitle: {
    fontSize: 17,
  },
  sliderContainer: {
    marginBottom: 10,
  },
  arrowContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  upperIconsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
export default connect(mapStateToProps)(Controller);