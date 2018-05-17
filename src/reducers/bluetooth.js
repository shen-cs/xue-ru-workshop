const initialState = {
  btEnabled: false,
  deviceList: [],
  connectedDevice: {}
}

const reducerMap = {
  setEnabled: (state, action) => ({
    ...state, btEnabled: action.payload
  }),
  setDeviceList: (state, action) => ({
    ...state, deviceList: action.payload
  }),
  setConnectedDevice: (state, action) => ({
    ...state, connectedDevice: action.payload
  })
}

export { initialState, reducerMap };