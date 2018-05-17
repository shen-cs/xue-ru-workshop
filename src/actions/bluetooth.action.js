import { createActions } from 'redux-actions';

export default createActions({
    setEnabled: enabled => enabled,
    setDeviceList: deviceList => deviceList,
    setConnectedDevice: deviceName => deviceName,
})